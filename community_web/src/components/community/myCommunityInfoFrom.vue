<template>
  <div id='mycommunityInfoFrom'>
    <el-form :model="communityInfoFrom"
             label-width="100px"
             label-position="top"
             v-if="showFlag">
      <el-form-item label="社团名">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.clubName"
                    readonly></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="社团图标">
        <el-col :span="8">
          <div class="iconUpload">
            <el-image style="width: 89px; height: 89px"
                      :src="communityInfoFrom.clubIcon"
                      v-model="communityInfoFrom.clubIcon">
              <div slot="error"
                   class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <!-- <el-upload class="avatar-uploader"
                       action="uploadUrl"
                       :show-file-list="true"
                       :http-request="uploadImg"
                       :multiple='false'
                       :limit='1'>
              <img v-if="communityInfoFrom.clubIcon"
                   :src="communityInfoFrom.clubIcon"
                   class="avatar">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload> -->
          </div>
        </el-col>
      </el-form-item>
      <el-form-item label="社团类型">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.clubType"
                    readonly></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="社团星级">
        <el-col :span="8">
          <el-input v-model="showClubStar"
                    readonly></el-input>
          <!-- <el-select v-model="communityInfoFrom.clubStar"
                     placeholder="请选择社团星级">
            <el-option label="1星"
                       value="1"></el-option>
            <el-option label="2星"
                       value="2"></el-option>
            <el-option label="3星"
                       value="3"></el-option>
            <el-option label="4星"
                       value="4"></el-option>
            <el-option label="5星"
                       value="5"></el-option>
          </el-select> -->
        </el-col>
      </el-form-item>
      <el-form-item label="社团QQ群">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.qqNumber"
                    readonly></el-input>
          <!-- <el-input v-model="communityInfoFrom.qqNumber"></el-input> -->
        </el-col>
      </el-form-item>
      <el-form-item label="所属分院">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.department"
                    readonly></el-input>
          <!-- <el-select v-model="communityInfoFrom.department"
                     placeholder="请选择分院">
            <el-option label="信息与机电工程分院"
                       value="信息与机电工程分院"></el-option>
            <el-option label="语言和文学分院"
                       value="语言和文学分院"></el-option>
            <el-option label="经济与管理分院"
                       value="经济与管理分院"></el-option>
            <el-option label="服装与纺织分院"
                       value="服装与纺织分院"></el-option>
          </el-select> -->
        </el-col>
      </el-form-item>
      <el-form-item label="指导教师">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.teacher"
                    readonly></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="社团负责人">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.president"
                    readonly></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="负责人学号">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.studentId"
                    readonly></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="社团简介">
        <el-col :span="14">
          <el-input v-model="communityInfoFrom.clubIntro"
                    type="textarea"
                    resize='none'
                    rows="6"
                    readonly></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="是否显示">
        <el-col :span="14">
          <el-input v-model="showType"
                    readonly></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="editInfo()">修改信息</el-button>
        <!-- <el-button @click="back()">取消编辑</el-button> -->
      </el-form-item>
    </el-form>
    <el-form :model="communityInfoFrom"
             ref="communityInfoFrom"
             label-width="100px"
             label-position="top"
             :rules="communityInfoFromRules"
             v-if="!showFlag">
      <el-form-item label="社团名"
                    prop="clubName">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.clubName"
                    readonly></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="社团图标"
                    prop="clubIcon">
        <el-col :span="8">
          <div class="iconUpload">
            <el-image style="width: 89px; height: 89px"
                      :src="communityInfoFrom.clubIcon"
                      v-model="communityInfoFrom.clubIcon">
              <div slot="error"
                   class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <el-upload class="avatar-uploader"
                       action="uploadUrl"
                       :show-file-list="true"
                       :http-request="uploadImg"
                       :multiple='false'
                       :limit='1'>
              <!-- <img v-if="communityInfoFrom.clubIcon"
                   :src="communityInfoFrom.clubIcon"
                   class="avatar"> -->
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-col>
      </el-form-item>
      <el-form-item label="社团类型"
                    prop="clubType">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.clubType"
                    readonly></el-input>
          <!-- <el-select v-model="communityInfoFrom.clubType"
                     placeholder="请选择社团类型">
            <el-option label="文学类"
                       value="文学类"></el-option>
            <el-option label="科技类"
                       value="科技类"></el-option>
            <el-option label="艺术类"
                       value="艺术类"></el-option>
            <el-option label="体育类"
                       value="体育类"></el-option>
            <el-option label="其他类"
                       value="其他类"></el-option>
          </el-select> -->
        </el-col>
      </el-form-item>
      <el-form-item label="社团星级"
                    prop="clubStar">
        <el-col :span="8">
          <el-input v-model="showClubStar"
                    readonly></el-input>
          <!-- <el-select v-model="communityInfoFrom.clubStar"
                     placeholder="请选择社团星级">
            <el-option label="1星"
                       :value=1></el-option>
            <el-option label="2星"
                       :value=2></el-option>
            <el-option label="3星"
                       :value=3></el-option>
            <el-option label="4星"
                       :value=4></el-option>
            <el-option label="5星"
                       :value=5></el-option>
          </el-select> -->
        </el-col>
      </el-form-item>
      <el-form-item label="社团QQ群"
                    prop="qqNumber">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.qqNumber"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="所属分院"
                    prop="department">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.department"
                    readonly></el-input>

          <!-- <el-select v-model="communityInfoFrom.department"
                     placeholder="请选择分院">
            <el-option label="信息与机电工程分院"
                       value="信息与机电工程分院"></el-option>
            <el-option label="语言和文学分院"
                       value="语言和文学分院"></el-option>
            <el-option label="经济与管理分院"
                       value="经济与管理分院"></el-option>
            <el-option label="服装与纺织分院"
                       value="服装与纺织分院"></el-option>
          </el-select> -->
        </el-col>
      </el-form-item>
      <el-form-item label="指导教师"
                    prop="teacher">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.teacher"
                    readonly></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="社团负责人"
                    prop="president">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.president"
                    readonly></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="负责人学号"
                    prop="studentId">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.studentId"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    readonly></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="社团简介"
                    prop="clubIntro">
        <el-col :span="14">
          <el-input v-model="communityInfoFrom.clubIntro"
                    type="textarea"
                    resize='none'
                    rows="6"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="是否显示"
                    prop="show">
        <el-col :span="14">
          <el-select v-model="communityInfoFrom.show"
                     placeholder="请选择社团是否隐藏">
            <el-option label="显示"
                       :value="1"></el-option>
            <el-option label="隐藏"
                       :value="2"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('communityInfoFrom')">提交修改</el-button>
        <el-button @click="back()">取消编辑</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import * as api from '../../api/index.js'
