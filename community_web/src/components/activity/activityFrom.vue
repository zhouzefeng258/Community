<template>
  <div id='activityFrom'
       class="From">
    <el-form :model="FormData"
             ref="FormData"
             label-width="100px"
             label-position="top"
             :rules="fromRules"
             v-if="type === 'view'">
      <el-form-item label="活动名称"
                    prop="activityName">
        <el-col :span="8">
          <el-input v-model="FormData.activityName"
                    readonly></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="活动图片"
                    prop="activityImage"
                    ref="activityImage">
        <el-col :span="14">
          <div class="image-con">
            <el-image :src="FormData.activityImage"
                      @click="dialogVisible=true"
                      style="width:100%;height:100%;">
              <div slot="error"
                   class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%"
                 :src="FormData.activityImage">
          </el-dialog>
        </el-col>
      </el-form-item>
      <el-form-item label="活动负责人"
                    prop="ActivityLeader">
        <el-col :span="8">
          <el-input v-model="FormData.ActivityLeader"
                    readonly></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="活动时间"
                    prop="startTime">
        <el-date-picker v-model="FormData.startTime"
                        type="datetime"
                        placeholder="选择活动时间"
                        readonly>
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动地点"
                    prop="address">
        <el-col :span="8">
          <el-input v-model="FormData.address"
                    readonly></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="活动人数"
                    prop="totalNumber">
        <el-col :span="8">
          <el-input v-model="FormData.totalNumber"
                    oninput="value=value.replace(/[^\d]/g,'')"
                    readonly></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="活动介绍"
                    prop="ActivityIntro">
        <el-col :span="14">
          <el-input v-model="FormData.ActivityIntro"
                    type="textarea"
                    resize='none'
                    rows="6"
                    readonly></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <div v-if="FormData.approvalStatus === '待审批'">
          <el-button type="primary"
                     @click="update('已通过')">通过</el-button>
          <el-button @click="update('未通过')">不通过</el-button>
        </div>
        <div v-if="FormData.approvalStatus !== '待审批'">
          <el-button @click="back()">返回</el-button>
        </div>
      </el-form-item>
    </el-form>
    <el-form :model="FormData"
             ref="FormData"
             label-width="100px"
             label-position="top"
             :rules="fromRules"
             v-if="type !== 'view'">
      <el-form-item label="活动名称"
                    prop="activityName">
        <el-col :span="8">
          <el-input v-model="FormData.activityName"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="活动图片"
                    prop="activityImage"
                    ref="activityImage"
                    v-if="type==='add'">
        <el-col :span="14">
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
                     name="img"
                     ref="upload"
                     auto-upload>
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%"
                 :src="FormData.activityImage"
                 alt="">
          </el-dialog>
        </el-col>
      </el-form-item>
      <el-form-item label="活动图片"
                    prop="activityImage"
                    ref="activityImage"
                    v-if="type==='edit'">
        <el-col :span="14">
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
                 :src="FormData.activityImage"
                 alt="">
          </el-dialog>
        </el-col>
      </el-form-item>
      <el-form-item label="活动负责人"
                    prop="ActivityLeader">
        <el-col :span="8">
          <el-input v-model="FormData.ActivityLeader"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="活动时间"
                    prop="startTime">
        <el-date-picker v-model="FormData.startTime"
                        type="datetime"
                        placeholder="选择活动时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="活动地点"
                    prop="address">
        <el-col :span="8">
          <el-input v-model="FormData.address"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="活动人数"
                    prop="totalNumber">
        <el-col :span="8">
          <el-input v-model="FormData.totalNumber"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="活动状态"
                    prop="ActivityType"
                    v-if="type === 'edit'">
        <el-col :span="14">
          <el-select v-model="FormData.ActivityType"
                     placeholder="请选择活动状态">
            <el-option label="进行中"
                       :value="'进行中'"></el-option>
            <el-option label="已结束"
                       :value="'已结束'"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="活动介绍"
                    prop="ActivityIntro">
        <el-col :span="14">
          <el-input v-model="FormData.ActivityIntro"
                    type="textarea"
                    resize='none'
                    rows="6"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm('FormData')">提交</el-button>
        <el-button @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import * as api from '../../api/index.js'
