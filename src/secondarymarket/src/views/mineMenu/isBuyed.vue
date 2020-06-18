<template>
    <!-- 已买： 商品列表 图片 标题 价格 卖家 评价 -->
    <div class="isBuyed">
        <van-swipe-cell v-for="item in isBuyedGoodsList" :key="item.sellPeapleId" style="padding:5px 0 5px 5px;" >
            <div class="isBuyed-card" @click="gotoDetail(item.sellPeapleId)">
                <img :src="item.img" alt="">
                <div class="isBuyed-card-desc">
                    <p class="isBuyed-desc-title">{{item.title}}</p>
                    <p class="isBuyed-desc-sellers">卖家：<span @click.self.stop="gotoMsg(item.sellPeapleId)">{{item.sellPeaple}}</span></p>
                    <!-- <p class="isBuyed-desc-pric">￥{{item.price}}</p> -->
                    <section>
                        <span class="isBuyed-desc-pingLunTitle">评论：</span>
                        <p class="isBuyed-desc-pingLun">{{item.pingLun ? item.pingLun : '待评论...'}}</p>
                    </section>
                </div>
            </div>
            <template #right>
                <van-button square text="删除" type="danger" class="delete-button" @click="deleteBuyed(item.signId)" />
                <template v-if="!item.pingLun">
                    <van-button square text="评价" type="primary" class="delete-button" @click="gotoPingLun(item.sellPeapleId, item.signId)"/>
                </template>
            </template>
        </van-swipe-cell>
    </div>
</template>
<script>
import { my } from '@/api';
export default {
    name: 'isBuyed',
    data() {
        return {
            id: sessionStorage.getItem('id'),
            isBuyedGoodsList: [],
        }
    },
    created() {
        this.getList();
    },
    methods: {
        gotoPingLun(id,signId) {
            this.$router.push({name:'pingLun', query: {id,signId}})
        },
        gotoDetail(id) {
            this.$router.push({name:'goodDetail', query: {id}})
        },
        gotoMsg(id) {
            this.$router.push({name: 'sellers', query: {id}})
        },
        async getList() {
            let { data } = await my.get("/goodsList/buyedList", { id: this.id });
            console.log(data.data);
            
            if(data.status == 200) {
                this.isBuyedGoodsList = data.data
            }
        },
        deleteBuyed(id) {
            this.$dialog.confirm({
                message: '确认删除该记录吗？',
            })
            .then(async () => {
                // on confirm
                let { data } = await my.get("/goodsList/deleteBuyed", { id: this.id, signId: id });
                if(data.status == 200) {
                    this.$toast('删除成功')
                } else {
                    this.$toast('删除失败')
                }
                this.getList();
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
