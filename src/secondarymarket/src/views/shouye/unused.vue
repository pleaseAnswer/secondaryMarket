<template>
<!-- 卖闲置: 表单 图片-上传 标题 详情 价格 区域 -->
    <div class="unused">
        <!-- <div class="unused-header"> -->
            <van-nav-bar title="卖闲置" left-text="返回" left-arrow @click-left="onClickLeft" class="unused-header">
            </van-nav-bar>
            <!-- <p>卖闲置</p> -->
        <!-- </div> -->
        <div class="unused-main">
            <van-form @submit="onSubmit">
                <van-field name="fileList" label="文件上传">
                    <template #input>
                        <!-- 文件上传完毕后会触发after-read回调函数，获取到对应的file对象 -->
                        <van-uploader v-model="fileList" :after-read="afterRead" multiple />
                    </template>
                </van-field>
                <van-field v-model="title" label="标题" name="title" placeholder="标题"/>
                <!-- <van-field readonly clickable name="classify" v-model="classify" :value="classify" label="类别" placeholder="点击选择类别" @click="showPicker = true" /> -->
                <!-- <van-popup v-model="showPicker" position="bottom">
                    <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
                </van-popup> -->
                <!-- <van-field v-model="price" type="number" label="价格" name="price" placeholder="价格"/> -->
                <!-- <van-field readonly clickable name="address" v-model="address" :value="address" label="区域" placeholder="点击选择区域" @click="showPickerAddress = true" /> -->
                <!-- <van-popup v-model="showPickerAddress" position="bottom">
                    <van-picker show-toolbar :columns="columnsAddress" @confirm="onConfirmAddress" @cancel="showPickerAddress = false" />
                </van-popup> -->
                <!-- <van-field readonly clickable name="newCode" v-model="newCode" :value="newCode" label="几成新" placeholder="点击选择几成新" @click="showPickernewCode = true" /> -->
                <!-- <van-popup v-model="showPickernewCode" position="bottom">
                    <van-picker show-toolbar :columns="columnsnewCode" @confirm="onConfirmnewCode" @cancel="showPickernewCode = false" />
                </van-popup> -->
                <!-- <van-field v-model="sellReason" label="转手原因" name="sellReason" placeholder="转手原因"/> -->
                <!-- <van-field v-model="xiangQing" label="详情" name="xiangQing" placeholder="详情" /> -->
                <div style="margin: 300px 16px 16px;">
                    <van-button round block type="info" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>
<script>
import { my } from '@/api';
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
            classify: '',
            fileList: [
                // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
                // Uploader 根据文件后缀来判断是否为图片文件
                // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                // { url: 'https://cloud-image', isImage: true },
            ],
            // value: '',
            columns: ["图书 教科书","图书 考级资料","图书 名著","图书 笔记本","图书 其它","生活百货 电器","生活百货 文具","生活百货 纸巾", "生活百货 餐具", "生活百货 洗护用品", "生活百货 其它"],
            columnsList: [{label: "图书 教科书", code: '1010'},{label: "图书 考级资料", code: '1020'},{label: "图书 名著", code: '1030'},{label: "图书 笔记本", code: '1040'},{label: "图书 其它", code: '1050'},{label: "生活百货 电器", code: '2020'},{label: "生活百货 文具", code: '2030'},{label: "生活百货 纸巾", code: '2040'},{label: "生活百货 餐具", code: '2050'},{label: "生活百货 洗护用品", code: '2060'},{label: "生活百货 其它", code: '2070'}],
            showPicker: false,
            showPickerAddress: false,
            columnsAddress: ["东区","西区","中区"],
            showPickernewCode: false,
            columnsnewCode: ["九成新","八成新","七成新","六成新","五成新","四成新","三成新","二成新","一成新"],
        }
    },
    created() {
    },
    methods: {
        afterRead(file) {
            console.log('file', file);
        },
        onSubmit (values) {
            console.log('submit', values);
            if(values.fileList.length ==0 || values.title == '' || values.xiangQing == '' || values.price == '' || values.address == '' || values.newCode == '' || values.sellReason == '' || values.classify == '') {
                this.$toast('请完善数据的填写');
                return
            } 
            this.$dialog.confirm({
                message: '确认发布？',
            })
            .then(async () => {
                // on confirm
                let parentIdObj = this.columnsList.filter(item => {
                    if(item.label == values.classify) {
                        return item.code
                    }
                })
                let parentId = parentIdObj[0].code;
                let signId = parentId + String(new Date().getTime())
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
                    timeNow: new Date().getTime(),
                    parentId,
                    parentName: values.classify.trim().split(" ")[0],
                    signId,
                    title : values.title,
                    new : values.newCode,
                    address : values.address,
                    addressCode,
                    price : values.price,
                    img : values.fileList[0].content,
                    sellPeaple : sessionStorage.getItem('sellPeaple'),
                    sellReason : values.sellReason,
                    sellPeapleId : sessionStorage.getItem('id'),
                    xiangQing: values.xiangQing
                }
                
                let result = await my.post("/goodsList/addGoods", ruleForm);
                console.log(result);
                
                if (result.data.status === 200) {
                    this.$toast({ message: '发布成功' });
                    this.title = '';
                    this.xiangQing = '';
                    this.price = '';
                    this.address = '';
                    this.newCode = '';
                    this.sellReason = '';
                    this.classify = '';
                    this.fileList = [];
                } else {
                    this.$toast('网络出错')
                }
            })
            .catch(() => {
                // on cancel
            });
            
        },
        onConfirm(classify) {
            this.classify = classify;
            this.showPicker = false;
        },
        onConfirmAddress(address) {
            this.address = address;
            this.showPickerAddress = false;
        },
        onConfirmnewCode(newCode) {
            this.newCode = newCode;
            this.showPickernewCode = false;
        },
        onClickLeft() {
            this.$router.go(-1);
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
    color: #fff;
    p {
      text-align: center;
      font-size: vw(48);
      line-height: vw(110);
    }
    .van-nav-bar__text {
        color: #fff;
    }
}
.unused-main {
    padding-top: vw(112);
}
</style>
