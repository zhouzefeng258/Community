<template>
  <div class="tabelPage">
    <el-row :gutter="4"
            class="operationDiv">
      <el-col :span="2">
        <el-input placeholder="按申请人"
                  v-model="serchData.president"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-input placeholder="按社团名"
                  v-model="serchData.clubName"
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
      </el-col> -->
    </el-row>
    <tablea :tableFrame="tableFrame"
            :tableApi="tableApi"
            :deleteApi="deleteApi"
            :serchData='serchData'
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
                 @hideDialog="hideDialog"
                 @updateTable="updateTable"
                 v-if="dialogVisible"></auditDialog>
  </div>
</template>
<script>
import * as api from '../../api/index'
export default {
  components: {
    tablea: () => import('../../components/public/auditTabel'),
    auditDialog: () => import('../../components/community/auditDialog')
  },
  data () {
    return {
      serchType: true,
      updateType: false,
      operationType: true,
      serchData: {
        president: '',
        clubName: ''
      },
      ApiInterface: api.clubApproved,
      tableApi: api.getApproveList,
      deleteApi: api.deleteUser,
      tableFrame: [
        {
          label: 'id',
          prop: 'id'
        },
        {
          label: '社团名',
          prop: 'clubName'
        },
        {
          label: '社团类型',
          prop: 'clubType'
        },
        {
          label: '指导教师',
          prop: 'teacher'
        },
        {
          label: '社团负责人',
          prop: 'president'
        },
        {
          label: '所属院系',
          prop: 'department'
        },
        {
          label: '申请理由',
          prop: 'Reason'
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
      this.ApiInterface = api.clubApproved
      this.title = '申请详情'
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
      this.serchData = {
        president: '',
        clubName: ''
      }
      this.updateTable(2)
    }
  }
}
</script>
<style  scoped>
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
