<template>
  <div class="con">
    <div class="reg-con">
      <el-card class="box-card">
        <div slot="header"
             class="clearfix">
          <span>注册社团管理员账号</span>
        </div>
        <div>
          <el-form label-width="70px"
                   :model="regForm"
                   ref="regForm"
                   :rules="ruler">
            <el-form-item label="账号"
                          prop="userName">
              <el-input v-model="regForm.userName"
                        placeholder="请输入您的账号"></el-input>
            </el-form-item>
            <el-form-item label="密码"
                          prop="passWord">
              <el-input v-model="regForm.passWord"
                        type="password"
                        placeholder="请输入您的密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码"
                          prop="passWord2">
              <el-input v-model="regForm.passWord2"
                        type="password"
                        placeholder="请再次输入您的密码"></el-input>
            </el-form-item>
            <el-form-item label="学号"
                          prop="studentId">
              <el-input v-model="regForm.studentId"
                        type="text"
                        placeholder="请输入您创建社团时输入的学号"></el-input>
            </el-form-item>
            <el-form-item label="名字"
                          prop="name">
              <el-input v-model="regForm.name"
                        type="text"
                        placeholder="请输入您创建社团时输入的申请人名字"></el-input>
            </el-form-item>
            <div class="from-item">
              <el-button type="primary"
                         @click="submitForm('regForm')">注册</el-button>
              <el-button @click="change">登陆</el-button>
            </div>
          </el-form>
        </div>
        <div class="link">
          <p>还没有社团?</p>
          <el-link type="primary"
                   @click="toCreated">去申请社团</el-link>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import * as api from '../../api/index'
export default {
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
    var checkStudentId = (rule, value, callback) => {
      if (!value) {
        callback(new Error('学号不能为空'))
      } else {
        callback()
      }
    }
    var checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('名字不能为空'))
      } else {
        callback()
      }
    }
    // var checkName = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('姓名不能为空'))
    //   } else {
    //     callback()
    //   }
    // }
    // var checkTel = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('电话不能能为空'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      regForm: {
        userName: '',
        passWord: '',
        passWord2: '',
        studentId: '',
        name: ''
      },
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
        studentId: [
          { validator: checkStudentId, trigger: 'blur' }
        ],
        name: [
          { validator: checkName, trigger: 'blur' }
        ]
        // Sex: [
        //   { validator: checkSex, trigger: 'blur' }
        // ],
        // Tel: [
        //   { validator: checkTel, trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.reg()
        } else {
          return false
        }
      })
    },
    reg () {
      api.register(this.regForm).then(data => {
        console.log(data)
        if (data.code === 200) {
          this.$message({
            message: data.message,
            type: 'success'
          })
          this.change()
        } else {
          this.$message.error(data.message)
          this.$refs.regForm.resetFields()
        }
      })
    },
    change () {
      this.$router.push({
        path: '/'
      })
    },
    toCreated () {
      this.$router.push({
        path: '/create'
      })
    }
  }

}
</script>
<style  scoped>
.log-con {
  width: 400px;
  height: 500px;
}
.reg-con {
  width: 400px;
  height: 500px;
}
.from-item {
  width: 100%;
  margin-top: 25px;
  display: flex;
  justify-content: center;
}
.link {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
