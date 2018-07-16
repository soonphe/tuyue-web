// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
/* 引入同目录下的App.vue模块 */
import App from './App'
import router from './router'
/* 引入ElementUI作为界面框架 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/* 转换ES6语法 */
import 'babel-polyfill'
import VueQuillEditor from 'vue-quill-editor'
/* 提供跨浏览器一致性，相较于reset */
// import 'normalize.css'
/* 引入vue的路由 */
import Axios from 'axios'
Vue.config.productionTip = false
/* 网络请求 */
// import api, { instance } from './api/index'

Vue.prototype.$http = Axios

/**
 * 配置ElementUI界面与富文本编辑器
 */
Vue.use(ElementUI)
Vue.use(VueQuillEditor, {
  'toolbar': [{
    'font': [true, '宋体']
  }]
})

/**
 * 主界面配置的入口，利用es6的模块化引入模块
 */
/* eslint-disable no-new */
new Vue({
  el: '#app', /* 定义作用范围就是index.html里的id为app的范围内 */
  router, /* 引入路由 */
  components: {App}, /* 给vue实例初始一个APP组件作为template 相当于默认组件 */
  template: '<App/>' /* 注册引入的组建App.vue */
})
