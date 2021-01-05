<!--
  1. 添加几个按钮 前进 后退 暂停
-->
<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面板管理</el-breadcrumb-item>
      <el-breadcrumb-item>历史查询</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $route.params.id }}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-date-picker
            v-model="rangeTime"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            value-format="yyyy-MM-dd-HH-mm-ss"
            @change="chooseRangeTime"
          >
          </el-date-picker>
          <!-- <el-button icon="el-icon-search"></el-button> -->
        </el-col>
        <el-col :span="4">
          <el-button type="primary" :disabled="buttonDis" @click="originQuery">原图查询</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" :disabled="buttonDis" @click="detectQuery">检测查询</el-button>
        </el-col>
      </el-row>
      <!-- 页面切换 -->
      <div class="swiper-view">
        <swiper :data="queryData"></swiper>
      </div>
    </el-card>
  </div>
</template>

<script>
import { originQuery, detectQuery } from 'common/query'

import Swiper from 'views/query/Swiper'
export default {
  name: 'MainQuery',
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      rangeTime: '',
      buttonDis: '',
      queryData: ''
    }
  },
  components: {
    Swiper
  },
  computed: {},
  watch: {},
  methods: {
    // 只有选择了日期，后续的按键才能够起作用的
    chooseRangeTime() {
      if (this.rangeTime == null) {
        this.buttonDis = true
        this.queryData = ''
        return
      }
      // console.log(this.rangeTime == null)
      // console.log(this.rangeTime.length)
      this.buttonDis = true
      if (this.rangeTime.length === 2) {
        this.buttonDis = false
      }
      this.queryData = ''
    },
    // 查询相应的原始图片！
    // 依靠2个参数：
    // 1. $route.param.id
    // 2. rangeTime
    originQuery() {
      console.log(this.$route.params.id, '原始图片')
      this.queryData = originQuery
    },
    // 查询检测后的图片
    // 依靠2个参数：
    // 1. $route.param.id
    // 2. rangeTime
    detectQuery() {
      console.log(this.$route.params.id, '检测后的图片')
      this.queryData = detectQuery
    }
  },
  created() {
    // console.log('创建了...')
  },
  beforeDestroy() {
    // console.log('即将销毁...')
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
/deep/ .el-breadcrumb__inner {
  color: #fff;
}
/deep/ .el-breadcrumb {
  margin-bottom: 15px;
}
/deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #fff;
}
.history-page {
  margin-top: 15px;
  font-size: 14px;
}
.swiper-view {
  margin-top: 15px;
}
</style>
