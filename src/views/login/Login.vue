<template>
  <div id="login-view">
    <login-box title="宝钢电厂雨排口污染物泄漏图像预警系统">
      <login-form></login-form>
    </login-box>
  </div>
</template>

<script>
import LoginBox from 'components/common/loginbox/LoginBox'
import LoginForm from 'components/common/loginbox/LoginForm'
export default {
  name: 'Login',
  data() {
    return {}
  },
  methods: {},
  created() {},
  mounted() {},
  components: {
    LoginBox,
    LoginForm
  }
}
</script>

<style lang="less" scoped>
#login-view {
  // login-box设置了绝对定位！
  // 子绝父相
  position: relative;
  background: url('~assets/img/login/bgc1.jpg') no-repeat center;
  background-size: 100% 100%;
  height: 100%;
}
</style>
