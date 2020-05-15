<template>
<!-- 正在交易
    * 买入 图片 + 标题 + 价格 + 卖家 + 交易地点
    * 卖出 图片 + 标题 + 价格 + 买家 + 交易地点
 -->
    <div class="changeNow">
        <van-tabs v-model="active" color="#4378ba">
            <van-tab title="正在买入">
                <!-- 内容1 -->
                <van-swipe-cell v-for="item in changeBuyGoodsList" :key="item.id" style="padding:5px 0 5px 5px;" >
                    <div class="changeNow-card" @click="gotoDetail(item.id)">
                        <img :src="item.imgSrc" alt="">
                        <div class="changeNow-card-desc">
                            <p class="changeNow-desc-title">{{item.title}}</p>
                            <p class="changeNow-desc-sellers">卖家：<span @click.self.stop="gotoMsg(1)">{{item.sellers}}</span></p>
                            <p class="changeNow-desc-addr">交易地点：<span>{{item.address}}</span></p>
                            <p class="changeNow-desc-pric">价格：<span>{{item.price}}</span></p>
                        </div>
                    </div>
                    <template #right>
                        <van-button square text="取消交易" type="danger" class="delete-button" />
                        <van-button square text="确认成交" type="primary" class="delete-button" />
                    </template>
                </van-swipe-cell>
            </van-tab>
            <van-tab title="正在转手">
                <!-- 正在转手 -->
                <van-swipe-cell v-for="item in changeSellGoodsList" :key="item.id" style="padding:5px 0 5px 5px;">
                    <div class="changeNow-card" @click="gotoDetail(item.id)">
                        <img :src="item.imgSrc" alt="">
                        <div class="changeNow-card-desc">
                            <p class="changeNow-desc-title">{{item.title}}</p>
                            <p class="changeNow-desc-sellers">买家：<span @click.self.stop="gotoMsg(1)">{{item.buyer}}</span></p>
                            <p class="changeNow-desc-addr">交易地点：<span>{{item.address}}</span></p>
                            <p class="changeNow-desc-pric">价格：<span>{{item.price}}</span></p>
                        </div>
                    </div>
                    <template #right>
                        <van-button square text="取消交易" type="danger" class="delete-button" />
                    </template>
                </van-swipe-cell>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>

export default {
    name: 'changeNow',
    data() {
        return {
            active: 0,
            changeBuyGoodsList: [{
                id: 1,
                title: 'A5本子',
                sellers: '张**',
                buyer: '黄**',
                price: '￥2.00',
                address: '海韵',
                imgSrc: require('@/assets/img/A5benzi.jpg')
            }],
            changeSellGoodsList: [{
                id: 1,
                title: '三个火枪手',
                sellers: '张**',
                buyer: '黄**',
                price: '￥10.00',
                address: '海韵',
                imgSrc: require('@/assets/img/huayuan.jpg')
            }],
        }
    },
    methods: {
        gotoMsg(id) {
            this.$router.push({name: 'sellers', query: {id}})
        },
        gotoDetail(id) {
            this.$router.push({name: 'goodDetail', query: {id}})
        }
    }
}
</script>
<style lang="scss" scoped>
@function vw($px) {
  @return ($px / 750) * 100vw;
}
.changeNow-card {
    height: vw(200);
    padding: vw(20);
    background: #fff;
    img {
        width: vw(200);
        height: vw(200);
        border: 1px solid #ccc;
        float: left;
    }
    .changeNow-card-desc {
        width: vw(480);
        padding-left: vw(220);
        p {
            padding-bottom: vw(10);
        }
        .changeNow-desc-title {
            height: vw(52);
            font-size: vw(32);
            line-height: vw(52);
            color: #460404;
            font-weight: bold;
            width: vw(480);  //元素一定要有宽度
            overflow: hidden;  //超出的内容隐藏
            white-space: nowrap; //文本一行显示
            text-overflow: ellipsis; //显示省略号
        }
        .changeNow-desc-sellers,
        .changeNow-desc-addr {
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
        .changeNow-desc-pric {
            height: vw(38);
            font-size: vw(28);
            line-height: vw(38);
            color: #640303;
            font-weight: bold;
            text-align: right;
        }
    }
}
.delete-button {
    height: 100%;
}
</style>
