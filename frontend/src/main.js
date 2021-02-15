import Vue from 'vue';
import App from './App.vue';
import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

export const HTTPS = axios.create({
  baseURL: 'https://baconipsum.com/api/'
})

new Vue({
  render: h => h(App),
}).$mount('#app');
