<template>
  <div class="tabelPage">
    <el-row :gutter="0"
            class="operationDiv">
      <el-col :span="2"
              :offset="0">
        <el-button size="small"
                   type="primary"
                   @click="add()">上传图片</el-button>
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
    <imgDialog :dialogVisible="dialogVisible"
               :ApiInterface="ApiInterface"
               :dialogData="dialogData"
               :title="title"
               :operationType="operationType"
               @hideDialog="hideDialog"
               @updateTable="updateTable"
               v-if="dialogVisible"></imgDialog>
  </div>
</template>
<script>
import * as api from '../../api/index'
export default {
  components: {
    tablea: () => import('../../components/lunbotu/lunbotuTable'),
    imgDialog: () => import('../../components/lunbotu/imgDialog')
  },
  data () {
    return {
      jurisdiction: '超级管理员',
      serchType: true,
      updateType: false,
      operationType: true,
      serchData: {},
      deleteId: 'id',
      ApiInterface: '',
      tableApi: api.getLunbotuList,
      deleteApi: api.deleteLunbotu,
      tableFrame: [
        // {
        //   label: 'id',
        //   prop: 'id'
        // },
        // {
        //   label: '',
        //   prop: 'userName'
        // }
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
      this.dialogData = {}
      this.ApiInterface = api.addLunbotu
      this.title = '上传图片'
      // this.operationType = false
      this.dialogVisible = true
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
      let data = {
        name: '',
        userName: '',
        clubName: '',
        studentId: '',
        jurisdiction: this.serchData.jurisdiction
      }
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
