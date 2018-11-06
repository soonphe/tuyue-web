<template>
  <div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
        <el-form-item prop="imcode" label="IM码">
          <el-input v-model="form.imcode" disabled="true"></el-input>
        </el-form-item>
        <el-form-item prop="groupid" label="组号">
          <el-input v-model="form.groupid"></el-input>
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
import {devicesUpdate} from '@/api/server'
import {imageServer, localUploadServer, uploadServer} from '@/utils/global'
import {mapState} from 'vuex'

export default {
  components: {
    VueEditor
  },
  created () {
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
  data () {
    return {
      uploadData: {
        file_type: 'img'
      },
      uploadAction: '',
      imageServer: imageServer,
      formRules: {
        // typeid: [{required: true, trigger: 'blur', message: '请选择类型'}],
        // cityid: [{required: true, trigger: 'blur', message: '城市ID不能为空'}],
        groupid: [{required: true, trigger: 'blur', message: '请选择组号'}]
      },
      loading: false,
      fullscreenLoading: false
    }
  },
  methods: {
    beforeAvatarUpload (file) {
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
    handleAvatarSuccess (res) {
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
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.form.id) {
            devicesUpdate(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('更新成功')
                this.$router.push({
                  path: '/devices/index'
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
