<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                :placeholder="$t('table.name')" v-model="listQuery.name"></el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="add" type="primary" icon="el-icon-edit">添加</el-button>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>

      <!-- sub menu expand -->
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.subs" :show-header="false" border fit highlight-current-row>
            <el-table-column prop="id" label="ID " align="center" width="95"></el-table-column>
            <el-table-column prop="name" align="center"></el-table-column>
            <el-table-column prop="url" align="center"></el-table-column>
            <el-table-column prop="icon" label="图标" align="center">
              <template slot-scope="scope">
                <i class="sidebar-icon fa" :class="scope.row.icon" ></i>
              </template>
            </el-table-column>
            <el-table-column  align="center">
              <template slot-scope="scope">
                <el-button @click="put(scope.row)" type="primary">编辑</el-button>
                <span class="btnClass"></span>
                <el-button @click="del(scope.row.id)" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>

      <el-table-column prop="id" label="ID " align="center" width="95"></el-table-column>
      <el-table-column prop="name" label="模块名称" align="center" width="95"></el-table-column>
      <el-table-column prop="url" label="模块链接" align="center"></el-table-column>
      <el-table-column prop="icon" label="图标" align="center">
        <template slot-scope="scope">
          <i class="sidebar-icon fa" :class="scope.row.icon" ></i>
        </template>
      </el-table-column>
      <!--<el-table-column prop="sortorder" label="排序" align="center"></el-table-column>-->
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" @click="put(scope.row)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
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
  import {sysMenuGetMenuListByRoleId, sysMenuGetList, sysMenuDelete} from '@/api/server'
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
          parentId: -1,
          roleId: -1
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
      getList() {
        this.listLoading = true
        sysMenuGetMenuListByRoleId(this.listQuery)
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
          path: '/sysMenu/add'
          // 由于动态路由也是传递params的，所以在 this.$router.push() 方法中 path不能和params一起使用，否则params将无效。需要用name来指定页面
          // path: ({path: '/advert/add', params: {typeList: this.typeList}}) 错误
          // 通过路由名称跳转，携带参数（已成功）
          // name: 'advertAdd', params: {typeList: this.typeList}
        })
      },
      put(row) {
        this.saveVideo(row)
        this.$router.push({
          path: '/sysMenu/add'
        })
      },
      del(id) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sysMenuDelete({id})
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

