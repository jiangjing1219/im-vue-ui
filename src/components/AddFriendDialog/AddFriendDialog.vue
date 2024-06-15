<template>
  <el-dialog :model-value="visible" title="添加好友" width="700px" @close="onDialogClose"
             @open="onDialogOpen">
    <el-input
      v-model="addFriendSearchText"
      style="max-width: 700px"
      placeholder="输入查询条件"
      class="input-with-select"
      destroy-on-close
      @keyup.enter="onSearch"
    >
      <template #prepend>
        <el-select v-model.number="searchType" placeholder="Select" style="width: 115px">
          <el-option label="昵称" :value="1"/>
          <el-option label="Tel" :value="2"/>
        </el-select>
      </template>
      <template #append>
        <el-button :icon="Search" @click="onSearch"/>
      </template>
    </el-input>
    <div>
      <a-list
        class="demo-loadmore-list"
        :loading="initLoading"
        item-layout="horizontal"
        :data-source="list"
      >
        <template #loadMore>
          <div
            v-if="!initLoading && !loading && list.length < total"
            :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }"
          >
            <a-button @click="onLoadMore">加载更多</a-button>
          </div>
        </template>
        <template #renderItem="{ item }">
          <a-list-item>
            <template #actions>
              <a key="list-loadmore-more" @click="doAddFriend(item)">添加好友</a>
            </template>
            <a-skeleton avatar :title="false" :loading="!!item.loading" active>
              <a-list-item-meta>
                <template #title>
                  <div style="text-align: left">{{ item.nickName }}</div>
                </template>
                <template #avatar>
                  <a-avatar :src="item.picture"/>
                </template>
                <template #description>
                  <div style="text-align: left">{{ item.selfSignature }}</div>
                </template>
              </a-list-item-meta>
            </a-skeleton>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </el-dialog>

  <el-dialog v-model="doAddDialogVisible" title="添加好友信息" width="700px" center ref="ruleFormRef">
    <el-form :model="formData" label-width="auto" style="max-width: 700px">
      <el-form-item label="userId" prop="userId" required v-show="false">
        <el-input v-model="formData.userId"/>
      </el-form-item>
      <el-form-item label="备注" prop="remark" required>
        <el-input v-model="formData.remark" placeholder="备注"/>
      </el-form-item>
      <el-form-item label="验证" prop="addWording" required>
        <el-input v-model="formData.addWording" type="textarea" placeholder="请输入和 Ta 打招呼的验证信息"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="submit(ruleFormRef)">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import {
  nextTick, ref, inject, reactive,
} from 'vue';
import { ElNotification, FormInstance } from 'element-plus';

const addFriendSearchText = ref('');
const searchType = ref(1);

// eslint-disable-next-line no-undef
const emit = defineEmits(['update:visible']);
// eslint-disable-next-line no-undef
const props = defineProps({
  visible: Boolean,
});

const count = 1;
const initLoading = ref(false);
const loading = ref(false);
// 数据副本
const data = ref([]);
// 实际展示的数据
const list = ref([]);
const ImSdk = inject<any>('ImSdk');
const pageSize = ref(5);
const currentPage = ref(1);
const total = ref(0);
const doAddDialogVisible = ref(false);
const formData = reactive<{ remark?: string, addWording?: string, userId?: string }>({});
const ruleFormRef = ref<FormInstance>();
// eslint-disable-next-line max-len
const queryImUserPage = (currentPageParam: number, pageSizeParam: number, addFriendSearchTextParam: string, telParam: string) => {
  initLoading.value = true;
  // eslint-disable-next-line max-len
  ImSdk.queryImUserPage(currentPageParam, pageSizeParam, addFriendSearchTextParam, telParam)
    .then((res: any) => {
      const {
        records,
        current,
        total: totalRes,
      } = res.data;
      records.forEach((item: any) => {
        // eslint-disable-next-line no-param-reassign
        item.picture = 'https://randomuser.me/api/portraits/women/72.jpg';
      });
      data.value = records;
      list.value = records;
      initLoading.value = false;
      total.value = totalRes;
      currentPage.value = current;
    });
};

const resetData = () => {
  data.value = [];
  list.value = [];
  currentPage.value = 1;
  pageSize.value = 5;
};

const onSearch = () => {
  resetData();
  queryImUserPage(currentPage.value, pageSize.value, addFriendSearchText.value, '');
};

const onDialogOpen = () => {
  nextTick(() => {
    queryImUserPage(currentPage.value, pageSize.value, addFriendSearchText.value, '');
  });
};

const onLoadMore = () => {
  // 创建空对象数组，占位
  loading.value = true;
  list.value = data.value.concat(
    [...new Array(count)].map(() => ({
      loading: true,
      nickName: '',
      picture: '',
    })),
  );

  // 后台请求获取数据，
  currentPage.value += 1;
  ImSdk.queryImUserPage(currentPage.value, pageSize.value, addFriendSearchText.value, '')
    .then((res: any) => {
      if (res.code === 200) {
        const {
          records,
          total: totalRes,
        } = res.data;
        records.forEach((item: any) => {
          // eslint-disable-next-line no-param-reassign
          item.picture = 'https://randomuser.me/api/portraits/women/72.jpg';
        });
        const newData = data.value.concat(records);
        loading.value = false;
        data.value = newData;
        list.value = newData;
        total.value = totalRes;
      } else {
        ElNotification({
          type: 'warning',
          message: res.msg,
        });
      }
    });
};

const onDialogClose = () => {
  emit('update:visible', false);
  resetData();
  addFriendSearchText.value = '';
};

const doAddFriend = (item: any) => {
  formData.userId = item.userId;
  doAddDialogVisible.value = true;
};

const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  // 发起请求
  console.log('submit!', formData);
  ImSdk.addFriend(formData.userId, formData.remark, '1', formData.addWording, '').then((res:any) => {
    console.log('发送结果', res);
    const { msg, code } = res;
    if (code === 200) {
      ElNotification({
        type: 'success',
        message: msg,
      });
      onDialogClose();
    } else {
      ElNotification({
        type: 'warning',
        message: msg,
      });
    }
    doAddDialogVisible.value = false;
    // todo 重置表单 formEl.resetFields();
  });
};

const cancel = (formEl: FormInstance | undefined) => {
  doAddDialogVisible.value = false;
};
</script>

<style scoped>
.demo-loadmore-list {
  max-height: 500px;
  overflow-y: auto;
}
</style>
