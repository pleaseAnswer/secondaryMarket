<template>
<!-- 评论：评论 + 打分 + 图片上传 -->
    <div class="pingLun">
        <van-form @submit="onSubmit">
            <div class="pingLun-score">
                <span class="pingLun-score-title">评分</span> <van-rate v-model="pingLunScore" icon="like" void-icon="like-o" />
            </div>
            <van-field v-model="pingLun" label="评价" name="评价" placeholder="评价"/>
            <van-field name="uploader" label="文件上传">
                <template #input>
                    <!-- 文件上传完毕后会触发after-read回调函数，获取到对应的file对象 -->
                    <van-uploader v-model="fileList" :after-read="afterRead" multiple />
                </template>
            </van-field>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>
<script>

export default {
    name: 'pingLun',
    data() {
        return {
            pingLunScore: 0,
            pingLun: '',
            fileList: [
                { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
                // Uploader 根据文件后缀来判断是否为图片文件
                // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                { url: 'https://cloud-image', isImage: true },
            ],
        }
    },
    methods: {
        afterRead(file) {
            console.log('file', file);
        },
        onSubmit(values) {
            console.log('submit', values);
        },
    }
}
</script>
<style lang="scss" scoped>
@function vw($px) {
  @return ($px / 750) * 100vw;
}
.pingLun {
    padding: vw(20);
    background: #fff;
    .pingLun-score {
        padding: vw(20) vw(32);
        .pingLun-score-title {
            width: vw(180);
            height: vw(48);
            font-size: vw(28);
            line-height: vw(48);
            padding-right: vw(120);
        }
    }
}
</style>
