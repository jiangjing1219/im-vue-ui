import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/login/Login.vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import ListenerMap from '@/listener';
import { useUserInfoStore } from '@/store/userInfo';
import { useConversationSetStore } from '@/store/conversationSet';
import { useConcatListStore } from '@/store/contactsList';
import { useFriendRequestStore } from '@/store/friendRequestList';

/**
 * 登录需要做的初始化信息同步
 */
const initial = (userInfo: any) => {
  const userInfoStore = useUserInfoStore();
  const conversationSet = useConversationSetStore();
  const contactsList = useConcatListStore();
  const friendRequestStore = useFriendRequestStore();
  // 设置当前登陆用户的信息
  userInfoStore.setUserInfo(userInfo);
  // 同步获取信息
  conversationSet.syncConversationSet();
  // 同步好友信息
  contactsList.syncFriendShipList();
  // 同步群列表
  contactsList.syncJoinedGroup();
  // 同步好友请求
  friendRequestStore.syncFriendShipRequest();
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/main',
    component: () => import('@/views/Main.vue'),
    redirect: '/main/conversations',
    children: [{
      path: 'conversations',
      name: 'conversations',
      component: () => import('@/views/conversationPage/ConversationPage.vue'),
    },
    {
      path: 'contacts',
      name: 'contacts',
      redirect: '/main/contacts/friendRequest',
      component: () => import('@/views/contactPage/ContactPage.vue'),
      children: [{
        path: 'friendRequest',
        name: 'friendRequest',
        component: () => import('@/views/friendRequestPage/FriendRequestPage.vue'),
      },
      {
        path: 'friendDetail',
        name: 'friendDetail',
        component: () => import('@/views/friendDetailPage/friendDetailPage.vue'),
      }],
    }],
  },
];

// 创建路由器
const router = createRouter({
  // vue3 要求指定路由器的 工作模式
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

/**
 * 全局前置路由守卫（初始化的时候被调用、每次路由切换时被调用）
 */
router.beforeEach(async (to, from, next) => {
  if (to.name === 'login') {
    // 判断是否已经登录
    const userInfoStr = localStorage.getItem('userInfo');
    if (userInfoStr) {
      const userInfo = JSON.parse(userInfoStr);
      if (userInfo && userInfo.userName && userInfo.password && userInfo.loginType) {
        const result = await axios.post('http://127.0.0.1:8300/v1/login', userInfo);
        if (result.data.code === 200) {
          const {
            appId,
            imUserSign,
            userId,
          } = result.data.data;
          window.imsdk.im.init('http://127.0.0.1:8000/v1', appId, userId, imUserSign, ListenerMap(), (sdk: any) => {
            console.log('初始化成功', sdk);
            const userInfoStore = useUserInfoStore();
            // 修改登录状态
            userInfoStore.onlineState = 1;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            if (sdk) {
              initial(result.data.data);
              router.replace({ path: '/main/conversations' });
            } else {
              localStorage.removeItem('userInfo');
            }
          });
        } else {
          localStorage.removeItem('userInfo');
        }
      }
    } else {
      next();
    }
  } else if (window.imsdk?.im?.state === 2) {
    // 需要登录才能查看
    next();
  } else {
    ElMessage({
      type: 'warning',
      message: '请优先登录！',
    });
    next({ name: 'login' });
  }
});

export default router;
