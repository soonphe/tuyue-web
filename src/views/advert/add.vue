<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item prop="typeid" label="广告类型">
        <el-select v-model="form.typeid" placeholder="请选择类型">
          <el-option label="锁屏广告" value="shanghai"></el-option>
          <el-option label="首页广告" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="title" label="广告标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="封面图">
        <el-upload :class="avatar-uploader" ref="upload" :data="imageFile" :action="getLocation"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   v-loading.fullscreen.lock="fullscreenLoading"
                   :before-upload="beforeAvatarUpload">
          <img v-if="form.picurl" :src="imageServer+form.picurl" :class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon "></i>
        </el-upload>
        <span class="tips">建议尺寸:{{advertType !=='stdby'?'624*140':'1280*760'}} 像素</span>
      </el-form-item>
      <el-form-item label="广告内容" prop="content">
        <quill-editor v-model="form.content" ref="myEdit"></quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click.native.prevent="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {advertTypeAdd} from '@/api/server'
  import { imageServer} from '@/utils/global'

  export default {
    data() {
      return {
        form: {
          typeid:'',
          title: '',
          picurl: '',
          sort: '',
          content: ''
        },
        formRules: {
          typeid: [{required: true,trigger: 'blur', message: '请选择类型'}],
          title: [{required: true,trigger: 'blur', message: '请输入标题'}],
          picurl: [{required: true,trigger: 'blur', message: '请选择图片'}],
          sort: [{required: true,trigger: 'blur', message: '请输入排序'}],
          content: [{required: true,trigger: 'blur', message: '请输入广告类容'}]
        },
        loading: false,
      }
    },
    methods: {
      onSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading = true
            advertTypeAdd(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('添加成功')
                this.$router.push({
                  path: '/advertType/index'
                })
              }).catch(() => {
              this.loading = false
              this.$message({
                message: '添加失败!',
                type: 'warning'
              })
            })
          }else{
            this.loading = false
            this.$message({
              message: '请完善表单信息!',
              type: 'warning'
            })
          }
        })
      },
      onCancel()
        {
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
</style>

