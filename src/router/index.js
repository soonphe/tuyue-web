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
  base: '/dist/',
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
      meta: { title: '控制台', icon: 'el-icon-info' },
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index')
        }
      ]
    },
    {
      path: '/version',
      component: Layout,
      redirect: '/index',
      name: 'version',
      meta: { title: '版本管理', icon: 'el-icon-info' },
      children: [{
        path: 'index',
        component: () => import('@/views/dashboard/index')
      }]
    },
    {
      path: '/push',
      component: Layout,
      redirect: '/index',
      name: 'push',
      meta: { title: '推送管理', icon: 'el-icon-info' },
      children: [{
        path: 'index',
        component: () => import('@/views/dashboard/index')
      }]
    },
    {
      path: '/user',
      component: Layout,
      redirect: '/index',
      name: 'user',
      meta: { title: '用户管理', icon: 'el-icon-info' },
      children: [{
        path: 'index',
        component: () => import('@/views/dashboard/index')
      }]
    },
    {
      path: '/stats',
      component: Layout,
      redirect: '/stats/unlock',
      name: 'stats',
      meta: { title: '统计管理', icon: 'el-icon-goods' },
      children: [
        {
          path: 'unlock',
          name: 'unlock',
          component: () => import('@/views/advert/index'),
          meta: { title: '解锁统计', icon: 'el-icon-picture-outline' }
        },
        {
          path: 'stay',
          name: 'stay',
          component: () => import('@/views/advert/index'),
          meta: { title: '板块停留时长', icon: 'el-icon-picture-outline' }
        },
        {
          path: 'click',
          name: 'click',
          component: () => import('@/views/advert/index'),
          meta: { title: '模块点击次数', icon: 'el-icon-picture-outline' }
        },
        {
          path: 'open',
          name: 'open',
          component: () => import('@/views/advert/index'),
          meta: { title: '开机统计', icon: 'el-icon-picture-outline' }
        }
      ]
    },
    {
      path: '/advertType',
      component: Layout,
      redirect: '/advertType/index',
      name: 'advertType',
      meta: { title: '广告管理', icon: 'el-icon-goods' },
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import('@/views/advert/type/index'),
          meta: { title: '广告类型', icon: 'el-icon-picture-outline' }
        },
        {
          path: 'add',
          name: 'add',
          component: () => import('@/views/advert/type/add'),
          meta: { title: '添加广告类型', icon: 'el-icon-picture-outline' }
        }
      ]
    },
    {
      path: '/advert',
      component: Layout,
      redirect: '/advert/index',
      name: 'advert',
      meta: { title: '广告管理', icon: 'el-icon-goods' },
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import('@/views/advert/index'),
          meta: { title: '广告', icon: 'el-icon-picture-outline' }
        },
        {
          path: 'add',
          name: 'add',
          component: () => import('@/views/advert/add'),
          meta: { title: '添加广告', icon: 'el-icon-picture-outline' }
        }
      ]
    }
  ]
})

export default router
