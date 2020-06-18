<template>
    <!-- 已卖： 商品列表 图片 标题 价格 买家 评价 -->
    <div class="isSelled">
        <van-swipe-cell v-for="item in isSelledGoodsList" :key="item.signId" style="padding:5px 0 5px 5px;" >
            <div class="isSelled-card" @click="gotoDetail(item.signId)">
                <img :src="item.img" alt="">
                <div class="isSelled-card-desc">
                    <p class="isSelled-desc-title">{{item.title}}</p>
                    <!-- <p class="isSelled-desc-sellers">买家：<span @click.self.stop="gotoMsg(1)">{{item.buyer}}</span></p> -->
                    <!-- <p class="isSelled-desc-pric">￥{{item.price}}</p> -->
                    <!-- <section>
                        <span class="isSelled-desc-pingLunTitle">评论：</span>
                        <p class="isSelled-desc-pingLun">{{item.hasPingLun ? item.pingLun : '待评论...'}}</p>
                    </section> -->
                </div>
            </div>
            <template #right>
                <van-button square text="删除" type="danger" class="delete-button" @click="deleteGoods(item.signId)"/>
            </template>
        </van-swipe-cell>
    </div>
</template>
<script>
import { my } from '@/api';
export default {
    name: 'isSelled',
    data() {
        return {
            id: sessionStorage.getItem('id'),
            isSelledGoodsList: [],
        }
    },
    created() {
        this.getList()
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
        },
        async getList() {
            let { data } = await my.get("/goodsList/selledList", { id: this.id });
            if(data.status == 200) {
                this.isSelledGoodsList = data.data
            }
        },
        async deleteGoods(id) {
            this.$dialog.confirm({
                message: '确认删除该记录吗？',
            })
            .then(async () => {
                // on confirm
                let { data } = await my.get("/goodsList/deletedGoods", { id: this.id, signId: id });
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
.isSelled {
    .isSelled-card {
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
        .isSelled-card-desc {
            width: vw(480);
            padding-left: vw(220);
            .isSelled-desc-title {
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
            .isSelled-desc-sellers {
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
            .isSelled-desc-pric {
                height: vw(140);
                font-size: vw(28);
                line-height: vw(140);
                color: #640303;
                font-weight: bold;
                text-align: right;
            }
            .isSelled-desc-pingLunTitle {
                line-height: vw(64);
                font-size: vw(32);
                float: left;
            }
            .isSelled-desc-pingLun {
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
