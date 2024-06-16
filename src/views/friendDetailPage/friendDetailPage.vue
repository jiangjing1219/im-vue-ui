<template>
  <div class="friend-detail-container">
    <div class="friend-detail-title-bar">
      好友详情
    </div>
    <div style="flex: 1;display: flex; justify-content: center; align-items: center">
      <div style="width: 700px; height: 700px">
        <a-list item-layout="horizontal" size="middle">
          <a-list-item style="justify-content: center">
            <div style="display: flex; width: 300px">
              <Avatar :src=profileImage status='online' size="90px" statusIconSize="0px"></Avatar>
              <div style="display: flex; flex-direction: column;margin-left: 10px">
                <el-form
                  label-position="left"
                  label-width="auto"
                  style="max-width: 600px"
                  label-suffix=" :"
                >
                  <el-form-item label="昵称">
                   {{friendShip?.nickName}}
                  </el-form-item>
                  <el-form-item label="用户ID">
                    {{friendShip?.toId}}
                  </el-form-item>
                  <el-form-item label="地区">
                    【未知】
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </a-list-item>
          <a-list-item style="justify-content: center">
            <div style="display: flex; flex-direction: column;margin-left: 10px; width: 300px">
              <el-form
                label-position="left"
                label-width="auto"
                style="max-width: 600px"
                label-suffix=" :"
              >
                <el-form-item label="备注">
                  {{friendShip?.remark || '【点击修改备注】'}}
                </el-form-item>
                <el-form-item label="权限">
                  【静音/提示音】
                </el-form-item>
              </el-form>
            </div>
          </a-list-item>
          <a-list-item style="justify-content: center">
            <div style="display: flex; flex-direction: column;margin-left: 10px; width: 300px">
              <el-form
                label-position="left"
                label-width="auto"
                style="max-width: 600px"
                label-suffix=" :"
              >
                <el-form-item label="签名">
                  {{friendShip?.selfSignature}}
                </el-form-item>
                <el-form-item label="开源">
                  【通过 web 端查找添加】
                </el-form-item>
              </el-form>
            </div>
          </a-list-item>
          <a-list-item style="justify-content: center">
            <div
              style="display: flex;width:300px;justify-content: space-around;align-items: center">
              <div
                style="display: flex; flex-direction: column; justify-content: center; align-items: center"
                class="icon-whatsapp" @click="onSendMsgClick">
                <MessageOutlined style="fontSize:32px"/>
                <span style="margin-top: 5px">发消息</span>
              </div>
              <div
                style="display: flex; flex-direction: column; justify-content: center; align-items: center"
                class="icon-whatsapp">
                <WhatsAppOutlined style="fontSize:32px" class="icon-whatsapp"/>
                <span style="margin-top: 5px">语音聊天</span>
              </div>
              <div
                style="display: flex; flex-direction: column; justify-content: center; align-items: center"
                class="icon-whatsapp">
                <VideoCameraOutlined style="fontSize:32px" class="icon-whatsapp"/>
                <span style="margin-top: 5px">视频聊天</span>
              </div>
            </div>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import profileImage from '@/components/Avatar/demo.jpg';
import Avatar from '@/components/Avatar/Avatar.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  VideoCameraOutlined, WhatsAppOutlined, MessageOutlined,
} from '@ant-design/icons-vue';
import { userConcatListStore } from '@/store/contactsList';
import { useRoute } from 'vue-router';
import { computed, toRef, toRefs } from 'vue';

const route = useRoute();
const { query } = toRefs(route);
const userConcatList = userConcatListStore();
const friendShip = computed(() => userConcatList.getFriendShip(query.value.userId));
const onSendMsgClick = () => {
  console.log('onSendMsgClick', friendShip.value);
};

</script>

<style scoped>
.friend-detail-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.friend-detail-title-bar {
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

.description-text {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}

.el-form-item {
  margin-bottom: 0;
}

.icon-whatsapp:hover {
  color: #1d87bf; /* 改为你希望的蓝色 */
  cursor: pointer;
}
</style>
