<template>
  <el-menu
    :default-active="this.$route.path"
    background-color="#00378e"
    text-color="#fff"
    active-text-color="#409EFF"
    unique-opened
    :router="true"
  >
    <el-menu-item v-for="item in menulist" :key="item.id" :index="'/' + item.path">
      <i class="el-icon-menu"></i>
      <span slot="title">{{ item.name }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AsideMenu',
  props: {
    menulist: Array
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
.el-menu {
  border-right: none;
}
</style>
