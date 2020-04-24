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
                        <van-form @submit="onSubmitLogin">
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
                        <van-form @submit="onSubmitSignIn">
                            <van-field v-model="signIn.xuehao" clearable name="学号" label="学号" placeholder="请输入学号" :rules="[{ required: true, message: '请输入学号' }]"  />
                            <van-field v-model="signIn.mobile" clearable type="mobile" label="手机号" placeholder="请输入手机号" :rules="[{ required: true, message: '请输入手机号' }]" />
                            <van-field v-model="signIn.sms" center clearable label="短信验证码" placeholder="请输入短信验证码" >
                                <template #button>
                                    <van-button size="small" type="primary">发送验证码</van-button>
                                </template>
                            </van-field>
                            <van-field v-model="signIn.password" clearable type="password" name="密码" label="密码" placeholder="请输入密码" :rules="[{ required: true, message: '请输入密码' }]" />
                            <van-field v-model="signIn.password2" clearable type="password" name="密码" label="密码" placeholder="请再次输入密码" :rules="[{ required: true, message: '请再次输入密码' }]" />
                            <div style="margin: 16px;">
                                <van-button round block type="info" native-type="submit" @click.native.prevent="handleLogin">
                                注册
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

export default {
    name: 'login',
    data() {
        return {
            titleName: '登陆页',
            active: 0,
            login: {},
            signIn: {},
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        onSubmitLogin(values) {
            console.log('onSubmitLogin', values);
        }, 
        onSubmitSignIn(values) {
            console.log('onSubmitSignIn', values);
        },
        gotoReset() {
            this.$router.push({name: 'forgetmm'})
        }
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
