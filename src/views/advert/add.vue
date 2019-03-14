<template>
  <div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
        <el-form-item prop="typeid" label="广告类型">
          <el-select v-model="form.typeid" placeholder="请选择类型">
            <el-option v-for="item in advertType" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="title" label="广告标题">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item prop="sort" label="排序">
          <el-input v-model="form.sort"></el-input>
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
        <el-form-item label="广告内容" prop="content">
          <div id="app">
            <vue-editor id="editor"
                        useCustomImageHandler
                        @imageAdded="handleImageAdded" v-model="form.content">
            </vue-editor>
          </div>
        </el-form-item>

        <el-form-item prop="sponsorid" label="广告主ID">
          <!--<el-input v-model="form.sponsorid"></el-input>-->
          <el-select clearable class="filter-item" style="width: 130px" v-model="form.sponsorid"
                     placeholder="广告主">
            <el-option label="请选择广告主" :value="0"></el-option>
            <el-option v-for="item in sponsorTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="starttime" label="执行开始时间">
          <el-date-picker v-model="form.starttime"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="date">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="endtime" label="执行结束时间">
          <el-date-picker v-model="form.endtime"
                          format="yyyy-MM-dd HH:mm:ss"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="date">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="groupid" label="车组ID">
          <!--<el-input v-model="form.groupid"></el-input>-->
          <el-select clearable class="filter-item" style="width: 130px" v-model="form.groupid"
                     placeholder="车组">
            <el-option label="请选择车组" :value="0"></el-option>
            <el-option v-for="item in groupTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="state" label="状态">
          <el-select v-model="form.state" placeholder="请选择类型">
            <el-option label="开启" :value="0"></el-option>
            <el-option label="关闭" :value="1"></el-option>
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
  import axios from 'axios'
import {VueEditor, Quill} from 'vue2-editor'
import {upload, groupGetList, advertSponsorGetList, advertAdd, advertUpdate} from '@/api/server'
import {imageServer, uploadServer} from '@/utils/global'
import {mapState} from 'vuex'

export default {
  components: {
    VueEditor
  },
  created () {
    this.getGroupTypeData()
    this.getSponsorTypeData()
  },
  computed: {
    ...mapState({
      form: state => state.Advert.advert,
      advertType: state => state.Advert.advertType
    })
  },
  data () {
    return {
      groupTypeList: [],
      sponsorTypeList: [],
      uploadData: {
        file_type: 'img'
      },
      uploadAction: uploadServer,
      imageServer: imageServer,
      formRules: {
        typeid: [{required: true, trigger: 'blur', message: '请选择类型'}],
        title: [{required: true, trigger: 'blur', message: '请输入标题'}],
        sort: [{required: true, trigger: 'blur', message: '请输入排序'}],
        // picurl: [{required: true, trigger: 'blur', message: '请选择图片'}],
        content: [{required: true, trigger: 'blur', message: '请输入广告类容'}]
      },
      loading: false,
      fullscreenLoading: false
    }
  },
  methods: {
    getGroupTypeData () {
      groupGetList()
        .then(res => {
          this.groupTypeList = res.data
        })
    },
    getSponsorTypeData () {
      advertSponsorGetList()
        .then(res => {
          this.sponsorTypeList = res.data
        })
    },
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
      upload(formData)
        .then(res => {
          let url = res.data // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', this.imageServer + url)
          resetUploader()
        }).catch((err) => {
          console.log(err)
        })
      // 封装axios上传
      // axios({
      //   url: this.uploadAction,
      //   method: 'POST',
      //   data: formData
      // }).then((result) => {
      //   let url = result.data.data // Get url from response
      //   Editor.insertEmbed(cursorLocation, 'image', this.imageServer + url)
      //   resetUploader()
      // }).catch((err) => {
      //   console.log(err)
      // })
    },
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.form.id) {
            advertUpdate(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('更新成功')
                this.$router.push({
                  path: '/advert/index'
                })
              })
          } else {
            advertAdd(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('添加成功')
                this.$router.push({
                  path: '/advert/index'
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
