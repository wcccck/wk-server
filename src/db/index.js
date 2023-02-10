const mysql = require('mysql')
const db = mysql.createConnection({
  host:"124.221.191.225",
  user:"kqSql",
  password:"XFm4nEi78zHT2TS8",
  database:"kqsql"
})

module.exports = db