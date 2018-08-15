const Product = require('../model/product');

const ProductList = async (req, res, next) => {
  const list = await Product.select();
  res.json({
    code: 1,
    data: list
  });
}
const Group = async (req, res, next) => {
  const list = await Product.group();
  res.json({
    code: 1,
    data: list
  });
}

const Detail = async (req, res, next) => {
  const data = await Product.detail({ id: req.query.id });
  res.json({
    code: 1,
    data: data
  });
}

module.exports = {
  ProductList,
  Group,
  Detail
};
