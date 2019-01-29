<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item prop="name" label="类型名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click.native.prevent="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {foodTypeAdd} from '@/api/server'
import {mapState} from 'vuex'

export default {
  computed: {
    ...mapState({
      form: state => state.Advert.advert,
    })
  },
  data () {
    return {
      // form: {
      //   name: ''
      // },
      formRules: {
        name: [{required: true, trigger: 'blur', message: '请输入名称'}]
      },
      loading: false
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          if (this.form.id) {
            foodTypeUpdate(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('更新成功')
                this.$router.push({
                  path: '/foodType/index'
                })
              })
          } else {
            foodTypeAdd(this.form)
              .then(res => {
                this.loading = false
                this.$message.success('添加成功')
                this.$router.push({
                  path: '/foodType/index'
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
</style>
