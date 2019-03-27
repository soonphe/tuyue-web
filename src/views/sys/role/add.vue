<template>
  <div>
    <div class="app-container">
      <el-form ref="form" :model="form" :rules="formRules" label-width="120px">

        <el-form-item prop="name" label="角色名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="description" label="角色说明">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item prop="moduleArr" label="角色权限">
          <!--<el-input v-model="form.moduleArr"></el-input>-->
          <el-tree
            ref="tree"
            :data="typeList"
            :props="defaultProps"
            show-checkbox
            node-key="id"
            @node-click="handNodeClick">
          </el-tree>
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
import {upload, sysRoleAdd, sysMenuGetMenuListByRoleId} from '@/api/server'
import {imageServer, uploadServer} from '@/utils/global'

export default {
  components: {
    VueEditor
  },
  created () {
    this.getTypeData()
  },
  data () {
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
      defaultProps: {
        label: 'name',
        children: 'subs'
      },
      form: {
        name: '',
        description: ''
      },
      moduleArr: '',
      formRules: {
        // moduleArr: [{required: true, trigger: 'blur', message: '请填写选择模块'}],
        name: [{required: true, trigger: 'blur', message: '请输入推送名称'}],
        description: [{required: true, trigger: 'blur', message: '请填写版本编号'}]
      },
      loading: false,
      fullscreenLoading: false
    }
  },
  methods: {
    handNodeClick (data, node) {
      // console.log(data)
      // console.log(node)
    },
    getTypeData () {
      sysMenuGetMenuListByRoleId(this.listQuery)
        .then(res => {
          this.typeList = res.data
        })
    },
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          // this.loading = true
          // 获取树形控件选中的元素
          this.arrString = this.$refs.tree.getCheckedKeys()
          var arr = this.arrString.join('@@')
          // console.log(this.arrString)
          // console.log(arr)
          var param = {
            moduleArr: arr
          }
          sysRoleAdd(this.form, param)
            .then(res => {
              this.loading = false
              this.$message.success('添加成功')
              this.$router.push({
                path: '/sysRole/index'
              })
            }).catch(() => {
              this.loading = false
              this.$message({
                message: '添加失败!',
                type: 'warning'
              })
            })
            // axios({
            //   url: this.uploadAction+'sysRole/add',
            //   method: 'POST',
            //   data: formData,
            //   params: parm
            // }).then((result) => {
            //       this.loading = false
            //       this.$message.success('添加成功')
            //       this.$router.push({
            //         path: '/sysRole/index'
            //       })
            // }).catch((err) => {
            //     this.loading = false
            //     this.$message({
            //       message: '添加失败!',
            //       info: 'warning'
            //     })
            // })
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
