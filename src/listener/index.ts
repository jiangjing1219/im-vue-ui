import { useMessageRecordStore } from '@/store/messageRecord';
import { useFriendRequestStore } from '@/store/friendRequestList';
import { Conversation, ImFriendShipRequest } from '@/types';
import { useConcatListStore } from '@/store/contactsList';
import { useUserInfoStore } from '@/store/userInfo';
import { useConversationSetStore } from '@/store/conversationSet';
import { Action, ElMessageBox } from 'element-plus';

const ListenerMap = () => {
  const friendRequestStore = useFriendRequestStore();
  const messageRecordStore = useMessageRecordStore();
  const concatListStore = useConcatListStore();
  const userInfoStore = useUserInfoStore();
  const conversationSetStore = useConversationSetStore();
  return {
    onSocketConnectEvent: (option: never, status: never, data: never) => {
      console.log(`已建立连接:${JSON.stringify(status)}`);
    },
    onSocketErrorEvent: (error: never) => {
      localStorage.removeItem('userInfo');
      window.location.assign('/login');
    },
    onSocketReConnectEvent: () => {
      console.log('正在重连:');
    },
    onSocketCloseEvent: () => {
      if (window.location.pathname !== '/login') {
        // 直接提示或者提示加载中，判断当前路由在哪个页面
        localStorage.removeItem('userInfo');
        ElMessageBox.alert('WebSocket连接已关闭，请重新登录', '', {
          confirmButtonText: 'OK',
          callback: (action: Action) => {
            window.location.assign('/login');
          },
        });
      }
    },
    onSocketReConnectSuccessEvent: () => {
      console.log('重连成功');
    },
    onTestMessage: (e: never) => {
      console.log(`onTestMessage ：${e}`);
    },
    /**
     * {
     *     "appId": 10000,
     *     "clientType": 1,
     *     "command": 1046,
     *     "data": {
     *         "code": 200,
     *         "data": {
     *             "messageKey": 363421415505921,
     *             "messageId": "oi94zkhhws1719593634751",
     *             "messageSequence": 3
     *         },
     *         "message": "success",
     *         "ok": true
     *     },
     *     "imei": "windows_chrome_127.0.0.0",
     *     "toId": "311968820887553",
     *     "userId": "311968820887553"
     * }
     * @param e
     */
    onP2PMessageAck: (e: never) => {
      messageRecordStore.onP2PMessageAck(JSON.parse(e).data.data);
      console.log('onP2PMessageAck-消息发送成功ack', JSON.parse(e).data.data);
    },
    onMessageReadReceipt: (e: never) => {
      console.log('onMessageReadReceipt-接收方已读的回执', JSON.parse(e).data);
    },
    onMessageReadSync: (e: never) => {
      console.log(`onMessageReadSync-自身已读标识同步 ：${e}`);
    },
    /**
     * {
     *     "appId": 10000,
     *     "clientType": 1,
     *     "command": 1108,
     *     "data": {
     *         "toId": "312144459464705",
     *         "messageKey": 363718034587649,
     *         "messageTime": 1719735073000,
     *         "clientType": 1,
     *         "messageBody": "{\"type\":1,\"content\":\"你好\"}",
     *         "appId": 10000,
     *         "imei": "windows_chrome_126.0.0.0",
     *         "messageId": "8t2a3tjas1719735073719",
     *         "messageSequence": 8,
     *         "fromId": "311968820887553"
     *     },
     *     "imei": "windows_chrome_127.0.0.0",
     *     "toId": "311968820887553",
     *     "userId": "311968820887553"
     * }
     *
     * @param e
     */
    onP2PMessageSync: (e: never) => {
      const receiveMessage = JSON.parse(e).data;
      const message = {
        isMe: true,
        messageRandom: '',
        messageStatus: 1,
        fromId: receiveMessage.fromId,
        toId: receiveMessage.toId,
        messageKey: receiveMessage.messageKey,
        messageTime: receiveMessage.messageTime,
        clientType: receiveMessage.clientType,
        messageBody: JSON.parse(receiveMessage.messageBody).content,
        messageId: receiveMessage.messageId,
        messageSequence: receiveMessage.messageSequence,
        messageType: 1,
      };
      messageRecordStore.addMessageRecord(message.toId, message);
      console.log('onP2PMessageSync-发送消息的多端同步', JSON.parse(e).data);
    },
    onP2PMessage: (e: any) => {
      const receiveMessage = JSON.parse(e).data;
      const message = {
        isMe: false,
        messageRandom: '',
        messageStatus: 1,
        fromId: receiveMessage.fromId,
        toId: receiveMessage.toId,
        messageKey: receiveMessage.messageKey,
        messageTime: receiveMessage.messageTime,
        clientType: receiveMessage.clientType,
        messageBody: JSON.parse(receiveMessage.messageBody).content,
        messageId: receiveMessage.messageId,
        messageSequence: receiveMessage.messageSequence,
        messageType: 1,
      };
      const conversationId = `0_${message.toId}_${message.fromId}`;
      // 判断该会话是否存在，不存在直接创建会话
      if (!conversationSetStore.getConversationById(conversationId)) {
        // 创建一个单聊会话
        const conversation: Conversation = {
          conversationId,
          conversationType: 0,
          appId: 10000,
          fromId: message.toId,
          isMute: 0,
          isTop: 0,
          readedSequence: 0,
          unreadCount: 1,
          sequence: 0,
          toId: message.fromId,
        };
        conversationSetStore.addConversationSet(conversation);
      }
      messageRecordStore.addMessageRecord(message.fromId, message);
      console.log('onP2PMessage接收到消息', message.messageId, message.messageKey);
      // 事件发布   fromId   toID - 自己   会话id
      if (conversationSetStore.currentConversation?.conversationId === conversationId) {
        // 直接回复已读 ack, 后续修改为点击进入聊天框， 如果当前页面是停留在当前好友的聊天页面直接回复已读
        window.imsdk.im.sendP2PMessageReadAck(message.messageKey, message.fromId, message.messageSequence);
        // 修改会话的 readedSeq
        conversationSetStore.setP2PConversationReadSeq(conversationId, message.messageSequence);
      }
    },
    onMutualLogin: (e: never) => {
      console.log('多端登录限制，当前端下线', e);
    },
    onLogin: (uid: string) => {
      console.log(`用户${uid}登陆sdk成功`);
    },
    onFriendRequest: (e: any) => {
      console.log('收到好友请求', JSON.parse(e).data);
      const friendRequest: ImFriendShipRequest = JSON.parse(e).data;
      friendRequestStore.addFriendShipRequest(friendRequest);
    },
    onFriendRequestApprove: (e: any) => {
      console.log('多端同步，其他端审核了好友申请', JSON.parse(e).data);
      const result = JSON.parse(e).data;
      friendRequestStore.approveFriendRequest(result.id, result.status);
    },
    onFriendRequestRead: (e: any) => {
      console.log('多端同步，其他端已读好友申请', JSON.parse(e).data);
    },
    /**
     * {
     *     "toId": "312144459464705",  好友id
     *     "sequence": 61,
     *     "addSource": "1",
     *     "remark": "",
     *     "fromId": "311968820887553"  自己
     * }
     * @param e
     */
    onAddFriend: (e: any) => {
      console.log('新增好友事件回调', JSON.parse(e).data);
      concatListStore.onAddFriend(JSON.parse(e).data.toId);
    },
    /**
     * {
     *     "groupType": 1,
     *     "groupId": "b5af75d37af049019e0e7b49052038bb",
     *     "photo": "",
     *     "mute": 0,
     *     "ownerId": "311968820887553",
     *     "notification": "群公告",
     *     "sequence": 1,
     *     "groupName": "testGroupName",
     *     "createTime": 1718807746543,
     *     "appId": 10000,
     *     "introduction": "群简介",
     *     "applyJoinType": 0,
     *     "status": 1
     * }
     * @param e
     */
    onCreateGroup: (e: any) => {
      console.log('新建群聊事件回调', JSON.parse(e).data);
      concatListStore.onAddGroup(JSON.parse(e).data);
    },
    /**
     * {
     *     "messageKey": 361972954562561,
     *     "messageTime": 1718902954000,
     *     "clientType": 1,
     *     "messageBody": "{\"type\":1,\"content\":\"群聊消息1\"}",
     *     "appId": 10000,
     *     "groupId": "6427d8a1547c46c3a53ac559cdef7d59",
     *     "imei": "windows_chrome_127.0.0.0",
     *     "messageId": "zm4tdg74gi1718902954443",
     *     "messageSequence": 1,
     *     "fromId": "311968820887553",
     *     "memberIds": [
     *         "311968820887553",
     *         "312144459464705",
     *         "324431782084609",
     *         "331810133245953"
     *     ]
     * }
     * @param e
     */
    onGroupMessage: (e: any) => {
      console.log('接收到群聊消息', JSON.parse(e).data);
      const receiveMessage = JSON.parse(e).data;
      receiveMessage.messageBody = JSON.parse(receiveMessage.messageBody).content;
      messageRecordStore.addGroupMessageRecord(receiveMessage.groupId, receiveMessage);
      const conversationId = `1_${userInfoStore.userId}_${receiveMessage.groupId}`;
      // 判断该会话是否存在，不存在直接创建会话
      if (!conversationSetStore.getConversationById(conversationId)) {
        // 创建一个单聊会话
        const conversation: Conversation = {
          conversationId,
          conversationType: 1,
          appId: 10000,
          fromId: userInfoStore.userId,
          isMute: 0,
          isTop: 0,
          readedSequence: 0,
          unreadCount: 1,
          sequence: 0,
          toId: receiveMessage.groupId,
        };
        conversationSetStore.addConversationSet(conversation);
      }
      // 直接发送已读标识
      window.imsdk.im.senGroupMessageReadAck(receiveMessage.groupId, receiveMessage.fromId, receiveMessage.messageSequence);
    },
    /**
     * {
     *     "code": 200,
     *     "data": {
     *         "messageId": "zm4tdg74gi1718902954443",
     *         "messageSequence": 1
     *     },
     *     "message": "success",
     *     "ok": true
     * }
     * @param e
     */
    onGroupMessageAck: (e: any) => {
      console.log('接收到发送群聊消息的ack，服务端接收到消息, 可以标识该消息已经发送成功', JSON.parse(e).data);
    },
    /**
     * {
     *     "clientType": 1,
     *     "appId": 10000,
     *     "client": [
     *         {
     *             "brokerId": 1001,
     *             "clientType": 1,
     *             "appId": 10000,
     *             "brokerHost": "192.168.1.3",
     *             "imei": "windows_chrome_126.0.0.0",
     *             "connectState": 1,
     *             "userId": "311968820887553"
     *         },
     *         {
     *             "brokerId": 1001,
     *             "clientType": 1,
     *             "appId": 10000,
     *             "brokerHost": "192.168.1.3",
     *             "imei": "windows_chrome_127.0.0.0",
     *             "connectState": 1,
     *             "userId": "311968820887553"
     *         }
     *     ],
     *     "imei": "windows_chrome_127.0.0.0",
     *     "userId": "311968820887553",
     *     "status": 1
     * }
     * @param e
     */
    onUserOnlineStatusChangeSync: (e: any) => {
      console.log('其他端在线登录', JSON.parse(e).data);
      userInfoStore.onlineStateChange(JSON.parse(e).data);
    },
    /**
     * {
     *     "clientType": 1,
     *     "appId": 10000,
     *     "client": [
     *         {
     *             "brokerId": 1001,
     *             "clientType": 1,
     *             "appId": 10000,
     *             "brokerHost": "192.168.1.3",
     *             "imei": "windows_chrome_126.0.0.0",
     *             "connectState": 1,
     *             "userId": "312144459464705"
     *         }
     *     ],
     *     "imei": "windows_chrome_126.0.0.0",
     *     "userId": "312144459464705",
     *     "status": 1
     * }
     * @param e
     */
    onUserOnlineStatusChangeNotify: (e: any) => {
      console.log('其他用户现在状态变更通知', JSON.parse(e).data);
      const stateInfo = JSON.parse(e).data;
      concatListStore.onlineStatusChange(stateInfo.userId, stateInfo.status);
    },
    /**
     * [
     *     {
     *         "appId": 10000,
     *         "messageKey": 363781112725505,
     *         "messageBody": "{\"type\":1,\"content\":\"2\"}",
     *         "messageTime": 1719765152000,
     *         "extra": null,
     *         "delFlag": 0,
     *         "fromId": "311968820887553",
     *         "toId": "312144459464705",
     *         "groupId": null,
     *         "messageSequence": 172,
     *         "messageRandom": null,
     *         "conversationType": 0,
     *         "conversationId": "0_311968820887553_312144459464705"
     *     }
     * ]
     * @param messageList
     */
    onOfflineMessage: (messageList: any) => {
      console.log('离线消息拉取', messageList);
      messageRecordStore.dispatcherOfflineMessage(messageList);
    },
  };
};

export default ListenerMap;
