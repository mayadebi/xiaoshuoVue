import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入elmentUi
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入axios
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
//加载elmentUi
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
