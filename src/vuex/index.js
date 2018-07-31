import Vue from 'vue'
import Vuex from 'vuex'
import Login from './modules/login'
import App from './modules/app'
import Advert from './modules/advert'
// import getters from './getters'

// 使用Vuex
Vue.use(Vuex)

export default new Vuex.Store({
  // 引入多模块
  modules: {
    Login,
    App,
    Advert
  }
  // ,
  // getters
})
