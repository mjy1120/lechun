const connect = require('../db/connect');

const findUser = ({
  mobile,
  password
 }) => {
  const sql = 'select * from signup where `mobile`=? and `password`=?';

  return new Promise((resolve, reject) => {
    connect.query(sql, [
      mobile,
      password
    ], (error, res) => {
      if (error) {
        reject();
        return;
      }
      resolve(res[0])
    })
  })

}
const userInfo = ({
  mobile
 }) => {
  const sql = 'select * from signup where `mobile`=?';
  return new Promise((resolve, reject) => {
    connect.query(sql, [
      mobile
    ], (error, res) => {
      if (error) {
        reject();
        return;
      }
      resolve(res[0])
    })
  })
}
const userlogin = ({
  mobile
 }) => {
  const sql = 'insert into signup (mobile,password,date) value (?,?,?);';
  return new Promise((resolve, reject) => {
    connect.query(sql, [
      mobile,
      1234,
      '2017-01-01'
    ], (error, res) => {
      //console.log(error)
      if (error) {
        reject();
        return;
      }
      resolve(res)
    })
  })
}
const address = ({
  name,
  phone,
  value,
  address,
  bq
 }) => {
  const sql = 'insert into address (name,phone,value,address,bq) value (?,?,?,?,?);';
  return new Promise((resolve, reject) => {
    connect.query(sql, [
      name,
      phone,
      value,
      address,
      bq
    ], (error, res) => {
      if (error) {
        reject();
        return;
      }
      resolve(res)
    })
  })
}
const addressList = (options) => {
  const sql = 'select * from `address`';
  return new Promise((resolve, reject) => {
    connect.query(sql, [], (error, res) => {
      if (error) {
        reject();
        return;
      }
      const list = [];
      res.forEach((item, index) => {
        const addressLists = new Promise((resolve, reject) => {
          const sql2 = `select * from product where id in (${item.commodities})`
          connect.query(sql2, [], (error, res) => {
            resolve(res);
          })
        })
        list.push(addressLists)
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
  findUser,
  userInfo,
  userlogin,
  address,
  addressList
}