<template>
  <div>
    <el-table :data="realData" height="100%" style="width: 100%" align="center">
      <el-table-column type="index" align="center" label="#" width="40"> </el-table-column>
      <el-table-column
        prop="localPort"
        label="检测端口"
        align="center"
        width="160"
      ></el-table-column>
      <el-table-column
        prop="dateTime"
        label="检测时间"
        align="center"
        width="140"
      ></el-table-column>
      <el-table-column prop="isAlarm" label="是否报警" align="center">
        <template slot-scope="scope">
          <i v-if="scope.row.isAlarm" class="iconfont icon-alarm alertIcon"></i>
          <i v-else class="iconfont icon-alarm normalIcon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="alarmInfo" label="报警详情" align="center"> </el-table-column>
      <el-table-column label="详情管理" align="center" width="130">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="详情处理" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="small"
              :disabled="scope.row.isAlarm == false"
              @click="dealDialog(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="忽略警报" placement="top">
            <el-button
              type="danger"
              icon="el-icon-setting"
              size="small"
              :disabled="scope.row.isAlarm == false"
              @click="ignoreAlarm(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="isDeal" label="处理状态" align="center">
        <template slot-scope="scope">
          <!--
                      1. 正常情况：isAlarm === false && dealStatus === 'normal'
                      2. 忽略处理：isAlarm === true  && dealStatus === 'ignore'
                      3. 正在处理：isAlarm === true  && dealStatus === 'processing'
                      4. 未经处理：isAlarm === true  && dealStatus === 'pending'
                     -->
          <el-tag
            v-if="scope.row.isAlarm === false && scope.row.dealStatus === 'normal'"
            type="success"
            effect="dark"
            >正常情况</el-tag
          >
          <el-tag
            v-if="scope.row.isAlarm === true && scope.row.dealStatus === 'ignore'"
            type="info"
            effect="dark"
            >忽略处理</el-tag
          >
          <el-tag
            v-else-if="scope.row.isAlarm === true && scope.row.dealStatus === 'processing'"
            type="warning"
            effect="dark"
            >正在处理</el-tag
          >
          <el-tag
            v-else-if="scope.row.isAlarm === true && scope.row.dealStatus === 'pending'"
            type="danger"
            effect="dark"
            >未经处理</el-tag
          >
        </template>
      </el-table-column> </el-table
    ><!-- 详情管理的dialog实现 -->
    <el-dialog
      title="报警详情处理"
      :visible.sync="dialogVisible"
      width="1400px"
      @close="dialogClosed"
      center
    >
      <el-form ref="dialogFormRef" :model="dialogFormData" label-width="70px" :inline="true">
        <el-form-item label="监测序号">
          <el-input v-model="dialogFormData.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="监测端口">
          <el-input v-model="dialogFormData.localPort" style="width: 200px" disabled></el-input>
        </el-form-item>
        <el-form-item label="检测时间">
          <el-input v-model="dialogFormData.dateTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="报警详情">
          <el-input v-model="dialogFormData.alarmInfo" disabled></el-input>
        </el-form-item>
        <el-form-item label="处理状态">
          <el-select
            v-model="dialogFormData.dealStatus"
            placeholder="请选择报警处理状态"
            :disabled="dialogFormData.dealStatus === 'ignore'"
          >
            <el-option value="ignore" label="忽略处理" disabled></el-option>
            <el-option value="pending" label="未经处理"></el-option>
            <el-option value="processing" label="已经处理"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="dialoImgArea">
        <div class="dialogImgColum">
          <panel :title="imgDate[0].title">
            <img :src="imgDate[0].url" alt="" />
          </panel>
        </div>
        <div class="dialogImgColum">
          <panel :title="imgDate[0].title">
            <img :src="imgDate[0].url" alt="" />
          </panel>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogEnsure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PanelTable',
  data() {
    return {
      dialogVisible: false,
      dialogFormData: ''
    }
  },
  props: {
    imgDate: Array,
    realData: Array
  },
  components: {},
  methods: {
    dealDialog(alarmData) {
      if (alarmData.isAlarm === false) {
        this.$message.success('监控无异常，无需任何操作')
      }
      this.dialogFormData = alarmData
      this.dialogVisible = !this.dialogVisible
    },
    async ignoreAlarm(alarmData) {
      if (alarmData.isAlarm === true) {
        // 当按下详情处理时给一个message消息提示
        const confirmResult = await this.$confirm('本日内将不再预警此类型，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        // 如果用户确认删除，则返回值为字符串 confirm
        // 如果用户取消了删除，则返回值为字符串 cancel
        // console.log(confirmResult)
        if (confirmResult !== 'confirm') {
          return this.$message.info('未忽略预警信息')
        }
        alarmData.dealStatus = 'ignore'
        return this.$message.info('以忽略预警信息')
      }
    },
    dialogClosed() {
      console.log('dialog关闭...')
    },
    dialogEnsure() {
      this.dialogVisible = false
      console.log('dialog确定事件')
    }
  },
  created() {},
  mounted() {}
}
</script>

<style lang="less" scoped>
// table 绝对定位 父级相对定位
.el-table {
  position: absolute;
  color: #fff;
  font-size: 12px;
}
.el-table,
.el-table__expanded-cell {
  background-color: transparent;
}
// 解决表格头部问题
.el-table /deep/ th {
  background-color: transparent !important;
  padding: 0;
  margin: 0px;
  text-align: center;
  color: #fff;
}
.el-table /deep/ tr {
  background-color: transparent !important;
  padding: 0;
  margin: 0px;
  text-align: center;
}
.el-table--enable-row-transition /deep/ .el-table__body td,
.el-table .cell {
  background-color: transparent;
  padding: 5px 0;
  margin: 0px;
  text-align: center;
}
/* 去掉最下面的那一条线 */
.el-table::before {
  height: 0px;
}

/* 去掉上面的线 */
.el-table /deep/ th.is-leaf {
  border-bottom: 2px solid green;
}

/* 去掉中间数据的分割线 */
/deep/ .el-table__row > td {
  border-bottom: 1px solid #6699cc;
}

// 滚动条的宽度
/deep/ .el-table__body-wrapper::-webkit-scrollbar {
  width: 5px; // 横向滚动条
  height: 5px; // 纵向滚动条 必写
  text-align: center;
}
// 滚动条的滑块
/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #02d8fa;
  border-radius: 30px;
}
// 鼠标滑过的效果
.el-table /deep/ tbody tr:hover > td {
  background-color: rgba(33, 33, 33, 0.5) !important;
}
.alertIcon {
  font-size: 20px;
  color: red;
  font-weight: bold;
}
.normalIcon {
  font-size: 20px;
  color: #00cc00;
  font-weight: bold;
}
img {
    width: 100%;
    height: 100%;
  }
.dialoImgArea {
  height: 500px;
  // background-color:red;
  display: flex;
  .dialogImgColum {
    flex: 1;
    margin: 5px;
  }
}
</style>
