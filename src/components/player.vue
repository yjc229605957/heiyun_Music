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
      <audio
        :src="MusicUrl"
        class="audio"
        controls
        autoplay
        loop
        @play="play = true"
        @pause="play = false"
      ></audio>
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
      play: true
    };
  },
  computed: {}
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

.lyric{
  margin-bottom: 10px;
}
</style>