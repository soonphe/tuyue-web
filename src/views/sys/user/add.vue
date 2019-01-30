<template>
  <div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">

        <el-form-item prop="name" label="用户名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="账户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item prop="roleid" label="角色">
          <!--<el-input v-model="form.roleid"></el-input>-->
          <el-select v-model="form.roleid" placeholder="请选择类型">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
  import {VueEditor, Quill} from 'vue2-editor'
  import {upload, sysUserAdd, sysRoleGetList} from '@/api/server'
  import {imageServer, uploadServer} from '@/utils/global'

  export default {
    components: {
      VueEditor
    },
    created() {
      this.getTypeData()
    },
    data() {
      return {
        uploadData: {
          file_type: 'img'
        },
        uploadAction: uploadServer,
        imageServer: imageServer,
        typeList: [],
        listQuery: {
          pageNum: 1,
          pageSize: 100,
          parentId: -1,
          roleId: -1
        },
        form: {
          name: '',
          username: '',
          password: '',
          roleid: undefined
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
        sysRoleGetList(this.listQuery)
          .then(res => {
            this.typeList = res.data
          })
      },
      onSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading = true
            var param = {
              roleid: this.form.roleid
            }
            sysUserAdd(this.form,param )
              .then(res => {
                this.loading = false
                this.$message.success('添加成功')
                this.$router.push({
                  path: '/sysUser/index'
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
