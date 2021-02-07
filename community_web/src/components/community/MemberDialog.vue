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
          <el-form-item label="申请人">
            <el-col :span="14">
              <el-input v-model="applyData.name"
                        readonly></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="学号">
            <el-col :span="14">
              <el-input v-model="applyData.studentId"
                        readonly></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="申请理由">
            <el-col :span="20">
              <el-input v-model="applyData.reason"
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
                   v-if="serchData.type==='待审批'">通过</el-button>
        <el-button @click="veto()"
                   v-if="serchData.type==='待审批'">不通过</el-button>
        <el-button @click="hide()"
                   v-if="serchData.type!='待审批'">关闭</el-button>
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
      this.makeReqest('已通过')
    },
    veto () {
      this.makeReqest('未通过')
    },
    makeReqest (type) {
      if (this.ApiInterface) {
        console.log(this.applyData)
        this.ApiInterface({ applyData: this.applyData, type: type }).then(data => {
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
            this.hide()
            this.$emit('updateTable', 3)
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
