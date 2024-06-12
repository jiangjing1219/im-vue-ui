<template>
  <div class="styled-conversation">
    <div style="width: 100%">
      <TitleBar/>
    </div>
    <div style="flex: 1">
      <chat-bubble :type="message.isMe ? 'mine' : 'other'" :time="dayjs(message.messageTime).format('YYYY年-MM月-DD日 HH:mm')" v-for="message in messageRecordStore.getUserMessageRecord(conversationSetStore.currentConversation.toId)" :key="message.messageId">{{ message.messageBody}}</chat-bubble>
    </div>
    <Footer/>
  </div>
</template>

<script setup lang="ts">
import TitleBar from '@/components/TitleBar/TitleBar.vue';
import ChatBubble from '@/components/ChatBubble/ChatBubble.vue';
import Footer from '@/components/Footer/Footer.vue';
import { useMessageRecordStore } from '@/store/messageRecord';
import { useConversationSetStore } from '@/store/conversationSet';
import { storeToRefs } from 'pinia';
// eslint-disable-next-line import/no-extraneous-dependencies
import dayjs from 'dayjs';

const messageRecordStore = useMessageRecordStore();
const conversationSetStore = useConversationSetStore();
console.log(messageRecordStore);
</script>

<style scoped>
.styled-conversation {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid #EFECE8;

  & > *:last-child {
    align-self: end;
  }
}

.conversations {
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
  width: 100%;
  /* overflow-y: auto; 会在垂直方向上生成一个垂直滚动条，使用户能够滚动查看超出容器高度的内容。滚动条只在内容溢出时显示，否则隐藏。*/
  overflow-y: auto;
  flex: 1;
  /* 每条记录的上下边距为 10 px*/

  & > * {
    margin: 10px 0;
  }
}
</style>
