<template>
  <div class="player" v-if="MusicInfo.length!=0">
    <div class="left">
      <img class="disc autoRotate" src="../assets/img/disc.png" alt :class="{playing:play}" />
      <img class="cover autoRotate" :src="MusicInfo.al.picUrl" alt :class="{playing:play}" />
    </div>
    <div class="right">
      <div class="title">
        <img src="../assets/img/tag.png" alt />
        <!-- 歌曲名 -->
        <span>{{MusicInfo.name}}</span>
      </div>
      <div class="singer">
        歌手:
        <span>{{MusicInfo.ar[0].name}}</span>
      </div>
      <div class="album">
        所属专辑:
        <span>{{MusicInfo.al.name}}</span>
      </div>
      <audio :src="MusicUrl" class="audio" controls loop @play="play = true" @pause="play = false"></audio>
      <ul class="lyric-container">
        <li class="lyric" v-for="(item, index) in lyris" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      MusicUrl: "",
      MusicInfo: [],
      lyris: "",
      play: false
    };
  },
  methods: {
    getMusic() {
      let _id = this.$route.query.id;
      //获取歌曲详情
      this.$aixos({
        url: "https://autumnfish.cn/song/detail?ids=" + _id
      }).then(res => {
        this.MusicInfo = res.data.songs[0];
        window.console.log(res.data.songs[0]);
      });

      //获取歌曲 url
      this.$aixos({
        url: "https://autumnfish.cn/song/url?id=" + _id
      }).then(res => {
        this.MusicUrl = res.data.data[0].url;
        window.console.log(res.data.data[0].url);
      });

      //获取歌曲歌词
      this.$aixos({
        url: "https://autumnfish.cn/lyric?id=" + _id
      }).then(res => {
        //成功回调
        // this.$refs.son.lyris = res.data.lrc.lyric.split(/\n/g)
        this.lyris = res.data.lrc.lyric.split(/\[.+\]/g);
        window.console.log(res);
      });
    }
  },
  computed: {},
  created() {
    this.getMusic()
  }
};
</script>

<style>
/* 旋转的动画 */
@keyframes Rotate {
  from {
    transform: rotateZ(0);
  }

  to {
    transform: rotateZ(360deg);
  }
}

/* 旋转的类名 */
.autoRotate {
  animation-name: Rotate;
  animation-iteration-count: infinite;
  animation-play-state: paused;
  animation-timing-function: linear;
  animation-duration: 5s;
}

/* 是否正在播放 */
.playing {
  animation-play-state: running;
}

.play_bar {
  position: absolute;
  left: 200px;
  top: -10px;
  z-index: 10;
  transform: rotate(-25deg);
  transform-origin: 12px 12px;
  transition: 1s;
}

/* 播放杆 转回去 */
.play_bar.playing {
  transform: rotate(0);
}

.lyric {
  margin-bottom: 10px;
}
</style>