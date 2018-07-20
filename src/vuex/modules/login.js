// 登录模块vuex
// 创建一个store容器：包含state，actions，mutations等
// const store = new Vuex.Store({
// store.state 来获取状态对象，
// store.commit 方法触发状态变更
// 模块：内部的mutation和getter接收的第一个参数是模块的局部状态对象
const state = {
  // token状态
  token: '',
  // 其他数据Array
  items: []
}

// actions类似于mutation，Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作
// actions通过store.dispatch方法触发，例：store.dispatch('saveLogin')
const actions = {
  // 接收一个与 store 实例具有相同方法和属性的 context 对象
  // { commit }使用参数解构，实际传入context，调用context.commit方法。
  // ps：也可以理解为action中的方法会自动获取context这个对象，{ ... }中的参数对象{..}就是指的context对象，而{ commit }就是指的context对象中的commit方法
  saveLogin: ({commit}, payload) => {
    console.log('保存', payload)
    commit('SAVELOGIN', payload)
    // 添加action回调
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     commit('someMutation')
    //     resolve()
    //   }, 1000)
    // })
  },
  saveMenus:
    ({commit}, payload) => {
      commit('SAVEMENUS', payload)
    }
}

// 更改store的状态的唯一方法就是提交mutation，类似于事件
// 这里的mutaions都是同步事务
const mutations = {
  // 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
  // 这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
  // payload：store.commit 传入额外的参数，即 mutation 的 载荷
  // 保存登录token
  SAVELOGIN: (state, payload) => {
    state.token = payload.token
  },
  // 保存登录菜单list
  SAVEMENUS:
    (state, payload) => {
      state.items = payload
    }
}

// 处理store 中的 state 中派生出一些状态，例如对列表进行过滤并计数
// computed: {
//   doneTodosCount () {
//     return this.$store.state.todos.filter(todo => todo.done).length
//   }
// }
const getters = {
  getItems: state => state.items
}

// 系统可以有多个export，但只有一个default输出
export default {
  state,
  actions,
  mutations,
  getters
}
