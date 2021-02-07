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
      <el-col :span="3">
        <el-input placeholder="按活动标题"
                  v-model="serchData.activityName"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-input placeholder="按活动负责人"
                  v-model="serchData.ActivityLeader"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-select v-model="serchData.ActivityType"
                   placeholder="按活动状态"
                   size="small">
          <el-option label="进行中"
                     value="进行中"></el-option>
          <el-option label="已结束"
                     value="已结束"></el-option>
        </el-select>
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
      <!-- <el-col :span="1"
              :offset="1">
        <el-button size="small"
                   type="primary"
                   @click="add()">新增</el-button>
      </el-col>-->
    </el-row>
    <tablea :tableFrame="tableFrame"
            :tableApi="tableApi"
            :deleteApi="deleteApi"
            :serchData='serchData'
            :deleteId='deleteId'
            :page='page'
            @getEditData='getEditData'
            @getRecordDialog='getRecordDialog'
            @reset='reset'
            @updateTable="updateTable"
            v-if="serchType"
            ref="table"></tablea>
    <recordDialog :dialogTableVisible="dialogTableVisible"
                  :dialogData="dialogData"
                  :title="title"
                  @hideDialog="hideDialog"
                  @updateTable="updateTable"
                  v-if="dialogTableVisible"></recordDialog>
  </div>
</template>
<script>
import * as api from '../../api/index'
export default {
  components: {
    tablea: () => import('../../components/activity/activityTable'),
    recordDialog: () => import('../../components/activity/activityRecordDialog')
  },
  data () {
    return {
      serchType: true,
      updateType: false,
      operationType: true,
      serchData: {
        clubName: '',
        activityName: '',
        ActivityLeader: '',
        ActivityType: '',
        approvalStatus: '已通过'
      },
      ApiInterface: api.activityApproval,
      tableApi: api.getActivityList,
      deleteApi: api.deleteActivity,
      deleteId: 'activityId',
      page: 'list',
      tableFrame: [
        {
          label: '活动地点',
          prop: 'address'
        },
        {
          label: '总人数',
          prop: 'totalNumber'
        },
        {
          label: '剩余人数',
          prop: 'surplusNumber'
        }, {
          label: '活动状态',
          prop: 'ActivityType'
        }

      ],
      dialogTableVisible: false,
      fromData: {},
      title: '',
      userInfo: {},
      clubInfo: {},
      dialogData: {}
    }
  },
  methods: {
    getEditData (data) {
      this.fromeData = data
      this.$router.push({
        name: '编辑活动',
        params: {
          data: this.fromeData
        }
      })
    },
    getRecordDialog (data) {
      console.log(data)
      this.dialogTableVisible = true
      this.dialogData = data
    },
    hideDialog () {
      this.dialogTableVisible = false
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
      if (this.userInfo.jurisdiction === 2) {
        this.serchData.clubName = this.clubInfo.clubName
      } else {
        this.serchData.clubName = ''
      }
      this.serchData.activityName = ''
      this.serchData.ActivityLeader = ''
      this.serchData.ActivityType = ''
      this.updateTable(2)
    },
    getUserInfo () {
      this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    },
    getMyClubInfo () {
      this.clubInfo = JSON.parse(sessionStorage.getItem('myCommunityInfo'))
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
  margin-left: 45px;
}
</style>
