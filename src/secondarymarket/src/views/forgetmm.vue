<template>
<!-- 忘记密码 -->
    <div class="login">
        <div class="login-header">
            <van-nav-bar title="忘记密码" left-text="返回" left-arrow @click-left="onClickLeft">
            </van-nav-bar>
        </div>
        <div class="login-main-wrap">
            <van-form @submit="onSubmitReset">
                <van-field v-model="Reset.mobile" clearable type="mobile" label="手机号" placeholder="请输入手机号" :rules="[{ required: true, message: '请输入手机号' }]" />
                <van-field v-model="Reset.sms" center clearable label="短信验证码" placeholder="请输入短信验证码" >
                    <template #button>
                        <van-button size="small" type="primary">发送验证码</van-button>
                    </template>
                </van-field>
                <van-field v-model="Reset.password" clearable type="password" name="密码" label="密码" placeholder="请输入密码" :rules="[{ required: true, message: '请输入密码' }]" />
                <van-field v-model="Reset.password2" clearable type="password" name="确认密码" label="确认密码" placeholder="请再次输入密码" :rules="[{ required: true, message: '请再次输入密码' }]" />
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit" @click.native.prevent="handleLogin">
                    注册
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>
<script>

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
        onSubmitReset(values) {
            console.log('onSubmitReset', values);
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
