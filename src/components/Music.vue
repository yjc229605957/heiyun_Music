<template>
  <div class="result-wrapper" v-if="musicList.length>0">
    <div
      class="song"
      v-for="(item, index) in musicList"
      :key="index"
      @dblclick="getComment(item.id)"
    >
      <div class="name">
        <span class="iconfont icon-play" @click="liClick(item.id)"></span>
        {{item.name}}
        <span
          class="iconfont icon-editmedia"
          v-if="item.mvid!=0"
          @click="getMv(item.mvid)"
        ></span>
      </div>
      <div class="singer">{{item.artists | getName}}</div>
      <div class="album">《{{item.album.name}}》</div>
      <div class="time">{{item.duration | time}}</div>
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
  //事件方法
  methods: {
    //单击歌曲进入播放页面
    liClick(id) {
      this.$router.push("/player?id=" + id);
    },
    //单击mv图标进入mv页面
    getMv(mvid) {
      this.$router.push("/video?mvid=" + mvid);
    },
    //双击进入评论页面
    getComment(id) {
      this.$router.push("/comment?id=" + id);
    }
  },
  //监听器
  watch: {
    //监听搜索框关键字改变后出现发送请求获取数据
    "$route.query.value"() {
      //这里可以执行数据变动后的处理
      let value = this.$route.query.value;
      this.$aixos({
        url: `https://autumnfish.cn/search?keywords=${value}`
      }).then(res => {
        this.musicList = res.data.result.songs;
      });
    }
  },

  //过滤器
  filters: {
    //过滤时间
    time(value) {
      return (
        Math.round(value / 1000 / 60) + ":" + Math.round((value / 1000) % 60)
      );
    },
    //过滤歌手
    getName(value) {
      return value
        .map(item => {
          return item.name;
        })
        .join(" | ");
    }
  },

  //钩子
  created() {
    //获取歌曲列表
    this.$aixos({
      url: "https://autumnfish.cn/search?keywords=" + this.$route.query.value
    }).then(res => {
      this.musicList = res.data.result.songs;
    });
  }
};
</script>

<style>
</style>