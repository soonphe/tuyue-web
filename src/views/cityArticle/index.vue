<template>
  <div class="app-container">
    <div class="filter-container">
      <!--<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"-->
      <!--:placeholder="$t('table.title')" v-model="listQuery.name"></el-input>-->
      <!--<el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>-->
      <el-button class="filter-item" style="margin-left: 10px;" @click="add" type="primary" icon="el-icon-edit">添加
      </el-button>
    </div>
    <el-tabs v-model="active_name" @tab-click="handleClick">
      <el-tab-pane label="文化" name="first"></el-tab-pane>
      <el-tab-pane label="美食" name="second"></el-tab-pane>
      <el-tab-pane label="生活" name="third"></el-tab-pane>
      <el-tab-pane label="旅游" name="four"></el-tab-pane>
    </el-tabs>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="id" label="ID" align="center" width="95"></el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="intro" label="简介" align="center"></el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <img :src="imageServer+scope.row.picurl" style="width:100%;height:100%"/>
        </template>
      </el-table-column>
      <el-table-column prop="click" label="点击量" align="center"></el-table-column>
      <el-table-column prop="createtime" label="创建时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createtime}}</span>
        </template>
      </el-table-column>
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
  import {cityArticleGetList, cityArticleDelete} from '@/api/server'
  import waves from '@/directive/waves' // 水波纹指令
  import {imageServer, pageSize} from '@/utils/global'
  import {mapActions} from 'vuex'
  import {mapState} from 'vuex'

  export default {
    // 定义局部指令
    directives: {
      waves
    },
    computed: {
      ...mapState({
        city_id: state => state.Advert.advertType
      })
    },
    data() {
      return {
        active_name: 'first',
        list: null,
        listLoading: true,
        total: 0,
        listQuery: {
          pageNum: 1,
          pageSize: pageSize,
          title: undefined,
          typeId: 0,
          cityId: 0
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
      this.listQuery.cityId = this.city_id
      this.getList()
    },
    methods: {
      ...mapActions(['saveAdvert', 'saveAdvertType', 'clearAdvert']),
      typeFormat(row, column) {
        // this.typeList.forEach((item,index)=>{
        //   console.log(row.type+'___'+item.id);
        //   if (row.type === item.id) {
        //     console.log('equals___'+item.name);
        //     return item.name
        //   }
        // })
      },
      getList() {
        this.listLoading = true
        // alert(this.cityId)
        cityArticleGetList(this.listQuery)
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
      handleClick() {
        if (this.active_name == 'first') {
          this.listQuery.typeId = 0;
        } else if (this.active_name == 'second') {
          this.listQuery.typeId = 1;
        } else if (this.active_name == 'third') {
          this.listQuery.typeId = 2;
        } else {
          this.listQuery.typeId = 3;
        }
        this.getList()
      },
      add() {
        this.clearAdvert()
        this.saveAdvert({
          'cityid': this.listQuery.cityId,
          'typeid': this.listQuery.typeId
        })
        this.$router.push({
          // name: 'cityArticleAdd',
          // params: {typeId: this.listQuery.typeId}
          path: '/cityArticle/add'
        })
      },
      put(row) {
        this.saveAdvert(row)
        this.$router.push({
          path: '/cityArticle/add'
        })
      },
      del(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          cityArticleDelete({id})
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
