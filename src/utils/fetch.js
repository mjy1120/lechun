/**
 * 需要实现的功能
 * 1，解决GET,POST,差异
 * 2，添加错误400，500状态处理
 * 3，添加钩子函数，拦截器
 * 4，统一处理Response
 */

/**
 * objtoquery Object转query string
 * @params[Object] {userName: 'aaa',password: '1123123'}
 * @return userName=aaa&password=1123123
 */
const objtoquery = (obj) => {
  let newStr = '';
  for (const key in obj) {
    newStr += `${key}=${obj[key]}&`;
  };
  return newStr.slice(0, newStr.length - 1);
};

const ajaxCallback = {
  afterEach: () => { },
  beforeEach: () => { },
  successEach: () => { },
  errorEach: () => { },
};

const Fetch = (config) => {
  let options = {};
  let url = config.url;
  if (config.method === 'get') {
    options = {
      method: config.method,
      credentials: 'include',
    };
    const urlData = objtoquery(config.data);
    url += `?${urlData}`;
  } else {
    options = {
      method: config.method,
      body: JSON.stringify(config.data),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };
  }
  ajaxCallback.beforeEach();
  return fetch(url, options).then(async (res) => {
    ajaxCallback.afterEach();
    if (res.ok) {
      ajaxCallback.successEach();
      return res.json();
    }
    const data = await res.json();
    ajaxCallback.errorEach(new Error(data.msg));
    if (res.status < 500) {
      return Promise.reject(new Error(data.msg));
    }
    return Promise.reject(new Error('服务器繁忙，请稍后再试'));
  });
};

export default {
  ajaxCallback,
  get(url = '', data = {}) {
    return Fetch({
      method: 'get',
      url,
      data,
    });
  },
  post(url = '', data = {}) {
    return Fetch({
      method: 'post',
      url,
      data,
    });
  },
};
