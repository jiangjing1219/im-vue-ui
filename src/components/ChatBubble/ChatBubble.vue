<script setup lang="ts">
interface Props {
  type?: 'mine' | 'other'; // 限制 type 只能是 'mine' 或 'other'
  time?: string;
}

// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<Props>(), {
  type: 'mine',
  time: '',
});

const backgroundColor = props.type === 'mine' ? '#4F9DDE' : '#F5F8FA';
const fontColor = props.type === 'mine' ? '#FFFFFF' : '#181C2F';
const alignSelf = props.type === 'mine' ? 'flex-end' : 'flex-start';
console.log('@@', props.type === 'mine', alignSelf);
</script>

<template>
  <div class="styled-chat-bubble">
    <div class="bubble">
      <slot>消息内容</slot>
    </div>
    <div class="message-time">
      {{ time }}
    </div>
  </div>
</template>

<style scoped>
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
  border-radius: 100px;
  position: relative;
  /* 样式显示优先级 */
  z-index: 10;
  align-self: v-bind(alignSelf);
  background-color: v-bind(backgroundColor);
}

.message-time {
  margin: 6px 24px 6px 24px;
  word-spacing: 1rem;
  font-size: 0.8rem;
  color: rgba(33, 33, 33, 0.58);
  opacity: 0.6;
  align-self: v-bind(alignSelf);
}
</style>
