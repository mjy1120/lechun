import api from '@/api';

export default {
  namespaced: true,
  state: {
    info: {},
    isLogin: false
  },
  getters: {},
  mutations: {
    SET_INFO(state, info) {
      state.isLogin = true;
      state.info = info;
    },
  },
  actions: {
    get_user_info({ commit }) {
      api.user.info().then((data) => {
        commit('SET_INFO', data.data);
      });
    }
  },
};
