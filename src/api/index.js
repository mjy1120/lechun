import Fetch from '@/utils/fetch';

const api = {
  // 用户相关
  user: {
    info: () => Fetch.get('/api/user/info'), // 获取用户信息
    code: (data) => Fetch.get('/api/msgCode', data), // 获取验证码
    login: (data) => Fetch.post('/api/login', data), // 登陆
  },
  product: {
    list: () => Fetch.get('/api/product/list'),//获取所有产品
    group: () => Fetch.get('/api/product/group'),//获取首页产品数据
    detail: (data) => Fetch.get('/api/product/detail', data),//获取详情
  },
  car: {
    list: () => Fetch.get('/api/car/list'),//获取购物车列表
    add: ({ productId, count }) => Fetch.get('/api/car/add', { productId, count }),//添加购物车
    update: (data) => Fetch.post('/api/car/update', { data }),//更新购物车
  },
  address: {
    address: (data) => Fetch.post('/api/user/address', data),
    addressList: (data) => Fetch.get("api/user/addresslist", data)
  }
};

export default api;
