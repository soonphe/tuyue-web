<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker v-model="searchTime"
                      value-format="yyyy-MM-dd"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="exportExcel" type="primary" icon="el-icon-edit">导出</el-button>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="createDate" label="创建时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createDate}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalNum" label="总使用用户" align="center"></el-table-column>
      <el-table-column prop="clickNum" label="总解锁次数" align="center"></el-table-column>
      <el-table-column prop="padNum" label="平板台数" align="center"></el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="listQuery.pageNum"
                     :page-sizes="[10,20,30,50]"
                     :page-size="listQuery.pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {statsGetPadUser} from '@/api/server'
import waves from '@/directive/waves' // 水波纹指令
import {imageServer, pageSize} from '@/utils/global'
import {mapActions} from 'vuex'

export default {
  // 定义局部指令
  directives: {
    waves
  },
  data () {
    return {
      list: null,
      listLoading: true,
      total: 0,
      searchTime: '',
      listQuery: {
        pageNum: 1,
        pageSize: pageSize,
        startDate: '',
        endDate: ''
      },
      imageServer: imageServer,
      typeList: [],
      filename: '新增用户统计',
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created () {
    this.getList()
  },
  methods: {
    ...mapActions(['saveAdvert', 'saveAdvertType', 'clearAdvert']),

    getList () {
      this.listLoading = true
      let time = this.searchTime
      if (time.length) {
        this.listQuery.startDate = time[0]
        this.listQuery.endDate  = time[1]
      }
      statsGetPadUser(this.listQuery)
        .then(res => {
          this.list = res.data
          this.total = parseInt(res.ext)
          this.listLoading = false
          // 延迟进度条1.5秒
          // setTimeout(() => {
          //   this.listLoading = false
          // }, 1.5 * 1000)
        })
    },
    handleFilter () {
      this.listQuery.pageNum = 1
      this.getList()
    },
    handleSizeChange (val) {
      this.listQuery.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      this.listQuery.pageNum = val
      this.getList()
    },
    exportExcel () {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['创建时间', '新增用户']
        const filterVal = ['createTime', 'total']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson (filterVal, jsonData) {
      // 提取list中的数据，并转化为数组
      return jsonData.map(v => filterVal.map(j => {
        // if (j === 'timestamp') {
        //   return parseTime(v[j])
        // } else {
        console.log(v[j])
        return v[j]
        // }
      }))
    },
    detail (row) {
      this.saveAdvertType(row)
      this.$router.push({
        path: '/cityArticle/index'
      })
    },
    put (row) {
      this.saveAdvert(row)
      this.$router.push({
        path: '/city/add'
      })
    }
  }
}
</script>
