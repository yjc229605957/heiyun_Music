<template>
  <div class="block">
    <el-carousel trigger="click" height="400px">
      <el-carousel-item v-for="(item, index) in list" :key="index">
        <img :src="item.imageUrl" alt />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
-----------------------------------------
<script>
import axios from "axios";
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {},
  created() {
    axios({
      url: "https://autumnfish.cn/banner?_t="+Math.round(Math.random()*100)
    }).then(res => {
      this.list = res.data.banners;
    });
  }
};
</script>

-----------------------------------------
<style>
.block {
  width: 1080px;
}
.el-carousel__item img {
  width: 1080px;
  height: 400px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>