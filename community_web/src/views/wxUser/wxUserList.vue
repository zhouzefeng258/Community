<template>
  <div class="tabelPage"
       id="newsList">
    <el-row :gutter="4"
            class="operationDiv">
      <el-col :span="3">
        <el-input placeholder="按昵称"
                  v-model="serchData.nickName"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-input placeholder="按名字"
                  v-model="serchData.name"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-input placeholder="按院/系"
                  v-model="serchData.department"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-input placeholder="按班级"
                  v-model="serchData.class"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-input placeholder="学号"
                  v-model="serchData.studentId"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="3"
              v-if="userInfo.jurisdiction === 1">
        <el-input placeholder="按社团"
                  v-model="serchData.communityName"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-select v-model="serchData.jurisdiction"
                   placeholder="按账户类型"
                   size="small">
          <el-option label="用户"
                     :value=1>
          </el-option>
          <el-option label="游客"
                     :value=2>
          </el-option>
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
            @reset='reset'
            @updateTable="updateTable"
            v-if="serchType"
            ref="table"></tablea>
    <dialoga :dialogVisible="dialogVisible"
             :ApiInterface="ApiInterface"
             :dialogData="fromeData"
             :title="title"
             :operationType="operationType"
             @hideDialog="hideDialog"
             @updateTable="updateTable"
             v-if="dialogVisible"></dialoga>
  </div>
</template>
<script>
import * as api from '../../api/index'
export default {
  components: {
    tablea: () => import('../../components/wxUser/wxUserTable'),
    dialoga: () => import('../../components/wxUser/wxUserDialog')
  },
  data () {
    return {
      serchType: true,
      updateType: false,
      operationType: true,
      serchData: {
        nickName: '',
        name: '',
        communityName: '',
        department: '',
        studentId: '',
        jurisdiction: '',
        class: ''
      },
      ApiInterface: api.updatedUser,
      tableApi: api.getUserList,
      deleteApi: api.deleteWxUser,
      deleteId: 'id',
      page: 'list',
      tableFrame: [
        {
          label: '名字',
          prop: 'name'
        },
        {
          label: '性别',
          prop: 'sex'
        },
        {
          label: '分院/系',
          prop: 'department'
        },
        {
          label: '班级',
          prop: 'class'
        }, {
          label: '学号',
          prop: 'studentId'
        }, {
          label: '社团',
          prop: 'communityName'
        }
        // , {
        //   label: '账户等级',
        //   prop: 'jurisdiction'
        // }

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
      this.title = '编辑用户信息'
      this.operationType = true
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
  margin-left: 15px;
}
</style>
