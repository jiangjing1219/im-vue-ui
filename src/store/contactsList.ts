// eslint-disable-next-line import/no-extraneous-dependencies
import { defineStore } from 'pinia';
import { ImFriendShipEntityList, ImFriendShipEntity } from '@/types';

/**
 * 联系人列表
 */
// eslint-disable-next-line import/prefer-default-export
export const userConcatListStore = defineStore('contactsList', {
  state: () => ({
    friendShipList: [] as ImFriendShipEntityList,
  }),
  getters: {
    getFriendShipList(): ImFriendShipEntityList {
      return this.friendShipList;
    },
  },
  actions: {
    addFriendShip(friendShip: ImFriendShipEntity) {
      this.friendShipList.unshift(friendShip);
    },
    syncFriendShipList() {
      window.imsdk.im.syncFriendshipList(0, 100).then((res:any) => {
        console.log('同步好友关系列表', res.data);
        // todo 如果数据超过 100 行需要循环拉取
        this.friendShipList = res.data.dataList;
      }).catch((error:any) => {
        console.log('同步好友关系列表', error);
      });
    },
  },
});