export default {
  props: ['ApiInterface', 'fromData', 'type'],
  data () {
    return {
      FormData: {
        activityName: '',
        activityImage: '',
        ActivityLeader: '',
        startTime: '',
        address: '',
        totalNumber: '',
        ActivityIntro: '',
        clubName: ''
      },
      myClubInfo: {},
      userInfo: {},
      uploadAddress: api.address + '/upload/uploadImg',
      imageUrl: '',
      ImgFile: '',
      showFlag: true,
      dialogVisible: false,
      fromRules: {
        activityName: [
          { required: true, message: '请输入活动标题', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'change' }
        ],
        activityImage: [
          { required: true, message: '请上传活动图片', trigger: 'blur' }
        ],
        ActivityLeader: [
          { required: true, message: '请选择活动负责人的名字', trigger: 'blur' },
          { min: 2, max: 5, message: '请输入正确的名字', trigger: 'change' }
        ],
        startTime: [
          { required: true, message: '请选择活动开始的时间', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请选择活动举行地点', trigger: 'blur' }
        ],
        totalNumber: [
          { required: true, message: '请输入活动的人数', trigger: 'blur' }
        ],
        ActivityIntro: [
          { required: true, message: '请输入活动的介绍', trigger: 'blur' },
          { max: 500, message: '活动介绍最多为500字', trigger: 'change' }
        ],
        ActivityType: [
          { required: true, message: '请选择活动的进行状态', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
  },
  methods: {
    submitForm (formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          if (this.type === 'add') {
            this.submitAddData()
          } else {
            this.submitEditData()
          }
        } else {
          this.$message.error('请将表单填写完整再提交')
          return false
        }
      })
    },
    back () {
      this.$router.go(-1)
    },
    getFromData (data) {
      this.FormData = data
    },
    // 图片上传相关
    handleRemove (file, fileList) {
      this.FormData.activityImage = ''
    },
    handlePictureCardPreview (file) {
      this.FormData.activityImage = file.url
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
        this.$message.error('上传的社团图标只能是 jpg、jpeg、png 三种格式，且大小不能超过 2MB!')
        return false
      }
    },
    tips (params) {
      console.log(params)
    },
    clear (res) {
      this.FormData.activityImage = res.imgPath
      this.$refs.activityImage.clearValidate() // 关闭校验
    },
    // 提交添加数据
    submitAddData () {
      api.addActivity({ activityInfo: this.FormData }).then(res => {
        // this.$emit('getClubInfo')
        if (res.code === 200) {
          this.$message({
            message: '申请成功',
            type: 'success'
          })
          this.showFlag = true
          this.FormData = {
            activityName: '',
            activityImage: '',
            ActivityLeader: '',
            startTime: '',
            address: '',
            totalNumber: '',
            ActivityIntro: '',
            clubName: this.myClubInfo.clubName
          }
          this.$refs.upload.clearFiles()
        } else {
          this.$message.error(res.message)
        }
      }).catch(errData => {
        console.log(errData)
        this.$message.error('出现意料之外的错误')
      })
    },
    // 提交编辑数据
    submitEditData () {
      api.updatedActivity({ activityInfo: this.FormData }).then(res => {
        // this.$emit('getClubInfo')
        if (res.code === 200) {
          console.log(res.data)
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.showFlag = true
          this.$router.go(-1)
        } else {
          this.$message.error(res.message)
        }
      }).catch(errData => {
        console.log(errData)
        this.$message.error('出现意料之外的错误')
      })
    },
    update (data) {
      let activityId = this.FormData.activityId
      if (data === '' || activityId === '') {
        this.$message.error('参数不全')
      } else {
        api.activityApproval({
          approvalStatus: data,
          activityId: activityId
        }).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.$router.go(-1)
          } else {
            this.message.error(res.message)
          }
        }).catch(errdata => {
          console.log(errdata)
          this.$message.error('出现意料之外的错误')
        })
      }
    },
    getUserInfo () {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    },
    getMyClubInfo () {
      this.myClubInfo = JSON.parse(sessionStorage.getItem('myCommunityInfo'))
    }

  },
  created () {
    this.getMyClubInfo()
    console.log(this.type)
    if (this.type !== 'add') {
      this.getFromData(this.fromData)
      this.ImgFile = [{ name: 'actImg.jpg', url: this.FormData.activityImage }]
    } else {
      this.FormData.clubName = this.myClubInfo.clubName
    }
    console.log(this.FormData)
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
#activityFrom {
  width: 80%;
}
.image-con {
  width: 100px;
  height: 140px;
  overflow: hidden;
}
</style>
