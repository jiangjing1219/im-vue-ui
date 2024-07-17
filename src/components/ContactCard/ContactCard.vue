<template>
  <el-card style="width: 99%; margin: 3px  0" shadow="hover" v-bind="$attrs">
    <div class="car-container">
      <Avatar :src='avatarSrc' status='online' size="42px" statusIconSize="8px"></Avatar>
      <div class="car-text">{{contact.remark || contact.nickName}}</div>
    </div>
  </el-card>
</template>

<script setup lang="ts">

import { ImFriendShipEntity } from '@/types';
import Avatar from '@/components/Avatar/Avatar.vue';
import { computed } from 'vue';

interface Props {
  contact: ImFriendShipEntity
}

// eslint-disable-next-line no-undef
const props = defineProps<Props>();

// 使用计算属性
const avatarSrc = computed(() => `https://robohash.org/${props.contact.nickName}?set=set4&size=200x200`);
</script>

<style scoped>
.car-container {
  display: flex;
  align-items: center;
}

.car-text {
  margin-left: 1rem;
  overflow: hidden; /* 隐藏超出的内容 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  white-space: nowrap; /* 不换行 */
  display: block; /* 确保为块级元素以应用宽度和溢出设置 */
  line-height: 1.2em; /* 设置行高，确保省略号位置正确 */
  font-size: 20px;
}
</style>
