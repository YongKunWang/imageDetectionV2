<template>
  <el-container id="home-view">
    <el-header>
      <nav-bar>
          <user-component slot="user-slot"></user-component>
          <date-component slot="date-slot"></date-component>
          <bar-component slot="bar-slot"></bar-component>
        </nav-bar>
    </el-header>
    <el-main :style="mainHeight">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import UserComponent from 'components/common/navbar/UserComponent'
import DateComponent from 'components/common/navbar/DateComponent'
import BarComponent from 'components/common/navbar/BarComponent'

export default {
  name: 'Home',
  data() {
    return {
      mainHeight: {
        height: ''
      }
    }
  },
  components: {
    NavBar,
    UserComponent,
    DateComponent,
    BarComponent
  },
  methods: {
    reSetSize() {
      this.mainHeight.height = parseInt(`${document.documentElement.clientHeight}`) - 80 + 'px'
    }
  },
  created() {
    this.reSetSize()
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.reSetSize()
    }, false)
  }
}
</script>

<style lang="less" scoped>
#home-view {
  background: url('~assets/img/home/bodyBgc1.png') no-repeat center;
  background-size: 100% 100%;
  height: 100%;

  .el-header {
    width: 100%;
    height: 80px !important;
    padding: 0;
    // background-color: green;
  }
  .el-main {
    padding: 5px;
    // background-color: red;
  }
}
</style>
