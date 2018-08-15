const User = require('../model/user')
const jwt = require('jsonwebtoken')

const checkToken = async (req, res, next) => {
 
  if (req.cookies.token) {
    const token = jwt.decode( req.cookies.token, 'liuyudelechun');
    const mobile = token.mobile;
    const userInfo = await User.userInfo({
      mobile
    })
    if (userInfo) {
      next()
    } else {
      res.status(401)
      res.json({
        code:0,
        msg: '用户未登录'
      })
    }
  } else {
    res.status(401)
    res.json({
      code:0,
      msg: '用户未登录'
    })
  }
}

module.exports = checkToken