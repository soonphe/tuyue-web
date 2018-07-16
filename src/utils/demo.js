const items = [
  {
    icon: 'el-icon-menu',
    id: 1,
    index: '1',
    title: '首页',
    subs: [
      {
        id: 101,
        index: 'ads',
        title: '广告位'
      }
    ]
  },
  {
    icon: 'el-icon-date',
    id: 2,
    index: '2',
    title: '电影',
    subs: [
      {
        id: 201,
        index: 'filmSetting',
        title: '基本设置'
      }, {
        id: 202,
        index: 'filmManger',
        title: '电影管理'
      },
      {
        id: 203,
        index: 'categoryManger',
        title: '类目管理'
      },
      {
        id: 204,
        index: 'filmAds',
        title: '眏前广告'
      }
    ]
  },
  {
    icon: 'el-icon-menu',
    id: 3,
    index: '3',
    title: '点餐',
    subs: [
      {
        id: 301,
        index: 'orderSetting',
        title: '基本设置'
      },
      {
        id: 302,
        index: 'menuManger',
        title: '菜单管理'
      }, {
        id: 303,
        index: 'classification',
        title: '菜品分类'
      },
      {
        id: 304,
        index: 'orderRecord',
        title: '订单记录'
      }

    ]
  }, {
    id: 4,
    icon: 'el-icon-menu',
    index: '4',
    title: '城市',
    subs: [
      {
        id: 401,
        index: 'cityManger',
        title: '城市管理'
      }
    ]
  }, {
    id: 5,
    icon: 'el-icon-menu',
    index: '5',
    title: '文章',
    subs: [
      {
        id: 501,
        index: 'articleManger',
        title: '文章管理'
      },
      {
        id: 502,
        index: 'articleType',
        title: '栏目管理'
      }
    ]
  },
  {
    id: 6,
    icon: 'el-icon-menu',
    index: '6',
    title: '第三方',
    subs: [
      {
        id: 601,
        index: 'thirdManger',
        title: '第三方链接'
      }
    ]
  },
  {
    icon: 'el-icon-menu',
    index: '7',
    title: '用户',
    id: 7,
    subs: [
      {
        id: 701,
        index: 'userManger',
        title: '用户管理'
      }
    ]
  },
  {
    icon: 'el-icon-menu',
    index: '8',
    title: '版本',
    id: 8,
    subs: [
      {
        id: 801,
        index: 'versionManger',
        title: '版本管理'
      }
    ]
  },
  {
    icon: 'el-icon-menu',
    index: '9',
    title: '账号',
    id: 9,
    subs: [
      {
        id: 901,
        index: 'accountManger',
        title: '账号管理'
      },
      {
        id: 902,
        index: 'roleManger',
        title: '角色管理'
      }
    ]
  }
]

let arr = [1, 101, 201]

// items.forEach(it => {
//     if (it.id == 9) {
//         return it
//     }
// })
// let a = items.filter(it => it.id == 9)
let a = items.filter(it => {
  // if (it.subs && it.subs.length > 0) {
  let sub = it.subs.filter(sub => {
    if (arr.indexOf(sub.id) >= 0) {
      return sub
    }
  })
  if (sub.length > 0) {
    it.subs = sub
    return it
  }
})

console.log('a', a)
