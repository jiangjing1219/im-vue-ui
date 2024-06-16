<template>
  <el-card style="width: 99%; margin: 3px  0" shadow="hover" :class="{'car-container-click' : targetId === currentConversation.toId}" @click="handleClick">
    <div style="display: flex;flex-direction: column">
      <div style="display: flex">
        <Avatar :src=profileImage status='online' size="42px" statusIconSize="8px"></Avatar>
        <div style="display: flex;flex-direction: column;justify-content: space-between;width: 100%;margin-left: 12px">
          <div style="width: 100%;display: flex;justify-content: space-between">
            <div style="display: flex;justify-content: space-between;width: 100%">
              <el-text class="mx-1" type="primary" style="align-self: flex-start" size="large">
                {{ friendInfo?.remark || friendInfo?.nickName }}</el-text>
              <div>3小时前</div>
            </div>
          </div>
          <div style="align-self: flex-start">
            <el-text class="mx-1" type="info" size="small">在线</el-text>
          </div>
        </div>
      </div>
      <div style="display: flex;justify-content: space-between; padding-top: 26px">
        <div>
          <el-icon><Promotion /></el-icon>
          <el-text class="mx-1" type="info" size="small">{{conversationId}}</el-text>
        </div>
        <div>
          <el-badge :value="12" class="item" offset=[5,10] ></el-badge>
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
import { userConcatListStore } from '@/store/contactsList';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

export interface Props {
  conversationId?: string
  conversationType?: string,
  targetId:string
}

// eslint-disable-next-line no-undef
const props = withDefaults(defineProps<Props>(), {
  conversationId: '',
  conversationType: '0',
  targetId: '',
});

const conversationSetStore = useConversationSetStore();
const { currentConversation } = storeToRefs(conversationSetStore);
const concatListStore = userConcatListStore();

const handleClick = () => {
  console.log('click', props.conversationId);
  conversationSetStore.setCurrentConversation(props.conversationId);
};

const friendInfo = computed(() => concatListStore.getFriendShip(props.targetId));
</script>

<style scoped>
.car-container-click {
  background-color: #efece8;
}
</style>
