<template>
 <div class="styled-chart-app">
    <div class="nav">
      <div style="margin: 20px 0 30px 0">
        <Avatar :src=profileImage status='online' size="60px" statusIconSize="10px"></Avatar>
      </div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        collapse="false"
      >
        <el-menu-item index="2">
          <el-icon><icon-menu /></el-icon>
          <template #title>Navigator Two</template>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <el-icon><document /></el-icon>
          <template #title>Navigator Three</template>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <template #title>Navigator Four</template>
        </el-menu-item>
      </el-menu>
      <div style="justify-self: end">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          collapse="false"
        >
          <el-menu-item index="2">
            <el-icon><icon-menu /></el-icon>
            <template #title>Navigator Two</template>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <el-icon><Document /></el-icon>
            <template #title>Navigator Three</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><setting /></el-icon>
            <template #title>Navigator Four</template>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
   <div class="sidebar">
     <message-list/>
   </div>
   <div class="content">
     <conversation/>
   </div>
 </div>
</template>

<script lang="ts" setup>
import Avatar from '@/components/Avatar/Avatar.vue';
import MessageList from '@/components/MessageList/MessageList.vue';
import profileImage from '../components/Avatar/demo.jpg';
import {
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue';
import Conversation from '@/components/Conversation/Conversation.vue';

</script>

<style lang="css" scoped>
.styled-chart-app {
  display: flex;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.nav {
  /*禁止缩小*/
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 20px);
  align-items: center;
}

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

.drawer {
  max-width: 310px;
  /* 默认宽度为 0 ，点击显示设置宽度 */
  width: 310px;
}

.el-menu-vertical-demo {
  width: 80px;
  height: 100%;
}
</style>
