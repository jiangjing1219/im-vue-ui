import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/login/Login.vue';
import { ElMessage } from 'element-plus';

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
router.beforeEach((to, from, next) => {
  console.log('to', to);
  if (to.name === 'login') {
    next();
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
