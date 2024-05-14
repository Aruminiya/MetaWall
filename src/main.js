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

const app = createApp(App);
app.use(VueAxios, axios);
app.use(createPinia());
app.use(router);

app.mount('#app');
