<template>
<!-- 卖闲置: 表单 图片-上传 标题 详情 价格 区域 -->
    <div class="unused">
        <div class="unused-header">
            <p>卖闲置</p>
        </div>
        <div class="unused-main">
            <van-form @submit="onSubmit">
                <van-field name="uploader" label="文件上传">
                    <template #input>
                        <!-- 文件上传完毕后会触发after-read回调函数，获取到对应的file对象 -->
                        <van-uploader v-model="fileList" :after-read="afterRead" multiple />
                    </template>
                </van-field>
                <van-field v-model="title" label="标题" name="标题" placeholder="标题" :rules="[{ required: true, message: '请填写标题' }]" />
                <van-field readonly clickable name="picker" :value="value" label="类别" placeholder="点击选择类别" @click="showPicker = true" />
                <van-popup v-model="showPicker" position="bottom">
                    <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
                </van-popup>
                <van-field v-model="price" type="number" label="价格" name="价格" placeholder="价格" :rules="[{ required: true, message: '请填写价格' }]" />
                <van-field v-model="address" label="区域" name="区域" placeholder="区域" :rules="[{ required: true, message: '请填写区域' }]" />
                <van-field v-model="newCode" label="几成新" name="几成新" placeholder="几成新" :rules="[{ required: true, message: '请填写几成新' }]" />
                <van-field v-model="sellReason" label="转手原因" name="转手原因" placeholder="转手原因" :rules="[{ required: true, message: '请填写转手原因' }]" />
                <van-field v-model="xiangQing" label="详情" name="详情" placeholder="详情" :rules="[{ required: true, message: '请填写详情' }]" />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">
                    提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>
<script>

export default {
    name: 'unused',
    data() {
        return {
            title: '',
            xiangQing: '',
            price: '',
            address: '',
            newCode: '',
            sellReason: '',
            fileList: [
                { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
                // Uploader 根据文件后缀来判断是否为图片文件
                // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                { url: 'https://cloud-image', isImage: true },
            ],
            value: '',
            columns: ["图书 教科书","图书 考级资料","图书 名著", "图书 笔记本", "图书 其它"],
            showPicker: false,
        }
    },
    created() {
        sessionStorage.setItem('homeAct', 2)
        this.$store.state.active = 2
        console.log('unused',this.$store.state.active);
    },
    methods: {
        afterRead(file) {
            console.log('file', file);
        },
        onSubmit(values) {
            console.log('submit', values);
        },
        onConfirm(value) {
            this.value = value;
            this.showPicker = false;
        },
    }
}
</script>
<style lang="scss" scoped>
@function vw($px) {
  @return ($px / 750) * 100vw;
}
.unused {
    padding-top: vw(20);
    background: #fff;
}
.unused-header {
    width: 100%;
    height: 55px;
    background: #4378ba;
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
.unused-main {
    padding-top: vw(112);
}
</style>
