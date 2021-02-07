<template>
  <div class="con">
    <div class="log-con">
      <el-card class="box-card">
        <div slot="header"
             class="clearfix">
          <span>登陆</span>
        </div>
        <div>
          <el-form label-width="55px"
                   :model="logForm"
                   :rules="ruler"
                   ref="logFrom">
            <el-form-item label="账号"
                          prop="userName">
              <el-input v-model="logForm.userName"
                        placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码"
                          prop="passWord">
              <el-input type="password"
                        v-model="logForm.passWord"
                        placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="身份"
                          prop="jurisdiction">
              <el-select v-model="logForm.jurisdiction"
                         placeholder="请选择"
                         style="width:100%">
                <el-option label="系统管理员"
                           value="1">
                </el-option>
                <el-option label="社团管理员"
                           value="2">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label-width="0px"
                          class="center">
              <el-button type="primary"
                         size="medium"
                         @click="submitForm('logFrom')">登陆</el-button>
              <el-button @click="change">注册</el-button>
            </el-form-item>
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
    var checkJurisdiction = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请选择登陆的身份'))
      } else {
        callback()
      }
    }
    return {
      logForm: {
        userName: '',
        passWord: '',
        jurisdiction: '1'
      },
      ruler: {
        userName: [
          { validator: checkUserName, trigger: 'blur' }
        ],
        passWord: [
          { validator: checkPassWord, trigger: 'blur' }
        ],
        jurisdiction: [
          { validator: checkJurisdiction, trigger: 'blur' }
        ]
      }
    }
    // 表单校验的函数
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },
    login () {
      api.Login(this.logForm).then(async data => {
        if (data.code === 1) {
          await sessionStorage.setItem('userInfo', JSON.stringify(data.list))
          this.$router.push('/index')
          this.$message({
            message: '登陆成功',
            type: 'success'
          })
        } else {
          this.$message.error(data.message)
        }
      })
    },
    change () {
      this.$router.push({
        path: '/reg'
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
.center {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}
.link {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
