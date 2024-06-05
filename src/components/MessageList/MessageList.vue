<template>
  <div class="styled-message-list">
    <div class="chat-header">
      <el-input
        v-model="searchText"
        style="width: 87%;height: 40px;border-radius:24px;background-color:rgba(241, 237, 237, 0.3)"
        placeholder="Please input"
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
      <el-card style="width: 99%; margin: 10px  0" shadow="hover">
        <div style="display: flex;flex-direction: column">
          <div style="display: flex">
            <Avatar :src=profileImage status='online' size="42px" statusIconSize="8px"></Avatar>
            <div style="display: flex;flex-direction: column;justify-content: space-between;width: 100%;margin-left: 12px">
              <div style="width: 100%;display: flex;justify-content: space-between">
                <div style="display: flex;justify-content: space-between;width: 100%">
                  <el-text class="mx-1" type="primary" style="align-self: flex-start" size="large">UserName</el-text>
                  <div>3小时前</div>
                </div>
              </div>
              <div style="align-self: flex-start">
                <el-text class="mx-1" type="info" size="small">在线</el-text>
              </div>
            </div>
          </div>
          <div style="display: flex;justify-content: space-between; padding-top: 26px">
            <div>
              <el-icon><Promotion /></el-icon>
              <el-text class="mx-1" type="info" size="small">即使爬到最高的山上，一次也只能脚踏实地地</el-text>
            </div>
            <div>
              <el-badge :value="12" class="item" offset=[5,10] ></el-badge>
            </div>
          </div>
        </div>
      </el-card>
      <el-card style="width: 99%; margin: 10px  0" shadow="hover">
        <div style="display: flex;flex-direction: column">
          <div style="display: flex">
            <Avatar :src=profileImage status='online' size="42px" statusIconSize="8px"></Avatar>
            <div style="display: flex;flex-direction: column;justify-content: space-between;width: 100%;margin-left: 12px">
              <div style="width: 100%;display: flex;justify-content: space-between">
                <div style="display: flex;justify-content: space-between;width: 100%">
                  <el-text class="mx-1" type="primary" style="align-self: flex-start" size="large">UserName</el-text>
                  <div>3小时前</div>
                </div>
              </div>
              <div style="align-self: flex-start">
                <el-text class="mx-1" type="info" size="small">在线</el-text>
              </div>
            </div>
          </div>
          <div style="display: flex;justify-content: space-between; padding-top: 26px">
            <div>
              <el-icon><Promotion /></el-icon>
              <el-text class="mx-1" type="info" size="small">即使爬到最高的山上，一次也只能脚踏实地地</el-text>
            </div>
            <div>
              <el-badge :value="12" class="item" offset=[5,10] ></el-badge>
            </div>
          </div>
        </div>
      </el-card>
      <el-card style="width: 99%; margin: 10px  0" shadow="hover">
        <div style="display: flex;flex-direction: column">
          <div style="display: flex">
            <Avatar :src=profileImage status='online' size="42px" statusIconSize="8px"></Avatar>
            <div style="display: flex;flex-direction: column;justify-content: space-between;width: 100%;margin-left: 12px">
              <div style="width: 100%;display: flex;justify-content: space-between">
                <div style="display: flex;justify-content: space-between;width: 100%">
                  <el-text class="mx-1" type="primary" style="align-self: flex-start" size="large">UserName</el-text>
                  <div>3小时前</div>
                </div>
              </div>
              <div style="align-self: flex-start">
                <el-text class="mx-1" type="info" size="small">在线</el-text>
              </div>
            </div>
          </div>
          <div style="display: flex;justify-content: space-between; padding-top: 26px">
            <div>
              <el-icon><Promotion /></el-icon>
              <el-text class="mx-1" type="info" size="small">即使爬到最高的山上，一次也只能脚踏实地地</el-text>
            </div>
            <div>
              <el-badge :value="12" class="item" offset=[5,10] ></el-badge>
            </div>
          </div>
        </div>
      </el-card>
      <el-card style="width: 99%; margin: 10px  0" shadow="hover">
        <div style="display: flex;flex-direction: column">
          <div style="display: flex">
            <Avatar :src=profileImage status='online' size="42px" statusIconSize="8px"></Avatar>
            <div style="display: flex;flex-direction: column;justify-content: space-between;width: 100%;margin-left: 12px">
              <div style="width: 100%;display: flex;justify-content: space-between">
                <div style="display: flex;justify-content: space-between;width: 100%">
                  <el-text class="mx-1" type="primary" style="align-self: flex-start" size="large">UserName</el-text>
                  <div>3小时前</div>
                </div>
              </div>
              <div style="align-self: flex-start">
                <el-text class="mx-1" type="info" size="small">在线</el-text>
              </div>
            </div>
          </div>
          <div style="display: flex;justify-content: space-between; padding-top: 26px">
            <div>
              <el-icon><Promotion /></el-icon>
              <el-text class="mx-1" type="info" size="small">即使爬到最高的山上，一次也只能脚踏实地地</el-text>
            </div>
            <div>
              <el-badge :value="12" class="item" offset=[5,10] ></el-badge>
            </div>
          </div>
        </div>
      </el-card>
      <el-card style="width: 99%; margin: 10px  0" shadow="hover">
        <div style="display: flex;flex-direction: column">
          <div style="display: flex">
            <Avatar :src=profileImage status='online' size="42px" statusIconSize="8px"></Avatar>
            <div style="display: flex;flex-direction: column;justify-content: space-between;width: 100%;margin-left: 12px">
              <div style="width: 100%;display: flex;justify-content: space-between">
                <div style="display: flex;justify-content: space-between;width: 100%">
                  <el-text class="mx-1" type="primary" style="align-self: flex-start" size="large">UserName</el-text>
                  <div>3小时前</div>
                </div>
              </div>
              <div style="align-self: flex-start">
                <el-text class="mx-1" type="info" size="small">在线</el-text>
              </div>
            </div>
          </div>
          <div style="display: flex;justify-content: space-between; padding-top: 26px">
            <div>
              <el-icon><Promotion /></el-icon>
              <el-text class="mx-1" type="info" size="small">即使爬到最高的山上，一次也只能脚踏实地地</el-text>
            </div>
            <div>
              <el-badge :value="12" class="item" offset=[5,10] ></el-badge>
            </div>
          </div>
        </div>
      </el-card>
      <el-card style="width: 99%; margin: 10px  0" shadow="hover">
        <div style="display: flex;flex-direction: column">
          <div style="display: flex">
            <Avatar :src=profileImage status='online' size="42px" statusIconSize="8px"></Avatar>
            <div style="display: flex;flex-direction: column;justify-content: space-between;width: 100%;margin-left: 12px">
              <div style="width: 100%;display: flex;justify-content: space-between">
                <div style="display: flex;justify-content: space-between;width: 100%">
                  <el-text class="mx-1" type="primary" style="align-self: flex-start" size="large">UserName</el-text>
                  <div>3小时前</div>
                </div>
              </div>
              <div style="align-self: flex-start">
                <el-text class="mx-1" type="info" size="small">在线</el-text>
              </div>
            </div>
          </div>
          <div style="display: flex;justify-content: space-between; padding-top: 26px">
            <div>
              <el-icon><Promotion /></el-icon>
              <el-text class="mx-1" type="info" size="small">即使爬到最高的山上，一次也只能脚踏实地地</el-text>
            </div>
            <div>
              <el-badge :value="12" class="item" offset=[5,10] ></el-badge>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Plus, Promotion, Search } from '@element-plus/icons-vue';
import profileImage from '@/components/Avatar/demo.jpg';
import Avatar from '@/components/Avatar/Avatar.vue';

const searchText = ref('');

</script>

<style>

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
}

</style>
