<template>
  <el-row id="auditTabel">
    <el-col>
      <el-table :data="tableData"
                border
                style="width: 100%"
                height="564">
        <el-table-column v-for="(item,index) in tableFrame"
                         :key="index"
                         :label="item.label"
                         :prop="item.prop">
        </el-table-column>
        <!-- <el-table-column label="申请理由">
          <template slot-scope="scope">
            <div class="reason-content">
              {{scope.row.Reason}}
            </div>
          </template>
        </el-table-column> -->
        <el-table-column label="申请理由"
                         width="200px"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{scope.row.Reason}}
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="150">
          <template slot-scope="scope">
            <div class="centered">
              <el-button @click="handleClick(scope.row)"
                         type="primary"
                         size="mini"
                         class="tabel-button">查看</el-button>
              <el-button @click="deleteData(scope.row.id)"
                         type="danger"
                         size="mini"
                         class="tabel-button"
                         v-if="serchData.type!=1">删除</el-button>
            </div>
            <!-- <el-button @click="deleteData(scope.row.Admin_ID)"
                       type="danger"
                       size="mini">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24"
            class="center">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="currentPage"
                     :page-sizes="[10,20, 50, 100]"
                     :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: ['tableFrame', 'updateType', 'tableApi', 'serchData', 'deleteApi'],
  data () {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      total: 0
    }
  },
  methods: {
    getlist (currentPage, pageSize, serchData) {
      this.tableApi({ currentPage: currentPage, pagesize: pageSize, serchData: serchData }).then(data => {
        console.log(data)
        if (data.code === 200) {
          this.tableData = data.list
          this.total = data.total
          this.currentPage = data.currentPage
          this.pagesize = data.pagesize
        }
      })
    },
    // 编辑
    handleClick (data) {
      this.$emit('getEditData', data)
    },
    // 删除
    deleteData (id) {
      console.log(id)
      this.deleteApi({ id: id }).then(data => {
        if (data.code === 200) {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.update(3)
        } else {
          this.$message({
            showClose: true,
            message: '删除失败',
            type: 'error'
          })
        }
      })
    },
    // 分页组件用的
    handleSizeChange (val) {
      this.pagesize = val
      this.getlist(this.currentPage, val, this.serchData)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getlist(val, this.pagesize, this.serchData)
    },
    // 更新表格数据，操作数据后使用
    update (i) {
      if (i === 0) {
        this.getlist(this.currentPage, this.pagesize, this.serchData)
      } else if (i === 2) {
        let currentpage = 1
        setTimeout(() => {
          this.getlist(currentpage, this.pagesize, this.serchData)
        }, 100)
      } else if (i === 3) {
        if (this.currentPage > Math.ceil((this.total - 1) / this.pagesize)) {
          this.currentPage = this.currentPage - 1
          if (this.currentPage === 0) {
            this.currentPage = 1
          }
          this.getlist(this.currentPage, this.pagesize, this.serchData)
        } else {
          this.getlist(this.currentPage, this.pagesize, this.serchData)
        }
      } else {
        let currentpage = Math.ceil((this.total + i) / this.pagesize)
        this.getlist(currentpage, this.pagesize, this.serchData)
      }
    }

  },
  created () {
    this.getlist(this.currentPage, this.pagesize, this.serchData)
  }
}
</script>
<style scoped>
.table-con {
  width: 100%;
  height: 100%;
}
.table {
  height: 70%;
}
.center {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.centered {
  display: flex;
  justify-content: center;
}
.reason-content {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
}
</style>
<style >
</style>
