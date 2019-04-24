import Vue from 'vue'
/* 引入vue文件 */
import Router from 'vue-router'
/* 引用vue路由模块，并赋值给变量Router  */
/* Layout:这里是“@”相当于“../” */
import Layout from '@/views/layout/Layout'

// 使用路由
Vue.use(Router)

// export default new Router({
const router = new Router({
  // 定义基础路径 //
  base: '/dist/',
  // 后端支持可开
  // mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    {path: '/login', component: () => import('@/views/login/index'), hidden: true},
    {path: '/404', component: () => import('@/views/errorPage/404'), hidden: true},
    {path: '/401', component: () => import('@/views/errorPage/401'), hidden: true},
    {
      path: '',
      component: Layout,
      redirect: '/dashboard',
      name: 'Dashboard',
      hidden: true,
      meta: {title: '控制台', icon: 'el-icon-type'},
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index')
        }
      ]
    },
    {
      path: '/dataVersion',
      component: Layout,
      redirect: '/dataVersion/index',
      name: 'dataVersion',
      meta: {title: '版本管理', icon: 'el-icon-type'},
      children: [
        {
          path: 'index',
          name: 'dataVersionIndex',
          component: () => import('@/views/dataVersion/index'),
          meta: {title: '数据版本', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'dataVersionAdd',
          component: () => import('@/views/dataVersion/add'),
          meta: {title: '添加数据版本', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/devices',
      component: Layout,
      redirect: '/devices/index',
      name: 'devices',
      meta: {title: '设备管理', icon: 'el-icon-type'},
      children: [
        {
          path: 'index',
          component: () => import('@/views/devices/index')
        },
        {
          path: 'add',
          name: 'devicesAdd',
          component: () => import('@/views/devices/add'),
          meta: {title: '编辑', icon: 'el-icon-picture-outline'}
        }]
    },
    {
      path: '/push',
      component: Layout,
      redirect: '/push/index',
      name: 'push',
      meta: {title: '推送管理', icon: 'el-icon-type'},
      children: [
        {
          path: 'index',
          component: () => import('@/views/push/index')
        },
        {
          path: 'add',
          name: 'pushAdd',
          component: () => import('@/views/push/add'),
          meta: {title: '添加推送', icon: 'el-icon-picture-outline'}
        }]
    },
    {
      path: '/pushLocation',
      component: Layout,
      redirect: '/pushLocation/index',
      name: 'pushLocation',
      meta: {title: '地域推送', icon: 'el-icon-type'},
      children: [
        {
          path: 'index',
          component: () => import('@/views/pushLocation/index')
        },
        {
          path: 'add',
          name: 'pushLocationAdd',
          component: () => import('@/views/pushLocation/add'),
          meta: {title: '添加地域', icon: 'el-icon-picture-outline'}
        }]
    },
    {
      path: '/user',
      component: Layout,
      redirect: '/index',
      name: 'user',
      meta: {title: '用户管理', icon: 'el-icon-type'},
      children: [{
        path: 'index',
        component: () => import('@/views/user/index')
      }]
    },
    {
      path: '/city',
      component: Layout,
      redirect: '/city/index',
      name: 'city',
      meta: {title: '城市管理', icon: 'el-icon-type'},
      children: [{
        path: 'index',
        name: 'cityIndex',
        component: () => import('@/views/city/index')
      },
      {
        path: 'add',
        name: 'cityAdd',
        component: () => import('@/views/city/add'),
        meta: {title: '添加城市', icon: 'el-icon-picture-outline'}
      }
      ]
    },
    {
      path: '/cityArticle',
      component: Layout,
      redirect: '/cityArticle/index',
      name: 'cityArticle',
      meta: {title: '城市文章管理', icon: 'el-icon-type'},
      children: [{
        path: 'index',
        name: 'cityArticleIndex',
        component: () => import('@/views/cityArticle/index')
      },
      {
        path: 'add',
        name: 'cityArticleAdd',
        component: () => import('@/views/cityArticle/add'),
        meta: {title: '添加城市文章', icon: 'el-icon-picture-outline'}
      }
      ]
    },
    {
      path: '/padUser',
      component: Layout,
      redirect: '/padUser/index',
      name: 'stats',
      meta: {title: '平板用户统计', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'padUserIndex',
          component: () => import('@/views/stats/padUser'),
          meta: {title: '平板用户统计', icon: 'el-icon-picture-outline'}
        }]
    },
    {
      path: '/statsUser',
      component: Layout,
      redirect: '/statsUser/index',
      name: 'stats',
      meta: {title: '新增用户统计', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'statsUserIndex',
          component: () => import('@/views/stats2/openpad'),
          meta: {title: '新增用户统计', icon: 'el-icon-picture-outline'}
        }]
    },
    {
      path: '/statsLock',
      component: Layout,
      redirect: '/statsLock/index',
      name: 'stats',
      meta: {title: '解锁统计', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'statsLockIndex',
          component: () => import('@/views/stats2/unlock'),
          meta: {title: '解锁统计', icon: 'el-icon-picture-outline'}
        }]
    },
    {
      path: '/statsClick',
      component: Layout,
      redirect: '/statsClick/index',
      name: 'stats',
      meta: {title: '模块点击统计', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'statsClickIndex',
          component: () => import('@/views/stats2/click'),
          meta: {title: '模块点击统计', icon: 'el-icon-picture-outline'}
        }]
    },
    {
      path: '/statsStay',
      component: Layout,
      redirect: '/statsStay/index',
      name: 'stats',
      meta: {title: '模块停留统计', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'statsStayIndex',
          component: () => import('@/views/stats2/stay'),
          meta: {title: '模块停留统计', icon: 'el-icon-picture-outline'}
        }]
    },
    {
      path: '/statsPad',
      component: Layout,
      redirect: '/statsPad/index',
      name: 'stats',
      meta: {title: '平板用户统计', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'statsPadIndex',
          component: () => import('@/views/stats2/pad'),
          meta: {title: '平板用户统计', icon: 'el-icon-picture-outline'}
        }]
    },
    {
      path: '/stats',
      component: Layout,
      redirect: '/stats/unlock',
      name: 'stats',
      meta: {title: '统计管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'unlock',
          name: 'unlock',
          component: () => import('@/views/stats/unlock'),
          meta: {title: '解锁统计', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'stay',
          name: 'stay',
          component: () => import('@/views/stats/stay'),
          meta: {title: '板块停留时长', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'click',
          name: 'click',
          component: () => import('@/views/stats/click'),
          meta: {title: '模块点击次数', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'open',
          name: 'open',
          component: () => import('@/views/stats/openpad'),
          meta: {title: '开机统计', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/version',
      component: Layout,
      redirect: '/version/index',
      name: 'version',
      meta: {title: '版本管理', icon: 'el-icon-type'},
      children: [
        {
          path: 'index',
          name: 'versionIndex',
          component: () => import('@/views/version/index'),
          meta: {title: 'APK版本', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'versionAdd',
          component: () => import('@/views/version/add'),
          meta: {title: '添加APK版本', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/advertType',
      component: Layout,
      redirect: '/advertType/index',
      name: 'advertType',
      meta: {title: '广告管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'advertTypeIndex',
          component: () => import('@/views/advert/type/index'),
          meta: {title: '广告类型', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'advertTypeAdd',
          component: () => import('@/views/advert/type/add'),
          meta: {title: '添加广告类型', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/advert',
      component: Layout,
      redirect: '/advert/index',
      name: 'advert',
      meta: {title: '广告管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'advertIndex',
          component: () => import('@/views/advert/index'),
          meta: {title: '广告', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'advertAdd',
          component: () => import('@/views/advert/add'),
          meta: {title: '添加广告', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/advertiserAdvert',
      component: Layout,
      redirect: '/advertiserAdvert/index',
      name: 'user',
      meta: {title: '广告商广告', icon: 'el-icon-type'},
      children: [
        {
          path: 'index',
          name: 'advertiserAdvertIndex',
          component: () => import('@/views/advertiserAdvert/index'),
          meta: {title: '广告商广告', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'advertiserAdvertAdd',
          component: () => import('@/views/advertiserAdvert/add'),
          meta: {title: '添加广告', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/advertiser',
      component: Layout,
      redirect: '/advertiser/index',
      name: 'advertiser',
      meta: {title: '广告商管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'advertiserIndex',
          component: () => import('@/views/advertiser/index'),
          meta: {title: '广告商', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'advertiserAdd',
          component: () => import('@/views/advertiser/add'),
          meta: {title: '添加广告商', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/videoType',
      component: Layout,
      redirect: '/videoType/index',
      name: 'videoType',
      meta: {title: '视频管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'videoTypeIndex',
          component: () => import('@/views/video/type/index'),
          meta: {title: '视频类型', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'videoTypeAdd',
          component: () => import('@/views/video/type/add'),
          meta: {title: '添加视频类型', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/video',
      component: Layout,
      redirect: '/video/index',
      name: 'video',
      meta: {title: '视频管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'videoIndex',
          component: () => import('@/views/video/index'),
          meta: {title: '视频', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'videoAdd',
          component: () => import('@/views/video/add'),
          meta: {title: '添加视频', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/movie',
      component: Layout,
      redirect: '/movie/index',
      name: 'movie',
      meta: {title: '电影管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'movieIndex',
          component: () => import('@/views/movie/index'),
          meta: {title: '电影', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/bookType',
      component: Layout,
      redirect: '/bookType/index',
      name: 'bookType',
      meta: {title: '书吧管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'bookTypeIndex',
          component: () => import('@/views/book/type/index'),
          meta: {title: '书吧类型', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'bookTypeAdd',
          component: () => import('@/views/book/type/add'),
          meta: {title: '添加书吧类型', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/book',
      component: Layout,
      redirect: '/book/index',
      name: 'book',
      meta: {title: '书吧管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'bookIndex',
          component: () => import('@/views/book/index'),
          meta: {title: '书吧', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'bookAdd',
          component: () => import('@/views/book/add'),
          meta: {title: '添加书籍', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/articleType',
      component: Layout,
      redirect: '/articleType/index',
      name: 'articleType',
      meta: {title: '文章管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'articleTypeIndex',
          component: () => import('@/views/article/type/index'),
          meta: {title: '文章类型', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'articleTypeAdd',
          component: () => import('@/views/article/type/add'),
          meta: {title: '添加文章类型', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/article',
      component: Layout,
      redirect: '/article/index',
      name: 'article',
      meta: {title: '文章管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'articleIndex',
          component: () => import('@/views/article/index'),
          meta: {title: '文章', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'articleAdd',
          component: () => import('@/views/article/add'),
          meta: {title: '添加文章', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/gameType',
      component: Layout,
      redirect: '/gameType/index',
      name: 'gameType',
      meta: {title: '游戏管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'gameTypeIndex',
          component: () => import('@/views/game/type/index'),
          meta: {title: '游戏类型', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'gameTypeAdd',
          component: () => import('@/views/game/type/add'),
          meta: {title: '添加游戏类型', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/game',
      component: Layout,
      redirect: '/game/index',
      name: 'game',
      meta: {title: '游戏管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'gameIndex',
          component: () => import('@/views/game/index'),
          meta: {title: '游戏', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'gameAdd',
          component: () => import('@/views/game/add'),
          meta: {title: '添加游戏', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/foodType',
      component: Layout,
      redirect: '/foodType/index',
      name: 'foodType',
      meta: {title: '餐饮管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'foodTypeIndex',
          component: () => import('@/views/food/type/index'),
          meta: {title: '餐饮类型', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'foodTypeAdd',
          component: () => import('@/views/food/type/add'),
          meta: {title: '添加餐饮类型', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/food',
      component: Layout,
      redirect: '/food/index',
      name: 'food',
      meta: {title: '餐饮管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'foodIndex',
          component: () => import('@/views/food/index'),
          meta: {title: '餐饮', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'foodAdd',
          component: () => import('@/views/food/add'),
          meta: {title: '添加餐饮', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/sysMenu',
      component: Layout,
      redirect: '/sysMenu/index',
      name: 'sysMenu',
      meta: {title: '模块管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'sysMenuIndex',
          component: () => import('@/views/sys/menu/index'),
          meta: {title: '模块管理', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'sysMenuAdd',
          component: () => import('@/views/sys/menu/add'),
          meta: {title: '添加模块', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/sysRole',
      component: Layout,
      redirect: '/sysRole/index',
      name: 'sysRole',
      meta: {title: '角色管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'sysRoleIndex',
          component: () => import('@/views/sys/role/index'),
          meta: {title: '角色管理', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'sysRoleAdd',
          component: () => import('@/views/sys/role/add'),
          meta: {title: '添加角色', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/sysUser',
      component: Layout,
      redirect: '/sysUser/index',
      name: 'sysUser',
      meta: {title: '用户管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'sysUserIndex',
          component: () => import('@/views/sys/user/index'),
          meta: {title: '用户管理', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'sysUserAdd',
          component: () => import('@/views/sys/user/add'),
          meta: {title: '添加系统用户', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    // 系统管理》模块管理》index/add界面——三级层叠架构
    // {
    //   path: '/sys',
    //   component: Layout,
    //   // redirect: '/sys/menu',
    //   name: 'sys',
    //   meta: {title: '系统管理', icon: 'el-icon-goods'},
    //   children: [
    //     {
    //       path: 'sysMenu',
    //       name: 'sysMenu',
    //       redirect: '/sys/sysMenu/index',
    //       // component: () => import('@/views/sys/menu/index'),
    //       meta: {title: '系统模块', icon: 'el-icon-picture-outline'},
    //       children: [
    //         {
    //           path: 'index',
    //           name: 'sysMenuIndex',
    //           component: () => import('@/views/sys/menu/index'),
    //           meta: {title: '系统模块', icon: 'el-icon-picture-outline'}
    //         },
    //         {
    //           path: 'add',
    //           name: 'sysMenuAdd',
    //           component: () => import('@/views/sys/menu/add'),
    //           meta: {title: '添加模块', icon: 'el-icon-picture-outline'}
    //         }
    //       ]
    //     }
    //   ]
    // },
    {
      path: '/group',
      component: Layout,
      redirect: '/group/index',
      name: 'group',
      meta: {title: '车组管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'groupIndex',
          component: () => import('@/views/group/index'),
          meta: {title: '车组', icon: 'el-icon-picture-outline'}
        },
        {
          path: 'add',
          name: 'groupAdd',
          component: () => import('@/views/group/add'),
          meta: {title: '添加车组', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {
      path: '/storage',
      component: Layout,
      redirect: '/storage/index',
      name: 'storage',
      meta: {title: '出入库管理', icon: 'el-icon-goods'},
      children: [
        {
          path: 'index',
          name: 'storageIndex',
          component: () => import('@/views/storage/index'),
          meta: {title: '出入库', icon: 'el-icon-picture-outline'}
        }
      ]
    },
    {path: '*', redirect: '/404', hidden: true}

  ]
})

export default router
