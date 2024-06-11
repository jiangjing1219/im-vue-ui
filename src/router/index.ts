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
    redirect: '/main/conversationCar',
    children: [{
      path: 'conversationCar',
      name: 'conversationCar',
      component: () => import('@/views/MessageList/MessageList.vue'),
    },
    {
      path: 'contacts',
      name: 'contacts',
      component: () => import('@/views/ContactCardList/ContactCardList.vue'),
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
