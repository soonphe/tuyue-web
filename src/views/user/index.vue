<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                :placeholder="$t('table.name')" v-model="listQuery.name"></el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="id" label="ID" align="center" width="95"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
      <el-table-column prop="sex" label="性别" :formatter="sexTypeFormat" align="center"></el-table-column>
      <el-table-column prop="age" label="年龄" :formatter="ageTypeFormat" align="center"></el-table-column>
      <el-table-column prop="createtime" label="创建时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createtime}}</span>
        </template>
      </el-table-column>
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
  import {userGetList} from '@/api/server'
  import waves from '@/directive/waves' // 水波纹指令
  import {imageServer, pageSize} from '@/utils/global'
  import {mapActions} from 'vuex'

  export default {
    // 定义局部指令
    directives: {
      waves
    },
    data() {
      return {
        list: null,
        listLoading: true,
        total: 0,
        listQuery: {
          pageNum: 1,
          pageSize: pageSize,
          name: undefined
        },
        imageServer: imageServer,
        typeList: []
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    created() {
      this.getList()
    },
    methods: {
      ...mapActions(['saveAdvert', 'saveAdvertType', 'clearAdvert']),
      sexTypeFormat(row, column) {
        if (row.sex === 0) {
          return "未知"
        } else if (row.sex === 1) {
          return "男"
        }else {
          return "女"
        }
      },
      ageTypeFormat(row, column) {
        if (row.age === 0) {
          return "0-20岁"
        } else if (row.age === 1) {
          return "20-40岁"
        } else if (row.age === 2) {
          return "40-60岁"
        } else {
          return "60岁以上"
        }
      },
      getList() {
        this.listLoading = true
        userGetList(this.listQuery)
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
      handleFilter() {
        this.listQuery.pageNum = 1
        this.getList()
      },
      handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val
        this.getList()
      },
      add() {
        // 清除store中存储的advert数据
        this.clearAdvert()
        this.$router.push({
          /**
           * 页面间传值 ①使用路由带参数 ②使用vuex
           */
          path: '/advert/add'
          // 由于动态路由也是传递params的，所以在 this.$router.push() 方法中 path不能和params一起使用，否则params将无效。需要用name来指定页面
          // path: ({path: '/advert/add', params: {typeList: this.typeList}}) 错误
          // 通过路由名称跳转，携带参数（已成功）
          // name: 'advertAdd', params: {typeList: this.typeList}
        })
      },
      put(row) {
        this.saveAdvert(row)
        this.$router.push({
          path: '/advert/add'
        })
      },
      del(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          advertDelete({id})
            .then(res => {
              this.$message.success('删除成功')
              // 两种message写法
              // this.$message({
              //   info: 'success',
              //   message: '删除成功!'
              // });
              this.getList()
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    }
  }
</script>

