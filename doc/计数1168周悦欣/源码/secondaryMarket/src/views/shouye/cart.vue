<template>
<!-- 收藏页 -->
    <div class="cart">
        <div class="cart-header">
            <p>收藏页</p>
        </div>
        <div class="cart-main">
            <van-swipe-cell v-for="item in cartGoodsList" :key="item.id" style="padding:5px 0 5px 5px;">
                <div class="cart-card">
                    <div class="cart-zezhao" v-if="item.selled"> 已失效 </div>
                    <img :src="item.img" alt="" @click="goto(item.signId)">
                    <div class="cart-card-desc">
                        <p class="cart-desc-title">{{item.title}}</p>
                        <p class="cart-desc-text">{{item.sellReason}}</p>
                        <p class="cart-desc-sellers">卖家：<span @click="gotoMsg(item.sellPeapleId)">{{item.sellPeaple}}</span></p>
                        <p class="cart-desc-pric">￥{{item.price}}</p>
                    </div>
                </div>
                <template #right>
                    <!-- <van-button square text="交易" type="primary" class="delete-button" @click="gotoConection(item.sellPeapleId)" /> -->
                    <van-button square text="删除" type="danger" class="delete-button" @click="deleteData(item.signId)" />
                </template>
            </van-swipe-cell>
            <div class="kong-wrap" v-if="isNoList">
                <div class="kong">
                    <van-icon name="like-o"  color='#58bc' size="60"/>
                    <p><span class="spText" style="color: #58bc">收藏为空</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { my } from '@/api';
export default {
    name: 'cart',
    data() {
        return {
            isNoList: false,
            cartGoodsList: [
            // {
            //     id: 1,
            //     title: '手账本',
            //     sellReason: '闲置，转手',
            //     sellPeaple: '王**',
            //     price: '￥4.00',
            //     img: 'http://img3m4.ddimg.cn/34/6/1442634964-1_b_1.jpg'
            // },{
            //     id: 2,
            //     title: '马克思主义基本原理概论',
            //     sellReason: '毕业季',
            //     sellPeaple: '张**',
            //     price: '￥10.00',
            //     img: 'http://img1.imgtn.bdimg.com/it/u=1939818077,346860422&fm=26&gp=0.jpg'
            // }
            ],
        }
    },
    created() {
        sessionStorage.setItem('homeAct', 3)
        this.$store.state.active = 3
        console.log('cart',this.$store.state.active);
        this.getList()
    },
    methods: {
         onClickLeft() {
            this.$router.go(-1);
        },
        async getList() {
            let res = await my.get("/user/collectList", { signId: sessionStorage.getItem('id') });
            if(res.data.status == 200) {
                this.cartGoodsList = res.data.data;
                if(this.cartGoodsList.length == 0) {
                    this.isNoList = true
                }
            }
        },
        goto(id) {
            this.$router.push({ name: 'goodDetail', query: {id} })
        },
        gotoMsg(id) {
            console.log('卖家消息');
            this.$router.push({name:'sellers',query:{id}})
        },
        gotoConection(id) {
            console.log('聊天');
            this.$router.push({name: 'conection', query:{id}}) 
        },
        deleteData(signId) {
            console.log(signId);
            this.$dialog.confirm({
                message: '确认取消该商品的收藏？',
            })
            .then(async () => {
                // on confirm
                let res2 = await my.get("/user/collect", { signId, id: sessionStorage.getItem('id') });
                console.log(111,res2);
                window.EventBus.$emit('getNum')
                this.getList();
            })
            .catch(() => {
                // on cancel
            });
            
        }
    },
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
        position: relative;
        .cart-zezhao {
            width: 100%;
            height: 100%;
            opacity: 0.5;
            font-size: vw(60);
            line-height: vw(200);
            text-align: center;
            color: #fff;
            background: #000;
            position: absolute;
            top: vw(0);
            left: vw(0);
        }
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

.kong-wrap {
    background: #fff;
    padding-top: vw(400);
    display: flex;
    .kong {
        margin: auto;
    }
}
</style>