<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                :placeholder="$t('table.name')" v-model="listQuery.bookName"></el-input>
      <!--<el-select clearable @clear="clearType" class="filter-item" style="width: 130px" v-model="listQuery.type"-->
                 <!--:placeholder="$t('table.type')">-->
        <!--<el-option v-for="item in  typeList" :key="item.id" :label="item.name" :value="item.id">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="add" type="primary" icon="el-icon-edit">添加
      </el-button>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="bookId" label="ID" align="center" width="95"></el-table-column>
      <el-table-column prop="bookName" label="书名" align="center"></el-table-column>
      <el-table-column prop="author" label="作者" align="center"></el-table-column>
      <el-table-column prop="provider" label="供应方" align="center"></el-table-column>
      <el-table-column prop="category" label="分类" align="center"></el-table-column>
      <el-table-column label="封面" align="center">
        <template slot-scope="scope">

          <img :src="scope.row.coverImage" style="width:100%;height:100%"/>
          <!--<img :src="imageServer+scope.row.picurl" style="width:100%;height:100%"/>-->
        </template>
      </el-table-column>
      <el-table-column prop="clickCount" label="点击量" align="center" ></el-table-column>
      <!--<el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button type="primary" @click="put(scope.row)">编辑</el-button>-->
          <!--<el-button type="danger" @click="del(scope.row.id)">删除</el-button>-->
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
import {bookTypeGetList, zhbookGetList, bookDelete} from '@/api/server'
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
      listQuery: {
        pageNum: 1,
        pageSize: pageSize,
        bookName: undefined,
        type: undefined
      },
      imageServer: imageServer,
      typeList: []
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
    this.getTypeData()
    this.getList()
  },
  methods: {
    ...mapActions(['saveBook', 'saveBookType', 'clearBook']),
    clearType () {
      this.listQuery.type = undefined
    },
    getTypeData () {
      bookTypeGetList()
        .then(res => {
          this.typeList = res.data
          this.saveBookType(this.typeList)
        })
    },
    getList () {
      this.listLoading = true
      zhbookGetList(this.listQuery)
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
    add () {
      // 清除store中存储的advert数据
      this.clearBook()
      this.$router.push({
        /**
           * 页面间传值 ①使用路由带参数 ②使用vuex
           */
        path: '/book/add'
        // 由于动态路由也是传递params的，所以在 this.$router.push() 方法中 path不能和params一起使用，否则params将无效。需要用name来指定页面
        // path: ({path: '/advert/add', params: {typeList: this.typeList}}) 错误
        // 通过路由名称跳转，携带参数（已成功）
        // name: 'advertAdd', params: {typeList: this.typeList}
      })
    },
    put (row) {
      this.saveBook(row)
      this.$router.push({
        path: '/book/add'
      })
    },
    del (id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        bookDelete({id})
          .then(res => {
            this.$message.success('删除成功')
            this.list = this.list.filter(i => {
              return i.id != id
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
