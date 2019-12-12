<template>
  <div class="comment-wrapper" v-if="hotComments.length>0 ">
    <div class="player">
      <div class="left">
        <img class="disc"   src="../assets/img/disc.png" alt />
        <img class="cover"  :src="MusicInfo.al.picUrl" alt />
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
      </div>
    </div>
    <div class="musicInfo">
      <div class="items hotComments">
        <h3>热门评论</h3>
        <div class="item" v-for="(item, index) in hotComments" :key="index">
          <div class="left">
            <img :src="item.user.avatarUrl" alt />
          </div>
          <div class="right">
            <div class="top">
              <span class="user">{{item.user.nickname}}:</span>
              <span class="content">{{item.content}}</span>
            </div>
            <div class="bottom">
              <div class="time">{{time(item.time)}}</div>
              <div class="like-wrapper">
                <span>👍</span>
                ({{item.likedCount}})
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="items comments">
        <h3>最新评论</h3>
        <div class="item" v-for="(item, index) in comments" :key="index">
          <div class="left">
            <img :src="item.user.avatarUrl" alt />
          </div>
          <div class="right">
            <div class="top">
              <span class="user">{{item.user.nickname}}:</span>
              <span class="content">{{item.content}}</span>
            </div>
            <div class="bottom">
              <div class="time">{{time(item.time)}}</div>
              <div class="like-wrapper">
                <span>👍</span>
                ({{item.likedCount}})
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hotComments: [],
      comments: [],
      MusicInfo: []
    };
  },
  methods: {
    time(value) {
      return new Date(value).toLocaleString()
      // return new Date.toLocaleString()
    }
  },
  created() {
    let _id = this.$route.query.id;
    //获取歌曲详情
    this.$aixos({
      url: "https://autumnfish.cn/song/detail?ids=" + _id
    }).then(res => {
      this.MusicInfo = res.data.songs[0];
      window.console.log(res.data.songs[0]);
    });

    //获取歌曲评论
    this.$aixos({
      url: "https://autumnfish.cn/comment/music?id=" + _id
    }).then(res => {
      //成功回调
      this.hotComments = res.data.hotComments;
      this.comments = res.data.comments;
      window.console.log(res);
    });
  }
};
</script>

<style>
.content {
  margin-left: 10px;
}
</style>