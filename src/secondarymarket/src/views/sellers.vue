<template>
    <div class="sellers">
        <div class="sellers-header">
            <van-nav-bar :title="titleName" left-text="返回" left-arrow @click-left="onClickLeft">
            </van-nav-bar>
        </div>
        <div class="sellers-msg">
            <van-cell-group>
                <van-field v-model="xueHao" label="学号" placeholder="学号" />
                <van-field v-model="quYu" label="区域" placeholder="区域" />
                <van-field v-model="suShe" label="宿舍" placeholder="宿舍" />
            </van-cell-group>
        </div>
        <div class="sellers-pingLun">
            <div class="pingLun-msg">
                <p class="pingLun-text">
                    {{pingLunName}}：{{pingLunText}}
                </p>
                <van-rate v-model="pingLunScore" icon="like" void-icon="like-o" />
                <van-row >
                    <van-col
                    v-for="item in 3"
                    :key="item"
                    span="8">
                        <img src="@/assets/img/book_1.png" alt="" />
                    </van-col>
                </van-row>
            </div>
            <div class="pingLun-msg">
                <p class="pingLun-text">
                    {{pingLunName}}：{{pingLunText}}
                </p>
                <van-rate v-model="pingLunScore" icon="like" void-icon="like-o" />
                <van-row >
                    <van-col
                    v-for="item in 3"
                    :key="item"
                    span="8">
                        <img src="@/assets/img/book_1.png" alt="" />
                    </van-col>
                </van-row>
            </div>
        </div>
        <div class="sellers-conection" @click="gotoConection">
            <van-icon name="comment-o" size="30" color="#369"/>
        </div>
    </div>
</template>
<script>

export default {
    name: 'sellers',
    data() {
        return {
            titleName: '张**',
            xueHao: '20161192****',
            quYu: '东区',
            suShe: '海韵',
            activeNames: ['1'],
            pingLunName: '周**',
            pingLunText: '评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论评论',
            pingLunScore: 4,
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        gotoConection() {
            console.log('聊天');
            this.$router.push({name: 'conection'}) 
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