export default {
  props: ['ApiInterface', 'fromData'],
  data () {
    return {
      communityInfoFrom: {},
      imageUrl: '',
      showFlag: true,
      communityInfoFromRules: {
        // clubName: [
        //   { required: true, message: '请输入社团名', trigger: 'blur' },
        //   { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        // ],
        clubIcon: [
          { required: true, message: '请上传社团图标', trigger: 'blur' }
        ],
        // clubType: [
        //   { required: true, message: '请选择社团类型', trigger: 'change' }
        // ],
        // clubStar: [
        //   { required: true, message: '请选择社团星级', trigger: 'change' }
        // ],
        // department: [
        //   { required: true, message: '请选择所属分院', trigger: 'change' }
        // ],
        qqNumber: [
          { required: true, message: '请输入社团的qq群号', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入正确的群号', trigger: 'change' }
        ],
        // teacher: [
        //   { required: true, message: '请输入社团的指导老师的名字', trigger: 'blur' },
        //   { min: 2, max: 5, message: '请输入正确的名字', trigger: 'change' }
        // ],
        // president: [
        //   { required: true, message: '请输入社团负责人的名字', trigger: 'blur' },
        //   { min: 2, max: 5, message: '请输入正确的名字', trigger: 'change' }
        // ],
        // studentId: [
        //   { required: true, message: '请输入社团负责人的学号', trigger: 'blur' },
        //   { type: 'Number', min: 10, max: 10, message: '请输入正确的学号', trigger: 'change' }
        // ],
        clubIntro: [
          { required: true, message: '请输入社团的介绍', trigger: 'blur' },
          { max: 500, message: '社团介绍最多为500字', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    showType: function () {
      let s = this.communityInfoFrom.show
      switch (s) {
        case 1:
          return '显示'
        case 2:
          return '隐藏'
      }
    },
    showClubStar: function () {
      let s = Math.round(this.communityInfoFrom.starTotal / this.communityInfoFrom.evaluationTimes)
      return s + '星'
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitEditData()
        } else {
          this.$message.error('请将表单填写完整再提交')
          return false
        }
      })
    },
    back () {
      console.log(1111111111)
      this.communityInfoFrom = JSON.parse(sessionStorage.getItem('myCommunityInfo'))
      this.showFlag = true
    },
    editInfo () {
      this.showFlag = false
    },
    getFromData (data) {
      this.communityInfoFrom = data
    },
    // 图片上传相关
    uploadImg (params) {
      var self = this
      const file = params.file
      if (!file) {
        self.$message.error('请选择要上传的图片')
      }
      const isJPG = file.type === 'image/jpeg'
      const isGIF = file.type === 'image/gif'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isGIF && !isPNG && !isLt2M) {
        self.$message.error('上传的社团图标只能是 jpg、jpeg、png 三种格式，且大小不能超过 2MB!')
      } else {
        let formData = new FormData()
        formData.append('img', file)
        api.uploadImg(formData).then(data => {
          console.log(data)
          if (data.code === 200) {
            self.communityInfoFrom.clubIcon = data.imgPath
            console.log(self.communityInfoFrom.clubIcon)
          } else {
            self.$message.error('上传失败')
          }
        }).catch(errdata => {
          self.$message.error('上传失败')
        })
      }
    },
    // 提交数据
    submitEditData () {
      api.updateCommunityInfo({ CommunityInfo: this.communityInfoFrom }).then(res => {
        this.$emit('getClubInfo')
        if (res.code === 200) {
          this.$message({
            message: '恭喜你，社团信息编辑成功',
            type: 'success'
          })
          this.showFlag = true
        } else {
          this.$message.error(res.message)
        }
      }).catch(errData => {
        console.log(errData)
        this.$message.error('出现意料之外的错误')
      })
    }

  },
  created () {
    console.log(2)
    this.getFromData(JSON.parse(sessionStorage.getItem('myCommunityInfo')))
  },
  mounted () {
    // this.getFromData(this.fromData)
    // console.log(22222)
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 89px;
  height: 89px;
  line-height: 89px;
  text-align: center;
}
.avatar {
  width: 89px;
  height: 89px;
  display: block;
}
.clubIcon {
  width: 89px;
  height: 89px;
}
.iconUpload {
  display: flex;
}
.avatar-uploader {
  margin-left: 15px;
}
</style>
<style scoped>
#mycommunityInfoFrom {
  width: 80%;
}
</style>
