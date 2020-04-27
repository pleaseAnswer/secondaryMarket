<template>
<!-- 分类页 -->
    <div class="classify">
        <header class="header">
            <p>分类页</p>
        </header>
        <div class="classify-main">
            <van-tree-select height="100vw" :items="items" :main-active-index.sync="active">
                <template #content>
                    <div class="classify-main-content" v-if="active === 0">
                        <van-row>
                            <van-col span="8" v-for="item in childrenList.bookList" :key="item.id">
                                <article @click="goto(item.id)">
                                    <img :src="item.imgUrl" alt="">
                                    <p>{{item.text}}</p>
                                </article>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="classify-main-content" v-if="active === 1">
                        <van-row>
                            <van-col span="8" v-for="item in childrenList.baihuoList" :key="item.id">
                                <article @click="goto(item.id)">
                                    <img :src="item.imgUrl" alt="">
                                    <p>{{item.text}}</p>
                                </article>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="classify-main-content" v-if="active === 2">
                        <van-row>
                            <van-col span="8" v-for="item in childrenList.shipinList" :key="item.id">
                                <article @click="goto(item.id)">
                                    <img :src="item.imgUrl" alt="">
                                    <p>{{item.text}}</p>
                                </article>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="classify-main-content" v-if="active === 3">
                        <van-row>
                            <van-col span="8" v-for="item in childrenList.shiwuList" :key="item.id">
                                <article @click="goto(item.id)">
                                    <img :src="item.imgUrl" alt="">
                                    <p>{{item.text}}</p>
                                </article>
                            </van-col>
                        </van-row>
                    </div>
                </template>
            </van-tree-select>
        </div>
    </div>
</template>
<script>
// import Base from '@/config/base';
import { my } from '@/api';
export default {
    name: 'classify',
    data() {
        return {
            items: [],
            // activeId: 1,
            active: 0,
            childrenList: [],
        }
    },
    created() {
        this.getList();
    },
    methods: {
        goto(id) {
            this.$router.push({ name: 'goodsList', params: {id} })
        },
        async getList() {
            let { data } = await my.get("/classify");
            console.log(1234, data);
            let itemsList = [];
            let dataList = data[0].dataList;
            dataList.map( item => {
                let o = { text: item.title, children: []};
                itemsList.push(o);
            })
            this.items = itemsList;
            this.childrenList = {
                bookList: dataList[0].data,
                baihuoList: dataList[1].data,
                shipinList: dataList[2].data,
                shiwuList: dataList[3].data
            }
        }
    },
}
</script>
<style lang="scss" scoped>
@function vw($px){
  @return ($px / 750) * 100vw;
}
.header {
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
.classify-main {
    padding-top: vw(112);
    width: 100%;
    .classify-main-content {
        article {
            width: 90%;
            box-sizing: border-box;
            margin: 5% 0;
            padding: 5%;
            border: 1px solid #58bc;
        }
        img {
            width: 100%;
            height: vw(120);
            // border: 1px solid #142850;
        }
        p {
            height: vw(30);
            font-size: vw(28);
            line-height: vw(30);
            text-align: center;
            color: #142850;
            font-weight: bold;
            padding-top: vw(10);
        }
    }
}
</style>