import Vue from 'vue' /* 引入vue文件 */
import Router from 'vue-router' /* 引用vue路由模块，并赋值给变量Router  */
// import HelloWorld from '@/components/HelloWorld' /* 英文Hello.vue模版，并赋值给变量Hello,这里是“@”相当于“../” */
// import Login from '@/views/Login'
// import { getStore } from '../utils/local'
/* Layout */
import Layout from '../views/layout/Layout'

// 使用路由
Vue.use(Router)

// export default new Router({
const router = new Router({
  // 定义基础路径
  base: '/portal/',
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },
    { path: '*', redirect: '/404', hidden: true },
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      name: 'Dashboard',
      hidden: true,
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index')
        },
        {
          path: 'portal/advertType/index',
          name: '广告类型管理',
          component: () => import('@/views/advertType/index')
        }]
    },
    // {
    //   path: '/login', /* 无路径时展示 */
    //   name: 'login',
    //   component: () => import('@/views/Login') // 首页Index.vue路由配置
    // },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/views/Home.vue'], resolve),
      children: [
        {
          path: '/ads',
          name: '广告位',
          component: resolve => require(['@/views/Index.vue'], resolve)
        },
        {
          path: '/openPad',
          name: '开机统计',
          component: resolve => require(['@/views/Index.vue'], resolve)
        }
      ]
    }
  ]
})

export default router
