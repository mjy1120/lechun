import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import product from './modules/product';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    product,
  },
});

export default store;