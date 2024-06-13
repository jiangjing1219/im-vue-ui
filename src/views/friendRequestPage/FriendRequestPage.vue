<template>
  <div class="friend-request-container">
    <div class="friend-request-title-bar">
      新朋友
    </div>
    <div style="flex: 1;">
      <a-list item-layout="vertical" :pagination="pagination" :data-source="listData" class="friend-request-list">
        <template #renderItem="{ item }">
          <a-list-item key="item.title">
            <template #actions>
          <span v-for="{ icon, text } in actions" :key="icon">
            <component :is="icon" style="margin-right: 8px" />
            {{ text }}
          </span>
            </template>
            <template #extra>
              <img
                width="272"
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            </template>
            <a-list-item-meta :description="item.description">
              <template #title>
                <a :href="item.href">{{ item.title }}</a>
              </template>
              <template #avatar><a-avatar :src="item.avatar" /></template>
            </a-list-item-meta>
            {{ item.content }}
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons-vue';

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
  pageSize: 3,
};
const actions: Record<string, any>[] = [
  { icon: StarOutlined, text: '156' },
  { icon: LikeOutlined, text: '156' },
  { icon: MessageOutlined, text: '2' },
];
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

</style>
