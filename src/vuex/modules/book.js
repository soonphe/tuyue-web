const state = {
  // 对象
  book: {},
  // 类型
  bookType: {}
}

const actions = {
  saveBook: ({ commit }, payload) => {
    commit('SAVEBOOKS', payload)
  },
  saveBookType: ({ commit }, payload) => {
    commit('SAVEBOOKTYPE', payload)
  },
  clearBook: ({ commit }) => {
    commit('CLEARBOOKS')
  }
}

const mutations = {
  SAVEBOOKS: (state, payload) => {
    state.book = payload
  },
  SAVEBOOKTYPE: (state, payload) => {
    state.bookType = payload
  },
  CLEARBOOKS: (state) => {
    state.book = {}
  }
}
export default {
  state,
  actions,
  mutations
}
