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
          <el-input
            show-password
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="form.password"
          ></el-input>
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
          <el-button type="primary" @click="dialogFormVisible = true">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧背景图 -->
    <img src="../../assets/login_banner_ele.png" alt class="login_pic" />
    <!-- 注册盒子 -->
    <div class="sign_up">
      <!-- 对话框 -->
      <el-dialog
        title="用户注册"
        :visible.sync="dialogFormVisible"
        :show-close="false"
        center
        :lock-scroll="true"
      >
        <!-- 表单部分 -->
        <el-form
          :model="ruleform"
          :rules="rules"
          ref="ruleform"
          label-width="65px"
          class="demo-ruleform"
        >
          <el-form-item label="头像" prop="name">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
           
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="昵称" prop="name">
            <el-input v-model="ruleform.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="mail">
            <el-input v-model="ruleform.mail"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-input v-model.number="ruleform.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleform.password"></el-input>
          </el-form-item>
          <el-form-item label="图形码" prop="image">
            <el-input v-model="ruleform.image"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
            <el-input v-model="ruleform.captcha"></el-input>
          </el-form-item>

        </el-form>
        <!-- 底部按钮 -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
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
        checked: false
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      handleAvatarSuccess: "",
      beforeAvatarUpload: "",
      imageUrl: "",
      ruleform: {
        name: "",
        mail: "",
        phone: "",
        password: "",
        image: "",
        captcha: ""
      },
      formLabelWidth: "55px",
      rules: {
        name: [
          { required: true, message: "请输入3-10位昵称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        mail: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { min: 6, max: 25, message: "请输入正确格式的邮箱", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { type: 'number', min: 11, max: 11, message: "请输入正确手机号" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 8, max: 16, message: "请输入 8 到 16 个字符", trigger: "blur" }
        ],
        image: [
          { required: true, message: "请输入图形验证码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        captcha: [
          { required: true, message: "请输入手机验证码", trigger: "blur" },
          { min: 6, max: 6, message: "请输入 6 位字符验证码", trigger: "blur" }
        ],
      }
    };
  }
};
</script>

<style lang ="less">
/* 登录注册组件 */
.login_box {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(225deg, #01c6fa, #1493fa);
  height: 100%;
  /* 登录盒子 */
  .from_box {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding: 44px;
    box-sizing: border-box;
    /* 登录盒子的标题 */
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
    /* 登录盒子的form主体 */
    .el-form {
      margin-top: 28px;
      /* 每一行输入框的margin-bottom */
      .el-form-item {
        margin-bottom: 24px;
        /* 输入框icon行高 */
        .el-icon-key,
        .el-icon-user,
        .el-icon-lock {
          line-height: 48px;
        }
      }
      /* 每一行输入框的高度 */
      .el-input__inner {
        height: 45px;
      }
      /* 验证码图片 */
      .captcha {
        height: 45px;
        img {
          width: 100%;
          height: 45px;
        }
      }
      /* 复选框 */
      .el-checkbox {
        display: flex;
        align-items: center;
        color: #999999;
        /* 复选框文字 */
        .checked_text {
          color: #999999;
          display: flex;
          align-items: center;
        }
      }
      /* 底部按钮 */
      .el-button {
        width: 100%;
        margin: 0;
        margin-top: 28px;
      }
    }
  }
  /* 注册盒子 */
  .el-dialog {
    width: 600px;
    height: 786px;
    /* 注册盒子表单头部 */
    .el-dialog__header {
      box-sizing: border-box;
      padding: 15px;
      width: 100%;
      height: 53px;
      font-size: 18px;
      background: linear-gradient(225deg, #1493fa, #01c6fa);
      .el-dialog__title {
        color: #fff;
      }
    }
    /* 注册盒子表单主体 */
    .el-dialog__body {
      padding: 30px 26px;
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .el-form-item {
        margin-bottom: 24px;
      }
      /* 头像框 */
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
}
</style>
