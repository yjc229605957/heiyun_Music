<template>
  <div class="comment-wrapper" v-if="hotComments">
    <div class="items">
      <div class="item" v-for="(item, index) in hotComments" :key="index">
        <div class="left">
          <img :src="item.user.avatarUrl" alt />
        </div>
        <div class="right">
          <div class="top">
            <span class="user">{{item.user.nickname}}:</span>
            <span
              class="content"
            >{{item.content}}</span>
          </div>
          <div class="bottom">
            <div class="time">{{time(item.time)}}</div>
            <div class="like-wrapper">
              <span>👍</span>({{item.likedCount}})
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
      hotComments:[]
    }
  },
  methods: {
    time(value){
      return new Date(value).toLocaleString().replace(/:\d{1,2}$/,' '); 
      // return new Date.toLocaleString()
    }
  },
  computed: {
    
  },
};
</script>

<style>
.content{
  margin-left: 10px;
}
</style>