const state = {
  ads: {},
  advert_type: ''
}

const actions = {
  saveAds: ({ commit }, payload) => {
    commit('SAVEADS', payload)
  },
  saveType: ({ commit }, payload) => {
    commit('SAVETYPE', payload)
  },
  clearAds: ({ commit }) => {
    commit('CLEARADS')
  }
}

const mutations = {
  SAVEADS: (state, payload) => {
    state.ads = payload
  },
  SAVETYPE: (state, payload) => {
    state.advert_type = payload
  },
  CLEARADS: (state) => state.ads = {}
}
export default {
  state,
  actions,
  mutations
}
