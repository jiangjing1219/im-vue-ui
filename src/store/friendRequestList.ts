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
    syncFriendShipRequest() {
      // 1、判断本地存储是是否有存量数据
      // 2、有，直接获取存量数据，然后根据最新的 seq ，判断是否需要增量更新
      // 3、没有，从服务器获取
      window.imsdk.im.getFriendRequest().then((res:any) => {
        console.log('同步好友请求列表', res.data);
        // todo 如果数据超过 100 行需要循环拉取
        this.friendShipRequestList = res.data;
      });
    },
    approveFriendRequest(id:number, approveStatus:number) {
      // 使用find定位请求项，避免遍历整个数组
      const requestToApprove = this.friendShipRequestList.find((item) => item.id === id);
      if (requestToApprove) {
        // 创建一个新对象以避免直接修改原对象
        const updatedRequest = { ...requestToApprove, approveStatus };

        // 更新数组，这里也可以选择直接替换或者根据业务逻辑决定是否需要保留原索引
        // eslint-disable-next-line max-len
        this.friendShipRequestList = this.friendShipRequestList.map((item) => (item.id === id ? updatedRequest : item));
      }
    },
  },
});
