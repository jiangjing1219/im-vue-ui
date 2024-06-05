// eslint-disable-next-line import/no-extraneous-dependencies
import { defineStore } from 'pinia';
import { type MessageRecord, type messageRecordMap } from '@/types';

// eslint-disable-next-line import/prefer-default-export
export const useMessageRecordStore = defineStore('messageRecordMap', {
  state: () => ({
    messageRecordMap: {} as messageRecordMap,
  }),
  actions: {
    addMessageRecord(userId: string, messageRecord: MessageRecord) {
      if (!this.messageRecordMap[userId]) {
        this.messageRecordMap[userId] = [];
      }
      this.messageRecordMap[userId].push(messageRecord);
    },
    clearMessageRecord() {
      this.messageRecordMap = {};
    },
    getUserMessageRecord(userId: string) {
      return this.messageRecordMap[userId];
    },
  },
});
