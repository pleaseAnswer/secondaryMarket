<template>
<!-- 分类页 -->
    <div class="classify">
        <header class="header">
            <p>分类页</p>
        </header>
        <div class="classify-main">
            <van-tree-select height="100vw" :items="items" :main-active-index.sync="active">
                <template #content v-if="items.length !== 0">
                    <div class="classify-main-content" v-if="active === 0">
                        <van-row>
                            <van-col span="8" v-for="item in items[0].children" :key="item.id">
                                <article @click="goto(item.signId)">
                                    <img :src="item.imgUrl" alt="">
                                    <p>{{item.text}}</p>
                                </article>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="classify-main-content" v-if="active === 1">
                        <van-row>
                            <van-col span="8" v-for="item in items[1].children" :key="item.id">
                                <article @click="goto(item.signId)">
                                    <img :src="item.imgUrl" alt="">
                                    <p>{{item.text}}</p>
                                </article>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="classify-main-content" v-if="active === 2">
                        <van-row>
                            <van-col span="8" v-for="item in items[2].children" :key="item.id">
                                <article @click="goto(item.signId)">
                                    <img :src="item.imgUrl" alt="">
                                    <p>{{item.text}}</p>
                                </article>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="classify-main-content" v-if="active === 3">
                        <van-row>
                            <van-col span="8" v-for="(item,index) in items[3].children" :key="index+1">
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
        }
    },
    created() {
        this.getList();
    },
    methods: {
        goto(id) {
            this.$router.push({ name: 'goodsList', query: { id } })
    //   this.$router.push({ name: "personDetail", query: { id } });
        },
        async getList() {
            let { data } = await my.get("/classify");
            this.items = data;
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