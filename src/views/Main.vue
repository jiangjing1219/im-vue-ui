<template>
  <div class="styled-chart-app">
    <!--  左侧菜单面板  -->
    <div class="nav">
      <div style="margin: 20px 0 30px 0">
        <Avatar :src=profileImage status='online' size="60px" statusIconSize="10px"></Avatar>
      </div>
      <el-menu
        default-active="/main/conversations"
        class="el-menu-vertical-demo"
        collapse="false"
        :router="true"
      >
        <el-menu-item index="/main/conversations">
          <el-icon :size="20">
            <WechatFilled />
          </el-icon>
          <template #title>聊天</template>
        </el-menu-item>
        <el-menu-item index="/main/contacts">
          <el-icon :size="20">
            <TeamOutlined/>
          </el-icon>
          <template #title>通讯录</template>
        </el-menu-item>
      </el-menu>
      <div style="justify-self: end">
        <el-menu
          class="el-menu-vertical-demo"
          collapse="false"
        >
          <el-menu-item index="4">
            <el-icon>
              <SettingOutlined/>
            </el-icon>
            <template #title>设置</template>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon>
              <PoweroffOutlined/>
            </el-icon>
            <template #title>退出</template>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div style="flex: 1">
      <router-view/>
    </div>
<!--    &lt;!&ndash;  中间聊天列表  &ndash;&gt;
    <div class="sidebar">
      <router-view/>
    </div>
    &lt;!&ndash;  右侧聊天面板  &ndash;&gt;
    <div class="content">
      <router-view name="rightPane"/>
    </div>-->
  </div>
</template>

<script lang="ts" setup>
import Avatar from '@/components/Avatar/Avatar.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  WechatFilled,
  TeamOutlined,
  SettingOutlined,
  PoweroffOutlined,
} from '@ant-design/icons-vue';
import Conversation from '@/views/messagePage/messagePage.vue';
import { RouterView } from 'vue-router';
import profileImage from '../components/Avatar/demo.jpg';

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
