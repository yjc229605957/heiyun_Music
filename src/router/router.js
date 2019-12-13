//导入vue
import Vue from 'vue';
//导包
import VueRouter from 'vue-router';
//注册一下
Vue.use(VueRouter)

//组件导入
import login from '../views/login/login.vue';
//路由规则
const routes = [{
  path: '/login',
  component: login
}, ]
//创建router实例
const router = new VueRouter({
  routes
});
export default router//抛出router