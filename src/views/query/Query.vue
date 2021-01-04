<template>
  <el-container>
    <el-aside width="250px">
      <my-menu></my-menu>
    </el-aside>
    <el-main> </el-main>
  </el-container>
</template>

<script>
import MyMenu from 'components/common/mymenu/MyMenu'
export default {
  name: 'Query',
  data() {
    return {}
  },
  components: {
    MyMenu
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  // background-color: red;
  .el-aside {
    height: 100%;
    // background-color: #00378e;
  }
}
</style>
