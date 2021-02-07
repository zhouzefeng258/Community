<template>
  <div class="tabelPage">
    <el-row :gutter="4"
            class="operationDiv">
      <el-col :span="2">
        <el-input placeholder="按Id"
                  v-model="serchData.Admin_ID"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-input placeholder="按姓名"
                  v-model="serchData.Admin_Name"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-input placeholder="按用户名"
                  v-model="serchData.Admin_Username"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-input placeholder="按密码"
                  v-model="serchData.Admin_Password"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-select v-model="serchData.Admin_Sex"
                   placeholder="按性别"
                   size="small">
          <el-option label="男"
                     value="男">
          </el-option>
          <el-option label="女"
                     value="女">
          </el-option>
        </el-select>

      </el-col>
      <el-col :span="2">
        <el-input placeholder="按手机"
                  v-model="serchData.Admin_Tel"
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
      <el-col :span="1"
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
    tablea: () => import('../../components/public/table'),
    userDialog: () => import('../../components/userTableDialog/dialog')
  },
  data () {
    return {
      serchType: true,
      updateType: false,
      operationType: true,
      serchData: {
        Admin_ID: '',
        Admin_Name: '',
        Admin_Username: '',
        Admin_Password: '',
        Admin_Sex: '',
        Admin_Tel: ''
      },
      ApiInterface: '',
      tableApi: api.getlist2,
      deleteApi: api.deleteUser,
      tableFrame: [
        {
          label: 'id',
          prop: 'Admin_ID'
        },
        {
          label: '姓名',
          prop: 'Admin_Name'
        },
        {
          label: '用户名',
          prop: 'Admin_Username'
        },
        {
          label: '密码',
          prop: 'Admin_Password'
        },
        {
          label: '性别',
          prop: 'Admin_Sex'
        },
        {
          label: '手机',
          prop: 'Admin_Tel'
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
      this.operationType = true
      this.dialogVisible = true
    },
    hideDialog () {
      this.dialogVisible = false
    },
    add () {
      this.dialogData = {}
      this.ApiInterface = api.register
      this.title = '添加用户'
      this.operationType = false
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
      this.serchData = {
        Admin_ID: '',
        Admin_Name: '',
        Admin_Username: '',
        Admin_Password: '',
        Admin_Sex: '',
        Admin_Tel: ''
      }
      this.updateTable(2)
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
