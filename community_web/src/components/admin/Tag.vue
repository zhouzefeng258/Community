<template>
  <el-row>
    <el-col :span="24">
      <div ref="initWidth"
           style="overflow: hidden">
        <div class="mj-tags"
             ref="tags"
             :style="{ width: tagsWidth, marginLeft: marginLeft}">
          <el-tag v-for="(tag, index) in tags"
                  :key="index"
                  ref="tag"
                  @close="handleClose(tag)"
                  @click.native="handleJump(tag)"
                  :type="tag.active? 'success' : 'info'"
                  closable
                  size="mini">
            {{tag.name}}
          </el-tag>
        </div>
      </div>
    </el-col>
    <!-- <el-col :span="24">
      <el-button type="primary" @click="test">新增标签</el-button>
    </el-col> -->
  </el-row>
</template>
<script>
export default {
  name: 'mjTags',
  data () {
    return {
      tags: [
        { name: '首页', url: '/index', active: true }
      ],
      initWidth: 0,
      tagsWidth: '100%',
      marginLeft: '0px', // 超出宽度后的平移像素
      currTag: {}
    }
  },
  mounted () {
    if (this.$route.meta.breadcrumb.length < 3) {
      this.addTag(this.$route.path)
    }
    this.initWidth = this.$refs.tags.clientWidth
    window.onresize = () => {
      setTimeout(() => {
        this.initWidth = this.$refs.initWidth.clientWidth
        this.setWidth()
      }, 500)
    }
  },
  watch: {
    '$route': function (value) {
      if (value.meta.breadcrumb.length < 3) {
        this.addTag(value.path)
      }
    },
    'cacheNewPlanClose': function (value) {
      let s = JSON.parse(value)
      let t = ''
      this.tags.map((item, index) => {
        if (item.url === s.url) {
          t = index
        }
      })
      this.tags.splice(t, 1)
    }
  },
  methods: {
    handleClose (tag) {
      console.log(tag)
      if (tag.name === '首页') {
        this.$message({
          message: '首页无法关闭',
          curation: 1500,
          type: 'error'
        })
      } else {
        let flag = -1
        for (var i = 0; i < this.tags.length; i++) {
          if (this.tags[i].url === this.$route.path) {
            flag = i
          }
        }
        if (this.tags.indexOf(tag) !== -1) {
          let tagsIndex = this.tags.indexOf(tag)
          if (tagsIndex !== 0) {
            if (tagsIndex === flag) {
              let turl = {
                'close': this.tags[tagsIndex - 1].url,
                'temp': this.tags[tagsIndex].url
              }
              this.$emit('close', turl)
              this.tags.splice(this.tags.indexOf(tag), 1)
              this.setWidth()
            } else {
              this.tags.splice(this.tags.indexOf(tag), 1)
              this.setWidth()
            }
          }
        }
      }
    },
    handleJump (tag) {
      if (tag.url) {
        for (let x in this.tags) {
          this.tags[x].active = false
          if (this.tags[x].url === tag.url) {
            this.tags[x].active = true
          }
        }
        this.$emit('jump', tag.url)
      }
    },
    // 新打开页面
    addTag (url) {
      let isAddTag = true // 是否需要新增标签标志
      for (let i = 0, len = this.tags.length; i < len; i++) {
        this.tags[i].active = false
        if (this.tags[i].url === url) {
          // 如果原数组中有，那么直接设置为选中即可
          this.tags[i].active = true
          isAddTag = false
        }
      }
      if (isAddTag) {
        this.currTag = {}
        this.menusFind(this.menusData, url)
        if (this.currTag) {
          this.tags.push(this.currTag)
          this.setWidth()
        }
      }
    },
    // 在菜单数组中查询需要的数据
    menusFind (arr, url) {
      for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].url && arr[i].url === url) {
          this.currTag = { name: arr[i].name, url: url, active: true }
        }
        if (arr[i].hasOwnProperty('children')) {
          this.menusFind(arr[i].children, url)
        }
      }
    },
    setWidth () {
      this.$nextTick(() => {
        let tagAllWidth = 0
        for (let x in this.tags) {
          tagAllWidth += Number(window.getComputedStyle(this.$refs.tag[x].$el).width.replace(/(px)$/ig, '')) + 10
        }
        if (this.initWidth - tagAllWidth < 0) {
          this.marginLeft = String(this.initWidth - tagAllWidth) + 'px'
          this.tagsWidth = String(tagAllWidth) + 'px'
        } else {
          this.marginLeft = '0px'
          this.tagsWidth = '100%'
        }
      })
    }
  },
  props: {
    menusData: {
      required: true,
      default: () => {
        return [
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.mj-tags {
  margin-top: 1px;
  width: 100%;
  height: 23px;
  overflow: hidden;
  transition: all 0.5s;
}
.mj-tags .el-tag {
  margin-left: 5px;
  margin-right: 5px;
  margin-bottom: 8px;
  cursor: pointer;
}
.tag-active,
.tag-active .el-icon-close {
  color: #fff !important;
}
</style>
