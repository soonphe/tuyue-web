<template>
  <div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">

        <el-form-item prop="name" label="模块名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="parentid" label="上级节点">
          <!--<el-input v-model="form.parentid"></el-input>-->
          <el-select v-model="form.parentid" placeholder="请选择类型">
            <el-option label="无上级" :value="0"></el-option>
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="name" label="模块链接">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item prop="icon" label="图标">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>
        <el-form-item prop="sortorder" label="排序">
          <el-input v-model="form.sortorder"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click.native.prevent="onSubmit">提交</el-button>
          <el-button @click="onCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import {VueEditor, Quill} from 'vue2-editor'
  import {upload, sysMenuGetList, sysMenuAdd} from '@/api/server'
  import {imageServer, localUploadServer, uploadServer,pageSize} from '@/utils/global'

  export default {
    components: {
      VueEditor
    },
    created() {
      // 判断是否为dev环境
      if (process.env.NODE_ENV === 'development') {
        // dev
        this.uploadAction = localUploadServer
      } else {
        // build
        this.uploadAction = uploadServer
      }
      this.getTypeData()
    },
    data() {
      return {
        uploadData: {
          file_type: 'img'
        },
        uploadAction: '',
        imageServer: imageServer,
        typeList: [],
        listQuery: {
          pageNum: 1,
          pageSize: pageSize,
          parentId: 0
        },
        form: {
          versioncode: '',
          name: '',
          content: '',
          filepath: ''
        },
        formRules: {
          versioncode: [{required: true, trigger: 'blur', message: '请填写版本编号'}],
          name: [{required: true, trigger: 'blur', message: '请输入推送名称'}],
          content: [{required: true, trigger: 'blur', message: '请填写版本编号'}],
          filepath: [{required: true, trigger: 'blur', message: '请填写版本编号'}]
        },
        loading: false,
        fullscreenLoading: false
      }
    },
    methods: {
      getTypeData() {
        sysMenuGetList(this.listQuery)
          .then(res => {
            this.typeList = res.data
          })
      },
      onSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading = true
            sysMenuAdd(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('添加成功')
                this.$router.push({
                  path: '/sysMenu/index'
                })
              }).catch(() => {
              this.loading = false
              this.$message({
                message: '添加失败!',
                type: 'warning'
              })
            })
          } else {
            this.loading = false
            this.$message({
              message: '请完善表单信息!',
              type: 'warning'
            })
          }
        })
      },
      onCancel() {
        this.$message({
          message: '取消添加!',
          type: 'warning'
        })
      }
    }
  }
</script>

<style scoped>
  .line {
    text-align: center;
  }

  .avatar-uploader {
    width: 430px;
    height: 320px;
    border: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .avatar {
    width: 430px;
    height: 320px;
    display: block;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 140px;
    line-height: 140px;
    text-align: center;
  }
</style>
