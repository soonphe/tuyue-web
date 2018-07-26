// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
/* 引入同目录下的App.vue模块 */
import App from './App'
// Router
import router from './router'
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
/* 转换ES6语法，应对某些浏览器不兼容 */
import 'babel-polyfill'
// vuex
import store from './vuex/index'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
/* 提供跨浏览器一致性，相较于reset */
import 'normalize.css'
// js加密
import JsEncrypt from 'jsencrypt/bin/jsencrypt'

import '@/styles/index.scss' // global css
import '@/icons' // icon
import '@/permission' // permission control
Vue.prototype.$jsEncrypt = JsEncrypt // 挂载JsEncrypt

// 阻止启动生产警告
Vue.config.productionTip = false

/**
 * 配置ElementUI界面与富文本编辑器
 */
Vue.use(ElementUI, {
  size: 'medium' // set element-ui default size

})
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
  store, /* 引入vuex */
  router, /* 引入路由 */
  components: {App}, /* 给vue实例初始一个APP组件作为template 相当于默认组件 */
  template: '<App/>' /* 注册引入的组建App.vue */
})
