<template>
  <div class="nav-bar">
    <div class="user-component"><slot name="user-slot"></slot></div>
    <div class="date-component"><slot name="date-slot"></slot></div>
    <div class="bar-component"><slot name="bar-slot"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="less" scoped>
.nav-bar {
  background: url('~assets/img/home/header1.png') no-repeat center;
  background-size: 100% 100%;
  height: 80px;
  position: relative;

  .user-component {
    position: absolute;
    right: 20px;
    top: 10px;
    // width: 92px;
    // height: 40px;
    // background-color: red;
  }
  .date-component {
    position: absolute;
    top: 58px;
    right: 10px;
    width: 180px;
    text-align: center;
    color: #fff;
    font-size: 14px;
  }
  .bar-component {
    position: absolute;
    bottom: 1px;
    left: 10px;
    // width: 300px;
    // height: 30px;
    // background-color: red;
    color: #fff;
  }
}
</style>
