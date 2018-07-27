<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item prop="typeid" label="广告类型">
        <el-select v-model="form.typeid" placeholder="请选择类型">
          <el-option v-for="item in this.$route.params.typeList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="title" label="广告标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item prop="picurl" label="封面图" >
        <el-upload class="avatar-uploader"
                   action="uploadServer"
                   data="img"
                   name="file"
                   :show-file-list="false"
                   :on-success="handleAvatarSuccess"
                   :before-upload="beforeAvatarUpload"
                   v-loading.fullscreen.lock="fullscreenLoading"
                   ref="upload">
          <img v-if="form.picurl" :src="imageServer+form.picurl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
  import {upload,advertAdd} from '@/api/server'
  import {imageServer,uploadServer} from '@/utils/global'

  export default {
    data() {
      return {
        uploadServer:this.uploadServer,
        form: {
          typeid: '',
          title: '',
          picurl: '',
          sort: '',
          content: ''
        },
        formRules: {
          typeid: [{required: true, trigger: 'blur', message: '请选择类型'}],
          title: [{required: true, trigger: 'blur', message: '请输入标题'}],
          picurl: [{required: true, trigger: 'blur', message: '请选择图片'}],
          sort: [{required: true, trigger: 'blur', message: '请输入排序'}],
          content: [{required: true, trigger: 'blur', message: '请输入广告类容'}]
        },
        loading: false,
        fullscreenLoading: false,
      }
    },
    methods: {
      handleAvatarSuccess(res) {
        this.form.picurl = res.data
        this.fullscreenLoading = false
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 100MB!');
        }
        return isJPG && isLt2M;
      },
      videoHandler(state) {
        this.addRange = this.$refs.myEdit.quill.getSelection()
        if (state) {
          document.getElementById('imgInput').click()
        }
        this.uploadType = 'video'
      },
      imgHandler(state) {
        this.addRange = this.$refs.myEdit.quill.getSelection()
        if (state) {
          document.getElementById('imgInput').click()
        }
        this.uploadType = 'image'
      },
      onSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading = true
            advertAdd(this.form)
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
      },
      mounted() {
        this.$refs.myEdit.quill.getModule('toolbar').addHandler('image', this.imgHandler),
          this.$refs.myEdit.quill.getModule('toolbar').addHandler('video', this.videoHandler)
      }
    }
  }
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

