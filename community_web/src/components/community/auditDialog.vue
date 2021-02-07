<template>
  <div id='auditDialog'>
    <el-dialog :title="title"
               :visible.sync="dialogVisible"
               :before-close="hide"
               :close-on-click-modal="false"
               width='30%'>
      <div class="dialog-body">
        <el-form label-width="formLabelWidth"
                 :model="applyData"
                 ref="userForm"
                 label-position="top">
          <el-form-item label="社团名">
            <el-col :span="14">
              <el-input v-model="applyData.clubName"
                        readonly></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="社团类型">
            <el-col :span="14">
              <el-input v-model="applyData.clubType"
                        readonly></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="所属分院">
            <el-col :span="14">
              <el-input v-model="applyData.department"
                        readonly></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="指导教师">
            <el-col :span="14">
              <el-input v-model="applyData.department"
                        readonly></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="社团负责人">
            <el-col :span="14">
              <el-input v-model="applyData.president"
                        readonly></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="负责人学号">
            <el-col :span="14">
              <el-input v-model="applyData.studentId"
                        readonly></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="申请理由">
            <el-col :span="20">
              <el-input v-model="applyData.Reason"
                        type="textarea"
                        readonly
                        rows="8"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button type="primary"
                   @click="adopt()"
                   v-if="serchData.type==='1'">通过</el-button>
        <el-button @click="veto()"
                   v-if="serchData.type==='1'">不通过</el-button>
        <el-button @click="hide()"
                   v-if="serchData.type!='1'">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style>
#auditDialog .el-form--label-top .el-form-item__label {
  padding: 0;
}
#auditDialog .el-form-item {
  margin-bottom: 10px;
}
#auditDialog .el-dialog__body {
  padding: 5px 20px;
}
#auditDialog .el-dialog {
  margin-top: 1vh !important;
}
</style>
<style scoped>
.dialog-body {
  width: 95%;
  margin-left: 5%;
}
</style>
<script>
export default {
  props: ['dialogVisible', 'ApiInterface', 'dialogData', 'title', 'operationType', 'serchData'],
  data () {
    return {
      applyData: {},
      i: 0,
      j: 0,
      formLabelWidth: '120px',
      show: false
    }
  },
  methods: {
    hide () {
      this.$emit('hideDialog')
    },
    getApplyData () {
      let data = {}
      data = this.dialogData
      return data
    },
    adopt () {
      this.makeReqest('pass')
    },
    veto () {
      this.makeReqest('fail')
    },
    makeReqest (type) {
      if (this.ApiInterface) {
        console.log(this.applyData)
        this.ApiInterface({ clubInfo: this.applyData, type: type }).then(data => {
          console.log(data)
          if (data.code === 200) {
            this.$message({
              showClose: true,
              message: '操作成功',
              type: 'success'
            })
            this.hide()
            this.$emit('updateTable', 3)
          } else if (data.code === 400) {
            this.$message({
              showClose: true,
              message: data.message,
              type: 'error'
            })
          }
        })
      }
    }

  },
  created () {
    this.applyData = this.getApplyData()
    console.log(this.applyData)
  }

}
</script>
