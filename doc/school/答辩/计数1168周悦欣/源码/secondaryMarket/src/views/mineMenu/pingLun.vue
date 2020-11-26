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
import { my } from '@/api';
export default {
    name: 'pingLun',
    data() {
        return {
            id: sessionStorage.getItem('id'),
            pingLunScore: 0,
            pingLun: '',
            fileList: [],
        }
    },
    methods: {
        afterRead(file) {
            console.log('file', file);
        },
        onSubmit(values) {
            console.log('submit', values);
            this.$dialog.confirm({
                message: '确认提交该评论？',
            })
            .then(async () => {
                // on confirm
                let fileList = []
                this.fileList.map(item => {
                    fileList.push(item.content)
                })
                let ruleForm = {
                    sellPeapleId: this.$route.query.id,
                    signId: this.$route.query.signId,
                    pingLunId: this.id,
                    pingLunScore: this.pingLunScore,
                    pingLun: this.pingLun,
                    fileList,
                }
                let result = await my.post("/goodsList/pingLunCommit", ruleForm);
                console.log(result);
                
                if (result.data.status === 200) {
                    this.$toast({ message: '评论成功' });
                    this.$router.push({ name: 'isBuyed' })
                } else {
                    this.$toast('评论失败')
                }
            })
            .catch(() => {
                // on cancel
            });
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
