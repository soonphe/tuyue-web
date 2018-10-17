// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
/* 引入同目录下的App.vue模块 */
import App from './App'
// 引入本地定义的Router
import router from './router'
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/* 转换ES6语法，应对某些浏览器不兼容 */
import 'babel-polyfill'
// vuex
import store from './vuex/index'
// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
/* 提供跨浏览器一致性，相较于reset */
import 'normalize.css/normalize.css'
// js加密
import JsEncrypt from 'jsencrypt/bin/jsencrypt'

import i18n from './lang' // Internationalization
import '@/styles/index.scss' // global css
import 'font-awesome/css/font-awesome.min.css' // font-awesome
import '@/permission' // permission control
Vue.prototype.$jsEncrypt = JsEncrypt // 挂载JsEncrypt

// 阻止启动生产警告
Vue.config.productionTip = false

/**
 * 配置ElementUI界面与富文本编辑器
 */
Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
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
  el: '#app', /* 挂载点 */
  store, /* 引入vuex */
  router, /* 引入路由 */
  i18n,
  render: h => h(App) /* 2.0必须通过render方法来渲染 */
  // components: {App}, /* 引入组件 */
  // template: '<App/>' /* 模板，即要显示的html */
})
