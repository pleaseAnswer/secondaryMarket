<template>
  <div class="container">
    <main class="main">
      <!-- <keep-alive> -->
        <router-view :getnum="getNum" />
      <!-- </keep-alive> -->
    </main>
    <footer class="footer">
      <!-- <van-tabbar
        v-model="active"
        active-color="rgb(67,120,186)"
        inactive-color="#000"
        style="padding-top: 5px;position: fixed;left: 0;bottom: 0;z-index:1200 ;border-top: 1px solid #ccc;box-shadow: 10px 10px 10px #333;"
      > -->
        <!-- <van-tabbar-item icon="wap-home-o" to="/shouye">首页</van-tabbar-item> -->
        <!-- <van-tabbar-item icon="qr" to="/classify">分类</van-tabbar-item> -->
        <!-- <van-tabbar-item icon="gold-coin-o" to="/unused">卖闲置</van-tabbar-item> -->
        <!-- <van-tabbar-item icon="search" to="/searchGoods">搜索页</van-tabbar-item> -->
        <!-- <van-tabbar-item icon="user-o" to="/mine">我的</van-tabbar-item> -->
      <!-- </van-tabbar> -->
    </footer>
  </div>
</template>

<script>
import { my } from '@/api';
export default {
  name: 'container',
  data() {
    return {
      cartlength: 0,
      active: 0
    }
  },
  watch: {
    active() {
      return this.$store.state.cart.active;
    }
  },
  created() {
    this.getNum()
  },
  mounted(){
    window.EventBus.$on('getNum', () => this.getNum())
  },
  methods: {
    async getNum() {
      console.log(1234);
      if(sessionStorage.getItem('id')) {
          let res = await my.get("/user/collectList", { signId: sessionStorage.getItem('id') });
          if(res.data.status == 200) {
              this.cartlength = res.data.data.length;
          }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@function vw($px){
  @return ($px / 750) * 100vw;
}
.container {
  width: 100%;
  height: 100%;
  color: #666;
  .main {
    padding-bottom: vw(112);
  }
}
</style>
