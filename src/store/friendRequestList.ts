// eslint-disable-next-line import/no-extraneous-dependencies
import { defineStore } from 'pinia';
import type { ImFriendShipRequestList, ImFriendShipRequest } from '@/types';

/**
 * 好友请求列表
 */
// eslint-disable-next-line import/prefer-default-export
export const useFriendRequestStore = defineStore('friendRequestList', {
  state: () => ({
    friendShipRequestList: [] as ImFriendShipRequestList,
    unreadCount: 0 as number,
  }),
  getters: {
    getFriendShipRequest: (state) => state.friendShipRequestList,
  },
  actions: {
    addFriendShipRequest(conversation: ImFriendShipRequest) {
      this.friendShipRequestList.unshift(conversation);
      this.unreadCount += 1;
    },
  },
});
