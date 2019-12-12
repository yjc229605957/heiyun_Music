// html结构
<template>
  <div id="player">
    <h2 class="title" @click="goHome">黑云音乐</h2>
    <div class="search">
      <input type="text" v-model="inputValue" @keydown.enter="search" />
      <button @click="search">
        <span class="iconfont icon-search"></span>
      </button>
    </div>
    <div class="tab-wrapper">
      <!-- 对应的内容区域 -->
      <div class="tab-content">
        <keep-alive>
          <router-view ref="son" v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view ref="son" v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
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
      //路由转跳歌曲搜索页面 并传过去搜索关键字
      this.$router.push("/music?value=" + this.inputValue);
    },
    //点击logo返回首页
    goHome() {
      this.$router.push("/");
    }
  },
};
</script>

<style>
@import url("./assets/css/index.css");
@import url("./assets/css/iconfont.css");
.title {
  cursor: pointer;
}
</style>
