const state = {
  // 对象
  video: {},
  // 类型
  videoType: {}
}

const actions = {
  saveVideo: ({ commit }, payload) => {
    commit('SAVEVIDEOS', payload)
  },
  saveVideoType: ({ commit }, payload) => {
    commit('SAVEVIDEOTYPE', payload)
  },
  clearVideo: ({ commit }) => {
    commit('CLEARVIDEOS')
  }
}

const mutations = {
  SAVEVIDEOS: (state, payload) => {
    state.video = payload
  },
  SAVEVIDEOTYPE: (state, payload) => {
    state.videoType = payload
  },
  CLEARVIDEOS: (state) => {
    state.video = {}
  }
}
export default {
  state,
  actions,
  mutations
}
