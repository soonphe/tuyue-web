import router from './router'
import store from './vuex'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = [ '/login'] // 不重定向白名单
/**
 * 钩子函数：在跳转之前执行
 * 判断用户是否登录——是否跳转登录界面
 */
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/login' })
      // next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      // 这里应该使用用户token鉴别
      // if (store.getters.roles.length === 0) {
      //   store.dispatch('GetInfo').then(res => { // 拉取用户信息
      //     next()
      //   }).catch((err) => {
      //     store.dispatch('FedLogOut').then(() => {
      //       Message.error(err || 'Verification failed, please login again')
      //       next({ path: '/' })
      //     })
      //   })
      // } else {
      //   next()
      // }
      next()
    }
  } else {
    next()
    NProgress.done()
    // if (whiteList.indexOf(to.path) !== -1) {
    //   next()
    // } else {
    //   next('/login')
    //   NProgress.done()
    // }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

// router.beforeEach((to, from, next) => {
//   // let menus = router.app.$options.store.getters.getItems
//   // let menus = JSON.parse(getStore('m')) /* 从vuex中取出保存的菜单 */
//   let menus = getStore('m')
//   console.log('m', menus)
//   if (to.path === '/') {
//     next()
//   } else {
//     if (menus.length > 0) {
//       next()
//     } else {
//       next('/')
//     }
//   }
// })
