<template>
  <div id='lunbotuDialog'>
    <el-dialog :title="title"
               :visible.sync="dialogVisible"
               :before-close="hide"
               :close-on-click-modal="false"
               width='30%'>
      <div class="uploadImg">
        <el-form label-width="120px"
                 :model="formData"
                 ref="formData"
                 :rules="ruler">
          <el-form-item prop="imagePath"
                        ref="imagePath">
            <!-- <el-upload :action="uploadAddress"
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
              <i class="el-icon-plus"></i> -->
            <div></div>
            <el-upload :action="uploadAddress"
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
                       auto-upload
                       drag>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip"
                   slot="tip">只能上传png/jpg类型的图片,请注意图片尺寸,图片大小不要超过2mb</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="hide()">取 消</el-button>
        <el-button type="primary"
                   @click="submituserForm('formData')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as api from '../../api/index.js'
export default {
  props: ['dialogVisible', 'ApiInterface', 'dialogData', 'title', 'operationType'],
  data () {
    return {
      formData: {
        imagePath: ''
      },
      i: 0,
      j: 0,
      formLabelWidth: '120px',
      show: false,
      uploadAddress: api.address + '/upload/uploadImg',
      imageUrl: '',
      ImgFile: [''],
      ruler: {
        imagePath: [
          { required: true, message: '请选择要上传的图片', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    hide () {
      this.$refs.formData.clearValidate()
      this.$refs.formData.resetFields()
      this.$emit('hideDialog')
    },
    submituserForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.add()
        } else {
          return false
        }
      })
    },
    add () {
      if (this.ApiInterface) {
        this.ApiInterface(this.formData).then(data => {
          if (data.code === 200) {
            this.$message({
              showClose: true,
              message: '添加成功',
              type: 'success'
            })
            this.hide()
            this.$emit('updateTable', 1)
          } else if (data.code === 400) {
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
    // 图片上传相关
    handleRemove (file) {
      this.formData.imagePath = ''
    },
    handlePictureCardPreview (file) {
      this.formData.imagePath = file.url
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
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if ((isJPG || isPNG) && isLt2M) {
        return true
      } else {
        this.$message.error('上传的轮播图只能是 jpg、jpeg、png 三种格式，且大小不能超过 2MB!')
        return false
      }
    },
    tips (params) {
      console.log(params)
    },
    clear (res) {
      this.formData.imagePath = res.imgPath
      this.$refs.imagePath.clearValidate() // 关闭校验
    }
  },
  created () {
    // this.userForm = this.getUserFrom()
  }

}
</script>
<style scoped>
.uplaodImg {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
<style>
#lunbotuDialog .el-form-item__content {
  margin-left: 0px !important;
  display: flex;
  justify-content: center;
}
</style>
