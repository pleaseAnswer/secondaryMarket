<template>
<!-- 登录：学号/手机号 + 密码 + 忘记密码 + 登录按钮 -->
<!-- 注册：学号 + 手机号 + 密码 + 确认密码 + 手机验证码 + 确认注册 -->
    <div class="login">
        <div class="login-header">
            <van-nav-bar :title="titleName" left-text="返回" left-arrow @click-left="onClickLeft">
            </van-nav-bar>
        </div>
        <div class="login-main-wrap">
            <div class="login-main">
                <van-tabs v-model="active" color="#4378ba">
                    <van-tab title="登录" style="margin-top: 10px;">
                        <van-form>
                            <van-field v-model="login.username" clearable name="账号" label="账号" placeholder="请输入学号/手机号" :rules="[{ required: true, message: '请输入学号/手机号' }]" />
                            <van-field v-model="login.password" clearable type="password" name="密码" label="密码" placeholder="请输入密码" :rules="[{ required: true, message: '请输入密码' }]" />
                            <div class="forget-password" @click="gotoReset">忘记密码</div>
                            <div style="margin: 16px;">
                                <van-button round block type="info" native-type="submit" @click.native.prevent="handleLogin">
                                登录
                                </van-button>
                            </div>
                        </van-form>
                    </van-tab>
                    <van-tab title="注册">
                        <van-form>
                            <van-field v-model="signIn.xuehao" clearable name="学号" label="学号" placeholder="请输入学号" :rules="[{ required: true, message: '请输入学号' }]"  />
                            <van-field v-model="signIn.mobile" clearable type="mobile" label="手机号" placeholder="请输入手机号" :rules="[{ required: true, message: '请输入手机号' }]" />
                            <van-field v-model="signIn.sms" center clearable label="短信验证码" placeholder="请输入短信验证码" >
                                <template #button>
                                    <van-button size="small" type="primary" :disabled="isGet" @click="getCode">{{isGet ? `验证码${daojishi}s` : '发送验证码'}}</van-button>
                                </template>
                            </van-field>
                            <van-field v-model="signIn.password" clearable type="password" name="密码" label="密码" placeholder="请输入密码" :rules="[{ required: true, message: '请输入密码' }]" />
                            <van-field v-model="signIn.password2" clearable type="password" name="确认密码" label="确认密码" placeholder="请再次输入密码" :rules="[{ required: true, message: '请再次输入密码' }]" />
                            <div style="margin: 16px;">
                                <van-button round block type="info" native-type="submit" @click.native.prevent="handleRegister">
                                注册
                                </van-button>
                            </div>
                        </van-form>
                    </van-tab>
                    <van-tab title="个人信息" v-if="isShow">
                        <van-form>
                            <van-field v-model="signIn.xuehao" readonly="" name="xuehao" label="学号" placeholder="请输入学号" :rules="[{ required: true, message: '请输入学号' }]"  />
                            <van-field v-model="signIn.sellPeaple" clearable name="sellPeaple" label="姓名" placeholder="请输入姓名" :rules="[{ required: true, message: '请输入姓名' }]" />
                            <van-field readonly clickable name="sex" v-model="signIn.sex" :value="signIn.sex" label="性别" placeholder="点击选择性别" @click="showPicker = true" />
                            <van-popup v-model="showPicker" position="bottom">
                                <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
                            </van-popup>
                            <!-- <van-field v-model="signIn.address" clearable name="address" label="区域" placeholder="请输入所在区域" :rules="[{ required: true, message: '请输入所在区域' }]" /> -->
                            <van-field readonly clickable name="address" v-model="signIn.address" :value="signIn.address" label="区域" placeholder="点击选择区域" @click="showPicker = true" />
                            <van-popup v-model="showPicker" position="bottom">
                                <van-picker show-toolbar :columns="columns" @confirm="onConfirm" @cancel="showPicker = false" />
                            </van-popup>
                            <!-- <van-field v-model="signIn.suShe" clearable name="suShe" label="宿舍" placeholder="请输入宿舍" :rules="[{ required: true, message: '请输入宿舍' }]" /> -->
                            <van-field readonly clickable name="suShe" v-model="signIn.suShe" :value="signIn.suShe" label="宿舍" placeholder="点击选择宿舍" @click="showPickersuShe = true" />
                            <van-popup v-model="showPickersuShe" position="bottom">
                                <van-picker show-toolbar :columns="columnssuShe" @confirm="onConfirmsuShe" @cancel="showPickersuShe = false" />
                            </van-popup>
                            <div style="margin: 16px;">
                                <van-button round block type="info" native-type="submit" @click.native.prevent="handleSubmit">
                                提交
                                </van-button>
                            </div>
                        </van-form>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>
