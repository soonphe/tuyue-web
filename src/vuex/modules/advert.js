const state = {
  // 广告对象
  advert: {},
  // 广告类型
  advertType: {}
}

const actions = {
  saveAdvert: ({ commit }, payload) => {
    commit('SAVEADS', payload)
  },
  saveAdvertType: ({ commit }, payload) => {
    commit('SAVETYPE', payload)
  },
  clearAdvert: ({ commit }) => {
    commit('CLEARADS')
  }
}

const mutations = {
  SAVEADS: (state, payload) => {
    state.advert = payload
  },
  SAVETYPE: (state, payload) => {
    state.advertType = payload
  },
  CLEARADS: (state) => {
    state.advert = {}
  }
}
export default {
  state,
  actions,
  mutations
}
