<template>
<!-- 编辑商品页: 表单 图片-上传 标题 详情 价格 区域 -->
<!-- 进入页面时获取数据自动填充 -->
    <div class="editSellMsg">
        <van-form @submit="onSubmit">
            <van-field name="uploader" label="文件上传">
                <template #input>
                    <!-- 文件上传完毕后会触发after-read回调函数，获取到对应的file对象 -->
                    <van-uploader v-model="fileList" :after-read="afterRead" multiple />
                </template>
            </van-field>
            <van-field v-model="title" label="标题" name="标题" placeholder="标题" :rules="[{ required: true, message: '请填写标题' }]" />
            <van-field v-model="price" type="number" label="价格" name="价格" placeholder="价格" :rules="[{ required: true, message: '请填写价格' }]" />
            <van-field v-model="address" label="区域" name="区域" placeholder="区域" :rules="[{ required: true, message: '请填写区域' }]" />
            <van-field v-model="xiangQing" label="详情" name="详情" placeholder="详情" :rules="[{ required: true, message: '请填写详情' }]" />
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
    name: 'editSellMsg',
    data() {
        return {
            title: '',
            xiangQing: '',
            price: '',
            address: '',
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
.editSellMsg {
    padding-top: vw(20);
    background: #fff;
}
</style>
