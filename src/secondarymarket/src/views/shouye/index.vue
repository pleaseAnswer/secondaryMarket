<template>
<!-- 首页 -->
    <div class="shouye">
        <header class="header">
            <p>海大交易</p>
        </header>
        <section class="banner">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                <van-swipe-item v-for="item in lunboList" :key="item.id">
                    <img :src="item.imgUrl" alt="">
                </van-swipe-item>
            </van-swipe>
            <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
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
            </van-swipe> -->
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
            <section v-for="item in commitList" :key="item.id">
                <p class="recommend-text">-----{{item.title}}-----</p>
                <van-row gutter="20">
                    <van-col span="6" v-for="ele in item.list" :key="ele.id">
                        <div class="recommend-item">
                            <img :src="ele.img" alt="" style="width: 100%;height: 80%">
                        </div>
                    </van-col>
                </van-row>
            </section>
        </section>
    </div>
</template>
<script>
import { my } from '@/api';
export default {
    name: 'shouye',
    data() {
        return {
            lunboList: [{
                id: 1,
                imgUrl: require('@/assets/img/yaoyao.jpg'),
            },{
                id: 2,
                imgUrl: require('@/assets/img/dongqu.png'),
            },{
                id: 3,
                imgUrl: require('@/assets/img/xiqu.png'),
            },{
                id: 4,
                imgUrl: require('@/assets/img/zhongqu.png'),
            }],
            commitList: []
        }
    },
    created() {
        this.getCommitList();
    },
    methods: {
        async getCommitList() {
            let { data } = await my.get('/commit');
            console.log(data);
            this.commitList = data[0].commitList;
            
        },
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/iconfont_menu/iconfont.css';
@function vw($px){
  @return ($px / 750) * 100vw;
}
.shouye {
    width: 100%;
    height: 100%;
    background: #ccc;
}
.header {
    width: 100%;
    height: 55px;
    background: rgb(67,120,186);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    p {
      text-align: center;
      color: #fff;
      font-size: vw(48);
      line-height: vw(110);
    }
}
.banner {
    padding-top: vw(112);
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
    background: #ccc;
    section {
        margin: vw(20) 0;
        padding: 0 vw(20);
        background: #fff;
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
    padding: vw(40);
}
</style>