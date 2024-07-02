<template>
  <el-card style="width: 99%; margin: 3px  0" shadow="hover" :class="{'car-container-click' : targetId === currentConversation.toId}" @click="handleClick">
    <div style="display: flex;flex-direction: column">
      <div style="display: flex">
        <Avatar :src=profileImage :status='onlineStatus' size="42px" :statusIconSize="props.conversationType === 0 ? '10px' : '0'"></Avatar>
        <div style="display: flex;flex-direction: column;justify-content: space-between;width: 100%;margin-left: 12px">
          <div style="width: 100%;display: flex;justify-content: space-between">
            <div style="display: flex;justify-content: space-between;width: 100%">
              <el-text class="mx-1" type="primary" style="align-self: flex-start;max-width: 250px" size="large" truncated>
                {{ conversationTitle }}
              </el-text>
              <div>3小时前</div>
            </div>
          </div>
          <div style="align-self: flex-start">
            <el-text class="mx-1" type="info" size="small" v-if="props.conversationType === 0">在线</el-text>
          </div>
        </div>
      </div>
      <div style="display: flex;justify-content: space-between; padding-top: 26px">
        <div>
          <el-icon><Promotion /></el-icon>
          <el-text class="mx-1" type="info" size="small">{{conversationId}}</el-text>
        </div>
        <div v-if="unreadCount > 0">
          <el-badge :value="props.unreadCount" class="item" offset=[5,10] ></el-badge>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import profileImage from '@/components/Avatar/demo.jpg';
import Avatar from '@/components/Avatar/Avatar.vue';
import { Promotion } from '@element-plus/icons-vue';
import { useConversationSetStore } from '@/store/conversationSet';
import { useConcatListStore } from '@/store/contactsList';
import { useMessageRecordStore } from '@/store/messageRecord';
import { storeToRefs } from 'pinia';
import { computed, onUpdated } from 'vue';

export interface Props {
  conversationId?: string
  conversationType?: number,
  targetId:string,
  unreadCount: number,
}

// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<Props>(), {
  conversationId: '',
  conversationType: 0,
  targetId: '',
  unreadCount: 0,
});

const conversationSetStore = useConversationSetStore();
const { currentConversation } = storeToRefs(conversationSetStore);
const concatListStore = useConcatListStore();
const messageRecordStore = useMessageRecordStore();
/**
 * 卡片点击回调，设置当前会话信息
 */
const handleClick = () => {
  // 设置当前会话
  conversationSetStore.setCurrentConversation(props.conversationId);
  // 重置会话未读数为 0
  conversationSetStore.resetP2PConversationUnreadCount(props.conversationId);
  // 是否需要发送已读标识
  if (props.unreadCount > 0) {
    messageRecordStore.sendP2PMessageReadAck(props.targetId, props.conversationId);
  }
};

const conversationTitle = computed(() => {
  if (props.conversationType === 0) {
    const friendInfo = concatListStore.getFriendShip(props.targetId);
    return friendInfo?.remark || friendInfo?.nickName;
  }
  return concatListStore.getGroupInfo(props.targetId)?.groupName;
});

const onlineStatus = computed(() => {
  const status = concatListStore.getOnlineStatus(props.targetId);
  if (status === 1) {
    return 'online';
  }
  return 'offline';
});
</script>

<style scoped>
.car-container-click {
  background-color: #efece8;
}
</style>
