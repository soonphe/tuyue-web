<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                :placeholder="$t('table.name')" v-model="listQuery.name"></el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" @click="add" type="primary" icon="el-icon-edit">添加-->
      </el-button>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="id" label="ID" align="center" width="95"></el-table-column>
      <el-table-column prop="advertId" label="广告ID" align="center"></el-table-column>
      <el-table-column prop="groupId" label="车组ID" align="center"></el-table-column>
      <el-table-column prop="groupName" label="车组名称" align="center"></el-table-column>

      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" @click="put(scope.row)">查看数据</el-button>
          <!--<el-button type="primary" @click="put(scope.row)">编辑</el-button>-->
          <!--<el-button type="danger" @click="del(scope.row.id)">删除</el-button>-->
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
import { advertGetGroupListByAdvertId } from '@/api/server'
import waves from '@/directive/waves' // 水波纹指令
import {imageServer, pageSize} from '@/utils/global'
import {mapActions} from 'vuex'
import {mapState} from 'vuex'
import {setStore, getStore} from '@/utils/local'

export default {
  // 定义局部指令
  directives: {
    waves
  },
  created () {
    this.listQuery.id = this.form.id
    this.listQuery.id = getStore('advertId')
    this.getList()
  },
  computed: {
    ...mapState({
      form: state => state.Advert.advert,
    })
  },
  data () {
    return {
      advertiserList: null,
      list: null,
      listLoading: true,
      total: 0,
      listQuery: {
        pageNum: 1,
        pageSize: pageSize,
        id: undefined,
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
  methods: {
    ...mapActions(['saveAdvert', 'saveAdvertType', 'clearAdvert']),
    typeFormat (row, column) {
      for (var i = 0; i < this.advertiserList.length; i++) {
        if (row.advertiserid === 0) {
          return '无'
        } else if (row.advertiserid === this.advertiserList[i].id) {
          return this.advertiserList[i].name
        }
      }
    },
    clearType () {
      this.listQuery.type = undefined
    },
    // getTypeData() {
    //   advertTypeGetList()
    //     .then(res => {
    //       this.typeList = res.data
    //       this.saveAdvertType(this.typeList)
    //     })
    // },
    getList () {
      this.listLoading = true
      advertGetGroupListByAdvertId(this.listQuery)
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
      this.clearAdvert()
      this.$router.push({
        /**
           * 页面间传值 ①使用路由带参数 ②使用vuex
           */
        path: '/advertSponsor/add'
        // 由于动态路由也是传递params的，所以在 this.$router.push() 方法中 path不能和params一起使用，否则params将无效。需要用name来指定页面
        // path: ({path: '/advert/add', params: {typeList: this.typeList}}) 错误
        // 通过路由名称跳转，携带参数（已成功）
        // name: 'advertAdd', params: {typeList: this.typeList}
      })
    },
    put (row) {
      this.saveAdvert(row)
      setStore('groupId', row.groupId)
      this.$router.push({
        path: '/advertStats/index'
      })
    },
    del (id) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        advertSponsorDelete({id})
          .then(res => {
            this.$message.success('删除成功')
            // 两种message写法
            // this.$message({
            //   info: 'success',
            //   message: '删除成功!'
            // });
            // 删除本地数据
            this.list = this.list.filter(i => {
              return i.id != id
            })
            // 重新请求数据
            // this.getList()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '删除异常'
        })
      })
    }
  }
}
</script>
