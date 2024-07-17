<script setup lang="ts">
import { inject, ref } from 'vue';
import { Promotion } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useMessageRecordStore } from '@/store/messageRecord';
import { GroupMessageRecord, type MessageRecord } from '@/types';
import { useConversationSetStore } from '@/store/conversationSet';

const ImSdk = inject<any>('ImSdk');
const inputText = ref('');
const messageRecordStore = useMessageRecordStore();
const conversationSetStore = useConversationSetStore();
function onSearch(value: string) {
  console.log('send', conversationSetStore.currentConversation.conversationType);
  if (!value) {
    ElMessage({
      message: '不能发送空白消息！',
      type: 'warning',
    });
    return;
  }
  console.log('接受方：', conversationSetStore.currentConversation.toId);
  // 发送完成之后文本置空
  inputText.value = '';
  if (conversationSetStore.currentConversation.conversationType === 0) {
    debugger;
    // eslint-disable-next-line max-len
    const message = ImSdk.createP2PTextMessage(conversationSetStore.currentConversation.toId, value);
    // 发送单聊消息
    console.log('发送单聊消息');
    ImSdk.sendP2PMessage(message);
    const messageRecord: MessageRecord = {
      clientType: 1,
      messageKey: message.messageKey,
      messageId: message.messageId,
      messageRandom: message.messageRandom,
      messageTime: message.messageTime,
      fromId: message.fromId,
      toId: message.toId,
      messageBody: JSON.parse(message.messageBody).content,
      /* json 格式 */
      messageType: 1,
      messageStatus: 0,
      isMe: true,
    };
    // eslint-disable-next-line max-len
    messageRecordStore.addMessageRecord(conversationSetStore.currentConversation.toId, messageRecord);
  } else {
    console.log('发送群聊消息');
    debugger;
    // 构建群聊消息
    // eslint-disable-next-line max-len
    const message = ImSdk.createGroupTextMessage(conversationSetStore.currentConversation.toId, value);
    ImSdk.sendGroupMessage(message);
    const messageRecord: GroupMessageRecord = {
      clientType: 1,
      messageKey: message.messageKey,
      messageId: message.messageId,
      messageRandom: message.messageRandom,
      messageTime: message.messageTime,
      fromId: message.fromId,
      toId: message.toId,
      messageBody: JSON.parse(message.messageBody).content,
      /* json 格式 */
      messageType: 1,
      messageStatus: 0,
      isMe: true,
    };
    // eslint-disable-next-line max-len
    messageRecordStore.addGroupMessageRecord(conversationSetStore.currentConversation.toId, messageRecord);
  }
}
</script>

<template>
  <div class="styled-footer">
    <a-input
      v-model:value="inputText"
      :bordered="false"
      placeholder="请输入你想和 ta 说的话"
      size="large"
      @keyup.enter="onSearch(inputText)"
    >
      <template #suffix>
        <el-icon style="font-size: 40px" color="#4F9DDE" @click="onSearch(inputText)">
          <Promotion class="suffix-icon"/>
        </el-icon>
      </template>
    </a-input>
  </div>
</template>

<style scoped>

.styled-footer {
  padding: 12px 30px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 24px;
  background-color: rgba(241, 237, 237, 0.3);
}

.suffix-icon {
  cursor: pointer;
  transform: scale(1);
  transition: 0.4s;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
}

</style>
