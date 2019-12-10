import Vue from 'vue' //导入vue
import App from './App.vue' //导入app.vue
import VueRouter from 'vue-router' //导入路由
import ElementUI from 'element-ui'; //导入element-ui
import 'element-ui/lib/theme-chalk/index.css'; //导入element-ui.css
import Carousel from './components/Carousel.vue'; //导入轮播图组件
import Music from './components/Music.vue'; //导入歌曲列表组件
import player from './components/player.vue';//导入歌曲播放组件
import video from './components/Video.vue';//导入歌曲mv组件
import comment from './components/comment.vue';//导入歌曲评论组件
Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

let router = new VueRouter({
  routes: [{
      path: '/',
      component: Carousel
    },
    {
      path: '/music',
      component: Music
    },
    {
      path: '/player',
      component: player
    },
    {
      path: '/video',
      component: video
    },
    {
      path: '/comment',
      component: comment
    },
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')