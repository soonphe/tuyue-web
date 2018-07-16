import Vue from 'vue' /* 引入vue文件 */
import Router from 'vue-router' /* 引用vue路由模块，并赋值给变量Router  */
// import HelloWorld from '@/components/HelloWorld' /* 英文Hello.vue模版，并赋值给变量Hello,这里是“@”相当于“../” */
import Index from '@/view/index'
import Manage from '../view/manage/manage'
// import { resolve } from 'url'
// import { resolveObject } from 'url'

Vue.use(Router) /* 使用路由 */

// export default new Router({
const router = new Router({
  base: '/tide/', /* 定义基础路径 */
  routes: [ /* 进行路由配置 */
    // {
    //   path: '/',
    //   name: 'HelloWorld', /* 规定“/”引入到Hello组件 */
    //   component: HelloWorld /* 注册HelloWorld组件 */
    // },
    {
      path: '/', /* 无路径时展示 */
      name: 'Index',
      component: Index // 首页Index.vue路由配置
    },
    {
      path: '/manage',
      name: 'Manage',
      component: Manage // Manage.vue路由配置
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/view/Index.vue'], resolve),
      children: [
        {
          path: '/ads',
          name: '广告位',
          component: resolve => require(['@/view/Index.vue'], resolve)
        },
        {
          path: '/openPad',
          name: '开机统计',
          component: resolve => require(['@/view/Index.vue'], resolve)
        }
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   // let menus = router.app.$options.store.getters.getItems
//   let menus = JSON.parse(getStore('m')) /* 从vuex中取出保存的菜单 */
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

export default router
