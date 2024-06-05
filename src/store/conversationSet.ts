// eslint-disable-next-line import/no-extraneous-dependencies
import { defineStore } from 'pinia';
import { Conversation, ConversationSet } from '@/types';

// eslint-disable-next-line import/prefer-default-export
export const useConversationSetStore = defineStore('conversationSet', {
  state: () => ({
    conversationSet: [] as ConversationSet,
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
      });
    },
  },
});
