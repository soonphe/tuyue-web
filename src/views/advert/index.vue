<template>

  <div class="app-container">
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label='序号' align="center" width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" align="center" width="95"></el-table-column>
      <el-table-column prop="typeid" label="类型" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="sort" label="排序" align="center"></el-table-column>
      <el-table-column prop="createtime" label="创建时间" align="center" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.createtime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="put(scope.row)">编辑</el-button>
          <el-button @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!--<div class="block">-->
  <!--<span class="demonstration">大于 7 页时的效果</span>-->
  <!--<el-pagination @current-change="handleCurrentChange"-->
  <!--:current-page="page.number+1"-->
  <!--layout="total,prev, pager, next,jumper"-->
  <!--:total="totalElements">-->
  <!--</el-pagination>-->
  <!--</div>-->
</template>

<script>
  import {advertGetList} from '@/api/server'

  export default {
    data() {
      return {
        list: null,
        listLoading: true
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
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        advertGetList()
          .then(res => {
            this.list = res.data
            this.listLoading = false
          }).catch(() => {
          this.loading = false
        })
      }
    }
  }
</script>
