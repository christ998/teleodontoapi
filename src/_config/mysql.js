var mysql = require('mysql');

require('dotenv').config({path: __dirname + '/../..env'})

var connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASS,
  database : process.env.MYSQL_DB,
  multipleStatements: true
});

connection.connect(function (err) {
  if (err) {
    console.log("[MYSQL] Can't connect to server.")
};
  console.log('[MYSQL] Is ' + connection.state + " as ID:" + connection.threadId)
});

module.exports = { mysql: connection }
