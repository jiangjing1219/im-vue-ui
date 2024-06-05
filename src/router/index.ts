import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/login/Login.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'home',
    component: Login,
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "about" */ '../views/Main.vue'),
    redirect: 'conversation',
    children: [{
      path: 'conversation',
      name: 'conversation',
      component: () => import(/* webpackChunkName: "about" */ '../views/chat/Chat.vue'),
    },
    {
      path: 'friend',
      name: 'friend',
      component: () => import(/* webpackChunkName: "about" */ '../views/friend/Friend.vue'),
    }],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
