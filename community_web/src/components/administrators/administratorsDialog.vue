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
            <el-form-item label="用户名"
                          prop="userName">
              <el-input v-model="FormData.userName"></el-input>
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
            <el-form-item label="密码"
                          prop="passWord">
              <el-input v-model="FormData.passWord"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="FormData.jurisdiction===2 &&!operationType">
          <el-col :span="18">
            <el-form-item label="学号"
                          prop="studentId">
              <el-input v-model="FormData.studentId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="!operationType">
          <el-col :span="18">
            <el-form-item label="权限"
                          prop="jurisdiction">
              <el-select v-model="FormData.jurisdiction"
                         placeholder="请选择">
                <el-option label="超级管理员"
                           :value='1'>
                </el-option>
                <el-option label="社团管理员"
                           :value='2'>
                </el-option>
              </el-select>
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
          { required: true, message: '请输入正确的名字', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'change' }
        ],
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        studentId: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { min: 10, max: 10, message: '请输入正确的学号', trigger: 'blur' }
        ],
        jurisdiction: [
          { required: true, message: '请选择权限', trigger: 'blur' }
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
          name: '',
          userName: '',
          passWord: '',
          studentId: '',
          jurisdiction: 1
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
