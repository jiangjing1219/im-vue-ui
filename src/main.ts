import { createApp } from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createPinia } from 'pinia';
// eslint-disable-next-line import/no-extraneous-dependencies
import piniaPluginPersist from 'pinia-plugin-persist';
// eslint-disable-next-line import/no-extraneous-dependencies
import ElementPlus from 'element-plus';
// eslint-disable-next-line import/no-extraneous-dependencies
import Antd from 'ant-design-vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'element-plus/dist/index.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'ant-design-vue/dist/reset.css';
import App from './App.vue';
import router from './router';
import store from './store';

declare global {
  interface Window {
    imsdk?: any;
  }
}

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersist);
app.use(pinia); // 确保 Pinia 被初始化
app.use(store); // 确保 Vuex 被初始化
app.use(router); // 确保路由被初始化
app.use(ElementPlus); // 确保 ElementPlus 被初始化
app.use(Antd); // 确保 Antd 被初始化

if (window.imsdk && window.imsdk.im) {
  app.provide('ImSdk', window.imsdk.im);
}
app.mount('#app');
