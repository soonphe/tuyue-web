<template>
  <div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">

        <el-form-item prop="name" label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="联系方式">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="contact" label="联系人">
          <el-input v-model="form.contact"></el-input>
        </el-form-item>
        <el-form-item prop="state" label="状态">
          <el-select v-model="form.state" placeholder="请选择类型">
            <el-option  label="开启" key="0" :value="0"  ></el-option>
            <el-option  label="关闭" key="1" :value="1"  ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="advertiserid" label="广告商ID">
          <!--<el-input v-model="form.advertiserid"></el-input>-->
            <el-select clearable  class="filter-item" style="width: 130px" v-model="form.advertiserid"
                       placeholder="广告商">
              <el-option v-for="item in  typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
import {upload, advertiserGetList, advertSponsorAdd, advertSponsorUpdate} from '@/api/server'
import {imageServer, uploadServer} from '@/utils/global'
import {mapState} from 'vuex'

export default {
  components: {
    VueEditor
  },
  created () {
    this.getTypeData()
  },
  computed: {
    ...mapState({
      form: state => state.Advert.advert,
      advertType: state => state.Advert.advertType
    })
  },
  data () {
    return {
      typeList: [],
      uploadData: {
        file_type: 'img'
      },
      uploadAction: uploadServer,
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
    getTypeData() {
      advertiserGetList()
        .then(res => {
          this.typeList = res.data
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
      upload(this.formData)
        .then(res => {
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
            advertSponsorUpdate(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('更新成功')
                this.$router.push({
                  path: '/advertSponsor/index'
                })
              })
          } else {
            advertSponsorAdd(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('添加成功')
                this.$router.push({
                  path: '/advertSponsor/index'
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
