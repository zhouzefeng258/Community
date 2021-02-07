<template>
  <div>
    <el-dialog :title="title"
               :visible.sync="dialogVisible"
               :before-close="hide"
               :close-on-click-modal="false"
               width="50%">
      <el-form label-width="70px"
               :model="FormData"
               ref="FormData"
               :rules="rules"
               label-position="top"
               class="eldialog">
        <el-row>
          <el-col :span="24">
            <el-form-item label="公告标题"
                          prop="announcementTitle">
              <el-input v-model="FormData.announcementTitle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="公告内容"
                          prop="announcement">
              <!-- <el-input v-model="FormData.announcement"
                        type="textarea"
                        :rows="5"></el-input> -->
              <Editor v-model="FormData.announcement"
                      ref="editor" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="18">
            <el-form-item label="社团"
                          prop="passWord">
              <el-input v-model="FormData.passWord"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="!operationType">
          <el-col :span="18">
            <el-form-item label="发布人"
                          prop="studentId">
              <el-input v-model="FormData.studentId"></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->

        <!-- <el-row>
          <el-col :span="6">
            <el-form-item label="账户等级">
              <el-input v-model="FormData.jurisdiction"
                        readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="hide()">取 消</el-button>
        <el-button type="primary"
                   @click="submituserForm('FormData')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ['dialogVisible', 'ApiInterface', 'dialogData', 'title', 'operationType'],
  components: {
    Editor: () => import('../public/Editor')
  },
  data () {
    return {
      FormData: {},
      userInfo: {},
      clubInfo: {},
      i: 0,
      j: 0,
      formLabelWidth: '120px',
      show: false,
      rules: {
        announcementTitle: [
          { required: true, message: '请输入公告标题', trigger: 'blur' }
        ],
        announcement: [
          { required: true, message: '请输入公告内容', trigger: 'blur' }
        ]
        // passWord: [
        //   { required: true, message: '请输入密码', trigger: 'blur' }
        // ],
        // studentId: [
        //   { required: true, message: '请输入学号', trigger: 'blur' },
        //   { min: 10, max: 10, message: '请输入正确的学号', trigger: 'blur' }
        // ],
        // jurisdiction: [
        //   { required: true, message: '请选择权限', trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {
    hide () {
      this.$refs.FormData.clearValidate()
      this.$refs.FormData.resetFields()
      this.$emit('hideDialog')
    },
    submituserForm (FormName) {
      this.$refs[FormName].validate((valid) => {
        if (valid) {
          if (this.operationType) {
            this.updateData()
          } else {
            this.addData()
          }
        } else {
          return false
        }
      })
    },
    addData () {
      if (this.ApiInterface) {
        this.ApiInterface(this.FormData).then(data => {
          if (data.code === 200) {
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            })
            this.hide()
            this.$emit('updateTable', 1)
          } else if (data.code === 401) {
            this.$message({
              showClose: true,
              message: data.message,
              type: 'error'
            })
          } else {
            this.$message({
              showClose: true,
              message: '添加失败',
              type: 'error'
            })
          }
        })
      }
    },
    updateData () {
      if (this.ApiInterface) {
        console.log(this.FormData)
        this.ApiInterface(this.FormData).then(data => {
          if (data.code === 200) {
            this.$message({
              showClose: true,
              message: '更新成功',
              type: 'success'
            })
            this.hide()
            this.$emit('updateTable', 0)
          } else {
            this.$message({
              showClose: true,
              message: data.message,
              type: 'error'
            })
          }
        })
      }
    },
    getFormData () {
      let data = {}
      if (this.operationType) {
        data = this.dialogData
        console.log(data)
        return data
      } else {
        data = {
          clubName: '',
          announcementTitle: '',
          issuer: '',
          announcement: ''
        }
        return data
      }
    },
    getUserInfo () {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    },
    getMyClubInfo () {
      this.clubInfo = JSON.parse(sessionStorage.getItem('myCommunityInfo'))
    }
  },
  created () {
    this.FormData = this.getFormData()
    this.getUserInfo()
    if (this.userInfo.jurisdiction === 2 && !this.operationType) {
      this.getMyClubInfo()
      this.FormData.clubName = this.clubInfo.clubName
      this.FormData.issuer = this.userInfo.name
    }
  }

}
</script>
<style  scoped>
.eldialog {
  margin-left: 25px;
  margin-right: 25px;
}
</style>
