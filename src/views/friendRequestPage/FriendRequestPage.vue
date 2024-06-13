<template>
  <div class="friend-request-container">
    <div class="friend-request-title-bar">
      新朋友
    </div>
    <div style="flex: 1;">
      <a-list item-layout="vertical" :pagination="pagination" :data-source="listData" class="friend-request-list">
        <template #renderItem="{ item }">
          <a-list-item key="item.title">
            <template #extra>
              <div class="friend-request-option">
                <el-button>接受</el-button>
              </div>
            </template>
            <a-list-item-meta>
              <!--  用户名称 -->
              <template #title>
                <div style="text-align: start">
                  用户名称
                </div>
              </template>
              <!--  描述 -->
              <template #description>
                <div style="text-align: start">
                  {{item.description}}
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

const listData: Record<string, string>[] = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'https://www.antdv.com/',
    title: `ant design vue part ${i}`,
    avatar: 'https://joeschmoe.io/api/v1/random',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const pagination = {
  onChange: (page: number) => {
    console.log(page);
  },
  pageSize: 7,
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
