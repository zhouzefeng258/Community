<template>
  <div class="tabelPage"
       id="newsList">
    <el-row :gutter="4"
            class="operationDiv">
      <el-col :span="3"
              v-if="userInfo.jurisdiction === 1">
        <el-input placeholder="按社团名字"
                  v-model="serchData.clubName"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <!-- <el-col :span="3">
        <el-input placeholder="按社团"
                  v-model="serchData.clubName"
                  clearable
                  size="small">
        </el-input>
      </el-col> -->
      <el-col :span="3">
        <el-input placeholder="按发布人"
                  v-model="serchData.issuer"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-input placeholder="按标题"
                  v-model="serchData.announcementTitle"
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
      <el-col :span="3"
              :offset="1"
              v-if="userInfo.jurisdiction === 2">
        <el-button size="small"
                   type="primary"
                   @click="add()">发布新公告</el-button>
      </el-col>
    </el-row>
    <!-- <el-tabs v-model="serchData.type"
             type="card"
             @tab-click="handleClick">
      <el-tab-pane label="待审批"
                   name="待审批">
      </el-tab-pane>
      <el-tab-pane label="审批历史"
                   name="其他">
      </el-tab-pane>
    </el-tabs> -->
    <tablea :tableFrame="tableFrame"
            :tableApi="tableApi"
            :deleteApi="deleteApi"
            :serchData='serchData'
            :deleteId='deleteId'
            :page='page'
            @getEditData='getEditData'
            @reset='reset'
            @updateTable="updateTable"
            v-if="serchType"
            ref="table"></tablea>
    <auditDialog :dialogVisible="dialogVisible"
                 :ApiInterface="ApiInterface"
                 :dialogData="dialogData"
                 :title="title"
                 :operationType="operationType"
                 :serchData="serchData"
                 @hideDialog="hideDialog"
                 @updateTable="updateTable"
                 v-if="dialogVisible"></auditDialog>
  </div>
</template>
<script>
import * as api from '../../api/index'
export default {
  components: {
    tablea: () => import('../../components/community/announcementTable'),
    auditDialog: () => import('../../components/community/announcementDialog')
  },
  data () {
    return {
      serchType: true,
      updateType: false,
      operationType: true,
      serchData: {
        clubName: '',
        announcementTitle: ''
      },
      ApiInterface: '',
      tableApi: api.getAnnouncementList,
      deleteApi: api.deleteAnnouncement,
      deleteId: 'id',
      page: 'approval',
      tableFrame: [
        {
          label: 'id',
          prop: 'id'
        },
        {
          label: '公告标题',
          prop: 'announcementTitle'
        },
        {
          label: '发布人',
          prop: 'issuer'
        }
      ],
      dialogVisible: false,
      fromData: {},
      title: '',
      userInfo: {},
      clubInfo: {}
    }
  },
  methods: {
    getEditData (data) {
      console.log(data)
      this.dialogData = data
      this.ApiInterface = api.editAnnouncement
      this.title = '编辑公告'
      this.operationType = true
      this.dialogVisible = true
    },
    add () {
      this.dialogData = {}
      this.ApiInterface = api.addAnnouncement
      this.title = '发布公告'
      this.operationType = false
      this.dialogVisible = true
    },
    hideDialog () {
      this.dialogVisible = false
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
      this.serchData.name = ''
      this.serchData.student = ''
      this.updateTable(2)
    },
    getUserInfo () {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    },
    getMyClubInfo () {
      this.clubInfo = JSON.parse(sessionStorage.getItem('myCommunityInfo'))
    },
    handleClick () {
      console.log(this.serchData)
      this.updateTable(2)
    }
  },
  created () {
    this.getUserInfo()
    if (this.userInfo.jurisdiction === 2) {
      this.getMyClubInfo()
      this.serchData.clubName = this.clubInfo.clubName
    }
    console.log(this.userInfo.jurisdiction)
  }
}
</script>
<style>
#newsList .el-date-editor {
  width: 100%;
}
</style>
<style  scoped>
.tabelPage {
  width: 100%;
  height: 100%;
}

.operationDiv {
  margin-bottom: 10px;
}

.left {
  margin-left: 15px;
}
</style>
0
