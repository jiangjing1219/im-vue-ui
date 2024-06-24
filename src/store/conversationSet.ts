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
      window.imsdk.im.syncConversationSet(0, 100).then((res:any) => {
        console.log('同步会话列表', res.data);
        // todo 如果数据超过 100 行需要循环拉取
        this.conversationSet = res.data.dataList;
        // 安全地访问数组元素
        this.currentConversation = this.conversationSet?.[0];
      }).catch((error:any) => {
        console.log('同步会话列表失败', error);
      });
    },
    getConversationById(conversationId: string) {
      // eslint-disable-next-line max-len
      return this.conversationSet.find((item: Conversation) => item.conversationId === conversationId);
    },
    setCurrentConversation(conversationId: string) {
      const target = this.conversationSet.find((item: Conversation) => item.conversationId === conversationId);
      this.currentConversation = target || {} as Conversation;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: `conversationSet_${window.imsdk.im.userId}`,
        storage: localStorage,
      },
    ],
  },
});
