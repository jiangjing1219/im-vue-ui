<template>
  <div class="friend-request-container">
    <div class="friend-request-title-bar">
      新朋友
    </div>
    <div style="flex: 1;">
      <a-list item-layout="vertical" :pagination="pagination" :data-source="friendShipRequestList" class="friend-request-list">
        <template #renderItem="{ item }">
          <a-list-item key="item.title">
            <template #extra>
              <div class="friend-request-option">
                <template v-if="item.approveStatus === 0">
                  <el-button type="primary" @click="doApproveFriendRequest(item, 1)">接受</el-button>
                  <el-button type="primary" @click="doApproveFriendRequest(item, 2)">拒接</el-button>
                </template>
                <el-button type="info"  plain v-else>{{item.approveStatus === 1 ? '已接受' : '已拒绝'}}</el-button>
              </div>
            </template>
            <a-list-item-meta>
              <!--  用户名称 -->
              <template #title>
                <div style="text-align: start">
                  {{item.toId}}
                </div>
              </template>
              <!--  描述 -->
              <template #description>
                <div style="text-align: start">
                  {{item.addWording}}
                </div>
              </template>
              <!-- 头像  -->
              <template #avatar>
                <Avatar :src=profileImage status='online' size="60px" statusIconSize="0px"></Avatar>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import profileImage from '@/components/Avatar/demo.jpg';
import Avatar from '@/components/Avatar/Avatar.vue';
import { useFriendRequestStore } from '@/store/friendRequestList';
import { storeToRefs } from 'pinia';
import { inject } from 'vue';
import { ElNotification } from 'element-plus';

const ImSdk = inject<any>('ImSdk');
const friendRequestStore = useFriendRequestStore();
const { friendShipRequestList } = storeToRefs(friendRequestStore);

const pagination = {
  onChange: (page: number) => {
    console.log(page);
  },
  pageSize: 7,
};

const doApproveFriendRequest = (item: any, approveStatus: number) => {
  ImSdk.approveFriendRequest(item.id, approveStatus).then((res:any) => {
    console.log('审批结果', res);
    if (res.code === 200) {
      // 1、修改的本地记录的审批状态
      friendRequestStore.approveFriendRequest(item.id, approveStatus);
      // 2、提示审批结果
      ElNotification({
        title: 'Success',
        message: '审批成功!',
        type: 'success',
      });
    } else {
      ElNotification({
        title: 'Success',
        message: res.message,
        type: 'error',
      });
    }
  });
};

</script>

<style lang="css" scoped>
.friend-request-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.friend-request-title-bar {
  display: flex;
  padding: 20px;
  min-height: 88px;
  max-height: 110px;
  border-bottom: 1px solid #EFECE8;
  justify-content: space-between;
  align-items: center;
  min-width: 600px;
  font-weight: 500;
  font-size: 1.6rem;
}
.friend-request-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 10px);
}

.ant-list-item-extra .friend-request-option {
  height: 100%;
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
