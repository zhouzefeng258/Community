<template>
  <div class="tabelPage">
    <el-row :gutter="0"
            class="operationDiv">
      <el-col :span="3"
              :offset="0">
        <el-input placeholder="请输入新的社团类型"
                  v-model="clubtype"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="2"
              :offset="1">
        <el-button size="small"
                   type="primary"
                   @click="add()">新增</el-button>
      </el-col>
    </el-row>
    <tablea :tableFrame="tableFrame"
            :tableApi="tableApi"
            :deleteApi="deleteApi"
            :serchData='serchData'
            @getEditData='getEditData'
            :deleteId='deleteId'
            @reset='reset'
            @updateTable="updateTable"
            v-if="serchType"
            ref="table"></tablea>
  </div>
</template>
<script>
import * as api from '../../api/index'
export default {
  components: {
    tablea: () => import('../../components/other/otherTable')
  },
  data () {
    return {
      jurisdiction: '超级管理员',
      serchType: true,
      updateType: false,
      operationType: true,
      serchData: {},
      clubtype: '',
      deleteId: 'id',
      ApiInterface: '',
      tableApi: api.getClubtypeList,
      deleteApi: api.deleteClubtype,
      tableFrame: [
        {
          label: '社团类型名字',
          prop: 'clubtype'
        }
      ],
      dialogVisible: false,
      dialogData: {},
      title: ''
    }
  },
  methods: {
    getEditData (data) {
      this.dialogData = data
      this.ApiInterface = api.editAdmin
      this.title = '编辑管理员'
      this.operationType = true
      this.dialogVisible = true
    },
    hideDialog () {
      this.dialogVisible = false
    },
    add () {
      // this.dialogData = {}
      // this.ApiInterface = api.addLunbotu
      // this.title = '上传图片'
      // // this.operationType = false
      // this.dialogVisible = true
      if (this.clubtype === '') {
        this.$message.error('请在输入框中输入您要添加的社团类型')
      } else {
        api.addClubtype({ clubtype: this.clubtype }).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.updateTable(2)
            this.clubtype = ''
          } else {
            this.$message.error(res.message)
            this.clubtype = ''
          }
        })
      }
    },
    updateTable (i) {
      // 更新---（1）
      // 不变---（0）
      // 跳至第一页 ---（2）
      this.$refs.table.update(i)
    },
    serch () {
      this.updateTable(2)
    },
    reset () {
      let data = {}
      this.serchData = data
      this.updateTable(2)
    },
    handleClick () {
      // console.log(e)
      if (this.jurisdiction === '超级管理员') {
        this.serchData.jurisdiction = 1
        this.updateTable(2)
      } else {
        this.serchData.jurisdiction = 2
        this.updateTable(2)
      }
    }
  }

}
</script>
<style scoped>
.tabelPage {
  width: 100%;
  height: 100%;
}
.operationDiv {
  margin-bottom: 10px;
}
.left {
  margin-left: 8px;
}
</style>
