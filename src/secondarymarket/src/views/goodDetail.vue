<template>
    <div class="goodsDetail">
        <van-nav-bar :title="titleName" left-text="返回" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <div class="figure">
            <div class="img">
                <img src="@/assets/img/book_1.png" alt="">
                <div class="img-shoucang" @click="gotoSava(1)">
                    <template v-if="isShixing">
                        <van-icon name="like" color='#c55' size="60"/>
                    </template>
                    <template v-else>
                        <van-icon name="like-o" color='#c55' size="60"/>
                    </template>
                </div>
            </div>
            <div class="figcaption">
                <p class="img-title">肖申克的救赎</p>
                <p class="img-text">
                    <i class="img-text-new">九成新</i>
                    <i class="img-text-price">￥20</i>
                </p>
                <p class="reasonText">
                    转卖原因：<span class="text-sell">{{sellReason}}</span>
                </p>
                <p class="nameText">
                    卖家：<span class="text-sell" @click="gotoMsg(1)">{{sellPeaple}}</span>
                </p>
            </div>
        </div>
        <van-collapse v-model="activeNames">
            <van-collapse-item title="商品详情" name="1" icon="shop-o">
                <div class="xiangQing">
                    <p class="xiangQing-text">
                        商品详情商品详情商品详情商品详情商品详情
                        商品详情商品详情商品详情商品详情商品详情
                    </p>
                    <img src="@/assets/img/book_1.png" alt="">
                    <img src="@/assets/img/book_1.png" alt="">
                    <img src="@/assets/img/book_1.png" alt="">
                </div>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>
<script>

export default {
    name: 'goodsDetail',
    data() {
        return {
            titleName: '商品名称',
            isShixing: false,
            sellReason: '毕业季',
            sellPeaple: '张**',
            activeNames: ['1'],
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        gotoSava(id) {
            console.log('收藏', id);
            this.isShixing = !this.isShixing;
        },
        gotoMsg(id) {
            console.log('卖家消息');
            this.$router.push({name:'sellers',params:{id}})
        }
    },
}
</script>
<style lang="scss" scoped>
@function vw($px){
  @return ($px / 750) * 100vw;
}
.goodsDetail {
    border: 1px solid #58bc;
    .figure {
        padding: vw(20);
        .img {
            width: 100%;
            height: vw(640);
            position: relative;
            img {
                width: 100%;
                height: 100%;
            }
            .img-shoucang {
                position: absolute;
                bottom: 0;
                right: 0;
            }
        }
        .img-title {
            height: vw(48);
            font-size: vw(36);
            line-height: vw(48);
            color: #333;
            padding: vw(20) 0;
        }
        .img-text {
            height: vw(36);
            font-size: vw(32);
            line-height: vw(36);
            padding-bottom: vw(20);
            color: #666;
            position: relative;
            .img-text-price {
                display: inline-block;
                width: vw(100);
                height: vw(36);
                color: #c55;
                position: absolute;
                top: 0;
                right: 0;
            }
        }
        .reasonText, .nameText {
            height: vw(36);
            font-size: vw(32);
            line-height: vw(36);
            padding-bottom: vw(20);
            color: #666;
            position: relative;
            .text-sell {
                color: #58bc;
            }
        }
    }
    .xiangQing {
        .xiangQing-text {
            text-indent: vw(48);
            font-size: vw(24);
            line-height: vw(48);
            margin-bottom: vw(20);
        }
        img {
            width: 100%;
            padding: vw(10) 0;
        }
    }
}
</style>