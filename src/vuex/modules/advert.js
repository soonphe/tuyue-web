// export const Advert = {
// const引入时（import {Advert} from './modules/advert'）必须要有{}，强命名匹配
// export default 引入时（import Advert from './modules/advert'）就可以，这里的Advert是随意的，默认匹配export default
export default{
  state: {
    // 广告对象
    advert: {},
    // 广告类型
    advertType: {}
  },
  actions: {
    saveAdvert: ({commit}, payload) => {
      commit('SAVEADS', payload)
    },
    saveAdvertType: ({commit}, payload) => {
      commit('SAVETYPE', payload)
    },
    clearAdvert: ({commit}) => {
      commit('CLEARADS')
    }
  },
  mutations: {
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
}

// 2018-10-17：原始编写方式
// const state = {
//   // 广告对象
//   advert: {},
//   // 广告类型
//   advertType: {}
// }
//
// const actions = {
//   saveAdvert: ({ commit }, payload) => {
//     commit('SAVEADS', payload)
//   },
//   saveAdvertType: ({ commit }, payload) => {
//     commit('SAVETYPE', payload)
//   },
//   clearAdvert: ({ commit }) => {
//     commit('CLEARADS')
//   }
// }
//
// const mutations = {
//   SAVEADS: (state, payload) => {
//     state.advert = payload
//   },
//   SAVETYPE: (state, payload) => {
//     state.advertType = payload
//   },
//   CLEARADS: (state) => {
//     state.advert = {}
//   }
// }
// export default {
//   state,
//   actions,
//   mutations
// }
