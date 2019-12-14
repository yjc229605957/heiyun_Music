<template>
  <!-- 登录页面盒子 -->
  <div class="login_box">
    <!-- from表单盒子 -->
    <div class="from_box">
      <!-- 表单标题 -->
      <div class="login_title">
        <img src="../../assets/MM-logo.png" alt />
        <span class="title">黑马面面</span>
        <i></i>
        <span class="login_title">用户登录</span>
      </div>
      <!-- 表单内容 -->
      <el-form ref="form" :model="form" status-icon :rules="rules">
        <!-- 手机号 -->
        <el-form-item prop="phone">
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            show-password
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="captcha">
          <!-- 栅格布局 共24份 -->
          <!-- row行 -->
          <el-row>
            <!-- col列 -->
            <el-col :span="18">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.captcha"></el-input>
            </el-col>
            <el-col class="captcha" :span="6">
              <img :src="captchaURL" @click="getCaptcha" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 用户协议复选框 -->
        <el-checkbox v-model="form.checked">
          <div class="checked_text">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </div>
        </el-checkbox>
        <!-- 登录注册按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm()">登录</el-button>
          <el-button type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧背景图 -->
    <img src="../../assets/login_banner_ele.png" alt class="login_pic" />
  </div>
</template>

<script>
export default {
  name: "login",

  data() {
    //手机号自定义校验规则的函数
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        // 判断手机号的格式
        // 正则
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        // 判断是否符合
        // .test(验证的字符串) 返回的是 true 或者false
        if (reg.test(value) == true) {
          callback();
        } else {
          // 不满足 手机号的格式
          callback(new Error("老铁，你的手机号写错了噢"));
        }
      }
    };
    return {
      //登录框数据
      form: {
        phone: "",
        password: "",
        captcha: "",
        checked: false
      },
      //登录框验证规则
      rules: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 18, message: "密码长度8-18位", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码错误", trigger: "blur" }
        ]
      },
      // 获取验证码  时间戳要记得加 &
      captchaURL: `${
        process.env.VUE_APP_BASEURL
      }/captcha?type=login&${Date.now()}`
    };
  },
  methods: {
    // 登录表单登录按钮
    submitForm() {
      this.$refs.form.validate(valid => {
        //判断是否勾选用户协议
        if (this.form.checked == false) {
          this.$message.error("请同意用户协议");
        } else {
          //已勾选用户协议 判断输入框是否全部按规则填写
          if (valid) {
            // 输入框验证规则正确,发送登录请求
            //测试手机号 18522222222 12345678
            this.$axios({
              url: `${process.env.VUE_APP_BASEURL}/login`,
              method: "post",
              data: {
                phone: this.form.phone,
                password: this.form.password,
                code: this.form.captcha
              }
            }).then(res => {
              //如果code==200 说明登录成功
              if (res.data.code == 200) {
                this.$message.success("登录成功");
              } else if (
                //如果错误提示为账号密码错误 改成 账号或密码错误
                res.data.message == "登录密码不匹配" ||
                res.data.message == "登录名不匹配"
              ) {
                this.$message.error('账号或密码错误');
                this.getCaptcha();
              } else {
                //以上都不是则提示默认信息 验证码错误
                this.$message.error(res.data.message);
                this.getCaptcha();
              }
              window.console.log(res);
            });
          } else if (valid == "") {
            //如果输入框都没有内容,直接按登录按钮的提示信息
            this.$message.error("请输入账号密码");
          } else {
            return false;
          }
        }
      });
    },
    // 点击验证码刷新验证码
    getCaptcha() {
      this.captchaURL = `${
        process.env.VUE_APP_BASEURL
      }/captcha?type=login&${Date.now()}`;
    }
  }
};
</script>

<style lang ="less">
.login_box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  height: 100%;
  .from_box {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding: 44px;
    box-sizing: border-box;
    .login_title {
      display: flex;
      align-items: center;

      img {
        width: 22px;
        height: 17px;
      }
      .title {
        font-size: 24px;
        margin: 0 14px;
      }
      i {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
      }
      .login_title {
        font-size: 22px;
        margin-left: 12px;
      }
    }
    .el-form {
      margin-top: 28px;
      .el-input__inner {
        height: 45px;
      }
      .captcha {
        height: 45px;
        img {
          width: 100%;
          height: 45px;
        }
      }
      .el-checkbox {
        display: flex;
        align-items: center;
        color: #999999;
        .checked_text {
          color: #999999;
          display: flex;
          align-items: center;
        }
      }
      .el-button {
        width: 100%;
        margin: 0;
        margin-top: 28px;
      }
    }
  }
}
</style>
