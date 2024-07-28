<template>
  <el-card style="width: 99%; margin: 3px  0" shadow="hover" :class="{'car-container-click' : targetId === currentConversation?.toId}" @click="handleClick">
    <div style="display: flex;flex-direction: column">
      <div style="display: flex">
        <Avatar :src='avatarSrc' :status='onlineStatus' size="42px" :statusIconSize="props.conversationType === 0 ? '10px' : '0'"></Avatar>
        <div style="display: flex;flex-direction: column;justify-content: space-between;width: 100%;margin-left: 12px">
          <div style="width: 100%;display: flex;justify-content: space-between">
            <div style="display: flex;justify-content: space-between;width: 100%">
              <el-text class="mx-1" type="primary" style="align-self: flex-start;max-width: 180px" size="large" truncated>
                {{ conversationTitle }}
              </el-text>
              <div v-if="lastMessage">{{getTimeDifference(lastMessage?.messageTime)}}</div>
            </div>
          </div>
          <div style="align-self: flex-start">
            <el-text class="mx-1" :type="onlineStatus === 'online' ? 'success' : 'info'" size="small" v-if="props.conversationType === 0">
              {{onlineStatus === 'online' ? '在线' : '离线'}}
            </el-text>
          </div>
        </div>
      </div>
      <div style="display: flex;justify-content: space-between; padding-top: 26px">
        <div style="display: flex;" v-if="lastMessage">
          <el-icon style="margin-right: 5px; color: #179adb" :class="{'rotate-180': !lastMessage?.isMe}">
            <Position />
          </el-icon>
          <el-text type="info" size="large" line-clamp="1">{{lastMessage.messageBody}}</el-text>
        </div>
        <div v-if="unreadCount > 0">
          <el-badge :value="props.unreadCount" class="item" offset=[5,10] ></el-badge>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import Avatar from '@/components/Avatar/Avatar.vue';
import { Position } from '@element-plus/icons-vue';
import { useConversationSetStore } from '@/store/conversationSet';
import { useConcatListStore } from '@/store/contactsList';
import { useMessageRecordStore } from '@/store/messageRecord';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { getTimeDifference } from '@/utils/TimeUtil';

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
// 使用计算属性
const avatarSrc = computed(() => {
  let name: string | undefined = '';
  if (props.conversationType === 0) {
    const friendInfo = concatListStore.getFriendShip(props.targetId);
    name = friendInfo?.nickName;
  } else {
    name = concatListStore.getGroupInfo(props.targetId)?.groupName;
  }
  return `https://robohash.org/${name}?set=set${props.conversationType === 0 ? '4' : '2'}&size=200x200`;
});

const onlineStatus = computed(() => {
  const status = concatListStore.getOnlineStatus(props.targetId);
  if (status === 1) {
    return 'online';
  }
  return 'offline';
});

const lastMessage = computed(() => messageRecordStore.getLastMessage(props.targetId, props.conversationType));
</script>

<style scoped>
.car-container-click {
  background-color: #efece8;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
