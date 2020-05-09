<template>
    <!-- 已买： 商品列表 图片 标题 价格 卖家 评价 -->
    <div class="isBuyed">
        <van-swipe-cell v-for="item in isBuyedGoodsList" :key="item.id" style="padding:5px 0 5px 5px;" >
            <div class="isBuyed-card" @click="gotoDetail(item.id)">
                <img src="@/assets/img/book_1.png" alt="">
                <div class="isBuyed-card-desc">
                    <p class="isBuyed-desc-title">{{item.title}}</p>
                    <p class="isBuyed-desc-sellers">卖家：<span @click.self.stop="gotoMsg(1)">{{item.sellers}}</span></p>
                    <p class="isBuyed-desc-pric">{{item.price}}</p>
                    <section>
                        <span class="isBuyed-desc-pingLunTitle">评论：</span>
                        <p class="isBuyed-desc-pingLun">{{item.hasPingLun ? item.pingLun : '待评论...'}}</p>
                    </section>
                </div>
            </div>
            <template #right>
                <van-button square text="删除" type="danger" class="delete-button" />
                <template v-if="!item.hasPingLun">
                    <van-button square text="评价" type="primary" class="delete-button" @click="gotoPingLun(item.id)"/>
                </template>
            </template>
        </van-swipe-cell>
    </div>
</template>
<script>

export default {
    name: 'isBuyed',
    data() {
        return {
            isBuyedGoodsList: [{
                id: 1,
                title: '肖申克的救赎',
                pingLun: '一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分',
                sellers: '张**',
                price: '￥2.00',
                hasPingLun: 0,
                imgSrc: '@/assets/img/book_1.png'
            },{
                id: 2,
                title: '肖申克的救赎',
                pingLun: '一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分',
                sellers: '张**',
                price: '￥2.00',
                hasPingLun: 1,
                imgSrc: '@/assets/img/book_1.png'
            },{
                id: 3,
                title: '肖申克的救赎',
                pingLun: '一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分一百分',
                sellers: '张**',
                price: '￥2.00',
                hasPingLun: 1,
                imgSrc: '@/assets/img/book_1.png'
            }],
        }
    },
    methods: {
        gotoPingLun(id) {
            this.$router.push({name:'pingLun', query: {id}})
        },
        gotoDetail(id) {
            this.$router.push({name:'goodDetail', query: {id}})
        },
        gotoMsg(id) {
            this.$router.push({name: 'sellers', query: {id}})
        }
    }
}
</script>
<style lang="scss" scoped>
@function vw($px) {
  @return ($px / 750) * 100vw;
}
.isBuyed {
    .isBuyed-card {
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
        .isBuyed-card-desc {
            width: vw(480);
            padding-left: vw(220);
            .isBuyed-desc-title {
                height: vw(52);
                font-size: vw(32);
                line-height: vw(52);
                color: #460404;
                font-weight: bold;
                width: vw(480);  //元素一定要有宽度
                overflow: hidden;  //超出的内容隐藏
                white-space: nowrap; //文本一行显示
                text-overflow: ellipsis; //显示省略号
                padding-bottom: vw(10);
            }
            .isBuyed-desc-sellers {
                height: vw(38);
                font-size: vw(24);
                line-height: vw(38);
                color: #333;
                span {
                    font-size: vw(28);
                    color: #142850;
                    font-weight: bold;
                }
            }
            .isBuyed-desc-pric {
                height: vw(38);
                font-size: vw(28);
                line-height: vw(38);
                color: #640303;
                font-weight: bold;
                text-align: right;
            }
            .isBuyed-desc-pingLunTitle {
                line-height: vw(64);
                font-size: vw(32);
                float: left;
            }
            .isBuyed-desc-pingLun {
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
        }
    }
    .goods-card {
        margin: 0;
        background-color: white;
    }

    .delete-button {
        height: 100%;
    }
}
</style>
