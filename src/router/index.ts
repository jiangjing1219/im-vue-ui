import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/login/Login.vue';

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

export default router;
