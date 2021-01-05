<template>
  <el-tabs v-model="activePath" @tab-click="handleClick">
    <el-tab-pane label="面板管理" name="panel"></el-tab-pane>
    <el-tab-pane label="实时检测" name="detect"></el-tab-pane>
    <el-tab-pane label="历史查询" name="query/main"></el-tab-pane>
    <el-tab-pane label="信息统计" name="statistics/main"></el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: 'BarComponent',
  data() {
    return {
      activePath: 'detect'
    }
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push('/' + tab.name)
      window.sessionStorage.setItem('activePath', tab.name)
      this.activePath = tab.name
    }
  },
  created() {
    this.activePath = window.sessionStorage.getItem('activePath')
    if (this.activePath == null) {
      this.activePath = 'detect'
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-tabs__header {
  margin: 0 0 0;
}
/deep/ .el-tabs__item {
  color: #aaddff;
  height: 30px;
  line-height: 30px;
  font-weight: 500;
}
/deep/ .el-tabs__nav-wrap::after {
  background-color: #1674c4;
}

/deep/ .el-tabs__active-bar {
  background-color: #fff;
}
</style>
