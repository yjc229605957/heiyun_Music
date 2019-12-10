<template>
  <div class="result-wrapper">
    <div class="song" v-for="(item, index) in musicList" :key="index" @dblclick="getComment(item.id)">
      <div class="name">
        <span class="iconfont icon-play" @click="liClick(item.id)"></span>
        {{item.name}}
        <span class="iconfont icon-editmedia" v-if="item.mvid!=0" @click="getMv(item.mvid)"></span>
      </div>
      <div class="singer">{{item.artists | getName}}</div>
      <div class="album">《{{item.album.name}}》</div>
      <div class="time">{{item.duration|time}}</div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"; //导入vue
import VueRouter from "vue-router"; //导入路由
Vue.use(VueRouter); //注册路由
export default {
  data() {
    return {
      musicList: []
    };
  },
  methods: {
    //单击歌曲进入播放页面
    liClick(id) {
      this.$router.push("/player");
      this.$nextTick(() => {
        this.$parent.musicPlay(id);
      });
    },
    //单击mv图标进入mv页面
    getMv(id){
      this.$router.push('/video');
      this.$nextTick(()=>{
        this.$parent.getVideo(id)
      })
    },
    //双击进入评论页面
    getComment(id){
      this.$router.push('/comment');
      this.$nextTick(()=>{
        this.$parent.getComments(id)
      })
    }
  },
  filters: {
    time(value) {
      return (
        Math.round(value / 1000 / 60) + ":" + Math.round((value / 1000) % 60)
      );
    },
    getName(value) {
      return value
        .map(item => {
          return item.name;
        })
        .join(" | ");
    },
  }
};
</script>

<style>
</style>