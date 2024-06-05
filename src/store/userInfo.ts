// eslint-disable-next-line import/no-extraneous-dependencies
import { defineStore } from 'pinia';
import { UserInfo } from '@/types';
// eslint-disable-next-line import/prefer-default-export
export const useUserInfoStore = defineStore('userInfo', {
  state: () => ({
    userInfo: {} as UserInfo,
  }),
  actions: {
    async setUserInfo(userInfo: UserInfo) {
      this.userInfo = Object.assign(this.userInfo, userInfo);
      await window.imsdk.im.getSingleUserInfo(userInfo.userId)
        .then((responseData: any) => {
          // 在这里处理返回的数据
          this.userInfo = Object.assign(this.userInfo, responseData.data);
        })
        .catch((error: any) => {
          // 处理错误
          console.error('获取登陆用户信息失败', error);
        });
    },
    getUserInfo() {
      return this.userInfo;
    },
  },
  getters: {
    userId():string {
      return this.userInfo.userId;
    },
  },
});
