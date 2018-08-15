const mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'lechun',//库名
  port: 3306
});
conn.connect((error) => {
  if (error) return;
  console.log('连接成功')
});

module.exports = conn