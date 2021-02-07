<template>
  <div>
    <el-dialog :title="title"
               :visible.sync="dialogVisible"
               :before-close="hide"
               :close-on-click-modal="false"
               width="30%">
      <el-form label-width="70px"
               :model="FormData"
               ref="FormData"
               :rules="rules">
        <el-row>
          <el-col :span="18">
            <el-form-item label="昵称">
              <el-input v-model="FormData.nickName"
                        readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="姓名"
                          prop="name">
              <el-input v-model="FormData.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="性别"
                          prop="sex">
              <!-- <el-input v-model="regFrom.Sex"></el-input> -->
              <el-select v-model="FormData.sex"
                         placeholder="请选择">
                <el-option label="男"
                           value='男'>
                </el-option>
                <el-option label="女"
                           value='女'>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="分院/系"
                          prop="department">
              <el-select v-model="FormData.department"
                         placeholder="请选择">
                <el-option label="信息与机电工程分院"
                           value="信息与机电工程分院">
                </el-option>
                <el-option label="医药与健康分院"
                           value="医药与健康分院">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="班级"
                          prop="class">
              <el-input v-model="FormData.class"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="学号"
                          prop="studentId">
              <el-input v-model="FormData.studentId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="社团">
              <el-input v-model="FormData.communityName"
                        readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
  data () {
    return {
      FormData: {},
      i: 0,
      j: 0,
      formLabelWidth: '120px',
      show: false,
      rules: {
        name: [
          { required: true, message: '请输入活动标题', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 3 到 6 个字符', trigger: 'change' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择分院/系', trigger: 'blur' }
        ],
        class: [
          { required: true, message: '请输入班级', trigger: 'blur' }
        ],
        studentId: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { min: 10, max: 10, message: '请输入正确的学号', trigger: 'blur' }
        ],
        communityName: [
          // { required: true, message: '请输入活动的人数', trigger: 'blur' }
        ],
        jurisdiction: [
          // { required: true, message: '请选择活动的进行状态', trigger: 'blur' }
        ]
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
          this.updateData()
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
        this.ApiInterface({ wxUserInfo: this.FormData }).then(data => {
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
          name: '',
          sex: '',
          department: '',
          class: '',
          studentId: '',
          communityName: '',
          jurisdiction: ''
        }
        return data
      }
    }
  },
  created () {
    this.FormData = this.getFormData()
  }

}
</script>
