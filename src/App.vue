// html结构
<template>
  <div id="player">
    <h2 class="title">黑云音乐</h2>
    <div class="search">
      <input type="text" v-model="inputValue" @keydown.enter="search" />
      <button @click="search">
        <span class="iconfont icon-search"></span>
      </button>
    </div>
    <div class="tab-wrapper">
      <!-- 对应的内容区域 -->
      <div class="tab-content">
        <router-view ref="son"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      inputValue: ""
    };
  },
  methods: {
    //搜索框事件
    search() {
      axios({
        url: "https://autumnfish.cn/search?keywords=" + this.inputValue
      }).then(res => {
        //路由转跳
        this.$router.push("/music");
        //父子组件间传值
        this.$nextTick(() => {
          this.$refs.son.musicList = res.data.result.songs;
        });
      });
    },
    //music组件 点击歌曲事件
    musicPlay(id){
      //获取歌曲 url
      axios({
        url:'https://autumnfish.cn/song/url?id='+id
      }).then(res=>{
        this.$refs.son.MusicUrl = res.data.data[0].url
        window.console.log(res.data.data[0].url)
      });
      //获取歌曲详情
      axios({
        url:'https://autumnfish.cn/song/detail?ids='+id
      }).then(res=>{
        this.$refs.son.MusicInfo = res.data.songs[0]
        window.console.log(res.data.songs[0])
      });
      //获取歌曲歌词
      axios({
        url:'https://autumnfish.cn/lyric?id='+id
      }).then(res=>{
        //成功回调
        // this.$refs.son.lyris = res.data.lrc.lyric.split(/\n/g)
        this.$refs.son.lyris = res.data.lrc.lyric.split(/\[.+\]/g)
        window.console.log(res)
        window.console.log(this.$refs.son.lyris)
      });
    },
    //获取mv视频
    getVideo(id){
      axios({
        url:'https://autumnfish.cn/mv/detail?mvid='+id,
      }).then(res=>{
        //成功回调
        this.$refs.son.mvInfo = res.data.data
        window.console.log(res)
      });
    },
    //获取歌曲评论
    getComments(id){
      axios({
        url:'https://autumnfish.cn/comment/music?id='+id,
      }).then(res=>{
        //成功回调
        this.$refs.son.hotComments = res.data.hotComments
        window.console.log(res)
        window.console.log(this.$refs.son.hotComments)

      });
    }
  },
  components: {}
};
</script>

<style>
@import url("./assets/css/index.css");
@import url("./assets/css/iconfont.css");
</style>
