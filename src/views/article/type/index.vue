<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" @click="addType" type="primary" icon="el-icon-edit">添加</el-button>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column prop="id" label="ID" align="center" width="95"></el-table-column>
      <el-table-column prop="name" label="名称" align="center"></el-table-column>
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
  </div>
</template>

<script>
  import {articleTypeGetList} from '@/api/server'
  import {mapActions} from 'vuex'

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
      ...mapActions([ 'saveAdvert', 'clearAdvert']),
      fetchData() {
        this.listLoading = true
        articleTypeGetList()
          .then(res => {
            this.list = res.data
            this.listLoading = false
          })
      },
      addType() {
        this.$router.push({
          path: '/articleType/add'
        })
      },
      put(row) {
        this.saveAdvert(row)
        this.$router.push({
          path: '/articleType/add'
        })
      }
    }
  }
</script>
