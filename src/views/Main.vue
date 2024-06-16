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
        :router="false"
        @select="handleSelect"
      >
        <el-menu-item index="/main/conversations">
          <el-icon :size="20">
            <WechatFilled/>
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
import { RouterView, useRouter } from 'vue-router';
import profileImage from '../components/Avatar/demo.jpg';

const router = useRouter();
const handleSelect = (key: string) => {
  // 使用 replace 方法进行路由切换，而不是 push
  router.replace(key);
};

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
  height: 100vh;
  align-items: center;
}

.el-menu-vertical-demo {
  width: 80px;
  height: 100%;
}
</style>
