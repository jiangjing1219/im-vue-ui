<script setup lang="ts">
import profileImage from '@/components/Avatar/demo.jpg';
import Avatar from '@/components/Avatar/Avatar.vue';
</script>

<template>
  <div class="styled-profile">
    <Avatar
      :src="profileImage"
      class="avatar-style"
      size="130px"
      status="online"
      statusIconSize="0px"
    />

  </div>
</template>

<style scoped>
.styled-profile {
  display: grid;
  /* 垂直方向靠上对齐*/
  align-items: start;
  /* 水平方向 居中 对齐 */
  justify-content: center;
  justify-items: center;
  position: relative; /* 确保 .absolute-item 相对于这个容器定位 */
  /* 占满可视高度 100vh */
  height: 100vh;
  margin: 2vh;
  /* 溢出出现滚动条 */
  overflow-y: auto;
}

.avatar-style {
  margin: 15px 0;
  grid-area: 1 / 1 / 3 / 2;
}
</style>
