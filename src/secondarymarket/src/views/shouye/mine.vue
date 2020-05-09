<template>
<!-- 我的：个人中心 -->
    <div class="mine">
        <div class="mine-header">
            <p>个人中心</p>
        </div>
        <div class="mine-main">
            <div class="mine-login" v-if="isUnLogin">
                <div class="mine-login-img">
                    <van-icon name="user-circle-o" size="80" color="#4378ba"/>
                    <p class="mine-login-text">点击登录</p>
                </div>
                <van-icon name="arrow" size="20" color="#152941" @click="gotoLogin"/>
            </div>
            <div class="mine-isLogin" v-else>
                <img src="@/assets/img/book_1.png" alt="">
                <div class="mine-isLogin-msg">
                    <p class="mine-name">{{mineName}}</p>
                    <p class="mine-address">地址：{{mineAddress}}</p>
                    <p class="mine-msg">学号：{{mineNum}}</p>
                </div>
            </div>
            <div class="mine-menu">
                <van-grid :gutter="10" :border='false' :column-num="4">
                    <van-grid-item @click="goto('isBuyed', 1)" :class="{ classborder:oIndex === oSign.oisBuyed }">
                        <i class="iconfont icon-mairu" style="padding: 5px;font-size:42px; color: rgb(112,140,190);"></i>
                        <p>已买</p>
                    </van-grid-item>
                    <van-grid-item @click="goto('isSelled', 1)" :class="{ classborder:oIndex === oSign.oisSelled }">
                        <i class="iconfont icon-maichu" style="padding: 5px;font-size:42px; color: rgb(112,140,190)"></i>
                        <p>已售</p>
                    </van-grid-item>
                    <van-grid-item @click="goto('selledNow', 1)" :class="{ classborder:oIndex === oSign.oselledNow }">
                        <i class="iconfont icon-lie-b" style="padding: 5px;font-size:42px; color: rgb(112,140,190)"></i>
                        <p>正在售卖</p>
                    </van-grid-item>
                    <van-grid-item @click="goto('changeNow', 1)" :class="{ classborder:oIndex === oSign.ochangeNow }">
                        <i class="iconfont icon-jiaoyi" style="padding: 9px;font-size:38px; color: rgb(112,140,190)"></i>
                        <p>正在交易</p>
                    </van-grid-item>
                </van-grid>
            </div>
            <div class="mine-menu-chi" v-if="!isUnLogin">
                <keep-alive>
                    <router-view />
                </keep-alive>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    name: 'mine',
    data() {
        return {
            isUnLogin: false,
            mineName: '张**',
            mineAddress: '东区海韵',
            mineNum: 201611921835,
            oSign: {
                oisBuyed: 1,
                oisSelled: 2,
                oselledNow: 3,
                ochangeNow: 4
            },
            oIndex: 1,
        }
    },
    created: {
        
    },
    methods: {
        gotoYimai() {
            if(!this.isUnLogin) {
                this.$router.push({name: 'isBuyed', query: {id: 1}})
            }
        },
        gotoLogin() {
            this.$router.push({name:'login'})
        },
        goto(name,id) {
            this.$router.push({name, query: {id}})
            
            
            switch(name) {
                case 'isBuyed':
                    this.oIndex = 1;
                    break;
                case 'isSelled':
                    this.oIndex = 2;
                    break;
                case 'selledNow':
                    this.oIndex = 3;
                    break;
                case 'changeNow':
                    this.oIndex = 4;
                    break;
                    
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/iconfont_menu/iconfont.css';
@function vw($px) {
  @return ($px / 750) * 100vw;
}
.mine {
    background: #ccc;
}
.mine-header {
    width: 100%;
    height: 55px;
    background: #4378ba;
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
.mine-main {
    padding-top: vw(112);
    .mine-login {
        height: vw(200);
        padding-left: vw(20);
        padding-right: vw(40);
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #4378ba;
    }
    .mine-login-img {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .mine-login-text {
            font-size: vw(42);
            line-height: vw(112);
            padding-left: vw(20);
            color: #152941;
        }
    }
    .mine-isLogin {
        height: vw(200);
        padding: vw(40) vw(40) 0 vw(20);
        background: #fff;
        border: 1px solid #4378ba;
        img {
            width: vw(160);
            height: vw(160);
            float: left;
            border: 1px solid #369;
        }
        .mine-isLogin-msg {
            padding-left: vw(180);
        }
        .mine-name {
            height: vw(72);
            font-size: vw(42);
            line-height: vw(72);
            color: rgb(20, 40, 80);
            font-weight: bold;
        }
        .mine-address {
            height: vw(38);
            font-size: vw(28);
            line-height: vw(38);
            text-align: right;
            font-weight: bold;
            color: rgb(34, 2, 2);
        }
        .mine-msg {
            height: vw(38);
            font-size: vw(28);
            line-height: vw(38);
            text-align: right;
            font-weight: bold;
            color: rgb(34, 2, 2);
            padding-top: vw(20);
        }
    }
    .mine-menu {
        margin-top: vw(20);
        background: #fff;
        border: 1px solid #4378ba;
    }
    .classborder {
        border-bottom: vw(10) solid #4378ba;
    }
}
</style>