<template>
<!-- 编辑商品页: 表单 图片-上传 标题 详情 价格 区域 -->
<!-- 进入页面时获取数据自动填充 -->
    <div class="editSellMsg">
        <van-form @submit="onSubmit">
            <!-- <van-field name="fileList" label="文件上传">
                <template #input>
                    <van-uploader v-model="fileList" :after-read="afterRead" multiple />
                </template>
            </van-field> -->
            <van-field v-model="title" label="标题" name="title" placeholder="标题" :rules="[{ required: true, message: '请填写标题' }]" />
            <!-- <van-field v-model="price" type="number" label="价格" name="price" placeholder="价格" :rules="[{ required: true, message: '请填写价格' }]" /> -->
            <van-field v-model="address" label="区域" name="address" placeholder="区域" :rules="[{ required: true, message: '请填写区域' }]" />
            <van-field v-model="sellReason" label="转手原因" name="sellReason" placeholder="转手原因" :rules="[{ required: true, message: '请填写转手原因' }]" />
            <van-field v-model="xiangQing" label="详情" name="xiangQing" placeholder="详情" :rules="[{ required: true, message: '请填写详情' }]" />
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
    name: 'editSellMsg',
    data() {
        return {
            id: sessionStorage.getItem('id'),
            signId: this.$route.query.id,
            title: '',
            xiangQing: '',
            price: '',
            address: '',
            sellReason: '',
            // fileList: [],
        }
    },
    created() {
        this.getList()
    },
    methods: {
        afterRead(file) {
            console.log('file', file);
        },
        onSubmit(values) {
            console.log('submit', values);
            if(values.title == '' || values.xiangQing == '' || values.price == '' || values.address == '' || values.sellReason == '') {
                this.$toast('请完善数据的填写');
                return
            } 
            this.$dialog.confirm({
                message: '确认修改？',
            })
            .then(async () => {
                // on confirm
                let addressCode = ''
                if(values.address == '东区') {
                    addressCode = 1
                } else if(values.address == '西区') {
                    addressCode = 3
                } else if(values.address == '中区') {
                    addressCode = 2
                } else {
                    this.$toast({ message: '请输入正确的区域（东|中|西区）' });
                    return;
                }
                let ruleForm={
                    signId : this.signId,
                    title : values.title,
                    address : values.address,
                    addressCode,
                    price : values.price,
                    // img : values.fileList[0].content,
                    xiangQing: values.xiangQing
                }
                
                let result = await my.post("/goodsList/editGoods", ruleForm);
                console.log(result);
                
                if (result.data.status === 200) {
                    this.$toast({ message: '修改成功' });
                    this.$router.push({ name: 'selledNow' })

                } else {
                    this.$toast('修改保存失败')
                }
            })
            .catch(() => {
                // on cancel
            });
            
        },
        async getList() {
            let {data} = await my.get(`/goodsList/goodsDetail/${this.signId}?personId=${sessionStorage.getItem('id')}`);
            this.title = data.data[0].title;
            this.xiangQing = data.data[0].xiangQing;
            this.price = data.data[0].price;
            this.address = data.data[0].address;
            this.sellReason = data.data[0].sellReason;           
        }
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
