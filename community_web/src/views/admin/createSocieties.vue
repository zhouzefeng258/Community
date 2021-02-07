<template>
  <div class="pageCon"
       id="createSocieties">
    <el-container>
      <el-header>
        <div class="pageHead">
          <div class="headCon">
            <div class="logo"><img src="@/assets/logo.png"
                   width="45"
                   height="45" /></div>
            <div class="title">
              <span>信电科技社团管理系统</span>
            </div>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="pageMain">
          <div class="mianCon">
            <div class="mian-title">
              <span>申请创建社团</span>
            </div>
            <div class="mian-from">
              <div class="left">
                <el-form ref="form"
                         :model="form"
                         :rules="ruler"
                         label-width="100px">
                  <el-form-item label="社团名称"
                                prop="clubName">
                    <el-col :span="12">
                      <el-input v-model="form.clubName"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="社团类型"
                                prop="clubType">
                    <el-col :span="12">
                      <el-select v-model="form.clubType"
                                 placeholder="请选择社团类型">
                        <!-- <el-option label="文学类"
                                   value="文学类"></el-option>
                        <el-option label="科技类"
                                   value="科技类"></el-option>
                        <el-option label="艺术类"
                                   value="艺术类"></el-option>
                        <el-option label="体育类"
                                   value="体育类"></el-option>
                        <el-option label="其他类"
                                   value="其他类"></el-option> -->
                        <el-option v-for="(item,i) in clubTypeList"
                                   :key='i'
                                   :label="item.clubtype"
                                   :value="item.clubtype"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                  <!-- <el-form-item label="社团介绍">
                  <el-input v-model="form.introduction"></el-input>
                </el-form-item> -->
                  <el-form-item label="所属院系"
                                prop="department">
                    <el-col :span="24">
                      <el-select v-model="form.department"
                                 placeholder="请选择分院">
                        <!-- <el-option label="信息与机电工程分院"
                                   value="信息与机电工程分院"></el-option>
                        <el-option label="语言和文学分院"
                                   value="语言和文学分院"></el-option>
                        <el-option label="经济与管理分院"
                                   value="经济与管理分院"></el-option>
                        <el-option label="服装与纺织分院"
                                   value="服装与纺织分院"></el-option> -->
                        <el-option v-for="(item,i) in Departmentlist"
                                   :key='i'
                                   :label="item.department"
                                   :value="item.department"></el-option>
                      </el-select>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="指导教师"
                                prop="teacher">
                    <el-col :span="12">
                      <el-input v-model="form.teacher"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="负责人学号"
                                prop="studentId">
                    <el-col :span="12">
                      <el-input v-model="form.studentId"
                                oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="社团负责人"
                                prop="president">
                    <el-col :span="12">
                      <el-input v-model="form.president"></el-input>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="申请理由"
                                prop="Reason">
                    <el-col :span="24">
                      <el-input v-model="form.Reason"
                                type="textarea"
                                maxlength="500"
                                :rows="6"
                                show-word-limit></el-input>
                    </el-col>
                  </el-form-item>
                  <!-- <el-form-item label="活动形式">
                  <el-input type="textarea"
                            v-model="form.desc"></el-input>
                </el-form-item> -->
                  <el-form-item>
                    <el-button type="primary"
                               @click="onSubmit('form')">提交申请</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="right">
                <div class="text">查询申请结果</div>
                <el-col :span="14">
                  <div class="result">
                    <div class="result-con success"
                         v-if="showSuccess">
                      <span>您的申请已经通过审核，请您尽快注册账号并绑定学号。</span>
                    </div>
                    <div class="result-con failure"
                         v-if="showFailure">
                      <span>{{failureMessage}}</span>
                    </div>
                  </div>
                </el-col>
                <el-col :span="14">
                  <el-form :model="inquireForm"
                           :rules="inquireRuler"
                           ref="inquireForm">
                    <el-form-item prop="studentId">
                      <el-input placeholder="请输入学号"
                                class="input"
                                v-model="inquireForm.studentId"></el-input>
                    </el-form-item>
                    <el-form-item class="center">
                      <el-button type="primary"
                                 class="srach-button"
                                 @click="onSerch('inquireForm')">查询</el-button>
                    </el-form-item>
                  </el-form>
                </el-col>
                <div class="link">已经申请通过?
                  <el-link type="primary"
                           @click="toLogin">去注册账号</el-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        <div class="pageFooter">
          <div class="footerCon">
            <span>zff 的社团管理系统</span>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>