<script>
import { my } from '@/api';
export default {
    name: 'login',
    data() {
        return {
            titleName: '登录页',
            active: 0,
            login: {},
            signIn: {},
            isGet: false,
            daojishi: 60,
            ruleForm: {},
            isShow: false,
            showPicker: false,
            columns: ["东区","西区","中区"],
            showPickersuShe: false,
            columnssuShe: ["海涛","海霞","海天","海宇","海景","海韵","海安","海宁","海风","海月","海云","海欢","海乐","海浪","海花"],
        }
    },
    methods: {
        onConfirm(value) {
            this.signIn.address = value;
            this.showPicker = false;
        },
        onConfirmsuShe(value) {
            this.signIn.suShe = value;
            this.showPickersuShe = false;
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        gotoReset() {
            this.$router.push({name: 'forgetmm'})
        },
        async handleLogin() {
            if(!this.login.username && !this.login.password) {
                this.$toast({ message: '请完善登录信息' });
            } else if(!this.login.username) {
                this.$toast({ message: '请输入学号/手机号' });
            } else if(!this.login.password) {
                this.$toast({ message: '请输入密码' });
            } else {
                // 发送请求
                let result = await my.post('/user',this.login)
                if(result.status == 200) {
                    if(result.data.status == 200) {
                        console.log(result.data.data);
                        
                        sessionStorage.setItem('token',result.data.data.Authorization)
                        sessionStorage.setItem('username',this.login.username)
                        sessionStorage.setItem('id',result.data.data.id)
                        sessionStorage.setItem('sellPeaple',result.data.data.sellPeaple)
                        this.$toast({ message: '登录成功' });
                        setTimeout(()=>this.$router.push({name: 'index'}))
                    } else {
                        this.$toast({ message: '账号或密码错误' });
                    }
                } else {
                    this.$toast({ message: '登录失败' });
                }
            }
            
        },
        async handleRegister() {
            console.log('注册');
            const regXh = /^[0-9]{12}$/
            const regSj = /^1[3-9][0-9]{9}$/
            const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
            if(!this.signIn.xuehao) {
                this.$toast({ message: '请输入学号' });
                return
            } else if(!regXh.test(this.signIn.xuehao)) {
                this.$toast({ message: '请输入正确的学号' });
                return
            } else if(!this.signIn.mobile) {
                this.$toast({ message: '请输入手机号' });
                return
            } else if(!regSj.test(this.signIn.mobile)) {
                this.$toast({ message: '请输入正确的手机号' });
                return
            } else if(!this.signIn.sms) {
                this.$toast({ message: '请输入手机验证码' });
                return
            } else if(!this.signIn.password) {
                this.$toast({ message: '请输入密码' });
                return
            } else if(!reg.test(this.signIn.password)) {
                this.$toast({ message: '请输入由数字、字母组成的6位以上的密码' });
                return
            } else if(!this.signIn.password2) {
                this.$toast({ message: '请再次输入密码' });
                return
            }else if(this.signIn.password !== this.signIn.password2) {
                this.$toast({ message: '请输入一致的密码' });
                return
            }
            // 检验验证码有效性

            // 验证学号是否已存在
            let res1 = await my.get("/user/checkXh", { xuehao : this.signIn.xuehao });
            if(res1.data.status == 200) {
                // 验证手机号是否已存在
                let res2 = await my.get("/user/checkSj", { mobile : this.signIn.mobile  });
                if(res2.data.status == 200) {
                    // 发送请求 -> 注册
                    this.ruleForm={
                        id: new Date().getTime(),
                        xuehao: this.signIn.xuehao,
                        mobile: this.signIn.mobile,
                        password: this.signIn.password,
                    }
                    
                    let { data } = await my.post("/user/reg", this.ruleForm);
                    if (data.status === 200) {
                        this.$toast({ message: '注册成功' });  
                        this.isShow = true;
                        setTimeout(()=>this.active = 2, 500) 
                    }
                } else {
                    this.$toast({ message: '该手机号已注册' });                
                }
            } else {
                this.$toast({ message: '该学号已注册' });                    
            }
        },
        async handleSubmit() {
            if(!this.signIn.sellPeaple) {
               this.$toast({ message: '请输入姓名' });
                return 
            } else if(!this.signIn.address) {
               this.$toast({ message: '请输入所在区域' });
                return 
            } else if(!this.signIn.suShe) {
               this.$toast({ message: '请输入宿舍' });
                return 
            }
            let xueHao = this.signIn.xuehao.substring(0,8) + '****';
            if(this.signIn.address == '东区') {
                this.signIn.addressCode = 1
            } else if(this.signIn.address == '西区') {
                this.signIn.addressCode = 3
            } else if(this.signIn.address == '中区') {
                this.signIn.addressCode = 2
            } else {
               this.$toast({ message: '请输入正确的区域（东|中|西区）' });
            }
            // 注册成功之后跳转填个人信息   
            let sellForm = {
                sellPeaple: this.signIn.sellPeaple,
                sellPeapleId: this.ruleForm.id,
                xueHao,
                address : this.signIn.address,
                suShe : this.signIn.suShe,
                addressCode : this.signIn.addressCode,
                pingLun : [],
            }
            let { data } = await my.post("/user/submitMsg", sellForm);
            if (data.status === 200) {
                this.$toast({ message: '信息提交成功' });  
                this.isShow = false;
                setTimeout(()=>this.active = 0, 500) 
            }           
            
        },
        // {
        //     "_id" : ObjectId("5eb543236a1c2bd73c014590"),
        //     "sellPeaple" : "李阿花",
        //     "sellPeapleId" : "01",
        //     "xueHao" : "20161192****",
        //     "address" : "东区",
        //     "suShe" : "海韵",
        //     "addressCode" : 1,
        //     "pingLun" : [ 
        //         {
        //             "pingLunName" : "周**",
        //             "pingLunText" : "东西都很新，也很便宜，很好呀",
        //             "pingLunScore" : 5,
        //             "pingLunImg" : [ 
        //                 "https://cbu01.alicdn.com/img/ibank/2020/688/590/13330095886_539104953.220x220.jpg?_=2020"
        //             ]
        //         }, 
        //         {
        //             "pingLunName" : "黄**",
        //             "pingLunText" : "东西虽然不是很新，但是没什么损伤，挺好的呢",
        //             "pingLunScore" : 4,
        //             "pingLunImg" : [ 
        //                 "https://cbu01.alicdn.com/img/ibank/2020/789/106/14393601987_639399817.220x220.jpg?_=2020"
        //             ]
        //         }
        //     ]
        // }
        // 获取短信验证码
        async getCode() {
            // 发送请求 + 切换状态 + 倒计时 + 切换状态
            if(this.signIn.mobile) {
                let reg=/^[0-9]{11}$/
                if(reg.test(this.signIn.mobile)) {
                    this.$toast({ message: '短信发送成功' });
                    this.isGet = true;
                    this.daojishi = 60;
                    let time = setInterval(() => {
                        this.daojishi = this.daojishi - 1
                        if(this.daojishi == 0) {
                            clearInterval(time)
                            this.isGet = false;
                        }
                    }, 1000);
                } else {
                    this.$toast({ message: '请输入正确的手机号' });
                }
            } else {
                this.$toast({ message: '请输入手机号' });
            }
        },
        // 校验短信验证码
        async checkCode() {
            // 失焦发起验证 
            console.log('发起验证');
        },
    }
}
</script>
<style lang="scss" scoped>
@function vw($px){
  @return ($px / 750) * 100vw;
}
.login-main-wrap {
    width: 100%;
    .login-main {
        margin: vw(80);
        border: 1px solid #58bc;
    }
    .forget-password {
        height: vw(34);
        font-size: vw(24);
        line-height: vw(34);
        color: #666;
        padding-left: vw(20);
        padding-top: vw(20);
    }
}
</style>
