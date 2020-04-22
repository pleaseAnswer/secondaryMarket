<template>
    <div class="shouye">
        <section class="banner">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item>
                    <img src="@/assets/img/yaoyao.jpg" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img src="@/assets/img/dongqu.png" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img src="@/assets/img/xiqu.png" alt="">
                </van-swipe-item>
                <van-swipe-item>
                    <img src="@/assets/img/zhongqu.png" alt="">
                </van-swipe-item>
            </van-swipe>
        </section>
        <section class="menu">
            <van-grid :gutter="10" :border='false' :column-num="4">
                <van-grid-item>
                    <i class="iconfont icon-tushu" style="padding: 5px;font-size:42px; color: rgb(112,140,190);"></i>
                    <p>图书</p>
                </van-grid-item>
                <van-grid-item>
                    <i class="iconfont icon-RectangleCopy" style="padding: 5px;font-size:42px; color: rgb(112,140,190)"></i>
                    <p>生活百货</p>
                </van-grid-item>
                <van-grid-item>
                    <i class="iconfont icon-shuishengzhiwu-" style="padding: 5px;font-size:42px; color: rgb(112,140,190)"></i>
                    <p>饰品</p>
                </van-grid-item>
                <van-grid-item>
                    <i class="iconfont icon-shiwu-" style="padding: 9px;font-size:38px; color: rgb(112,140,190)"></i>
                    <p>食物</p>
                </van-grid-item>
            </van-grid>
        </section>
        <section class="recommend">
            <section>
                <p class="recommend-text">- 图书 -</p>
                <van-row gutter="20">
                    <van-col span="6">
                        <div class="recommend-item">
                            <img src="@/assets/img/book_1.png" alt="" style="width: 100%;height: 100%">
                        </div>
                    </van-col>
                    <van-col span="6">
                        <div class="recommend-item">
                            <img src="@/assets/img/book_1.png" alt="" style="width: 100%;height: 100%">
                        </div>
                    </van-col>
                    <van-col span="6">
                        <div class="recommend-item">
                            <img src="@/assets/img/book_1.png" alt="" style="width: 100%;height: 100%">
                        </div>
                    </van-col>
                    <van-col span="6">
                        <div class="recommend-item">
                            <img src="@/assets/img/book_1.png" alt="" style="width: 100%;height: 100%">
                        </div>
                    </van-col>
                </van-row>
            </section>
            <section>
                <p class="recommend-text">- 百货 -</p>
                <van-row gutter="20">
                    <van-col span="6">
                        <div class="recommend-item">
                            <img src="@/assets/img/book_1.png" alt="" style="width: 100%;height: 100%">
                        </div>
                    </van-col>
                    <van-col span="6">
                        <div class="recommend-item">
                            <img src="@/assets/img/book_1.png" alt="" style="width: 100%;height: 100%">
                        </div>
                    </van-col>
                    <van-col span="6">
                        <div class="recommend-item">
                            <img src="@/assets/img/book_1.png" alt="" style="width: 100%;height: 100%">
                        </div>
                    </van-col>
                    <van-col span="6">
                        <div class="recommend-item">
                            <img src="@/assets/img/book_1.png" alt="" style="width: 100%;height: 100%">
                        </div>
                    </van-col>
                </van-row>
            </section>
        </section>
    </div>
</template>
<script>

export default {
    name: 'shouye',
    data() {
        return {

        }
    },
}
</script>
<style lang="scss" scoped>
@import '../assets/css/iconfont_menu/iconfont.css';
@function vw($px){
  @return ($px / 750) * 100vw;
}
.shouye {
    width: 100%;
    height: 100%;
    background: #ccc;
}
.my-swipe .van-swipe-item {
    img {
        width: 100%;
        height: 100%;
    }
}
.menu {
    margin-top: vw(20);
    background: #fff;
}
.recommend {
    background: #fff;
    section {
        margin: vw(20) 0;
        padding: 0 vw(20);
        background: #7fd4e3;
    }
}
.recommend-item {
    height: vw(220);
}
.recommend-text {
    height: vw(28);
    line-height: vw(28);
    font-size: vw(28);
    text-align: center;
    padding: vw(20);
}
</style>