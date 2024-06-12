<template>
  <div style="display: flex">
    <div class="sidebar">
      <div class="styled-message-list"    >
        <div class="chat-header">
          <el-input
            v-model="searchText"
            style="width: 87%;height: 40px;border-radius:24px;background-color:rgba(241, 237, 237, 0.3)"
            placeholder="搜索"
            class="input-with-select"
          >
            <template #prepend>
              <el-button :icon="Search"/>
            </template>
          </el-input>
          <div style="height: 36px;width: 36px; background-color: rgba(24, 28, 47, 0.2);
      border-radius:8px;display: flex;align-items: center;justify-content: center">
            <el-icon size="26">
              <Plus/>
            </el-icon>
          </div>
        </div>
        <div class="chat-body">
          <conversation-car v-for="conversation in conversationSet" :key="conversation.conversationId" :conversation-id="conversation.conversationId" :conversation-type="conversation.conversationType" :target-id="conversation.toId"/>
        </div>
      </div>
    </div>
    <div class="content">
      <chat-message/>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Discount, Plus, Search } from '@element-plus/icons-vue';
import ConversationCar from '@/components/ConversationCar/ConversationCar.vue';
import { useConversationSetStore } from '@/store/conversationSet';
import { storeToRefs } from 'pinia';
import MessagePage from '@/views/messagePage/messagePage.vue';
import ChatMessage from '@/components/ChatMessage/ChatMessage.vue';

const conversationSetStore = useConversationSetStore();
const { conversationSet } = storeToRefs(conversationSetStore);

const searchText = ref('');

</script>

<style>

.sidebar {
  max-width: 448px;
  min-width: 344px;
  height: 100%;
  flex: 1;
  background: linear-gradient(119.19deg, #FFFFFF 0%, #F8F8F8 65.34%, #FFFFFF 100%);
}

.content {
  flex: 2;
  position: relative;
}

.styled-message-list {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 20px); /* 设置容器的高度为视口的高度 */
}

.chat-header {
  flex: 0 0 auto; /* 不伸缩，固定在容器顶部 */
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 16px 5px 5px 5px;
}

.chat-body {
  flex: 1 1 auto; /* 伸缩，占据剩余空间 */
  overflow-y: auto; /* 当内容过多时显示滚动条 */

  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
