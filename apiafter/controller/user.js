const User = require('../model/user')
const jwt = require('jsonwebtoken')

const login = async (req, res, next) => {
  const {
    mobile,
    code
  } = req.body;
  console.log(req.session.msgcode, code)
  if (req.session.msgcode == code) {
    const userInfo = await User.userInfo({
      mobile
    })
    console.log(req.body)
    if (userInfo) {
      res.cookie('token', jwt.sign({
        mobile: mobile,
        id: userInfo.id
      }, 'liuyudelechun'), {
          maxAge: 60 * 1000 * 60 * 24
        });
      res.json({
        code: 1,
        msg: '登陆成功'
      })
    } else {
      const userlogin = await User.userlogin({
        mobile
      })
      console.log(userlogin)
      res.json({
        code: 0,
        msg: userlogin
      })
    }
  } else {

  }
}


const info = async (req, res, next) => {
  const token = jwt.decode(req.cookies.token, 'liuyudelechun');
  const mobile = token.mobile;
  console.log(token)
  const userInfo = await User.userInfo({
    mobile
  })
  res.json({
    code: 1,
    data: userInfo
  })

}

// 获取验证码
const code = (req, res, next) => {

  const mobile = req.query.mobile
  console.log(req.query)
  let newCode = '';

  while (newCode.length < 6) {
    newCode += parseInt(Math.random() * 10)
  }
  req.session.msgcode = newCode
  //发送短信
  const msgTpl = `本次获得的的验证码为 [ ${newCode} ], 手机号${mobile}`
  res.json({
    code: 1,
    msg: msgTpl
  })
}
const address = async (req, res) => {
  const {
    name,
    phone,
    value,
    address,
    bq,
    user_id
  } = req.body;
  const token = jwt.decode(req.cookies.token, 'liuyudelechun');
  try {
    await User.address({
      name,
      phone,
      value,
      address,
      bq,
      user_id: token.id
    })
    res.json({
      code: 1,
      data: "添加成功"
    })
  } catch (e) {
    res.json({
      code: 1,
      data: "添加失败"
    })
  }
}
const AddressList = async (req, res, next) => {
  const list = await User.addressList();
  res.json({
    code: 1,
    data: list
  });
}
module.exports = {
  login,
  info,
  code,
  address,
  AddressList
}