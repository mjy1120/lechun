const connect = require('../db/connect');

const select = (options) => {
  const sql = 'select * from product';

  return new Promise((resolve, reject) => {
    connect.query(sql, [], (error, res) => {
      if (error) {
        reject();
        return;
      }
      resolve(res)
    })
  })
}

const detail = (options) => {
  const sql = 'select * from product where `id`=?';
  return new Promise((resolve, reject) => {
    connect.query(sql, [options.id], (error, res) => {
      if (error) {
        reject();
        return;
      }
      resolve(res[0])
    })
  })
}



const group = (options) => {
  const sql = 'select * from `group`';
  return new Promise((resolve, reject) => {
    connect.query(sql, [], (error, res) => {
      if (error) {
        reject();
        return;
      }
      const list = [];
      res.forEach((item, index) => {
        const groupList = new Promise((resolve, reject) => {
          const sql2 = `select * from product where id in (${item.commodities})`
          connect.query(sql2, [], (error, res) => {
            resolve(res);
          })
        })
        list.push(groupList)
      })
      Promise.all(list).then((rest) => {
        //console.log(rest)
        const data = res.map((item, index) => {
          return Object.assign({}, item, {
            commodities: rest[index]
          })
        });
        resolve(data)
      })
    })
  })
}

module.exports = {
  select,
  group,
  detail
}