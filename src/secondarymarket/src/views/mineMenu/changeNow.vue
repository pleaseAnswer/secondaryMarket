<template>
<!-- 正在交易
    * 买入 图片 + 标题 + 价格 + 卖家 + 交易地点
    * 卖出 图片 + 标题 + 价格 + 买家 + 交易地点
 -->
    <div class="changeNow">
        <van-tabs v-model="active" color="#4378ba">
            <van-tab title="正在买入">
                <!-- 内容1 -->
                <van-swipe-cell v-for="item in changeBuyGoodsList" :key="item.signId" style="padding:5px 0 5px 5px;" >
                    <div class="changeNow-card" @click="gotoDetail(item.signId)">
                        <img :src="item.img" alt="">
                        <div class="changeNow-card-desc">
                            <p class="changeNow-desc-title">{{item.title}}</p>
                            <p class="changeNow-desc-sellers">卖家：<span @click.self.stop="gotoMsg(item.sellPeapleId)">{{item.sellPeaple}}</span></p>
                            <p class="changeNow-desc-addr">交易地点：<span>{{item.address}}</span></p>
                            <!-- <p class="changeNow-desc-pric">价格：<span>{{item.price}}</span></p> -->
                        </div>
                    </div>
                    <template #right>
                        <van-button square text="取消交易" type="danger" class="delete-button" @click="cancelChange(item.signId, item.sellPeapleId)" />
                        <van-button square text="确认成交" type="primary" class="delete-button"  @click="confirmChange(item.signId, item.sellPeapleId)"/>
                    </template>
                </van-swipe-cell>
            </van-tab>
            <van-tab title="正在转手">
                <!-- 正在转手 -->
                <van-swipe-cell v-for="item in changeSellGoodsList" :key="item.signId" style="padding:5px 0 5px 5px;">
                    <div class="changeNow-card" @click="gotoDetail(item.signId)">
                        <img :src="item.img" alt="">
                        <div class="changeNow-card-desc">
                            <p class="changeNow-desc-title">{{item.title}}</p>
                            <p class="changeNow-desc-sellers">买家：<span @click.self.stop="gotoMsg(item.sellers[0])">{{item.buyPeaple}}</span></p>
                            <!-- <p class="changeNow-desc-addr">交易地点：<span>{{item.address}}</span></p> -->
                            <!-- <p class="changeNow-desc-pric">价格：<span>{{item.price}}</span></p> -->
                        </div>
                    </div>
                    <!-- <template #right>
                        <van-button square text="取消交易" type="danger" class="delete-button" />
                    </template> -->
                </van-swipe-cell>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import { my } from '@/api';
export default {
    name: 'changeNow',
    data() {
        return {
            active: 0,
            id: sessionStorage.getItem('id'),
            changeBuyGoodsList: [],
            changeSellGoodsList: [],
        }
    },
    created() {
        this.getList();
    },
    methods: {
        gotoMsg(id) {
            this.$router.push({name: 'sellers', query: {id}})
        },
        gotoDetail(id) {
            this.$router.push({name: 'goodDetail', query: {id}})
        },
        // 获取数据
        async getList() {
            let { data } = await my.get("/user/changeList", { id: this.id });
            console.log(data);
            if(data.status == 200) {
                this.changeBuyGoodsList = data.data.changeBuyGoodsList;
                this.changeSellGoodsList = data.data.changeSellGoodsList;
                console.log(this.changeBuyGoodsList, this.changeSellGoodsList);
            } else {
                this.$toast('网络出错')
            }
        },
        async cancelChange(signId, sellPeapleId) {
            this.$dialog.confirm({
                message: '确认取消交易？',
            })
            .then(async () => {
                // on confirm
                let { data } = await my.get(`/goodsList/cancelChange`,{ signId, sellPeapleId, id: this.id});
                if(data.status == 200) {
                    this.$toast('取消成功')
                    this.getList()
                } else {
                    this.$toast('取消失败')
                }
            })
            .catch(() => {
                // on cancel
            });
        },
        async confirmChange(signId, sellPeapleId) {
            this.$dialog.confirm({
                message: '确认交易？',
            })
            .then(async () => {
                // on confirm
                let { data } = await my.get(`/goodsList/confirmChange`,{ signId, sellPeapleId, id: this.id});
                if(data.status == 200) {
                    this.$toast('确认交易成功')
                    this.getList()
                } else {
                    this.$toast('确认交易失败')
                }
            })
            .catch(() => {
                // on cancel
            });
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
            line-height: vw(72);
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
            line-height: vw(58);
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
