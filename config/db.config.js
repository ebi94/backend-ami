'use strict';
const mysql = require('mysql');
//local mysql db connection
const dbConn = mysql.createConnection({
  host     : 'febritriakbar.com',
  user     : 'u4752624_ami',
  password : '0LASH3R4OTBY',
  database : 'u4752624_ami_backend'
});

dbConn.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });
  module.exports = dbConn;