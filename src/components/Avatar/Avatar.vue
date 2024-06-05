<template>
  <div v-bind="$attrs" :class="styledAvatar">
    <!-- 在线状态 -->
    <div v-if="status" :class="[statusIcon, status]" :style="statusIconStyle"></div>
    <!-- 图片的圆形蒙层 -->
    <div :style="avatarClipStyle">
      <img :src="src" alt="" class="avatar-image"/>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: '48px',
    },
    status: {
      type: String,
      validator: (value) => ['online', 'offline'].includes(value),
    },
    statusIconSize: {
      type: String,
      default: '8px',
    },
  },
  setup(props) {
    const styledAvatar = 'styled-avatar';
    const avatarClipStyle = computed(() => ({
      width: props.size,
      height: props.size,
      borderRadius: '50%',
      overflow: 'hidden',
    }));

    const statusIcon = 'status-icon';

    const statusIconStyle = computed(() => {
      let baseStyle = {
        position: 'absolute',
        left: '2px',
        top: '6px',
        width: props.statusIconSize,
        height: props.statusIconSize,
        borderRadius: '50%',
      };

      if (props.status === 'online') {
        baseStyle = {
          ...baseStyle,
          backgroundColor: '#34D859',
        };
      } else if (props.status === 'offline') {
        baseStyle = {
          ...baseStyle,
          backgroundColor: 'rgba(24, 28, 47, 0.2)',
        };
      }

      return baseStyle;
    });

    return {
      styledAvatar,
      avatarClipStyle,
      statusIcon,
      statusIconStyle,
    };
  },
};
</script>

<style scoped>
.styled-avatar {
  position: relative;
}

.status-icon::before {
  content: '';
  display: block;
  position: absolute;
  width: var(--status-icon-size);
  height: var(--status-icon-size);
  border-radius: 50%;
  background-color: white;
  transform: scale(2);
}

.avatar-clip {
  border-radius: 50%;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
