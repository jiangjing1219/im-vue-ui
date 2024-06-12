<template>
  <div style="display: flex">
    <div class="sidebar">
      <div class="styled-contact-list">
        <div class="contact-header">
          <el-input
            v-model="searchText"
            style="width: 87%;height: 40px;border-radius:24px;background-color:rgba(241, 237, 237, 0.3)"
            placeholder="搜索"
            class="input-with-select"
          >
            <template #prepend>
              <el-button :icon="Search"/>
            </template>
          </el-input>
          <div style="height: 36px;width: 36px; background-color: rgba(24, 28, 47, 0.2);
      border-radius:8px;display: flex;align-items: center;justify-content: center">
            <el-icon size="26" @click="addFriendHandler">
              <UserAddOutlined/>
            </el-icon>
          </div>
        </div>
        <div class="contact-body">
          <el-card style="width: 99%; margin: 3px  0" shadow="hover">
            <div style="display: flex; align-items: center">
              <div style="height: 42px;width: 42px; background-color: rgb(211 142 22 / 20%);
      border-radius:8px;display: flex;align-items: center;justify-content: center">
                <el-icon size="26">
                  <UserAddOutlined/>
                </el-icon>
              </div>
              <el-badge :value="unreadCount" :max="99" class="el-badge-style" :hidden="badgeHide">
                <div style="margin-left: 1rem; font-size: 1.2rem; padding-right: 5px">新的朋友</div>
              </el-badge>
            </div>
          </el-card>
          <contact-card
            v-for="(item, index) in friendShipList"
            :key="`${item.toId}_${index}`"
            :contact="item"
          />
        </div>
      </div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>

  <add-friend-dialog v-model:visible="addFriendDialogVisible"/>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { computed, ref } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { UserAddOutlined } from '@ant-design/icons-vue';
import ContactCard from '@/components/ContactCard/ContactCard.vue';
import { userConcatListStore } from '@/store/contactsList';
import { useFriendRequestStore } from '@/store/friendRequestList';
import { storeToRefs } from 'pinia';
import AddFriendDialog from '@/components/AddFriendDialog/AddFriendDialog.vue';

const concatListStore = userConcatListStore();
const { friendShipList } = storeToRefs(concatListStore);
const searchText = ref('');
const addFriendDialogVisible = ref(false);
const addFriendHandler = () => {
  console.log('addFriendHandler');
  addFriendDialogVisible.value = true;
};
const friendRequestStore = useFriendRequestStore();
const { unreadCount } = storeToRefs(friendRequestStore);
const badgeHide = computed(() => unreadCount.value === 0);
</script>

<style scoped>

.sidebar {
  max-width: 448px;
  min-width: 344px;
  height: 100%;
  flex: 1;
  background: linear-gradient(119.19deg, #FFFFFF 0%, #F8F8F8 65.34%, #FFFFFF 100%);
}

.styled-contact-list {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 20px); /* 设置容器的高度为视口的高度 */
}

.contact-header {
  flex: 0 0 auto; /* 不伸缩，固定在容器顶部 */
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 16px 5px 5px 5px;
}

.contact-body {
  flex: 1 1 auto; /* 伸缩，占据剩余空间 */
  overflow-y: auto; /* 当内容过多时显示滚动条 */

  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-badge-style {
  margin-top: 10px;
  margin-right: 40px;
}
</style>
