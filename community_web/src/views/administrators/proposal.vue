<template>
  <div class="tabelPage">
    <el-row :gutter="4"
            class="operationDiv">
      <el-col :span="2">
        <el-input placeholder="按手机"
                  v-model="serchData.user_phone"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-input placeholder="按邮箱"
                  v-model="serchData.user_email"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="1"
              class="left">
        <el-button type="primary"
                   size="small"
                   @click="serch()">搜索</el-button>
      </el-col>
      <el-col :span="1"
              class="left">
        <el-button size="small"
                   type="primary"
                   @click="reset()">重置</el-button>
      </el-col>
    </el-row>
    <!-- <el-tabs v-model="jurisdiction"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="超级管理员"
                   name="超级管理员">
      </el-tab-pane>
      <el-tab-pane label="社团管理员"
                   name="社团管理员">
      </el-tab-pane>
    </el-tabs> -->
    <tablea :tableFrame="tableFrame"
            :tableApi="tableApi"
            :deleteApi="deleteApi"
            :deleteId='deleteId'
            :serchData='serchData'
            @getEditData='getEditData'
            @reset='reset'
            @updateTable="updateTable"
            v-if="serchType"
            ref="table"></tablea>
    <userDialog :dialogVisible="dialogVisible"
                :ApiInterface="ApiInterface"
                :dialogData="dialogData"
                :title="title"
                :operationType="operationType"
                @hideDialog="hideDialog"
                @updateTable="updateTable"
                v-if="dialogVisible"></userDialog>
  </div>
</template>
<script>
import * as api from '../../api/index'
export default {
  components: {
    tablea: () => import('../../components/public/proposalTable'),
    userDialog: () => import('../../components/public/proposalDialog')
  },
  data () {
    return {
      jurisdiction: '超级管理员',
      serchType: true,
      updateType: false,
      operationType: true,
      deleteId: 'id',
      serchData: {
        user_phone: '',
        user_email: ''
      },
      ApiInterface: '',
      tableApi: api.getProposalList,
      deleteApi: api.deleteProposal,
      tableFrame: [
        {
          label: '手机',
          prop: 'user_phone'
        },
        {
          label: '名字',
          prop: 'user_email'
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
      this.ApiInterface = ''
      this.title = '查看建议'
      this.operationType = true
      this.dialogVisible = true
    },
    hideDialog () {
      this.dialogVisible = false
    },
    // add () {
    //   this.dialogData = {}
    //   this.ApiInterface = api.addAdmin
    //   this.title = '添加管理员'
    //   this.operationType = false
    //   this.dialogVisible = true
    // },
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
        user_phone: '',
        user_email: ''
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
