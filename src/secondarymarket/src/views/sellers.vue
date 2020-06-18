<template>
    <div class="sellers">
        <div class="sellers-header">
            <van-nav-bar :title="sellerInfo.sellPeaple" left-text="返回" left-arrow @click-left="onClickLeft">
            </van-nav-bar>
        </div>
        <div class="sellers-msg">
            <van-cell-group>
                <van-field v-model="sellerInfo.xueHao" label="学号" placeholder="学号" />
                <van-field v-model="sellerInfo.address" label="区域" placeholder="区域" />
                <van-field v-model="sellerInfo.suShe" label="宿舍" placeholder="宿舍" />
                <van-field v-model="sellerInfo.sex" label="性别" placeholder="性别" />
            </van-cell-group>
        </div>
        <div class="sellers-pingLun">
            <div class="pingLun-msg" v-for="(item,index) in sellerInfo.pingLun" :key="index+1">
                <p class="pingLun-text">
                    {{item.pingLunName}}：{{item.pingLun}}
                </p>
                <van-rate v-model="item.pingLunScore" icon="like" void-icon="like-o" />
                <template v-if="item.fileList.length">
                    <van-row>
                        <van-col
                        v-for="(oitem,oindex) in item.fileList"
                        :key="oindex+1"
                        span="8">
                            <img :src="oitem" alt="" />
                        </van-col>
                    </van-row>
                </template>
            </div>
        </div>
        <div class="sellers-conection" @click="gotoConection(sellerInfo.sellPeapleId)">
            <van-icon name="comment-o" size="30" color="#369"/>
        </div>
    </div>
</template>
<script>
import { my } from '@/api';
export default {
    name: 'sellers',
    data() {
        return {
            sellerInfo: {
                sellPeaple: '张**',
                xueHao: '20161192****',
                address: '东区',
                suShe: '海韵',
                sex: '男',
                pingLun: [{
                    pingLunName: '周**',
                    pingLunText: '评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论',
                    pingLunScore: 4,
                    pingLunImg: []

                }]
            },
            activeNames: ['1'],
        }
    },
    async created() {
        let id = this.$route.query.id;
        let res = await my.get("/user/getMsg", { id: Number(id) });
        if(res.data.status == 200) {
            this.sellerInfo = res.data.data[0] 
            console.log(this.sellerInfo);
        } else {
            this.$toast({ message: '网络请求失败' });
        }
               
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        gotoConection(id) {
            console.log('聊天');
            this.$router.push({name: 'conection', query:{id}}) 
        },
    },
}
</script>
<style lang="scss" scoped>
@function vw($px){
  @return ($px / 750) * 100vw;
}
.sellers {
    width: 100%;
    // position: relative;
    .sellers-pingLun {
        .pingLun-msg {
            margin: vw(20);
            border: 1px solid #58bc;
        }
        .pingLun-text {
            text-indent: vw(48);
            font-size: vw(24);
            line-height: vw(48);
            margin-bottom: vw(20);
        }
        img {
            width: 90%;
            margin: 0 5%;
        }
    }
    .sellers-conection {
        width: vw(100);
        height: vw(100);
        border-radius: 50%;
        border: 1px solid #369;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        bottom: vw(200);
        right: vw(20);
        z-index: 10000;
    }
}
</style>