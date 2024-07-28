// eslint-disable-next-line import/no-extraneous-dependencies
import { defineStore } from 'pinia';
import { useConversationSetStore } from '@/store/conversationSet';
import { useUserInfoStore } from '@/store/userInfo';
import {
  type MessageRecord,
  type MessageRecordMap,
  type GroupMessageRecordMap,
  GroupMessageRecord, Conversation,
} from '@/types';

/**
 * 消息记录
 */
// eslint-disable-next-line import/prefer-default-export
export const useMessageRecordStore = defineStore('messageRecordMap', {
  state: () => ({
    messageRecordMap: {} as MessageRecordMap,
    groupMessageRecordMap: {} as GroupMessageRecordMap,
  }),
  actions: {
    addMessageRecord(userId: string, messageRecord: MessageRecord) {
      if (!this.messageRecordMap[userId]) {
        this.messageRecordMap[userId] = [];
      }
      // eslint-disable-next-line max-len
      const target = this.messageRecordMap[userId].find((item) => item.messageId === messageRecord.messageId);
      if (messageRecord.fromId === '324431782084609' && target) {
        // 智能对话回复的消息
        target.messageBody += messageRecord.messageBody;
      } else {
        this.messageRecordMap[userId].push(messageRecord);
      }
      // 判读是否是当前用户发送的消息，如果是接受消息，需要更新未读数
      if (!messageRecord.isMe) {
        // 触发消息重排序
        // eslint-disable-next-line max-len
        this.sortP2PMessageList(userId);
        // 判读未读消息是否需要 +1
        const conversationStore = useConversationSetStore();
        const conversationId = `0_${messageRecord.toId}_${messageRecord.fromId}`;
        // eslint-disable-next-line max-len
        conversationStore.addP2PConversationUnreadCount(conversationId, messageRecord.messageSequence);
      }
    },
    addGroupMessageRecord(groupId: string, groupMessageRecord: GroupMessageRecord) {
      if (!this.groupMessageRecordMap[groupId]) {
        this.groupMessageRecordMap[groupId] = [];
      }
      this.groupMessageRecordMap[groupId].push(groupMessageRecord);
    },
    clearMessageRecord() {
      this.messageRecordMap = {};
    },
    getUserMessageRecord(userId: string) {
      return this.messageRecordMap[userId];
    },
    getGroupMessageRecord(groupId: string) {
      return this.groupMessageRecordMap[groupId];
    },
    /**
     * 服务器 ack 通知，说明该消息已经发送到服务端
     * 给消息设置 key 和 seq
     * @param messageAck
     */
    onP2PMessageAck(messageAck: any) {
      // 设置 message 的 key 和 seq
      // eslint-disable-next-line max-len
      const targetMessageRecord = this.messageRecordMap[messageAck.toId].find((messageRecord) => messageRecord.messageId === messageAck.messageId);
      if (targetMessageRecord) {
        targetMessageRecord.messageKey = messageAck.messageKey;
        targetMessageRecord.messageSequence = messageAck.messageSequence;
        targetMessageRecord.messageStatus = 1;
        // this.sortP2PMessageList(messageAck.toId);
      }
    },
    onP2PMessageReceiveAck(messageAck: any) {
      // 设置 message 的接收标识
      // eslint-disable-next-line max-len
      const targetMessageRecord = this.messageRecordMap[messageAck.fromId].find((messageRecord) => messageRecord.messageKey === messageAck.messageKey);
      if (targetMessageRecord) {
        targetMessageRecord.messageStatus = 2;
      }
    },
    onMessageReadReceipt(messageAck: any) {
      // 设置 message 已读标识
      // eslint-disable-next-line max-len
      this.messageRecordMap[messageAck.fromId] = this.messageRecordMap[messageAck.fromId].map((messageRecord) => {
        if (messageRecord.messageSequence <= messageAck.messageSequence) {
          // 返回一个新的对象，而不是直接修改传入的参数
          return { ...messageRecord, messageStatus: 3 };
        }
        return messageRecord;
      });
    },
    sortP2PMessageList(userId: string) {
      // eslint-disable-next-line max-len
      this.messageRecordMap[userId].sort((recordA, recordB) => recordA.messageSequence - recordB.messageSequence);
    },
    sendP2PMessageReadAck(userId: string, conversationId: string) {
      const message = this.messageRecordMap[userId]?.slice()
        .reverse()
        .find((item) => !item.isMe);
      if (message) {
        // eslint-disable-next-line max-len
        window.imsdk.im.sendP2PMessageReadAck(message.messageKey, message.fromId, message.messageSequence);
      }
    },
    /**
     * @param messageList
     */
    dispatcherOfflineMessage(messageList: any) {
      // 311968820887553
      messageList.forEach((message: any) => {
        const targetId = message.conversationId.split('_')
          .pop();
        const currentUserId = message.conversationId.split('_')[1];
        if (message.conversationType === 0) {
          // p2p
          const messageRecord = {
            isMe: message.fromId === currentUserId,
            messageRandom: '',
            messageStatus: 3,
            fromId: message.fromId,
            toId: message.toId,
            messageKey: message.messageKey,
            messageTime: message.messageTime,
            clientType: message.clientType,
            messageBody: JSON.parse(message.messageBody).content,
            messageId: message.messageId,
            messageSequence: message.messageSequence,
            messageType: 1,
          };
          if (!this.messageRecordMap[targetId]) {
            this.messageRecordMap[targetId] = [];
          }
          this.messageRecordMap[targetId].push(messageRecord);
        } else if (message.conversationType === 1) {
          // group
          const groupMessageRecord = {
            isMe: message.fromId === currentUserId,
            messageRandom: '',
            messageStatus: 3,
            fromId: message.fromId,
            toId: message.toId,
            messageKey: message.messageKey,
            messageTime: message.messageTime,
            clientType: message.clientType,
            messageBody: JSON.parse(message.messageBody).content,
            messageId: message.messageId,
            messageSequence: message.messageSequence,
            messageType: 1,
          };
          if (!this.groupMessageRecordMap[targetId]) {
            this.groupMessageRecordMap[targetId] = [];
          }
          this.groupMessageRecordMap[targetId].push(groupMessageRecord);
        }
        if (message.conversationType === 0) {
          // 重排序
          Object.keys(this.messageRecordMap).forEach((key) => {
            this.sortP2PMessageList(key);
          });
        } else if (message.conversationType === 1) {
          // 群聊重排序
        }
      });
    },
    initConversationUnreadCount() {
      const conversationSetStore = useConversationSetStore();
      const userInfoStore = useUserInfoStore();
      const userIds = Object.keys(this.messageRecordMap);
      userIds.forEach((userId) => {
        const p2pConversation = conversationSetStore.getConversationById(`0_${userInfoStore.userId}_${userId}`);
        // eslint-disable-next-line max-len
        const unreadCount = this.messageRecordMap[userId].reduce((count, messageRecord) => (!messageRecord.isMe && messageRecord.messageSequence > p2pConversation?.readedSequence ? count + 1 : count), 0);
        if (p2pConversation) {
          // eslint-disable-next-line max-len
          if (unreadCount > 0) {
            // eslint-disable-next-line max-len
            conversationSetStore.setP2PConversationUnreadCount(p2pConversation.conversationId, unreadCount);
          }
        } else {
          // 创建一个单聊会话
          const conversation: Conversation = {
            conversationId: `0_${userInfoStore.userId}_${userId}`,
            conversationType: 0,
            appId: 10000,
            fromId: userInfoStore.userId,
            isMute: 0,
            isTop: 0,
            readedSequence: 0,
            unreadCount,
            sequence: 0,
            toId: userId,
          };
          conversationSetStore.addConversationSet(conversation);
        }
      });
    },
    getLastMessage(userId: string, conversationType: number) {
      if (conversationType === 0) {
        return this.messageRecordMap[userId]?.slice(-1)[0];
      }
      return this.groupMessageRecordMap[userId]?.slice(-1)[0];
    },
  },
});
