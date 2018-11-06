<template>
  <div class="login-wrap">
    <div class="ms-title">后台管理系统</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item prop="checkCode">
          <el-input type="text" placeholder="请输入验证码" v-model="ruleForm.checkCode"
                    @keyup.enter.native="submitForm('ruleForm')" style="width:50%"></el-input>
          <div class="show_canvas" @click="createCode">
            <canvas class="code"></canvas>
            <!-- <span class="flush">点击刷新</span> -->
          </div>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="remember">记住密码</el-checkbox>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import {login, sysMenuGetMenuListByRoleId} from '../api/server.js'
import {setStore, getStore, rasPublic} from '../utils/local.js'
import {mapActions} from 'vuex'
import {menu_items} from '../utils/items'

import md5 from 'js-md5'

export default {
  data: function () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        checkCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ]
      },
      err: '',
      flag: false,
      check_code: '',
      checkCode: '',
      remember: true
    }
  },
  created () {
    let username = getStore('u')
    let password = getStore('p')
    console.log('username', username, password)
    this.ruleForm.username = username
    this.ruleForm.password = password
    this.remember = getStore('r')
    console.log('this.', this.remember)
  },
  methods: {
    // 分发Actions
    // this.$store.dispatch('xxx')
    // 这里使用辅助函数分发
    ...mapActions(['saveLogin', 'saveMenus']),
    submitForm (formName) {
      const self = this
      let code1 = self.check_code
      let code2 = self.ruleForm.checkCode
      // 表单验证
      self.$refs[formName].validate((valid) => {
        let username = self.ruleForm.username
        let jse = new this.$jsEncrypt.JSEncrypt()
        jse.setPublicKey(rasPublic)
        let password = self.ruleForm.password
        // md5加密密码
        // let pwd = self.ruleForm.password
        // let password = jse.encrypt(md5(pwd).toLowerCase())
        if (valid) {
          if (code1.toLowerCase() !== code2.toLowerCase()) {
            self.$message.error('验证码输入错误，请重新输入')
            self.createCode()
            return
          }
          login({username, password})
            .then(res => {
              // 保存用户名密码
              setStore('u', username)
              if (this.remember) {
                setStore('p', password)
                setStore('r', this.remember)
              }
              // 保存用户信息
              self.saveLogin(res.data)

              // 获取角色ID
              let roleId = res.data.roleid
              // 根据角色ID获取角色对应菜单
              sysMenuGetMenuListByRoleId({roleId})
                .then(res => {
                  let arr = res.data
                  // localStorage中保存用户菜单
                  setStore('m', arr)
                  // store中保存用户菜单
                  self.saveMenus(arr)
                })

                // let arr = res.result.menus
                // console.log('munu_items', menu_items)
                // let items = menu_items.filter(it => {
                //   console.log('it:', it)
                //   let sub = it.subs.filter(sub => {
                //     if (arr.indexOf(sub.id) >= 0) {
                //       return sub
                //     }
                //   })
                //   if (sub.length > 0) {
                //     it.subs = sub
                //     return it
                //   }
                // })
                // setStore('m', items)
                // //保存用户菜单
                // self.saveMenus(items)
              self.$router.push({
                path: '/'
              })
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 创建验证码
    createCode () {
      var code = []
      code.length = 4
      let random = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
      for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * 34)
        code.push(random[index])
      }
      this.check_code = code.join('')
      this.draw_check(this.check_code)
    },
    draw_check (code) {
      let canvas = document.querySelector('.code')
      let ctx = canvas.getContext('2d')
      canvas.height = canvas.height
      ctx.font = '94px Arial'
      ctx.fillStyle = this.randomColor(180, 230)
      ctx.fillText(code, 0, canvas.height)
    },
    randomColor (min, max) {
      let r = this.randomNum(min, max)
      let g = this.randomNum(min, max)
      let b = this.randomNum(min, max)
      return `rgb(${r},${g},${b})`
    },
    randomNum (min, max) {
      return parseInt(Math.random() * (max - min) + min)
    }
  },
  mounted () {
    this.createCode()
  }
}
</script>

<style lang="less" scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 270px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
  }

  .show_canvas {
    width: 45%;
    float: right;
    height: 100%;
    text-align: center;
  }

  .code {
    width: 50%;
    height: 100%;
  }

  .flush {
    text-align: center;
    display: block;
  }
</style>
