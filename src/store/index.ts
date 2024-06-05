import { createStore } from 'vuex';

export default createStore({
  state: {
    userInfo: {},
    isLogin: false,
  },
  getters: {
    getUserInfo(state) {
      return state.userInfo;
    },
  },
  mutations: {
    initData(state) {
      state.userInfo = {};
    },
  },
  actions: {
    initData: ({ commit }) => commit('initData'),
  },
  modules: {
  },
});
