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
            <van-dropdown-item v-model="sortType" :options="sortList"  title="排序方式" style="width: 76%"/>
        </van-dropdown-menu>
        <van-row>
            <van-col
            v-for="item in 13"
            :key="item"
            span="12">
            <div class="list-img-wrap" @click="goto(item)">
                <figure class="list-img">
                    <img src="@/assets/img/book_1.png" alt="" />
                    <!-- <img v-for="img in imageList" v-lazy="img" /> -->
                    <figcaption>
                        <p>
                            <i class="list-text">肖申克的救赎</i>
                            <i class="list-text-new">九成新</i>
                        </p>
                        <p class="list-text-price">￥20.00</p>
                    </figcaption>
                </figure>
            </div>
            </van-col>
        </van-row>
    </div>
</template>
<script>

export default {
    name: 'goodsList',
    data() {
        return {
            titleName: '教科书',
            keyValue: '',
            sortType: 0,
            sortList: [
                { text: '价格升序', value: 0 },
                { text: '价格降序', value: 1 },
                { text: '发布时间', value: 2 },
            ],
            isShowSearch: false,
        }
    },
    watch: {
        sortType() {
            console.log(this.sortType);
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        goto(id) {
            this.$router.push({ name: 'goodDetail', params: {id} })
        },
        showSearch() {
            this.isShowSearch = true;
            this.titleName = '';
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
        width: 100%;
        height: 70%;
        padding-bottom: 5%;
    }
    figcaption {
        height: vw(36);
        font-size: vw(24);
        line-height: vw(36);
        color: #666;
        padding: vw(10);
        .list-text {
            font-size: vw(28);
            color: #333;
        }
        .list-text-new {
            padding: 0 vw(10);
        }
        .list-text-price {
            text-align: right;
            color: #c55;
        }
    }
}
</style>