<template>
  <div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
        <el-form-item prop="name" label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="排序">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="contact" label="联系人">
          <el-input v-model="form.contact"></el-input>
        </el-form-item>
        <el-table-column prop="agenttime" label="代理时间" align="center" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{scope.row.agenttime}}</span>
          </template>
        </el-table-column>
        <el-form-item prop="state" label="状态">
          <el-select v-model="form.state" placeholder="请选择类型">
            <el-option  label="开启" value="0" ></el-option>
            <el-option  label="关闭" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="level" label="级别">
          <el-select v-model="form.level" placeholder="请选择类型">
            <el-option  label="1" value="1" ></el-option>
            <el-option  label="2" value="2"></el-option>
            <el-option  label="3" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="parentid" label="父级ID">
          <el-input v-model="form.parentid"></el-input>
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
import {upload, advertiserAdd, advertiserUpdate} from '@/api/server'
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
      advertType: state => state.Advert.advertType
    })
  },
  data () {
    return {
      uploadData: {
        file_type: 'img'
      },
      uploadAction: '',
      imageServer: imageServer,
      // form: {
      //   type: '',
      //   title: '',
      //   picurl: '',
      //   sort: '',
      //   content: ''
      // },
      formRules: {
        typeid: [{required: true, trigger: 'blur', message: '请选择类型'}],
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
            advertiserUpdate(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('更新成功')
                this.$router.push({
                  path: '/advertiser/index'
                })
              })
          } else {
            advertiserAdd(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('添加成功')
                this.$router.push({
                  path: '/advertiser/index'
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
