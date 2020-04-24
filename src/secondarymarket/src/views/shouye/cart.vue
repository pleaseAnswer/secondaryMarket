<template>
<!-- 收藏页 -->
    <div class="cart">
        <div class="cart-header">
            <p>收藏页</p>
        </div>
        <div class="cart-main">
            <van-swipe-cell v-for="item in cartGoodsList" :key="item.id" style="padding:5px 0 5px 5px;">
                <div class="cart-card">
                    <img src="@/assets/img/book_1.png" alt="">
                    <div class="cart-card-desc">
                        <p class="cart-desc-title">{{item.title}}</p>
                        <p class="cart-desc-text">{{item.text}}</p>
                        <p class="cart-desc-sellers">卖家：<span @click="gotoMsg(1)">{{item.sellers}}</span></p>
                        <p class="cart-desc-pric">{{item.price}}</p>
                    </div>
                </div>
                <template #right>
                    <van-button square text="交易" type="primary" class="delete-button" />
                    <van-button square text="删除" type="danger" class="delete-button" />
                </template>
            </van-swipe-cell>
        </div>
    </div>
</template>
<script>

export default {
    name: 'cart',
    data() {
        return {
            cartGoodsList: [{
                id: 1,
                title: '肖申克的救赎',
                text: '九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著',
                sellers: '张**',
                price: '￥2.00',
                imgSrc: '@/assets/img/book_1.png'
            },{
                id: 2,
                title: '肖申克的救赎',
                text: '九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著',
                sellers: '张**',
                price: '￥2.00',
                imgSrc: '@/assets/img/book_1.png'
            },{
                id: 3,
                title: '肖申克的救赎',
                text: '九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著九成新名著',
                sellers: '张**',
                price: '￥2.00',
                imgSrc: '@/assets/img/book_1.png'
            }],
        }
    },
    methods: {
         onClickLeft() {
            this.$router.go(-1);
        },
        gotoMsg(id) {
            console.log('卖家消息');
            this.$router.push({name:'sellers',params:{id}})
        },
    }
}
</script>
<style lang="scss" scoped>
@function vw($px) {
  @return ($px / 750) * 100vw;
}
.cart {
    background: #ccc;
}
.cart-header {
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
.cart-main {
    padding-top: vw(112);
    .cart-card {
        width: 100%;
        height: vw(200);
        padding: vw(20);
        background: #fff;
        img {
            width: vw(200);
            height: vw(200);
            border: 1px solid #ccc;
            float: left;
        }
        .cart-card-desc {
            width: vw(480);
            padding-left: vw(220);
            .cart-desc-title {
                height: vw(52);
                font-size: vw(32);
                line-height: vw(52);
                color: rgb(70, 4, 4);
                font-weight: bold;
                width: vw(480);  //元素一定要有宽度
                overflow: hidden;  //超出的内容隐藏
                white-space: nowrap; //文本一行显示
                text-overflow: ellipsis; //显示省略号
            }
            .cart-desc-text {
                height: vw(64);
                font-size: vw(24);
                line-height: vw(32);
                margin-top: vw(10);
                margin-bottom: vw(10);
                color: #333;
                overflow: hidden;     //超出的内容隐藏
                display: -webkit-box;   //转换元素的类型，时期变成一个弹性的伸缩盒子
                -webkit-box-orient: vertical;    //让内容从上往下排列
                -webkit-line-clamp: 2;     //文本设置显示的行数
                text-overflow: ellipsis;    //显示省略号  
            }
            .cart-desc-sellers {
                height: vw(38);
                font-size: vw(24);
                line-height: vw(38);
                color: #333;
                span {
                    font-size: vw(28);
                    color: rgb(20, 40, 80);
                    font-weight: bold;
                }
            }
            .cart-desc-pric {
                height: vw(38);
                font-size: vw(28);
                line-height: vw(38);
                color: rgb(100, 3, 3);
                font-weight: bold;
                text-align: right;
            }
        }
    }
}
.goods-card {
    margin: 0;
    background-color: white;
  }

.delete-button {
    height: 100%;
  }
</style>