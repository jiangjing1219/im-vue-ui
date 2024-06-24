// eslint-disable-next-line import/no-extraneous-dependencies
import { defineStore } from 'pinia';
import {
  type MessageRecord,
  type MessageRecordMap,
  type GroupMessageRecordMap,
  GroupMessageRecord,
} from '@/types';

/**
 * 消息记录
 */
// eslint-disable-next-line import/prefer-default-export
export const useMessageRecordStore = defineStore('messageRecordMap', {
  state: () => ({
    messageRecordMap: {} as MessageRecordMap,
    groupMessageRecordMap: {} as GroupMessageRecordMap,
  }),
  actions: {
    addMessageRecord(userId: string, messageRecord: MessageRecord) {
      if (!this.messageRecordMap[userId]) {
        this.messageRecordMap[userId] = [];
      }
      this.messageRecordMap[userId].push(messageRecord);
    },
    addGroupMessageRecord(groupId: string, groupMessageRecord: GroupMessageRecord) {
      if (!this.groupMessageRecordMap[groupId]) {
        this.groupMessageRecordMap[groupId] = [];
      }
      this.groupMessageRecordMap[groupId].push(groupMessageRecord);
    },
    clearMessageRecord() {
      this.messageRecordMap = {};
    },
    getUserMessageRecord(userId: string) {
      return this.messageRecordMap[userId];
    },
    getGroupMessageRecord(groupId: string) {
      return this.groupMessageRecordMap[groupId];
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: `messageRecordMap_${window.imsdk.im.userId}`,
        storage: localStorage,
      },
    ],
  },
});
