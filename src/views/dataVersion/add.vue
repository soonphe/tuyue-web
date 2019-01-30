<template>
  <div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">

        <el-form-item prop="name" label="广告版本">
          <el-input v-model="form.advertversion"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="数据版本">
          <el-input v-model="form.dataversion"></el-input>
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
import {upload, dataVersionAdd} from '@/api/server'
import {imageServer, uploadServer} from '@/utils/global'

export default {
  components: {
    VueEditor
  },
  created () {

  },
  data () {
    return {
      uploadData: {
        file_type: 'img'
      },
      uploadAction: uploadServer,
      imageServer: imageServer,
      form: {
        advertversion: '',
        dataversion: ''
      },
      formRules: {
        advertversion: [{required: true, trigger: 'blur', message: '请输入推送名称'}],
        dataversion: [{required: true, trigger: 'blur', message: '请选择图片'}]
      },
      loading: false,
      fullscreenLoading: false
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          dataVersionAdd(this.form)
            .then(res => {
              this.loading = false
              this.$message.success('添加成功')
              this.$router.push({
                path: '/dataVersion/index'
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
    onCancel () {
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
