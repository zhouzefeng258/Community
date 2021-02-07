<template>
  <el-dialog title="报名记录"
             :visible.sync="dialogTableVisible"
             :before-close="hide"
             :close-on-click-modal="false"
             width="70%">
    <div class="tabelPage"
         id="newsList">
      <el-row :gutter="4"
              class="operationDiv">
        <el-col :span="3">
          <el-input placeholder="按姓名"
                    v-model="serchData.name"
                    clearable
                    size="small">
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-input placeholder="按学号"
                    v-model="serchData.studentId"
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
              @reset='reset'
              @updateTable="updateTable"
              v-if="serchType"
              ref="table"></tablea>
      <!-- <auditDialog :dialogVisible="dialogVisible"
                 :ApiInterface="ApiInterface"
                 :dialogData="dialogData"
                 :title="title"
                 :operationType="operationType"
                 @hideDialog="hideDialog"
                 @updateTable="updateTable"
                 v-if="dialogVisible"></auditDialog> -->
    </div>
  </el-dialog>

</template>
<script>
import * as api from '../../api/index'
export default {
  components: {
    tablea: () => import('../../components/activity/activityRecordTable')
  },
  props: ['dialogData', 'dialogTableVisible'],
  data () {
    return {
      serchType: true,
      updateType: false,
      operationType: true,
      serchData: {
        clubName: '',
        activityName: '',
        name: '',
        studentId: ''
      },
      ApiInterface: '',
      tableApi: api.getActivitieEnrollList,
      deleteApi: api.deleteActivitieEnroll,
      deleteId: 'recordId',
      page: 'list',
      tableFrame: [
        {
          label: 'id',
          prop: 'recordId'
        },
        {
          label: '活动标题',
          prop: 'activityName'
        },
        {
          label: '名字',
          prop: 'name'
        },
        {
          label: '学号',
          prop: 'studentId'
        },
        {
          label: '社团',
          prop: 'clubName'
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
      this.fromeData = data
      this.$router.push({
        name: '编辑活动',
        params: {
          data: this.fromeData
        }
      })
    },
    hide () {
      this.$emit('hideDialog')
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
      this.serchData.clubName = this.dialogData.clubName
      this.serchData.activityName = this.dialogData.activityName
      this.serchData.name = ''
      this.serchData.studentId = ''
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
    // this.getUserInfo()
    // if (this.userInfo.jurisdiction === 2) {
    //   this.getMyClubInfo()
    //   this.serchData.clubName = this.clubInfo.clubName
    // }
    this.serchData.clubName = this.dialogData.clubName
    this.serchData.activityName = this.dialogData.activityName
    // this.updateTable(2)
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
