import api from '@/api';
import { ArrayisObject } from '@/utils/utils';
export default {
  namespaced: true,
  state: {
    cartList: JSON.parse(localStorage.getItem("loginCar")) || [],
  },
  getters: {
    cartCount(state) {
      let num = 0;
      state.cartList.forEach((item) => {
        num += item.shopCount;
      });
      return num;
    },
    cartPrice(state) {
      let price = 0;
      state.cartList.forEach((item) => {
        price += item.price * item.shopCount;
      });
      return price.toFixed(2);
    },
  },
  mutations: {
    UPDATA_CART_ITEM(state, item) {
      const isItem = ArrayisObject(state.cartList, 'id', item.id);
      if (isItem) {
        state.cartList = state.cartList.map((item2) => {
          if (item2.id === item.id) {
            return Object.assign({}, item2, {
              shopCount: item.shopCount,
            });
          }
          return item2;
        });
      } else {
        state.cartList.push(item);
      }
      state.cartList = state.cartList.filter((item2) => {
        return item2.shopCount >= 1;
      });
      window.localStorage.setItem('loginCar', JSON.stringify(state.cartList));
    },
    SET_CART_LIST(state, list) {
      state.cartList = list;
    },
  },
  actions: {
    setCartList({ commit }) {
      let list = window.localStorage.getItem('loginCar');
      if (list) {
        list = JSON.parse(list);
      } else {
        list = [];
      }
      api.car.list().then((data) => {
        if (data.data.length >= 1) {
          const cartList = data.data.concat(list);
          let newCarList = {};
          cartList.forEach((item) => {
            if (newCarList[item.id]) {
              newCarList[item.id].shopCount = item.shopCount;
            } else {
              newCarList[item.id] = item;
            }
          });
          newCarList = Object.values(newCarList);
          commit('SET_CART_LIST', newCarList);
          api.car.update(newCarList).then(() => { });
        }
      }).catch(() => {
        commit('SET_CART_LIST', list);
      });
    },
    setCarItem({ commit, rootState }, payload) {
      commit('UPDATA_CART_ITEM', payload);
      if (rootState.user.isLogin) {
        api.car.add({
          productId: payload.id,
          count: payload.shopCount,
        });
      }
    },
  },
};
