<template>
    <div class="goodsList">
        <van-nav-bar :title="titleName" left-text="返回" left-arrow @click-left="onClickLeft">
            <template v-if="isShowSearch" #right>
                <van-search v-model="keyValue" placeholder="请输入搜索关键词" />
            </template>
            <template v-else #right>
                <van-icon name="search" size="18" @click="showSearch"/>
            </template>
        </van-nav-bar>
        <van-dropdown-menu>
            <van-dropdown-item v-model="sortType" :options="sortList" style="width: 76%"/>
        </van-dropdown-menu>
        <van-row>
            <van-col
            v-for="(item,index) in booksList"
            :key="index+1"
            span="12">
            <div class="list-img-wrap" @click="goto(item.signId)">
                <figure class="list-img">
                    <img :src="item.img" alt="" />
                    <!-- <img v-for="img in imageList" v-lazy="img" /> -->
                    <figcaption>
                        <p>
                            <i class="list-text">{{item.title}}</i>
                            <i class="list-text-new">{{item.new}}</i>
                        </p>
                        <p>
                            <i class="list-text-where">{{item.address}}</i>
                            <i class="list-text-price">￥{{item.price}}</i>
                        </p>
                    </figcaption>
                </figure>
            </div>
            </van-col>
        </van-row>
    </div>
</template>
<script>
import { my } from '@/api';
export default {
    name: 'goodsList',
    data() {
        return {
            titleName: '教科书',
            id: '',
            keyValue: '',
            sortType: 0,
            sortList: [
                { text: '默 认', value: 0 },
                { text: '东 区', value: 3 },
                { text: '西 区', value: 4 },
                { text: '中 区', value: 5 },
            ],
            isShowSearch: false,
            booksList: [
            //     {
            //     title: '肖申克的救赎',
            //     new: '九成新',
            //     address: '东区',
            //     price: '20.00',
            //     img: '@/assets/img/book_1.png'
            // }
            ],
        }
    },
    watch: {
        sortType() {
            console.log(this.sortType);
            this.getList()
        },
        id() {
            this.getList()
        }
    },
    created() {
        this.getList()
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        goto(id) {
            this.$router.push({ name: 'goodDetail', query: {id} })
        },
        showSearch() {
            // this.isShowSearch = true;
            // this.titleName = '';
            this.$router.push({ name: 'searchGoods' })
        },
        async getList() {
            this.id = Number(this.$route.query.id);
            let { data } = await my.get(`/goodsList/${this.id}?sortType=${this.sortType}`);
            this.booksList = data;
            let { data: title } = await my.get(`/classify/${this.id}`);
            this.titleName = title 
        },
    }
}
</script>
<style lang="scss" scoped>
@function vw($px){
  @return ($px / 750) * 100vw;
}
.goodsList {
    background: #ccc;
}
.list-img-wrap {
    width: 100%;
    .list-img {
        height: vw(380);
        margin: vw(10);
        border: 1px solid #369;
        background: #fff;
    }
    img {
        width: 80%;
        height: 70%;
        padding: 5% 10%;
        // border-bottom: 1px solid #369;
        background: #eee;
    }
    figcaption {
        height: vw(36);
        font-size: vw(24);
        line-height: vw(36);
        color: #666;
        padding-left: vw(10);
        padding-right: vw(10);
        p{
            .list-text {
                display: inline-block;
                width: 70%;
                height: vw(36);
                font-size: vw(28);
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                color: #333;
                font-weight: bold;
            }
            .list-text-new {
                padding: 0 vw(10);
            }
            .list-text-where {
                float: left;
            }
            .list-text-price {
                float: right;
                color: #c55;
            }
        }
    }
}
</style>