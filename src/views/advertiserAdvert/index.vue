<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                :placeholder="$t('table.title')" v-model="listQuery.title"></el-input>
      <el-select clearable @clear="clearType" class="filter-item" style="width: 130px" v-model="listQuery.type"
                 :placeholder="$t('table.type')">
        <el-option v-for="item in  typeList" :key="item.id" :label="item.name" :value="item.id">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="add" type="primary" icon="el-icon-edit">添加
      </el-button>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="id" label="ID" align="center" width="95"></el-table-column>
      <el-table-column prop="typename" label="类型" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <img :src="imageServer+scope.row.picurl" style="width:100%;height:100%"/>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" align="center"></el-table-column>
      <el-table-column prop="click" label="点击量" align="center" ></el-table-column>
      <el-table-column prop="createtime" label="创建时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createtime}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column prop="sponsorid" label="广告主ID" align="center"></el-table-column>-->
      <el-table-column prop="starttime" label="开始时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.starttime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endtime" label="结束时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.endtime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="groupid" label="车组ID" align="center"></el-table-column>
      <el-table-column prop="state" label="状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.state == 0">未审核</span>
          <span v-else-if="scope.row.state == 1">审核未通过</span>
          <span v-else-if="scope.row.state == 2">审核通过</span>
        </template>
      </el-table-column>
      <el-table-column prop="carouselcount" label="轮播次数" align="center"></el-table-column>
      <el-table-column prop="showduration" label="展示时长" align="center"></el-table-column>

      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
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
import {advertTypeGetList, advertGetList, advertDelete, advertUpdate, advertiserSelectByUid} from '@/api/server'
import waves from '@/directive/waves' // 水波纹指令
import {imageServer, pageSize} from '@/utils/global'
import {setStore, getStore} from '@/utils/local'
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
      advertiserQuery: {
        uid: null
      },
      listQuery: {
        pageNum: 1,
        pageSize: pageSize,
        title: undefined,
        type: undefined,
        sponsorId: undefined,
        state: -1
      },
      advertiser: null,
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
    ...mapActions(['saveAdvert', 'saveAdvertType', 'clearAdvert']),
    typeFormat (row, column) {
      for (var i = 0; i < this.list.length; i++) {
        if (row.parentid === 0) {
          return '无'
        } else if (row.parentid === this.list[i].id) {
          return this.list2[i].name
        }
      }
    },
    clearType () {
      this.listQuery.type = undefined
    },
    getTypeData () {
      advertTypeGetList()
        .then(res => {
          this.typeList = res.data
          this.saveAdvertType(this.typeList)
        })
    },
    getList () {
      // 根据uid获取广告商信息
      this.advertiserQuery.uid = getStore('uid')
      advertiserSelectByUid(this.advertiserQuery)
        .then(res => {
          this.advertiser = res.data
          setStore('advertiserId', res.data.id)
          // setStore('advertiser', res.data)
        })
      this.listLoading = true
      advertGetList(this.listQuery)
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
        path: '/advertiserAdvert/add'
        // 由于动态路由也是传递params的，所以在 this.$router.push() 方法中 path不能和params一起使用，否则params将无效。需要用name来指定页面
        // path: ({path: '/advert/add', params: {typeList: this.typeList}}) 错误
        // 通过路由名称跳转，携带参数（已成功）
        // name: 'advertAdd', params: {typeList: this.typeList}
      })
    },
    put (row) {
      this.saveAdvert(row)
      this.$router.push({
        path: '/advertiserAdvert/add'
      })
    },
    del (id) {
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
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
    },
    verifyFail (id) {
      this.$confirm('确定要审核失败?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var formData = new FormData()
        formData.append('id', id)
        formData.append('state', 0)
        advertUpdate(formData)
          .then(res => {
            this.$message.success('操作成功')
            // 重新请求数据
            this.getList()
          })
      })
    },
    verifySuccess (id) {
      this.$confirm('确定要审核通过?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var formData = new FormData()
        formData.append('id', id)
        formData.append('state', 1)
        advertUpdate(formData)
          .then(res => {
            this.$message.success('操作成功')
            // 重新请求数据
            this.getList()
          })
      })
    }
  }
}
</script>
