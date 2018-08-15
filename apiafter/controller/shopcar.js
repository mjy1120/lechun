const Shopcar = require('../model/shopcar');
const jwt = require('jsonwebtoken');

const Add = async (req, res, next) => {
  const token = jwt.decode(req.cookies.token, 'liuyudelechun');
  const list = await Shopcar.add({
    ...req.query,
    userId: token.id
  });
  res.json({
    code: 1,
    data: list
  });
}

const List = async (req, res, next) => {
  const token = jwt.decode(req.cookies.token, 'liuyudelechun');
  const list = await Shopcar.select(token.id);
  res.json({
    code: 1,
    data: list
  });
}

const Update = async (req, res, next) => {
  const token = jwt.decode(req.cookies.token, 'liuyudelechun');
  const list = await Shopcar.updated({
    userId: token.id,
    data: req.body.data
  });
  res.json({
    code: 1,
    data: list
  });
}

module.exports = {
  Add,
  List,
  Update
};
