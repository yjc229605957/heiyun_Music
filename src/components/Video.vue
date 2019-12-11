<template>
  <div class="video" v-if="mvInfo">
    <div class="title-wrapper">
      <span class="tag">MV</span>
      <span class="title">{{mvInfo.name}}</span>
      <span class="artist">{{mvInfo.artistName}}</span>
    </div>
    <video :src="mvInfo.brs['240']" controls autoplay></video>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mvInfo: ""
    };
  },
  created() {
    //获取mv
    this.$aixos({
      url: "https://autumnfish.cn/mv/detail?mvid=" + this.$route.query.mvid
    }).then(res => {
      //成功回调
      this.mvInfo = res.data.data;
      window.console.log(res);
    });
  }
};
</script>

<style>
.video {
  margin: 0 auto;
}
.tag {
  margin-right: 10px;
}
.video video {
  width: 1080px;
}
</style>