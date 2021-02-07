<template>
  <div class='newEditor'>
    <div class="editor-con">
      <el-form label-width="formLabelWidth"
               :model="news"
               :rules="newsRule"
               ref="news"
               label-position="top">
        <el-form-item label="新闻标题"
                      prop="newsTitle">
          <el-col :span="14">
            <el-input v-model="news.newsTitle"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="新闻图片"
                      prop="newsImage"
                      ref="newsImage"
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
                   :src="news.newsImage"
                   alt="">
            </el-dialog>
          </el-col>
        </el-form-item>
        <el-form-item label="新闻图片"
                      prop="newsImage"
                      ref="newsImage"
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
                       :file-list="newsFile"
                       name="img"
                       ref="upload"
                       auto-upload>
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%"
                   :src="news.newsImage"
                   alt="">
            </el-dialog>
          </el-col>
        </el-form-item>
        <el-form-item label="新闻来源"
                      prop="newsSource">
          <el-col :span="14">
            <el-input v-model="news.newsSource"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="正文"
                      prop="newsContent">
          <Editor v-model="news.newsContent"
                  ref="editor" />
        </el-form-item>
        <el-form-item class="btn-con">
          <el-button type="primary"
                     @click="submitForm('news')">提交</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>
<script>
import * as api from '../../api/index'
export default {
  props: ['type', 'newsData'],
  data () {
    return {
      news: {
        newsTitle: '',
        newsImage: '',
        newsSource: '',
        newsContent: ''
      },
      uploadAddress: api.address + '/upload/uploadImg',
      dialogVisible: false,
      flag: true,
      newsFile: '',
      newsRule: {
        newsImage: [
          { required: true, message: '请上传新闻展示图片', trigger: 'change' }
        ],
        newsTitle: [
          { required: true, message: '请输入新闻标题', trigger: 'blur' }
        ],
        newsSource: [
          { required: true, message: '请输入新闻来源', trigger: 'blur' }
        ],
        newsContent: [
          { required: true, message: '请输入新闻内容', trigger: 'change' }
        ]
      }
    }
  },
  components: {
    Editor: () => import('../public/Editor')
  },
  computed: {},
  beforeMount () { },
  mounted () { },
  methods: {
    test () {
      console.log(this.content)
    },
    handleRemove (file, fileList) {
      this.news.newsImage = ''
    },
    handlePictureCardPreview (file) {
      this.news.newsImage = file.url
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
      this.news.newsImage = res.imgPath
      this.$refs.news.clearValidate() // 关闭校验
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.type === 'add') {
            this.addNews()
          } else {
            this.updateNews()
          }
        } else {
          this.$message.error('请将表单填写完整再提交')
          return false
        }
      })
    },
    addNews () {
      api.addNews({ news: this.news }).then(data => {
        if (data.code === 200) {
          this.$message({
            message: '发布新闻成功',
            type: 'success'
          })
          this.news = {
            newsTitle: '',
            newsImage: '',
            newsSource: '',
            newsContent: ''
          }
          // console.log(this.$refs.editor)
          this.$refs.editor.clearData()
          this.$refs.upload.clearFiles()
        } else {
          this.$message.error(data.message)
        }
      })
    },
    updateNews () {
      api.updateNews({ news: this.news }).then(data => {
        if (data.code === 200) {
          this.$message({
            message: '更改新闻成功',
            type: 'success'
          })
          this.$router.push(this.$route.meta.breadcrumb[1].path)
        } else {
          this.$message.error(data.message)
        }
      })
    }
    // uploadImg (file) { :http-request="uploadImg"
    //   if (this.checkimg(file)) {
    //     let formData = new FormData()
    //     formData.append('img', file)
    //     api.uploadImg(formData).then(data => {
    //       console.log(data)
    //       if (data.code === 200) {
    //         self.communityInfoFrom.clubIcon = data.imgPath
    //         console.log(self.communityInfoFrom.clubIcon)
    //       } else {
    //         self.$message.error('上传失败')
    //       }
    //     }).catch(errdata => {
    //       self.$message.error('上传失败')
    //     })
    //   }
    // }
  },
  watch: {},
  created () {
    if (this.type === 'edit') {
      this.news = this.newsData
      this.newsFile = [{ name: 'newsImage.jpg', url: this.newsData.newsImage }]
    } else if (this.type === 'add') {
      this.news = {
        newsTitle: '',
        newsImage: '',
        newsSource: '',
        newsContent: ''
      }
    }
  }
}
</script>
<style scoped>
.newEditor {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.editor-con {
  height: 300px;
  width: 90%;
}
.btn-con {
  margin-top: 50px;
}
</style>
