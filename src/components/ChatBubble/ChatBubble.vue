<script setup lang="ts">
import profileImage from '@/components/Avatar/demo.jpg';
import Avatar from '@/components/Avatar/Avatar.vue';

interface Props {
  type?: 'mine' | 'other'; // 限制 type 只能是 'mine' 或 'other'
  time?: string;
  conversationType: number;
}

// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<Props>(), {
  type: 'mine',
  time: '',
  conversationType: 0,
});

const backgroundColor = props.type === 'mine' ? '#4F9DDE' : '#F5F8FA';
const fontColor = props.type === 'mine' ? '#FFFFFF' : '#181C2F';
const alignSelf = props.type === 'mine' ? 'flex-end' : 'flex-start';
const textAlign = props.type === 'mine' ? 'end' : 'start';
console.log('@@', props.type === 'mine', alignSelf);
</script>

<template>
  <div class="chat-bubble-container">
    <div v-if="props.type !== 'mine'" style="margin: 12px">
      <Avatar :src=profileImage status='online' size="40px" statusIconSize="0px"></Avatar>
    </div>
    <div class="styled-chat-bubble">
      <div class="chat-bubble-nick-name" v-if="props.conversationType === 1">昵称</div>
      <div class="bubble">
        <slot>消息内容</slot>
      </div>
      <div class="message-time">
        {{ time }}
      </div>
    </div>
    <div v-if="props.type === 'mine'" style="margin: 12px">
      <Avatar :src=profileImage status='online' size="40px" statusIconSize="0px"></Avatar>
    </div>
  </div>
</template>

<style scoped>

.chat-bubble-container {
  display: flex;
  justify-content: v-bind(alignSelf);
}

.chat-bubble-nick-name {
  text-align: v-bind(textAlign);
  font-size: 0.8rem;
  color: rgba(33, 33, 33, 0.58);
  margin-bottom: 5px;
}
.styled-chat-bubble {
  display: flex;
  flex-direction: column;
  align-self: v-bind(alignSelf);
  margin: 10px;
}

.bubble {
  /* padding 上下 15  左右 22  */
  padding: 15px 22px;
  /* 设置的边框阴影 */
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  color: v-bind(fontColor);
  /* 设置边框圆角 */
  border-radius: 10px;
  position: relative;
  /* 样式显示优先级 */
  z-index: 10;
  align-self: v-bind(alignSelf);
  background-color: v-bind(backgroundColor);
}

.message-time {
  margin: 6px 2px 6px 2px;
  word-spacing: 1rem;
  font-size: 0.8rem;
  color: rgba(33, 33, 33, 0.58);
  opacity: 0.6;
  align-self: v-bind(alignSelf);
}
</style>
