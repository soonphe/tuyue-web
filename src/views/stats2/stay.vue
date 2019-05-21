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
      <el-button class="filter-item" style="margin-left: 10px;" @click="syncData" type="primary" icon="el-icon-edit">数据同步</el-button>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="createtime" label="创建时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createdate}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column prop="userNum" label="平板台数" align="center"></el-table-column>-->
      <!--<el-table-column prop="noMobile" label="非4G台数" align="center"></el-table-column>-->
      <!--<el-table-column prop="isMobile" label="4G台数" align="center"></el-table-column>-->
      <el-table-column prop="moviestime" label="电影" align="center"></el-table-column>
      <el-table-column prop="gametime" label="电玩" align="center"></el-table-column>
      <el-table-column prop="booktime" label="书吧" align="center"></el-table-column>
      <el-table-column prop="citytime" label="城市" align="center"></el-table-column>
      <el-table-column prop="subwaytime" label="城铁" align="center"></el-table-column>
      <el-table-column prop="foodtime" label="点餐" align="center"></el-table-column>
      <el-table-column prop="staysum" label="总计" align="center"></el-table-column>
      <!--<el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button info="primary" @click="put(scope.row)">查看详情</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
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
import {statsStayGetList, statsSyncStay} from '@/api/server'
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
      filename: '板块停留统计',
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
        this.listQuery.endDate = time[1]
      }
      statsStayGetList(this.listQuery)
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
        const tHeader = ['创建时间', '电影', '电玩', '书吧', '城市', '城铁', '点餐', '总计']
        const filterVal = ['createDate', 'moviesTime', 'gameTime', 'bookTime', 'cityTime', 'subwayTime', 'foodTime', 'staySum']
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
    syncData () {
      this.listLoading = true
      statsSyncStay()
        .then(res => {
          //延迟进度条1.5秒
          setTimeout(() => {
            this.listLoading = false
          }, 1.5 * 1000)
        })
      this.getList()
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
    },
    del (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      })
    }
  }
}
</script>
