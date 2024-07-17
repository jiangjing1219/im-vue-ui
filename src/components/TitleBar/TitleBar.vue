<script setup lang="ts">
import Avatar from '@/components/Avatar/Avatar.vue';
import { useMessageRecordStore } from '@/store/messageRecord';
import { useConversationSetStore } from '@/store/conversationSet';
import { useConcatListStore } from '@/store/contactsList';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  WhatsAppOutlined,
  VideoCameraOutlined,
  EllipsisOutlined,
} from '@ant-design/icons-vue';
import { computed, ref } from 'vue';
import Profile from '@/components/Profile/Profile.vue';
import { storeToRefs } from 'pinia';

const messageRecordStore = useMessageRecordStore();
const conversationSetStore = useConversationSetStore();
const concatListStore = useConcatListStore();

const showUserInfoFlag = ref(false);
const { currentConversation } = storeToRefs(conversationSetStore);
function showUserInfo() {
  showUserInfoFlag.value = true;
}

// 使用计算属性
const avatarSrc = computed(() => {
  let name: string | undefined = '';
  if (currentConversation.value.conversationType === 0) {
    const friendInfo = concatListStore.getFriendShip(currentConversation.value.toId);
    name = friendInfo?.nickName;
  } else {
    name = concatListStore.getGroupInfo(currentConversation.value.toId)?.groupName;
  }
  return `https://robohash.org/${name}?set=set4&size=200x200`;
});

const nickName = computed(() => {
  let name: string | undefined = '';
  if (currentConversation.value.conversationType === 0) {
    const friendInfo = concatListStore.getFriendShip(currentConversation.value.toId);
    name = friendInfo?.remark || friendInfo?.nickName;
  } else {
    name = concatListStore.getGroupInfo(currentConversation.value.toId)?.groupName;
  }
  return name;
});

// eslint-disable-next-line max-len
const onlineStatus = computed(() => concatListStore.getOnlineStatus(currentConversation.value.toId));
</script>

<template>
  <div class="styled-title-bar">
    <div style="display: flex;height: 64px;width: 100%;flex: 1">
      <Avatar :src="avatarSrc" status='online' size="64px" statusIconSize="0px" @click="showUserInfo"></Avatar>
      <div style="display: flex;flex-direction: column;justify-content: space-between;margin-left: 10px">
        <div style="align-self: flex-start;margin-top: 5px">
          <el-text class="mx-1" size="large">{{nickName}}</el-text>
        </div>
        <div v-if="currentConversation.conversationType === 0">
          {{`${onlineStatus === 1? '在线' : '离线'} · 最后阅读 · 三小时前`}}
        </div>
      </div>
    </div>
    <div style="display: flex;width: 200px;justify-content: space-around;align-items: center">
      <WhatsAppOutlined style="fontSize:42px"/>
      <VideoCameraOutlined style="fontSize:42px"/>
      <EllipsisOutlined style="fontSize:42px"/>
    </div>
  </div>
  <el-drawer
    v-model="showUserInfoFlag"
    title="好友资料详情"
    direction="rtl"
  >
    <Profile/>
  </el-drawer>
</template>

<style scoped>
.styled-title-bar {
  display: flex;
  padding: 20px;
  max-height: 110px;
  border-bottom: 1px solid #EFECE8;
  justify-content: space-between;
}
</style>
