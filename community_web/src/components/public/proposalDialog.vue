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
          <el-form-item label="手机">
            <el-col :span="14">
              <el-input v-model="applyData.user_phone"
                        readonly></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-col :span="14">
              <el-input v-model="applyData.user_email"
                        readonly></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="建议内容">
            <el-col :span="20">
              <el-input v-model="applyData.user_proposal"
                        type="textarea"
                        readonly
                        rows="8"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="hide()">关闭</el-button>
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
    }
    // adopt () {
    //   this.makeReqest('pass')
    // },
    // veto () {
    //   this.makeReqest('fail')
    // },
    // makeReqest (type) {
    //   if (this.ApiInterface) {
    //     console.log(this.applyData)
    //     this.ApiInterface({ clubInfo: this.applyData, type: type }).then(data => {
    //       console.log(data)
    //       if (data.code === 200) {
    //         this.$message({
    //           showClose: true,
    //           message: '操作成功',
    //           type: 'success'
    //         })
    //         this.hide()
    //         this.$emit('updateTable', 3)
    //       } else if (data.code === 400) {
    //         this.$message({
    //           showClose: true,
    //           message: data.message,
    //           type: 'error'
    //         })
    //       }
    //     })
    //   }
    // }

  },
  created () {
    this.applyData = this.getApplyData()
    console.log(this.applyData)
  }

}
</script>
