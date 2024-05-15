// 外部套件
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import axios from 'axios';
import VueAxios from 'vue-axios';

// 內部資源
import './assets/boostrapCustom.scss';
// import "../src/assets/_variables.scss"
// import "./assets/main.scss"

import App from './App.vue';
import router from './router';

// 其他 Pinia Store
import usersStore from './stores/usersStore';

const app = createApp(App);
app.use(VueAxios, axios);
app.use(createPinia());
app.use(router);

// 調用 usersStore 中的商業邏輯
const { toAuth } = usersStore();

router.beforeEach(async (to) => {
  // 如果目標路由是 login 或 signup，不進行驗證
  if (to.name === 'Login' || to.name === 'Signup') {
    return true; // 允許導航
  }
  // 調用身份驗證函數
  const authStatus = await toAuth();
  // 如果未驗證且目標路由不是 login 或 signup，重定向到 login
  if (!authStatus) {
    return { name: 'Login' };
  }
  // 已驗證，允許導航
  return true;
});

app.mount('#app');
