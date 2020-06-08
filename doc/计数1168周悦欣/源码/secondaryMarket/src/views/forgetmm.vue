<template>
<!-- 忘记密码 -->
    <div class="login">
        <div class="login-header">
            <van-nav-bar title="忘记密码" left-text="返回" left-arrow @click-left="onClickLeft">
            </van-nav-bar>
        </div>
        <div class="login-main-wrap">
            <van-form>
                <van-field v-model="Reset.mobile" clearable type="mobile" label="手机号" placeholder="请输入手机号" :rules="[{ required: true, message: '请输入手机号' }]" />
                <van-field v-model="Reset.sms" center clearable label="短信验证码" placeholder="请输入短信验证码" >
                    <template #button>
                        <van-button size="small" type="primary">发送验证码</van-button>
                    </template>
                </van-field>
                <van-field v-model="Reset.password" clearable type="password" name="密码" label="密码" placeholder="请输入密码" :rules="[{ required: true, message: '请输入密码' }]" />
                <van-field v-model="Reset.password2" clearable type="password" name="确认密码" label="确认密码" placeholder="请再次输入密码" :rules="[{ required: true, message: '请再次输入密码' }]" />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit" @click.native.prevent="onSubmitReset">
                    注册
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>
<script>
import { my } from '@/api';
export default {
    name: 'forgetmm',
    data() {
        return {
            Reset: {},
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        async onSubmitReset(values) {
            console.log('onSubmitReset', values);
            const regSj = /^1[3-9][0-9]{9}$/
            const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/;
            if(!this.Reset.mobile) {
                this.$toast({ message: '请输入手机号' });
                return
            } else if(!regSj.test(this.Reset.mobile)) {
                this.$toast({ message: '请输入正确的手机号' });
                return
            } else if(!this.Reset.sms) {
                this.$toast({ message: '请输入手机验证码' });
                return
            } else if(!this.Reset.password) {
                this.$toast({ message: '请输入密码' });
                return
            } else if(!reg.test(this.Reset.password)) {
                this.$toast({ message: '请输入由数字、字母组成的6位以上的密码' });
                return
            } else if(!this.Reset.password2) {
                this.$toast({ message: '请再次输入密码' });
                return
            }else if(this.Reset.password !== this.Reset.password2) {
                this.$toast({ message: '请输入一致的密码' });
                return
            }
            // 检验验证码有效性

            // 验证学号是否已存在
                // 验证手机号是否已存在
                let res2 = await my.get("/user/checkSj", { mobile : this.Reset.mobile  });
                if(res2.data.status == 200) {
                    this.$toast({ message: '该手机号尚未注册' });                
                } else {
                    // 发送请求 -> 修改密码
                    let { data } = await my.post("/user/resetPassword", { mobile:this.Reset.mobile, psw: this.Reset.password });
                    if (data.status === 200) {
                        this.$toast({ message: '密码修改成功' });  
                        // 跳转至登录页
                        this.$router.push({name: 'login'})
                    }
                }
        }
    }
}
</script>
<style lang="scss" scoped>
@function vw($px){
  @return ($px / 750) * 100vw;
}
.login-main-wrap {
    margin: vw(40);
    padding: vw(20);
    border: 1px solid #58bc;
}
</style>
