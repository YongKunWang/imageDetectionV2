<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面板管理</el-breadcrumb-item>
      <el-breadcrumb-item>信息统计</el-breadcrumb-item>
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
          <el-button icon="el-icon-search" :disabled="buttonDis" @click="getData"></el-button>
        </el-col>
      </el-row>
      <!-- 页面切换 -->
      <div class="statistics-view">
        <analyse></analyse>
      </div>
    </el-card>
  </div>
</template>

<script>
import { historyTableData } from 'common/Statistics.js'
import Analyse from 'views/statistics/Analyse'
// import * as echarts from 'echarts'

export default {
  name: 'MainStatistics',
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
      tableData: ''
    }
  },
  components: {
    Analyse
  },
  methods: {
    // 只有选择了日期，后续的按键才能够起作用的
    chooseRangeTime() {
      if (this.rangeTime == null) {
        this.buttonDis = true
        return
      }
      // console.log(this.rangeTime == null)
      // console.log(this.rangeTime.length)
      this.buttonDis = true
      if (this.rangeTime.length === 2) {
        this.buttonDis = false
      }
    },
    getData() {
      console.log('按键开始了...')
      this.tableData = historyTableData
    }
  }
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
.statistics-view {
  margin-top: 15px;
}
</style>
