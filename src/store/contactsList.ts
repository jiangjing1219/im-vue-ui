// eslint-disable-next-line import/no-extraneous-dependencies
import { defineStore } from 'pinia';
import { ImFriendShipEntityList, ImFriendShipEntity } from '@/types';
import { LocationQueryValue } from 'vue-router';

/**
 * 联系人列表
 */
// eslint-disable-next-line import/prefer-default-export
export const userConcatListStore = defineStore('contactsList', {
  state: () => ({
    friendShipList: [] as ImFriendShipEntityList,
    currentContactCarId: 'new_fiend' as string,
  }),
  getters: {
    getFriendShipList(): ImFriendShipEntityList {
      return this.friendShipList;
    },
  },
  actions: {
    getFriendShip(userId: string | null | LocationQueryValue[]) {
      return this.friendShipList.find((item) => item.toId === userId);
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
    onAddFriend(friendId:number) {
      window.imsdk.im.getRelation(friendId).then((res:any) => {
        const friendShip = res.data;
        const target = this.friendShipList.find((item) => item.toId === friendShip.toId);
        if (target) {
          // 如果已经存在直接替换
          this.friendShipList = this.friendShipList.map((item) => (item.toId === friendShip.toId ? target : item));
        } else {
          this.friendShipList.unshift(friendShip);
        }
      });
    },
  },
});
