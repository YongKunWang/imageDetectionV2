<template>
  <el-container>
    <el-aside width="250px">
      <aside-menu :menulist="mymenulist"></aside-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import AsideMenu from 'components/common/asidemenu/AsideMenu'

import { menulistStatistics } from 'common/mymenulist.js'
export default {
  name: 'Statistics',
  data() {
    return {
      mymenulist: menulistStatistics
    }
  },
  components: {
    AsideMenu
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  // background-color: red;
  .el-aside {
    height: 100%;
    background-color: #00378e;
  }
}
</style>
