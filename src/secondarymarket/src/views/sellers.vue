<template>
    <div class="sellers">
        <van-nav-bar :title="titleName" left-text="返回" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <van-cell-group>
            <van-field v-model="xueHao" label="学号" placeholder="学号" />
            <van-field v-model="quYu" label="区域" placeholder="区域" />
            <van-field v-model="suShe" label="宿舍" placeholder="宿舍" />
        </van-cell-group>
        <div class="pingLun">
            <div class="pingLun-msg">
                <p class="pingLun-text">
                    {{pingLunName}}：{{pingLunText}}
                </p>
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
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
    },
}
</script>
<style lang="scss" scoped>
.sellers {
    width: 100%;
    .pingLun {
        margin: vw(20);
        .pingLun-text {
            border: 1px solid #58bc;
            // text-indent: vw(48);
            // font-size: vw(24);
            // line-height: vw(48);
            // margin-bottom: vw(20);
        }
        img {
            width: 90%;
            margin: 5%;
            // border: 1px solid #58bc;
        }
    }
}
</style>