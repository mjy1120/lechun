const connect = require('../db/connect');

const insert = ({ productId, count, userId }) => {
  const sql = 'INSERT INTO shop_car (`data`, `user_id`) VALUES (?,?)';
  return new Promise((resolve, reject) => {
    const data = {
      [productId]: count
    }
    connect.query(sql, [JSON.stringify(data), userId], (error, res) => {
      if (error) {
        reject();
        return;
      }
      resolve(res)
    })
  })
}

const update = async ({ productId, count, userId }) => {
  const car_item = await find(userId);
  let data = JSON.parse(car_item.data);
  if (count == 0) {
    delete data[productId]
  } else {
    data[productId] = count
  }
  data = JSON.stringify(data);

  let sql = `update shop_car set data=? where user_id=${userId}`;

  return new Promise((resolve, reject) => {
    connect.query(sql, [data], (error, res) => {
      console.log(error)
      if (error) {
        reject();
        return;
      }
      resolve(res)
    })
  })
}

const updated = async ({ data, userId }) => {

  let newData = {};
  data.forEach(item => {
    newData[item.id] = item.shopCount
  });
  let sql = `update shop_car set data=? where user_id=${userId}`;

  return new Promise((resolve, reject) => {
    connect.query(sql, [JSON.stringify(newData)], (error, res) => {
      if (error) {
        reject();
        return;
      }
      resolve(res)
    })
  })
}

const find = (userId) => {
  const sql = `select * from shop_car where user_id=${userId}`;
  return new Promise((resolve, reject) => {
    connect.query(sql, [], (error, res) => {

      if (error) {
        reject();
        return;
      }
      resolve(res[0])
    })
  })
}

const select = async (userId) => {
  const car_item = await find(userId);
  const shopList = JSON.parse(car_item.data);
  return new Promise((resolve, reject) => {
    const sql = `select * from product where id in (${Object.keys(shopList)})`
    //console.log(sql)
    connect.query(sql, [], (error, res) => {
      if (error) {
        reject();
        return;
      }
      const data = res.map((item) => {
        return {
          ...item,
          shopCount: shopList[item.id]
        };
      })
      resolve(data)
    })
  })
}


const add = ({ productId, count, userId }) => {
  return new Promise(async (resolve, reject) => {
    const car_item = await find(userId);

    if (car_item) {
      update({ productId, count, userId }).then((data) => {
        resolve({
          code: 1,
          msg: '跟新成功'
        })
      })
    } else {
      insert({ productId, count, userId }).then((data) => {
        resolve({
          code: 1,
          msg: '添加成功'
        })
      })
    }
  })
}

module.exports = {
  add,
  select,
  updated
}