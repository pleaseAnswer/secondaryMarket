<template>
    <div class="goodsDetail">
        <van-nav-bar :title="goodInfo.title" left-text="返回" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <div class="figure">
            <div class="img">
                <img :src="goodInfo.img" alt="">
                <div class="img-shoucang" @click="gotoSava(id)" v-if="isShow">
                    <template v-if="isShixing">
                        <van-icon name="like" color='#c55' size="60"/>
                    </template>
                    <template v-else>
                        <van-icon name="like-o" color='#c55' size="60"/>
                    </template>
                </div>
            </div>
            <div class="figcaption">
                <p class="img-title">{{goodInfo.title}}</p>
                <p class="img-text">
                    <i class="img-text-new">{{goodInfo.new}}</i>
                    <i class="img-text-price">￥{{goodInfo.price}}</i>
                </p>
                <p class="reasonText">
                    转卖原因：<span class="text-sell">{{goodInfo.sellReason}}</span>
                </p>
                <p class="nameText">
                    卖家：<span class="text-sell" @click="gotoMsg(goodInfo.sellPeapleId)">{{goodInfo.sellPeaple}}</span>
                </p>
                <p class="addressText">
                    卖家所在：<span class="text-sell">{{goodInfo.sellAddress}}</span>
                </p>
            </div>
        </div>
        <van-collapse v-model="activeNames">
            <van-collapse-item title="商品详情" name="1" icon="shop-o">
                <div class="xiangQing">
                    <p class="xiangQing-text">
                        {{goodInfo.goodText}}
                    </p>
                    <img src="@/assets/img/book_1.png" alt="">
                    <img src="@/assets/img/book_1.png" alt="">
                    <img src="@/assets/img/book_1.png" alt="">
                </div>
            </van-collapse-item>
        </van-collapse>
        <div class="goodDetail-conection" @click="gotoConection(goodInfo.sellPeapleId)" v-if="isShow">
            <van-icon name="comment-o" size="30" color="#369"/>
        </div>
    </div>
</template>
<script>
import { my } from '@/api';
export default {
    name: 'goodsDetail',
    data() {
        return {
            id: this.$route.query.id,
            isShow: sessionStorage.getItem('id') ? true : false,
            goodInfo: {
                title: '商品名称',
                sellReason: '毕业季',
                sellPeaple: '张**',
                sellAddress: '东区海韵',
                goodText: '商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情商品详情',
                img: '',
            },
            isShixing: false,
            activeNames: ['1'],
        }
    },
    async created() {
        this.getData()
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        async getData() {
            console.log('id', this.$route);
        
            let result = await my.get(`/goodsList/goodsDetail/${this.id}?personId=${sessionStorage.getItem('id')}`);
            this.isShixing = result.data.flage;
            this.goodInfo = result.data.data[0];
            if(this.goodInfo.selled == 1 || this.goodInfo.selled == 2) {
                this.isShow = false;
            }
            this.goodInfo.sellAddress=this.goodInfo.address;
        },
        async gotoSava(id) {
            console.log('收藏', id);
            // 点击收藏，写入当前登陆信息名下
            let res2 = await my.get("/user/collect", { signId: id, id: sessionStorage.getItem('id') });
            if(res2.data.status == 200) {
                this.isShixing = !this.isShixing;
            }

        },
        gotoMsg(id) {
            console.log('卖家消息', id);
            if(this.isShow) {
                this.$router.push({ name:'sellers',query:{ id }})
            }
        },
        gotoConection(id) {
            console.log('聊天');
            this.$router.push({name: 'conection', query:{id, signId: this.goodInfo.signId,}}) 
        },
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
        .reasonText, .nameText, .addressText {
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
    .goodDetail-conection {
        width: vw(100);
        height: vw(100);
        border-radius: 50%;
        border: 1px solid #369;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        bottom: vw(200);
        right: vw(20);
        z-index: 10000;
    }
}
</style>