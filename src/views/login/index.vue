<template>
  <div class="login-container">
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm"
             label-position="left">
      <h3 class="title">途悦控制台</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <svg-icon icon-class="user"></svg-icon>
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on"
                  placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                  autoComplete="on"
                  placeholder="请输入密码"></el-input>
        <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye"></svg-icon></span>
      </el-form-item>
      <el-form-item prop="checkCode">
        <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
        <el-input type="text" placeholder="请输入验证码" v-model="loginForm.checkCode"
                  @keyup.enter.native="handleLogin" style="width:50%"></el-input>
        <div class="show_canvas" @click="createCode">
          <canvas class="code"></canvas>
          <!-- <span class="flush">点击刷新</span> -->
        </div>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="remember">记住密码</el-checkbox>
      </el-form-item>
      <el-form-item class="re">
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {login, sysMenuGetMenuListByRoleId} from '@/api/server'
  import {mapActions} from 'vuex'
  import {setStore, getStore, rasPublic} from '@/utils/local'
  import {isvalidUsername} from '@/utils/validate'

  export default {
    name: 'login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      };
      return {
        loginForm: {
          username: 'admin',
          password: 'admin'
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        checkCode: [
          {required: true, message: '请输入验证码', trigger: 'blur'}
        ],
        loading: false,
        pwdType: 'password',
        check_code: "",
        checkCode: '',
        remember: true
      }
    },
    created() {
      this.loginForm.username = getStore('username')
      this.loginForm.password = getStore('password')
      this.remember = getStore('remember')
    },
    methods: {
      // 分发Actions
      // this.$store.dispatch('xxx')
      // 这里使用辅助函数分发
      ...mapActions(["saveLogin", 'saveMenus']),
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            let username = this.loginForm.username
            let password = this.loginForm.password
            // md5加密密码
            // let jse = new this.$jsEncrypt.JSEncrypt()
            // jse.setPublicKey(rasPublic)
            // let pwd = self.ruleForm.password
            // let password = jse.encrypt(md5(pwd).toLowerCase())
            let code1 = this.check_code
            let code2 = this.loginForm.checkCode
            if (code1.toLowerCase() !== code2.toLowerCase()) {
              this.$message.error('验证码输入错误，请重新输入')
              this.createCode()
              return
            }
            login({username, password})
              .then(res => {
                //保存用户名
                setStore('username', username)
                setStore('token', res.data.token)
                if (this.remember) {
                  setStore('password', password)
                  setStore('remember', this.remember)
                }
                //保存用户信息
                this.saveLogin(res.data)

                // 获取角色ID
                let roleId = res.data.roleid
                //根据角色ID获取角色对应菜单
                sysMenuGetMenuListByRoleId({roleId})
                  .then(res => {
                    let arr = res.data
                    // localStorage中保存用户菜单
                    setStore('menu', arr)
                    //store中保存用户菜单
                    this.saveMenus(arr)
                  })
                this.loading = false
                this.$router.push({path: '/'})
              }).catch(() => {
              this.loading = false
            })
          } else {
            this.createCode()
            console.log('error submit!!')
            return false
          }
        })
      },
      // 创建验证码
      createCode() {
        var code = []
        code.length = 4
        let random = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        for (let i = 0; i < 4; i++) {
          let index = Math.floor(Math.random() * 34)
          code.push(random[index])
        }
        this.check_code = code.join("")
        this.draw_check(this.check_code)
      },
      draw_check(code) {
        let canvas = document.querySelector('.code')
        let ctx = canvas.getContext('2d')
        canvas.height = canvas.height
        ctx.font = '94px Arial'
        ctx.fillStyle = this.randomColor(180, 230)
        ctx.fillText(code, 0, canvas.height)
      },
      randomColor(min, max) {
        let r = this.randomNum(min, max)
        let g = this.randomNum(min, max)
        let b = this.randomNum(min, max)
        return `rgb(${r},${g},${b})`
      },
      randomNum(min, max) {
        return parseInt(Math.random() * (max - min) + min)
      }
    },
    mounted() {
      this.createCode()
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss">
  $bg: #2d3a4b;
  $light_gray: #eee;

  /* reset element-ui css */
  .login-container {

    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
  $bg: #2d3a4b;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }

  .show_canvas {
    width: calc(50% - 40px);
    float: right;
    height: 47px;
    text-align: center;
  }

  .code {
    width: 50%;
    height: 47px;
  }

</style>