<style scoped>
body {
  background: #f6f8f9;
}
.pageCon {
  width: 100%;
}
.pageHead {
  background-color: white;
  height: 90px;
  width: 100%;
  display: flex;
  align-items: center;
}
.headCon {
  display: flex;
  align-items: center;
}
.logo {
  margin-left: 50px;
}
.title {
  margin-left: 10px;
  font-size: 30px;
  font-weight: 300;
}
.pageMain {
  width: 100%;
  margin: 40px 0px;
  display: flex;
  justify-content: center;
}
.mianCon {
  background-color: white;
  width: 85%;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mian-title {
  width: 85%;
  height: 40px;
  margin-top: 45px;
  border-bottom: 1px solid #e4e8eb;
}
.mian-title span {
  font-size: 20px;
  font-weight: 300;
}
.mian-from {
  width: 85%;
  display: flex;
  margin-top: 20px;
}
.left {
  width: 50%;
}
.right {
  width: 45%;
  border-left: 1px solid #e4e8eb;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.text {
  margin: 20px 0;
  font-size: 14px;
  font-weight: 300;
  color: #606266;
}
.link {
  margin-top: 15px;
  font-size: 12px;
  font-weight: 300;
  color: #606266;
}
.result {
  margin-bottom: 15px;
}
.result-con {
  margin-top: 5px;
  width: 100%;
  height: 45px;
  border-radius: 3px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.result-con span {
  display: flex;
  justify-content: center;
  align-items: center;
}
.success {
  border: 1px solid rgb(103, 194, 58);
  background-color: rgb(225, 243, 216);
  color: rgb(103, 194, 58);
}
.failure {
  border: 1px solid rgb(245, 108, 108);
  background-color: rgb(253, 226, 226);
  color: rgb(245, 108, 108);
}
.center {
  display: flex;
  justify-content: center;
}
.pageFooter {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  background-color: white;
}
.footerCon {
  width: 80%;
  height: 100%;
  font-size: 12px;
  font-weight: 300;
  color: #606266;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<style>
#createSocieties .el-header {
  padding: 0 !important;
  height: 90px !important;
}
#createSocieties .el-textarea .el-textarea__inner {
  resize: none;
}
#createSocieties .link span {
  font-size: 12px;
  font-weight: 300;
}
#createSocieties .el-footer {
  padding: 0 !important;
}
</style>
<script>
import * as api from '../../api/index'
export default {
  data () {
    // var checkClubName = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('社团名不能为空'))
    //   } else {
    //     callback()
    //   }
    // }
    // var checkClubType = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('请选择社团类型'))
    //   } else {
    //     callback()
    //   }
    // }
    // var checkDepartment = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('请选择所属院系'))
    //   } else {
    //     callback()
    //   }
    // }
    // var checkTeacher = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('请输入指导老师的名字'))
    //   } else {
    //     callback()
    //   }
    // }
    // var checkPresident = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('请输入社团负责人的名字'))
    //   } else {
    //     callback()
    //   }
    // }
    // var checkStudentId = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('请输入社团负责人的学号'))
    //   } else {
    //     callback()
    //   }
    // }
    // var checkReason = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('请输入申请理由'))
    //   } else {
    //     callback()
    //   }
    // }
    var checkStudentId2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入申请时登记的学号'))
      } else {
        callback()
      }
    }
    return {
      form: {
        clubName: '',
        clubType: '',
        department: '',
        teacher: '',
        president: '',
        studentId: '',
        Reason: ''
      },
      inquireForm: {
        studentId: ''
      },
      clubTypeList: [],
      Departmentlist: [],
      showSuccess: false,
      showFailure: false,
      failureMessage: '',
      ruler: {
        clubName: [
          { required: true, message: '社团名不能为空', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        clubType: [
          { required: true, message: '请选择社团类型', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择院/系', trigger: 'blur' }
        ],
        teacher: [
          { required: true, message: '指导教师不可以为空', trigger: 'blur' },
          { min: 2, max: 5, message: '请输入正确的名字', trigger: 'change' }
        ],
        president: [
          { required: true, message: '社团负责人不可以为空', trigger: 'blur' },
          { min: 2, max: 5, message: '请输入正确的名字', trigger: 'change' }
        ],
        studentId: [
          { required: true, message: '学号不可以为空', trigger: 'blur' },
          { min: 10, max: 10, message: '请输入正确的学号', trigger: 'change' }
        ],
        Reason: [
          { required: true, message: '请输入申请理由', trigger: 'blur' },
          { max: 500, message: '申请理由最多为500字', trigger: 'change' }
        ]
      },
      inquireRuler: {
        studentId: [
          { validator: checkStudentId2, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getClublistAndDepartmentlist()
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createdClub()
        } else {
          return false
        }
      })
    },
    onSerch (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getAuditResults()
        } else {
          return false
        }
      })
    },
    createdClub () {
      api.createdClub(this.form).then(data => {
        console.log(data)
        if (data.code === 200) {
          this.$message({
            message: data.message,
            type: 'success'
          })
        } else {
          this.$message.error(data.message)
        }
      })
    },
    toLogin () {
      this.$router.push({
        path: '/reg'
      })
    },
    getAuditResults () {
      api.getAuditResults(this.inquireForm).then(data => {
        if (data.code === 200) {
          this.showSuccess = true
          this.showFailure = false
        } else {
          this.showSuccess = false
          this.showFailure = true
          this.failureMessage = data.message
        }
      })
    },
    // 获取社团类型列表以及院系列表
    getClublistAndDepartmentlist () {
      api.getDepartment().then(res => {
        if (res.code === 200) {
          this.Departmentlist = res.list
        }
      })
      api.getClubtype().then(res => {
        if (res.code === 200) {
          this.clubTypeList = res.list
        }
      })
    }
  }
}
</script>
