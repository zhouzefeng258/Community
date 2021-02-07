<template>
  <div>
    <el-dialog :title="title"
               :visible.sync="dialogVisible"
               :before-close="hide"
               :close-on-click-modal="false">
      <el-form label-width="70px"
               :model="userForm"
               ref="userForm"
               :rules="ruler">
        <el-form-item label="用户名"
                      prop="userName">
          <el-input v-model="userForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="passWord">
          <el-input v-model="userForm.passWord"
                    type="password"></el-input>
        </el-form-item>
        <el-form-item label="姓名"
                      prop="Name">
          <el-input v-model="userForm.Name"></el-input>
        </el-form-item>
        <el-form-item label="性别"
                      prop="Sex">
          <!-- <el-input v-model="regFrom.Sex"></el-input> -->
          <el-select v-model="userForm.Sex"
                     placeholder="请选择">
            <el-option label="男"
                       value="男">
            </el-option>
            <el-option label="女"
                       value="女">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话"
                      prop="Tel">
          <el-input v-model="userForm.Tel"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer"
           class="dialog-footer">
        <el-button @click="hide()">取 消</el-button>
        <el-button type="primary"
                   @click="submituserForm('userForm')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
export default {
  props: ['dialogVisible', 'ApiInterface', 'dialogData', 'title', 'operationType'],
  data () {
    var checkUserName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('用户名不能为空'))
      } else {
        callback()
      }
    }
    var checkPassWord = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不能为空'))
      } else {
        callback()
      }
    }
    var checkPassWord2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('确认密码不能为空'))
      } else if (value !== this.regForm.passWord) {
        callback(new Error('两次输入的密码不相等'))
      } else {
        callback()
      }
    }
    var checkSex = (rule, value, callback) => {
      if (!value) {
        callback(new Error('性别不能为空'))
      } else {
        callback()
      }
    }
    var checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('姓名不能为空'))
      } else {
        callback()
      }
    }
    var checkTel = (rule, value, callback) => {
      if (!value) {
        callback(new Error('电话不能能为空'))
      } else {
        callback()
      }
    }
    return {
      userForm: {},
      i: 0,
      j: 0,
      formLabelWidth: '120px',
      show: false,
      ruler: {
        userName: [
          { validator: checkUserName, trigger: 'blur' }
        ],
        passWord: [
          { validator: checkPassWord, trigger: 'blur' }
        ],
        passWord2: [
          { validator: checkPassWord2, trigger: 'blur' }
        ],
        Name: [
          { validator: checkName, trigger: 'blur' }
        ],
        Sex: [
          { validator: checkSex, trigger: 'blur' }
        ],
        Tel: [
          { validator: checkTel, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    hide () {
      this.$refs.userForm.clearValidate()
      this.$refs.userForm.resetFields()
      this.$emit('hideDialog')
    },
    submituserForm (userForm) {
      this.$refs[userForm].validate((valid) => {
        if (valid) {
          if (this.operationType) {
            this.updateUser()
          } else {
            this.addUser()
          }
        } else {
          return false
        }
      })
    },
    addUser () {
      if (this.ApiInterface) {
        this.ApiInterface(this.userForm).then(data => {
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
    updateUser () {
      if (this.ApiInterface) {
        this.ApiInterface(this.userForm).then(data => {
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
    getUserFrom () {
      let data = {}
      if (this.operationType) {
        data.id = this.dialogData.Admin_ID
        data.userName = this.dialogData.Admin_Username
        data.passWord = this.dialogData.Admin_Password
        data.Name = this.dialogData.Admin_Name
        data.Sex = this.dialogData.Admin_Sex
        data.Tel = this.dialogData.Admin_Tel
        return data
      } else {
        data.userName = ''
        data.passWord = ''
        data.Name = ''
        data.Sex = ''
        data.Tel = ''
        return data
      }
    }
  },
  created () {
    this.userForm = this.getUserFrom()
  }

}
</script>
