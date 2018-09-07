<template>
  <div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
        <el-form-item prop="cityid" label="城市id" hidden >
          <el-input v-model="form.cityid"></el-input>
        </el-form-item>
        <el-form-item prop="typeid" label="城市文章类型">
          <el-select v-model="form.typeid" placeholder="请选择类型">
            <el-option v-for="item in advertType" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="title" label="标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item prop="intro" label="简介">
          <el-input v-model="form.intro"></el-input>
        </el-form-item>
        <el-form-item prop="picurl" label="封面图">
          <el-upload class="avatar-uploader"
                     :action="uploadAction"
                     :data="uploadData"
                     name="file"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess"
                     :before-upload="beforeAvatarUpload"
                     v-loading.fullscreen.lock="fullscreenLoading">
            <img v-if="form.picurl" :src="imageServer+form.picurl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <div id="app">
            <vue-editor id="editor"
                        useCustomImageHandler
                        @imageAdded="handleImageAdded" v-model="form.content">
            </vue-editor>
          </div>
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
  import {cityArticleAdd, cityArticleUpdate} from '@/api/server'
  import {imageServer, localUploadServer, uploadServer} from '@/utils/global'
  import {mapState} from 'vuex'

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
    },
    computed: {
      ...mapState({
        form: state => state.Advert.advert,
        city_id: state => state.Advert.advertType
      })
    },
    data() {
      return {
        advertType: [
          {
            'id': 0,
            'name': '文化'
          },
          {
            'id': 1,
            'name': '美食'
          },
          {
            'id': 2,
            'name': '生活'
          },
          {
            'id': 3,
            'name': '旅游'
          }
        ],
        uploadData: {
          file_type: 'img'
        },
        uploadAction: '',
        imageServer: imageServer,
        formRules: {
          // typeid: [{required: true, trigger: 'blur', message: '请选择类型'}],
          // cityid: [{required: true, trigger: 'blur', message: '城市ID不能为空'}],
          type: [{required: true, trigger: 'blur', message: '请选择类型'}],
          title: [{required: true, trigger: 'blur', message: '请输入标题'}],
          sort: [{required: true, trigger: 'blur', message: '请输入排序'}],
          picurl: [{required: true, trigger: 'blur', message: '请选择图片'}],
          content: [{required: true, trigger: 'blur', message: '请输入广告类容'}]
        },
        loading: false,
        fullscreenLoading: false
      }
    },
    methods: {
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 100
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 100MB!')
        }
        this.fullscreenLoading = true
        return isJPG && isLt2M
      },
      handleAvatarSuccess(res) {
        this.form.picurl = res.data
        this.fullscreenLoading = false
      },
      // 处理富文本图片上传
      handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
        var formData = new FormData()
        formData.append('file', file)
        formData.append('file_type', 'img')
        axios({
          url: this.uploadAction,
          method: 'POST',
          data: formData
        }).then((result) => {
          let url = result.data.data // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', this.imageServer + url)
          resetUploader()
        }).catch((err) => {
          console.log(err)
        })
      },
      onSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.loading = true
            if (this.form.id) {
              cityArticleUpdate(this.form)
                .then(res => {
                  this.loading = false
                  this.$message.success('更新成功')
                  this.$router.push({
                    path: '/cityArticle/index'
                  })
                })
            } else {
              cityArticleAdd(this.form)
                .then(res => {
                  this.loading = false
                  this.$message.success('添加成功')
                  this.$router.push({
                    path: '/cityArticle/index'
                  })
                })
            }
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
