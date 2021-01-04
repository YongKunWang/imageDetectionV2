<template>
  <el-row :gutter="0" id="detect-view">
    <el-col :span="6">
      <el-row class="panel-container">
        <panel :title="imgDate[0].title">
          <img :src="imgDate[0].url" alt="" />
        </panel>
      </el-row>
      <el-row class="panel-container">
        <panel :title="imgDate[1].title">
          <img :src="imgDate[1].url" alt="" />
        </panel>
      </el-row>
      <el-row class="panel-container">
        <panel :title="imgDate[2].title">
          <img :src="imgDate[2].url" alt="" />
        </panel>
      </el-row>
    </el-col>
    <el-col :span="12">
      <el-row class="panel-up">
        <panel :title="imgDate[0].title">
          <img :src="imgDate[0].url" alt="" />
        </panel>
      </el-row>
      <el-row class="table-down">
        <panel title="实时监测结果">
          <panel-table :imgDate="imgDate" :realData="realData"></panel-table>
        </panel>
      </el-row>
    </el-col>
    <el-col :span="6">
      <el-row class="panel-container">
        <panel :title="imgDate[3].title">
          <img :src="imgDate[3].url" alt="" />
        </panel>
      </el-row>
      <el-row class="panel-container">
        <panel :title="imgDate[4].title">
          <img :src="imgDate[4].url" alt="" />
        </panel>
      </el-row>
      <el-row class="panel-container">
        <panel :title="imgDate[5].title">
          <img :src="imgDate[5].url" alt="" />
        </panel>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import Panel from 'components/common/panel/Panel'
import PanelTable from 'components/common/panel/PanelTable'
import { imgDate, realTableData } from 'common/detect.js'

export default {
  name: 'Detect',
  data() {
    return {
      imgDate: imgDate,
      realData: realTableData
    }
  },
  components: {
    Panel,
    PanelTable
  },
  methods: {},
  created() {},
  mounted() {}
}
</script>

<style lang="less" scoped>
#detect-view {
  height: 100%;
  width: 100%;
  // background-color: green;
  .el-col {
    height: 100%;
  }
  .panel-container {
    height: 33.3%;
    // background-color: red;
    &:nth-child(2) {
      padding: 5px 0;
    }
  }
  .panel-up {
    padding: 0 5px 5px;
    height: 60%;
    // background-color: green;
  }
  .table-down {
    padding: 0 5px 0;
    height: 40%;
    width: 100%;
    // background-color: blue;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
