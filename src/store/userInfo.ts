// eslint-disable-next-line import/no-extraneous-dependencies
import { defineStore } from 'pinia';
import { ClientInfoList, UserInfo } from '@/types';
import { ElNotification } from 'element-plus';

/**
 * 当前登陆用户信息
 */
// eslint-disable-next-line import/prefer-default-export
export const useUserInfoStore = defineStore('userInfo', {
  state: () => ({
    userInfo: {} as UserInfo,
    onlineState: 0 as number,
    clientInfoList: [] as ClientInfoList,
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
    onlineStateChange(data: any) {
      this.clientInfoList = data.client;
      ElNotification({
        title: '登录通知',
        message: `您的【${data.imei}】端账号已${data.status === 1 ? '登录' : '登出'}`,
        position: 'bottom-right',
        type: data.status === 1 ? 'success' : 'info',
        duration: 5000,
      });
    },
  },
  getters: {
    userId():string {
      return this.userInfo.userId;
    },
  },
});
