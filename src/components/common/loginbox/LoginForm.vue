<!--
  此组件使用了绝对定位
-->
<template>
  <el-form
    ref="loginFormRef"
    :model="loginForm"
    :rules="loginRules"
    label-width="0px"
    id="login-form"
  >
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" prefix-icon="iconfont icon-seeuser"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" prefix-icon="iconfont icon-password"></el-input>
    </el-form-item>
    <el-form-item class="login-btns">
      <el-button type="primary" @click="submitLoginForm">登录</el-button>
      <el-button @click="resetLoginForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      loginRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitLoginForm() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        this.$message.success('登陆成功!')
        // 登录完成以后实现跳转主页
        this.$router.push('/home')
      })
    },
    resetLoginForm() {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    }
  },
  created() {},
  mounted() {}
}
</script>

<style lang="less" scoped>
#login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  .login-btns {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
