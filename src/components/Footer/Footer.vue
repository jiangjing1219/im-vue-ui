<script setup lang="ts">
import { inject, ref } from 'vue';
import { Promotion } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useMessageRecordStore } from '@/store/messageRecord';
import { type MessageRecord } from '@/types';

const ImSdk = inject<any>('ImSdk');
const inputText = ref('');
const messageRecordStore = useMessageRecordStore();

function onSearch(value: string) {
  if (!value) {
    ElMessage({
      message: '不能发送空白消息！',
      type: 'warning',
    });
    return;
  }
  // 发送完成之后文本置空
  inputText.value = '';
  const message = ImSdk.createP2PTextMessage('312144459464705', value);
  // 发送单聊消息
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
    messageType: 1,
    messageStatus: 0,
    isMe: true,
  };
  messageRecordStore.addMessageRecord('312144459464705', messageRecord);
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
