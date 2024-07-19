// eslint-disable-next-line import/no-extraneous-dependencies
import { defineStore } from 'pinia';
import { Conversation, ConversationSet } from '@/types';

/**
 * 会话列表
 */
// eslint-disable-next-line import/prefer-default-export
export const useConversationSetStore = defineStore('conversationSet', {
  state: () => ({
    conversationSet: [] as ConversationSet,
    currentConversation: {} as Conversation,
  }),
  getters: {
    getConversationSet: (state) => state.conversationSet,
  },
  actions: {
    addConversationSet(conversation: Conversation) {
      this.conversationSet.unshift(conversation);
    },
    syncConversationSet() {
      window.imsdk.im.syncConversationSet(0, 100)
        .then((res: any) => {
          console.log('同步会话列表', res.data);
          // todo 如果数据超过 100 行需要循环拉取
          this.conversationSet = res.data.dataList;
          // 安全地访问数组元素
          this.currentConversation = this.conversationSet?.[0];
        })
        .catch((error: any) => {
          console.log('同步会话列表失败', error);
        });
    },
    getConversationById(conversationId: string) {
      // eslint-disable-next-line max-len
      return this.conversationSet.find((item: Conversation) => item.conversationId === conversationId);
    },
    setCurrentConversation(conversationId: string) {
      const target = this.getConversationById(conversationId);
      this.currentConversation = target || {} as Conversation;
    },
    addP2PConversationUnreadCount(conversationId: string, messageSeq: number) {
      const target = this.getConversationById(conversationId);
      // 如果是停留在当前会话，直接未读数为0
      if (target && this.currentConversation?.conversationId === conversationId) {
        target.unreadCount = 0;
      } else if (target && target.readedSequence < messageSeq) {
        // 更新会话的未读数
        target.unreadCount = target.unreadCount ? target.unreadCount + 1 : 1;
      }
    },
    setP2PConversationUnreadCount(conversationId: string, unreadCount: number) {
      const target = this.getConversationById(conversationId);
      // 如果是停留在当前会话，直接未读数为0
      if (target) {
        // eslint-disable-next-line max-len
        target.unreadCount = target.unreadCount ? (target.unreadCount + unreadCount) : unreadCount;
      }
    },
    resetP2PConversationUnreadCount(conversationId: string) {
      const target = this.getConversationById(conversationId);
      if (target) {
        target.unreadCount = 0;
      }
    },
    setP2PConversationReadSeq(conversationId: string, messageSeq: number) {
      const target = this.getConversationById(conversationId);
      if (target && target.readedSequence < messageSeq) {
        console.log('更新会话的已读seq', conversationId, messageSeq);
        target.readedSequence = messageSeq;
      }
    },
  },
});
