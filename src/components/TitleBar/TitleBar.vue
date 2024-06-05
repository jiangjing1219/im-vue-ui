<script setup lang="ts">

import profileImage from '@/components/Avatar/demo.jpg';
import Avatar from '@/components/Avatar/Avatar.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  WhatsAppOutlined,
  VideoCameraOutlined,
  EllipsisOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue';
import Profile from '@/components/Profile/Profile.vue';

const showUserInfoFlag = ref(false);

function showUserInfo() {
  showUserInfoFlag.value = true;
  console.log('showUserInfo');
}
</script>

<template>
  <div class="styled-title-bar">
    <div style="display: flex;height: 64px;width: 100%;flex: 1">
      <Avatar :src=profileImage status='online' size="64px" statusIconSize="0px" @click="showUserInfo"></Avatar>
      <div style="display: flex;flex-direction: column;justify-content: space-between;margin-left: 10px">
        <div style="align-self: flex-start;margin-top: 5px">
          <el-text class="mx-1" size="large">好友昵称</el-text>
        </div>
        <div>
          在线 · 最后阅读：三小时前
        </div>
      </div>
    </div>
    <div style="display: flex;width: 200px;justify-content: space-around;align-items: center">
      <WhatsAppOutlined style="fontSize:42px"/>
      <VideoCameraOutlined style="fontSize:42px"/>
      <EllipsisOutlined style="fontSize:42px"/>
    </div>
  </div>
  <el-drawer
    v-model="showUserInfoFlag"
    title="好友资料详情"
    direction="rtl"
  >
    <Profile/>
  </el-drawer>
</template>

<style scoped>
.styled-title-bar {
  display: flex;
  padding: 20px;
  max-height: 110px;
  border-bottom: 1px solid #EFECE8;
  justify-content: space-between;
}
</style>
