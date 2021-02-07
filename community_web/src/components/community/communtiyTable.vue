<template>
  <el-row>
    <el-col>
      <el-table :data="data"
                border
                style="width: 100%"
                height="564">
        <el-table-column label="id"
                         type="index">
        </el-table-column>
        <el-table-column label="社团名">
          <template slot-scope="scope">
            {{scope.row.clubName}}
          </template>
        </el-table-column>
        <el-table-column label="社团图标">
          <template slot-scope="scope">
            <div class="img-con">
              <img :src="scope.row.clubIcon"
                   width="85"
                   height="85" />
            </div>
          </template>
        </el-table-column>
        <el-table-column v-for="(item,index) in tableFrame"
                         :key="index"
                         :label="item.label"
                         :prop="item.prop">
        </el-table-column>
        <el-table-column label="社团简介"
                         width="200px"
                         :show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{scope.row.clubIntro}}
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)"
                       type="warning"
                       size="mini">编辑</el-button>
            <el-button @click="deleteData(scope.row)"
                       type="danger"
                       size="mini">删除</el-button>
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
  props: ['tableFrame', 'updateType', 'tableApi', 'serchData', 'deleteApi', 'deleteId'],
  data () {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      total: 0
    }
  },
  computed: {
    data: function () {
      let res = []
      let mid = this.tableData
      for (let a in mid) {
        mid[a].clubStar = Math.round(mid[a].starTotal / mid[a].evaluationTimes) + '星'
        let s = mid[a].show
        switch (s) {
          case 1:
            mid[a].show = '显示'
            break
          case 2:
            mid[a].show = '隐藏'
            break
        }
      }
      res = mid
      return res
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
    deleteData (data) {
      console.log(this.deleteId)
      let id
      for (var s in data) {
        console.log(s)
        if (s === this.deleteId) {
          id = data[s]
          break
        }
      }
      if (id !== '') {
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
      } else {
        this.$message({
          showClose: true,
          message: '系统异常',
          type: 'error'
        })
      }
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
</style>
