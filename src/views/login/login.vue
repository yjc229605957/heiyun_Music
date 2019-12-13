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
      <el-form ref="form" :model="form">
        <!-- 手机号 -->
        <el-form-item>
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.phone"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
          <el-input show-password placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="form.password"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item>
          <!-- 栅格布局 共24份 -->
          <!-- row行 -->
          <el-row>
            <!-- col列 -->
            <el-col :span="18">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.captcha"></el-input>
            </el-col>
            <el-col class="captcha" :span="6">
              <img src="../../assets/cat.png" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 用户协议复选框 -->
        <el-checkbox v-model="form.checked" text-color="#999999">
          <div class="checked_text">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </div>
        </el-checkbox>
        <!-- 登录注册按钮 -->
        <el-form-item>
          <el-button type="primary">登录</el-button>
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
    return {
      form: {
        phone: "",
        password: "",
        captcha: "",
        checked: false,
      }
    };
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
        img {
          width: 100%;
          height: 45px;
        }
      }
      .el-checkbox {
        display: flex;
        align-items: center;
        color: #999999;
        .checked_text{
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
