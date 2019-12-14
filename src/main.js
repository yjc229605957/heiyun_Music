import Vue from 'vue'
import App from './App.vue'
//导入路由
import router from './router/router';
//导入饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
// 注册一下
Vue.use(ElementUI);
axios.defaults.withCredentials=true;
Vue.prototype.$axios = axios

Vue.config.productionTip = false
//导入全局样式
import './style/base.css';

//导入less


new Vue({
  render: h => h(App),
  //将router挂载到vue实例中
  router,
}).$mount('#app')
