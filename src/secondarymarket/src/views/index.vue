<template>
  <div class="container">
    <header class="header">
      <p>海大交易</p>
    </header>
    <main class="main">
      <router-view />
    </main>
    <footer class="footer">
      <van-tabbar
        v-model="active"
        active-color="rgb(67,120,186)"
        inactive-color="#000"
        style="padding-top: 5px;position: fixed;left: 0;bottom: 0;z-index:1200 ;border-top: 1px solid #ccc;box-shadow: 10px 10px 10px #333;"
      >
        <van-tabbar-item icon="wap-home-o" to="/index">首页</van-tabbar-item>
        <van-tabbar-item icon="qr" to="/classify">分类</van-tabbar-item>
        <van-tabbar-item icon="gold-coin-o" to="/unused">卖闲置</van-tabbar-item>
        <van-tabbar-item icon="shopping-cart-o" to="/cart" :info="cartlength">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/mine">我的</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'container',
  data() {
    return {
      active: 0,
      cartlength: 0,
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
  .header {
    width: 100%;
    height: 55px;
    background: rgb(67,120,186);
    p {
      text-align: center;
      color: #fff;
      font-size: vw(48);
      line-height: vw(110);
    }
  }
  .main {
    padding-bottom: vw(112);
  }
}
</style>
