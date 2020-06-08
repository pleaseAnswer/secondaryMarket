<template>
  <div>
    <div class="ye">
      <div class="mobile-head" @click="goto('/mine')">
        <i class="el-icon-arrow-left"></i>
      </div>
      <div class="reg">欢迎登录</div>
    </div>
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model.number="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :error="errorMsg">
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
          @keyup.13.native="submitForm('loginForm')"
        ></el-input>
      </el-form-item>
      <el-form-item prop="mdl">
        <van-checkbox v-model="loginForm.mdl" checked-color="#5fd9da">7天免登陆</van-checkbox>
        <a class="goreg" type="primary" @click="goreg">去注册</a>
      </el-form-item>
    </el-form>
      <el-button class="L_box2" type="primary"  @click="submitForm('loginForm')" >登录</el-button>
  </div>
</template>
<script>
import {my} from"../Api"
export default {
  data() {
    return {
      errorMsg: "",
      loginForm: {
        username: "",
        password: "",
        mdl: true
      },
      rules: {
        username: [
          { required: true, message: "亲，用户名必须填写哟", trigger: "blur" },
          {
            min: 3,
            max: 12,
            message: "长度在 3 到 12 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "密码长度必须为 6 到 12 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 校验成功发起ajax请求
          let { username, password } = this.loginForm;
          console.log(username, password);
          let { data } = await my.get("/login", {
              username,
              password
          });
          
          if (data.status === 0) {
            this.$message.error("用户名或者密码错误，登录失败");
          } else {
            //获取token
            let Authorization = data.data;
            this.$store.commit("login", { Authorization, username });
            let redirectUrl = this.$route.query.redirectUrl || "/mine";
              this.$message({
              message: '登录成功',
              type: 'success'
            });
            this.$router.replace(redirectUrl);
          }
        } else {
           this.$message.error("登录失败");
          return false;
        }
      });
    },
    goto(path) {
      this.$router.push(path);
    },
    goreg(){
        this.$router.push("/reg");
    }
  }
};
</script>
<style lang="scss" scoped>
.ye {
  overflow: hidden;
}
.mobile-head {
  width: 24px;
  height: 24px;
  margin: 15px 0 25px 15px;
  float: left;
}
.reg {
  font-size: 18px;
  float: right;
  margin: 15px 150px 0 0;
}
.mobile-logo {
  width: 210px;
  height: 80px;
  margin: 50px auto;
  img {
    width: 100%;
    height: 100%;
  }
}
.L_box2 {
  width: 310px;
  margin-left: 42px;
}
.el-input__inner{
  width: 100px;
}
.el-input{
  width: 250px;
}
.van-checkbox{
 margin-left: -30px;
}
.goreg{
  float: right;
  margin-top: -30px;
  margin-right: 156px;
}
</style>