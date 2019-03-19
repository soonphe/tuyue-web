<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                :placeholder="$t('table.name')" v-model="listQuery.name"></el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" @click="add" info="primary" icon="el-icon-edit">添加</el-button>-->
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="id" label="ID" align="center" width="95"></el-table-column>
      <el-table-column prop="file_name" label="电影名称" align="center"></el-table-column>
      <!--<el-table-column label="封面" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<img :src="imageServer+scope.row.posterurl" style="width:100%;height:100%"/>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="director" label="导演" align="center"></el-table-column>-->
      <!--<el-table-column prop="actor" label="主演" align="center"></el-table-column>-->
      <!--<el-table-column prop="profile" label="简介" align="center"></el-table-column>-->
      <el-table-column prop="click" label="点击量" align="center" ></el-table-column>
      <!--<el-table-column prop="ctime" label="创建时间" align="center" width="200">-->
        <!--<template slot-scope="scope">-->
          <!--<i class="el-icon-time"></i>-->
          <!--<span>{{scope.row.ctime}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button info="primary" @click="put(scope.row)">编辑</el-button>-->
          <!--<el-button info="danger" @click="del(scope.row.id)">删除</el-button>-->
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
  import {movieGetList, movieDelete} from '@/api/server'
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
      // this.getTypeData()
      this.getList()
    },
    methods: {
      ...mapActions(['saveVideo', 'saveVideoType', 'clearVideo']),
      typeFormat(row, column) {
        // this.typeList.forEach((item,index)=>{
        //   console.log(row.info+'___'+item.id);
        //   if (row.info === item.id) {
        //     console.log('equals___'+item.name);
        //     return item.name
        //   }
        // })
      },
      clearType() {
        this.listQuery.type = undefined
      },
      getTypeData() {
        videoTypeGetList()
          .then(res => {
            this.typeList = res.data
            this.saveVideoType(this.typeList)
          })
      },
      getList() {
        this.listLoading = true
        movieGetList(this.listQuery)
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
        this.clearVideo()
        this.$router.push({
          /**
           * 页面间传值 ①使用路由带参数 ②使用vuex
           */
          path: '/movie/add'
          // 由于动态路由也是传递params的，所以在 this.$router.push() 方法中 path不能和params一起使用，否则params将无效。需要用name来指定页面
          // path: ({path: '/advert/add', params: {typeList: this.typeList}}) 错误
          // 通过路由名称跳转，携带参数（已成功）
          // name: 'advertAdd', params: {typeList: this.typeList}
        })
      },
      put(row) {
        this.saveVideo(row)
        this.$router.push({
          path: '/movie/add'
        })
      },
      del(id) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          movieDelete({id})
            .then(res => {
              this.$message.success('删除成功')
              // 两种message写法
              // this.$message({
              //   info: 'success',
              //   message: '删除成功!'
              // });
              this.list=this.list.filter(i => {
                return i.id != id
              })
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

