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
                            <van-col span="8" v-for="item in bookList" :key="item.id">
                                <article @click="goto(item.id)">
                                    <img :src="item.imgUrl" alt="">
                                    <p>{{item.text}}</p>
                                </article>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="classify-main-content" v-if="active === 1">
                        <van-row>
                            <van-col span="8" v-for="item in baihuoList" :key="item.id">
                                <article @click="goto(item.id)">
                                    <img :src="item.imgUrl" alt="">
                                    <p>{{item.text}}</p>
                                </article>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="classify-main-content" v-if="active === 2">
                        <van-row>
                            <van-col span="8" v-for="item in shipinList" :key="item.id">
                                <article @click="goto(item.id)">
                                    <img :src="item.imgUrl" alt="">
                                    <p>{{item.text}}</p>
                                </article>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="classify-main-content" v-if="active === 3">
                        <van-row>
                            <van-col span="8" v-for="item in shiwuList" :key="item.id">
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
import Base from '@/config/base';
export default {
    name: 'classify',
    data() {
        return {
            items: [
                { text: '图书', children: []},
                { text: '生活百货', children: []},
                { text: '饰品', children: []},
                { text: '食物', children: []},
                ],
            // activeId: 1,
            active: 0,
            bookList: [{
                id: 1,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '教科书',
            },{
                id: 2,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '考级资料',
            },{
                id: 3,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '名著',
            },{
                id: 4,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '笔记本',
            },{
                id: 5,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '其他',
            }],
            baihuoList: [{
                id: 1,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '衣服',
            },{
                id: 2,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '电器',
            },{
                id: 3,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '文具',
            },{
                id: 4,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '纸巾',
            },{
                id: 5,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '餐具',
            },{
                id: 6,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '洗护用品',
            },{
                id: 7,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '其他',
            }],
            shipinList: [{
                id: 1,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '收纳盒',
            },{
                id: 2,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '盆景',
            },{
                id: 3,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '首饰',
            },{
                id: 4,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '帽子',
            },{
                id: 5,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '围巾',
            },{
                id: 6,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '摆件',
            },{
                id: 7,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '其他',
            }],
            shiwuList: [{
                id: 1,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '五谷',
            },{
                id: 2,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '调味',
            },{
                id: 3,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '饮料',
            },{
                id: 4,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '零食',
            },{
                id: 5,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '奶粉',
            },{
                id: 6,
                imgUrl: 'https://img.yzcdn.cn/vant/apple-2.jpg',
                text: '其他'
            }],
        }
    },
    created() {
        this.getList();
    },
    methods: {
        goto(id) {
            this.$router.push({ name: 'goodsList', params: {id} })
        },
        getList() {
            // console.log(Base.prefixUrl);
            
            let url = Base.prefixUrl + '/classify';
            try{
                this.$axios.get(url)
                .then( res => {
                    console.log('res',res);
                })
                .catch( error => {
                    console.log('error', error);
                })
            } catch(error) {
                console.log('error', error);
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
            height: vw(100);
            padding-top: vw(10);
            padding-bottom: vw(10);
            border: 1px solid #58bc;
        }
        p {
            height: vw(34);
            font-size: vw(28);
            line-height: vw(34);
            text-align: center;
            color: #58bc;
            font-weight: bold;
        }
    }
}
</style>