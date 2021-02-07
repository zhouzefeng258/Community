<template>
  <div class="tabelPage"
       id="newsList">
    <el-row :gutter="4"
            class="operationDiv">
      <el-col :span="3">
        <el-input placeholder="按新闻标题"
                  v-model="serchData.newsTitle"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="3">
        <el-input placeholder="按新闻来源"
                  v-model="serchData.newsSource"
                  clearable
                  size="small">
        </el-input>
      </el-col>
      <el-col :span="5">
        <el-date-picker v-model="serchData.starTime"
                        type="datetime"
                        size="small"
                        placeholder="选择开始时间">
        </el-date-picker>
      </el-col>
      <el-col :span="5">
        <el-date-picker v-model="serchData.endTime"
                        type="datetime"
                        size="small"
                        placeholder="选择结束时间">
        </el-date-picker>
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
            :deleteId='deleteId'
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
</template>
<script>
import * as api from '../../api/index'
export default {
  components: {
    tablea: () => import('../../components/news/newsTable')
  },
  data () {
    return {
      serchType: true,
      updateType: false,
      operationType: true,
      serchData: {
        newsTitle: '',
        starTime: null,
        endTime: null,
        newsSource: ''
      },
      ApiInterface: api.clubApproved,
      tableApi: api.getNewsList,
      deleteApi: api.deleteNews,
      deleteId: 'newsId',
      tableFrame: [
        {
          label: '新闻标题',
          prop: 'newsTitle'
        },
        {
          label: '新闻来源',
          prop: 'newsSource'
        }
      ],
      dialogVisible: false,
      fromData: {},
      title: ''
    }
  },
  methods: {
    getEditData (data) {
      this.fromeData = data
      this.$router.push({
        name: '编辑新闻',
        params: {
          data: this.fromeData
        }
      })
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
        newsTitle: '',
        starTime: null,
        endTime: null,
        newsSource: ''
      }
      this.updateTable(2)
    }
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
  margin-left: 8px;
}
</style>
