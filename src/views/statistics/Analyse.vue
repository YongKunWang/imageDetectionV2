<template>
  <div :style="mainHeight">
    <el-row>
      <el-col :span="12" class="analyse-table">
        <analyse-table :tableData="AnalyseTableData"></analyse-table>
      </el-col>
      <el-col :span="12" class="analyse-charts">
        <el-row class="analyse-pie">
          <div id="pie-area"></div>
        </el-row>
        <el-row class="analyse-bar">
          <div id="bar-area"></div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AnalyseTable from 'views/statistics/AnalyseTable'
import { historyTableData } from 'common/Statistics.js'

import * as echarts from 'echarts'

export default {
  name: 'Analyse',
  data() {
    return {
      mainHeight: {
        height: ''
      },
      AnalyseTableData: historyTableData,
      pieAreaOptions: {
        title: {
          text: '异常情况统计',
          subtext: 'No.27WD纬五路电三路-2',
          // title 组件离容器左侧的距离
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
          formatter: '{a} <br />{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          data: [
            '黑色油污',
            '黑色油毡',
            '黄色油毡',
            '水位过低',
            '轻微漂浮物',
            '漂浮物',
            '正常',
            '白色油毡',
            '其他'
          ]
        },
        series: [
          {
            name: '场景分析',
            type: 'pie',
            // 饼图的半径
            radius: '50%',
            // 饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
            center: ['50%', '50%'],
            // 选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，
            // 字符串取值可选'single'，'multiple'，分别表示单选还是多选。
            selectedMode: 'single',
            data: [
              { value: 1, name: '黑色油污' },
              { value: 2, name: '黑色油毡' },
              { value: 3, name: '黄色油毡' },
              { value: 4, name: '水位过低' },
              { value: 5, name: '轻微漂浮物' },
              { value: 6, name: '漂浮物' },
              { value: 7, name: '正常' },
              { value: 8, name: '白色油毡' },
              { value: 9, name: '其他' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      barAreaOptions: {
        title: {
          text: '每天异常统计分析',
          subtext: 'No.27WD纬五路电三路-2',
          left: 'center'
        },
        tooltip: {
          show: true, // ---是否显示提示框,默认为true
          trigger: 'item', // ---数据项图形触发
          axisPointer: {
            // ---指示样式
            type: 'shadow',
            axis: 'auto'
          },
          padding: 5,
          textStyle: {
            // ---提示框内容样式
            color: '#fff'
          }
        },

        xAxis: {
          type: 'category',
          data: [
            '2021-01-01',
            '2021-01-02',
            '2021-01-03',
            '2021-01-04',
            '2021-01-05',
            '2021-01-06',
            '2021-01-07',
            '2021-01-08',
            '2021-01-09',
            '2021-01-10'
          ],
          axisTick: { show: false }, // 隐藏刻度
          axisLine: { show: false } // 单独隐藏坐标线
        },
        yAxis: {
          type: 'value',
          axisTick: { show: false }, // 隐藏刻度
          axisLine: { show: false } // 单独隐藏坐标线
        },
        series: [
          {
            name: '每天异常分析',
            type: 'bar',
            legendHoverLink: true,
            data: [10, 2, 4, 5, 0, 2, 6, 1, 3, 7],
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(255, 255, 255, 0)'
            },
            itemStyle: {
              // ---图形形状
              color: '#3189cf',
              barBorderRadius: [18, 18, 0, 0]
            },
            barWidth: '20', // ---柱形宽度
            barCategoryGap: '20%' // ---柱形间距
          }
        ]
      }
    }
  },
  components: {
    AnalyseTable
  },
  methods: {
    reSetSize() {
      this.mainHeight.height = parseInt(`${document.documentElement.clientHeight}`) - 260 + 'px'
    }
  },
  created() {
    this.reSetSize()
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var pieArea = echarts.init(document.getElementById('pie-area'))
    var barArea = echarts.init(document.getElementById('bar-area'))
    pieArea.setOption(this.pieAreaOptions)
    barArea.setOption(this.barAreaOptions)

    window.addEventListener(
      'resize',
      () => {
        this.reSetSize()
        pieArea.resize()
        barArea.resize()
      },
      false
    )
  }
}
</script>

<style lang="less" scoped>
.el-row {
  height: 100%;
  // background-color: red;
  .analyse-table {
    height: 100%;
    // background-color: green;
    position: relative;
  }
  .analyse-charts {
    height: 100%;
    // background-color: red;
  }
  .analyse-pie {
    height: 50%;
    // background-color: red;
    #pie-area {
      width: 100%;
      height: 100%;
      // background-color: red;
    }
  }
  .analyse-bar {
    height: 50%;
    // background-color: green;
    #bar-area {
      width: 100%;
      height: 100%;
      // background-color: green;
    }
  }
}
</style>
