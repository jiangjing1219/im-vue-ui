// eslint-disable-next-line import/no-extraneous-dependencies
import { defineStore } from 'pinia';
import {
  Conversation, ImFriendShipEntityList, ImGroupEntity, ImGroupList,
} from '@/types';
import { LocationQueryValue } from 'vue-router';
import { useUserInfoStore } from '@/store/userInfo';
import { ElNotification } from 'element-plus';
import { useConversationSetStore } from '@/store/conversationSet';

const generateGroupName = (group: ImGroupEntity) => {
  const { memberList } = group;
  // 如果成员列表长度超过4，则只取前4个成员的别名
  const aliasesToShow = memberList.slice(0, memberList.length > 5 ? 5 : memberList.length)
    .map((item) => item.alias);
  return `${aliasesToShow.join('、')}..等${memberList.length}人`; // 使用 join 方法避免手动添加最后一个分隔符的问题
};
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
    getGroupInfo(groupId: string): ImGroupEntity | undefined {
      return this.imGroupList.find((item) => item.groupId === groupId);
    },
    syncFriendShipList() {
      window.imsdk.im.syncFriendshipList(0, 100)
        .then((res: any) => {
          console.log('同步好友关系列表', res.data);
          // todo 如果数据超过 100 行需要循环拉取
          this.friendShipList = res.data.dataList;
          // 获取好友的在线状态
          window.imsdk.im.queryFriendOnlineStatus()
            .then((result: any) => {
              // 使用 map 方法来创建一个新数组，避免直接修改原数组中的元素
              this.friendShipList = this.friendShipList.map((friend) => {
                const updatedFriend = { ...friend }; // 创建朋友对象的浅拷贝
                if (result.data[friend.toId]) {
                  updatedFriend.onlineStatus = result.data[friend.toId].onlineStatus;
                }
                return updatedFriend;
              });
            });
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
          this.imGroupList = res.data.dataList.map((item: any) => {
            if (!item.groupName) {
              return {
                ...item,
                groupName: generateGroupName(item),
              };
            }
            return item;
          });
        })
        .catch((error: any) => {
          console.log('同步群列表失败', error);
        });
    },
    onAddFriend(friendId: number) {
      window.imsdk.im.getRelation(friendId)
        .then((res: any) => {
          const friendShip = res.data;
          // todo 需要查询在线状态
          const target = this.friendShipList.find((item) => item.toId === friendShip.toId);
          if (target) {
            // 如果已经存在直接替换
            // eslint-disable-next-line max-len
            this.friendShipList = this.friendShipList.map((item) => (item.toId === friendShip.toId ? target : item));
          } else {
            this.friendShipList.unshift(friendShip);
          }
        });
    },
    onAddGroup(group: ImGroupEntity) {
      const userInfoStore = useUserInfoStore();
      const conversationSet = useConversationSetStore();
      // 获取群成员信息
      window.imsdk.im.getGroupInfo(group.groupId)
        .then((res: any) => {
          if (res.code === 200) {
            const resData = res.data;
            if (!resData.groupName) {
              resData.groupName = generateGroupName(resData);
            }
            this.imGroupList.unshift(resData);
          }
          console.log('返回的群成员信息', res);
        });
      // 添加 conversion
      const groupConversion: Conversation = {
        conversationId: `1_${userInfoStore.userId}_${group.groupId}`,
        conversationType: 1,
        fromId: userInfoStore.userId,
        toId: group.groupId,
        isMute: 0,
        appId: userInfoStore.userInfo.appId,
        isTop: 0,
        readedSequence: 0,
        sequence: 0,
        unreadCount: 0,
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
    onlineStatusChange(userId: string, status: number) {
      const friendShip = this.friendShipList.find((item) => item.toId === userId);
      if (friendShip) {
        friendShip.onlineStatus = status;
        ElNotification({
          title: '好友在线状态通知',
          message: `您的好友【${friendShip.remark || friendShip.nickName}】${status === 1 ? '上线' : '下线'}！`,
          type: status === 1 ? 'success' : 'info',
          position: 'bottom-right',
        });
      }
    },
    getOnlineStatus(userId: string) {
      const friendShip = this.friendShipList.find((item) => item.toId === userId);
      if (friendShip?.onlineStatus) {
        return friendShip?.onlineStatus;
      }
      return 0;
    },
    getMemberNickName(groupId: string, memberId: string) {
      const groupInfo = this.imGroupList.find((item) => item.groupId === groupId);
      if (groupInfo) {
        const member = groupInfo.memberList.find((item) => item.memberId === memberId);
        if (member) {
          return member.alias;
        }
      }
      return '';
    },
  },
});
