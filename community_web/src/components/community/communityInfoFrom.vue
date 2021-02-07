<template>
  <div id='CommunityInfoFrom'>
    <el-form :model="communityInfoFrom"
             ref="communityInfoFrom"
             label-width="100px"
             label-position="top"
             :rules="communityInfoFromRules">
      <el-form-item label="社团名"
                    prop="clubName">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.clubName"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="社团图标"
                    prop="clubIcon"
                    ref='clubIcon'>
        <!-- <div class="iconUpload">
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
              <img v-if="communityInfoFrom.clubIcon"
                   :src="communityInfoFrom.clubIcon"
                   class="avatar">
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div> -->
        <el-col :span="8">
          <el-upload :action="uploadAddress"
                     list-type="picture-card"
                     :limit='1'
                     :multiple='false'
                     :on-preview="handlePictureCardPreview"
                     :on-remove="handleRemove"
                     :on-exceed="limitTips"
                     :on-success="clear"
                     :on-error="tips"
                     :before-upload="checkimg"
                     :file-list="ImgFile"
                     name="img"
                     ref="upload"
                     auto-upload>
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%"
                 :src="communityInfoFrom.clubIcon"
                 alt="">
          </el-dialog>
        </el-col>
      </el-form-item>
      <el-form-item label="社团类型"
                    prop="clubType">
        <el-col :span="8">
          <el-select v-model="communityInfoFrom.clubType"
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
      <!-- <el-form-item label="社团星级"
                    prop="clubStar">
        <el-col :span="8">
          <el-select v-model="communityInfoFrom.clubStar"
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
          </el-select>
        </el-col>
      </el-form-item> -->
      <el-form-item label="社团QQ群"
                    prop="qqNumber">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.qqNumber"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="所属分院"
                    prop="department">
        <el-col :span="8">
          <el-select v-model="communityInfoFrom.department"
                     placeholder="请选择分院">
            <el-option v-for="(item,i) in Departmentlist"
                       :key='i'
                       :label="item.department"
                       :value="item.department"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="指导教师"
                    prop="teacher">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.teacher"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="社团负责人"
                    prop="president">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.president"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="负责人学号"
                    prop="studentId">
        <el-col :span="8">
          <el-input v-model="communityInfoFrom.studentId"></el-input>
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
        <el-button @click="back()">返回</el-button>
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
      ImgFile: [],
      clubTypeList: [],
      Departmentlist: [],
      dialogVisible: false,
      uploadAddress: api.address + '/upload/uploadImg',
      communityInfoFromRules: {
        clubName: [
          { required: true, message: '请输入社团名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        clubIcon: [
          { required: true, message: '请上传社团图标', trigger: 'blur' }
        ],
        clubType: [
          { required: true, message: '请选择社团类型', trigger: 'change' }
        ],
        // clubStar: [
        //   { required: true, message: '请选择社团星级', trigger: 'change' }
        // ],
        department: [
          { required: true, message: '请选择所属分院', trigger: 'change' }
        ],
        qqNumber: [
          { required: true, message: '请输入社团的qq群号', trigger: 'blur' },
          { min: 6, max: 12, message: '请输入正确的群号', trigger: 'change' }
        ],
        teacher: [
          { required: true, message: '请输入社团的指导老师的名字', trigger: 'blur' },
          { min: 2, max: 5, message: '请输入正确的名字', trigger: 'change' }
        ],
        president: [
          { required: true, message: '请输入社团负责人的名字', trigger: 'blur' },
          { min: 2, max: 5, message: '请输入正确的名字', trigger: 'change' }
        ],
        studentId: [
          { required: true, message: '请输入社团负责人的学号', trigger: 'blur' },
          { min: 10, max: 10, message: '请输入正确的学号', trigger: 'change' }
        ],
        show: [
          { required: true, message: '请选择社团的显示状态', trigger: 'blur' }
        ],
        clubIntro: [
          { required: true, message: '请输入社团的介绍', trigger: 'blur' },
          { max: 500, message: '社团介绍最多为500字', trigger: 'change' }
        ]
      }
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
      this.$router.push(this.$route.meta.breadcrumb[1].path)
    },
    getFromData (data) {
      this.communityInfoFrom = data
      if (this.communityInfoFrom.clubIcon !== '') {
        this.ImgFile = [{ name: 'clubicon', url: this.communityInfoFrom.clubIcon }]
      }
    },
    // 图片上传相关
    // uploadImg (params) {
    //   var self = this
    //   const file = params.file
    //   if (!file) {
    //     self.$message.error('请选择要上传的图片')
    //   }
    //   const isJPG = file.type === 'image/jpeg'
    //   const isGIF = file.type === 'image/gif'
    //   const isPNG = file.type === 'image/png'
    //   const isLt2M = file.size / 1024 / 1024 < 2
    //   if (!isJPG && !isGIF && !isPNG && !isLt2M) {
    //     self.$message.error('上传的社团图标只能是 jpg、jpeg、png 三种格式，且大小不能超过 2MB!')
    //   } else {
    //     let formData = new FormData()
    //     formData.append('img', file)
    //     api.uploadImg(formData).then(data => {
    //       console.log(data)
    //       if (data.code === 200) {
    //         self.communityInfoFrom.clubIcon = data.imgPath
    //         console.log(self.communityInfoFrom.clubIcon)
    //       } else {
    //         self.$message.error('成功')
    //       }
    //     }).catch(errdata => {
    //       self.$message.error('上传失败')
    //     })
    //   }
    // },
    handleRemove (file, fileList) {
      this.communityInfoFrom.clubIcon = ''
    },
    handlePictureCardPreview (file) {
      this.communityInfoFrom.clubIcon = file.url
      this.dialogVisible = true
    },
    limitTips () {
      this.$message.error('最多只能上传一张图片')
    },
    checkimg (file) {
      if (!file) {
        this.$message.error('请选择要上传的图片')
        return false
      }
      const isJPG = file.type === 'image/jpeg'
      const isGIF = file.type === 'image/gif'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if ((isJPG || isGIF || isPNG) && isLt2M) {
        return true
      } else {
        this.$message.error('上传的社团图标只能是 jpg、jpeg、png 三种格式，且大小不能超过 1MB!')
        return false
      }
    },
    tips (params) {
      console.log(params)
    },
    clear (res) {
      this.communityInfoFrom.clubIcon = res.imgPath
      this.$refs.clubIcon.clearValidate() // 关闭校验
    },
    // 提交数据
    submitEditData () {
      if (this.communityInfoFrom.show === '显示') {
        this.communityInfoFrom.show = 1
      } else if (this.communityInfoFrom.show === '隐藏') {
        this.communityInfoFrom.show = 2
      }
      api.updateCommunityInfo({ CommunityInfo: this.communityInfoFrom }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '恭喜你，社团信息辑成功',
            type: 'success'
          })
        } else {
          this.$message.error(res.message)
        }
      }).catch(errData => {
        console.log(errData)
        this.$message.error('出现意料之外的错误')
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

  },
  created () {
    this.getFromData(this.fromData)
    this.getClublistAndDepartmentlist()
    console.log(this.fromData)
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
<style  scoped>
#CommunityInfoFrom {
  width: 80%;
}
</style>
