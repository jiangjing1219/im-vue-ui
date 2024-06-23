// eslint-disable-next-line import/no-extraneous-dependencies
import { defineStore } from 'pinia';
import {
  Conversation, ImFriendShipEntityList, ImGroupEntity, ImGroupList,
} from '@/types';
import { LocationQueryValue } from 'vue-router';
import { useUserInfoStore } from '@/store/userInfo';
import { ElNotification } from 'element-plus';
import { useConversationSetStore } from '@/store/conversationSet';

/**
 * 联系人列表
 */
// eslint-disable-next-line import/prefer-default-export
export const useConcatListStore = defineStore('contactsList', {
  state: () => ({
    friendShipList: [] as ImFriendShipEntityList,
    currentContactCarId: 'new_fiend' as string,
    imGroupList: [] as ImGroupList,
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
      window.imsdk.im.syncFriendshipList(0, 100)
        .then((res: any) => {
          console.log('同步好友关系列表', res.data);
          // todo 如果数据超过 100 行需要循环拉取
          this.friendShipList = res.data.dataList;
        })
        .catch((error: any) => {
          console.log('同步好友关系列表', error);
        });
    },
    syncJoinedGroup() {
      window.imsdk.im.syncJoinedGroup(0, 100)
        .then((res: any) => {
          console.log('同步群列表', res.data);
          // todo 如果数据超过 100 行需要循环拉取
          this.imGroupList = res.data.dataList;
        })
        .catch((error: any) => {
          console.log('同步群列表失败', error);
        });
    },
    onAddFriend(friendId: number) {
      window.imsdk.im.getRelation(friendId)
        .then((res: any) => {
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
    onAddGroup(group: ImGroupEntity) {
      const userInfoStore = useUserInfoStore();
      const conversationSet = useConversationSetStore();
      this.imGroupList.unshift(group);
      // 获取群成员信息
      // 添加 conversion
      const groupConversion: Conversation = {
        conversationId: `${userInfoStore.userId}_${group.groupId}`,
        conversationType: 1,
        fromId: userInfoStore.userId,
        toId: group.groupId,
        isMute: 0,
        appId: userInfoStore.userInfo.appId,
        isTop: 0,
        readedSequence: 0,
        sequence: 0,
      };
      conversationSet.addConversationSet(groupConversion);
      if (userInfoStore.userId !== group.ownerId) {
        ElNotification({
          title: 'SUCCESS',
          message: `你已被邀请加入群聊 ${group.groupName}`,
          type: 'success',
        });
      }
    },
  },
});
