<template>
<!-- 正在售卖：商品列表 图片 标题 价格 介绍 区域 点击可跳转至编辑页 -->
    <div class="selledNow">
        <van-swipe-cell class="selledNow-good" v-for="item in goodsList" :key="item.signId">
            <article class="selledNow-goods-main">
                <img :src="item.img" alt="">
                <div class="main-text">
                    <p class="main-title">{{item.title}}</p>
                    <p class="main-address">区域：{{item.address}}</p>
                    <p class="main-address">转手原因：{{item.sellReason}}</p>
                    <!-- <p class="main-price">￥{{item.price}}</p> -->
                </div>
                <p class="msg-xiangQing">详情：{{item.xiangQing}}</p>
            </article>
            <template #right>
                <van-button square text="编辑" type="primary" class="edit-button" @click="gotoEdit(item.signId)"/>
            </template>
        </van-swipe-cell>
    </div>
</template>
<script>
import { my } from '@/api';
export default {
    name: 'selledNow',
    data() {
        return {
            id: sessionStorage.getItem('id'),
            goodsList: [],
        }
    },
    created() {
        this.getList()
    },
    methods: {
        gotoEdit(id) {
            this.$router.push({name: 'editSellMsg', query: { id }})
        },
        async getList() {
            let { data } = await my.get("/goodsList/sellList", { id: this.id });
            if(data.status == 200) {
                this.goodsList = data.data
            }
            console.log(data);
            
        }
    }
}
</script>
<style lang="scss" scoped>
@function vw($px) {
  @return ($px / 750) * 100vw;
}
.selledNow {
    .selledNow-good {
        height: vw(300);
        margin: vw(10);
        padding: vw(10);
        padding-right: 0;
        background: #fff;
        border: 1px solid #58bc;
        .selledNow-goods-main {
            height: vw(300);
            img {
                width: vw(200);
                height: vw(200);
                border: 1px solid #4378ba;
                float: left;
            }
            .main-text {
                height: vw(200);
                padding-left: vw(220);
            }
        }
        .main-title {
            height: vw(42);
            font-size: vw(36);
            line-height: vw(42);
            color: #460404;
            font-weight: bold;
            padding-top: vw(10);
            padding-bottom: vw(10);
        }
        .main-address {
            padding-bottom: vw(6);
        }
        .main-price {
            height: vw(36);
            font-size: vw(36);
            line-height: vw(36);
            color: #640303;
            font-weight: bold;
            padding-top: vw(10);
            padding-right: vw(10);
            text-align: right;
        }
        .msg-xiangQing {
            height: vw(76);
            font-size: vw(28);
            line-height: vw(36);
            margin: vw(10);
            margin-left: 0;
            color: #333;
            overflow: hidden;     //超出的内容隐藏
            display: -webkit-box;   //转换元素的类型，时期变成一个弹性的伸缩盒子
            -webkit-box-orient: vertical;    //让内容从上往下排列
            -webkit-line-clamp: 2;     //文本设置显示的行数
            text-overflow: ellipsis;    //显示省略号 
            padding-top: vw(10);
        }
    }

    .edit-button {
        height: 100%;
    }

}
</style>
