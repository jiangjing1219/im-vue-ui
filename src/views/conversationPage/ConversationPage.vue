<template>
  <div style="display: flex">
    <div class="sidebar">
      <div class="styled-message-list">
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
            <el-icon size="26" @click="createGroupClick">
              <Plus/>
            </el-icon>
          </div>
        </div>
        <div class="chat-body">
          <conversation-car v-for="conversation in conversationSet"
                            :key="conversation.conversationId"
                            :conversation-id="conversation.conversationId"
                            :conversation-type="conversation.conversationType"
                            :target-id="conversation.toId"/>
        </div>
      </div>
    </div>
    <div class="message-content">
      <chat-message/>
    </div>
  </div>
  <el-dialog v-model="createGroupVisible" title="创建群组" width="700px" center>
    <el-transfer
      v-model="groupItems"
      filterable
      :filter-method="filterMethod"
      filter-placeholder="搜索"
      :data="friendShipData"
      :titles="['好友', '选择联系人']"
      :props="{key: 'toId'}"
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="createGroupVisible = false">取消</el-button>
        <el-button type="primary" @click="doCreateGroup">
          创建
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">

import { computed, ref, inject } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Plus, Search } from '@element-plus/icons-vue';
import ConversationCar from '@/components/ConversationCar/ConversationCar.vue';
import { useConversationSetStore } from '@/store/conversationSet';
import { useConcatListStore } from '@/store/contactsList';
import { storeToRefs } from 'pinia';
import ChatMessage from '@/components/ChatMessage/ChatMessage.vue';
import { GroupMember } from '@/types';
import { ElNotification } from 'element-plus';

const ImSdk = inject<any>('ImSdk');
const conversationSetStore = useConversationSetStore();
const { conversationSet } = storeToRefs(conversationSetStore);
const concatListStore = useConcatListStore();
const { friendShipList } = storeToRefs(concatListStore);
const searchText = ref('');
const createGroupVisible = ref(false);
const createGroupClick = () => {
  // 弹出 dialog 显示穿梭框
  createGroupVisible.value = true;
};

const friendShipData = computed(() => friendShipList.value.map((item) => ({
  ...item, // 先创建item的一个浅拷贝
  label: item.remark || item.nickName, // 然后修改label属性
})));
const groupItems = ref<string[]>([]);

const filterMethod = (query: any, item: any) => item.label.toLowerCase()
  .includes(query.toLowerCase());

const doCreateGroup = () => {
  if (groupItems.value.length === 0) {
    return;
  }
  const memberList: GroupMember[] = [];
  groupItems.value.forEach((item) => {
    memberList.push(new GroupMember(item));
  });
  ImSdk.createGroup(1, 'testGroupName', 0, 0, '群简介', '群公告', '', 100, memberList)
    .then((res: any) => {
      ElNotification({
        title: 'Success',
        message: '创建群组成功!',
        type: 'success',
      });
      createGroupVisible.value = false;
    });
  // 创建群组
  console.log('创建群组', groupItems.value);
};
</script>

<style>

.sidebar {
  max-width: 448px;
  min-width: 344px;
  height: 100%;
  flex: 1;
  background: linear-gradient(119.19deg, #FFFFFF 0%, #F8F8F8 65.34%, #FFFFFF 100%);
}

.message-content {
  flex: 2;
  position: relative;
  height: 100vh;
}

.styled-message-list {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 设置容器的高度为视口的高度 */
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

.el-dialog--center .el-dialog__body {
  text-align: center;
}

</style>
