'use strict';
var dbConn = require('./../../config/db.config');
//Muthowif object create
var Muthowif = function(muthowif){
  this.first_name     = muthowif.first_name;
  this.last_name      = muthowif.last_name;
  this.email          = muthowif.email;
  this.phone          = muthowif.phone;
  this.password       = muthowif.password;
  this.status         = muthowif.status ? muthowif.status : 1;
  this.created_at     = new Date();
  this.updated_at     = new Date();
};
Muthowif.create = function (newEmp, result) {
dbConn.query("INSERT INTO muthowif set ?", newEmp, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  console.log(res.insertId);
  result(null, res.insertId);
}
});
};
Muthowif.findById = function (id, result) {
dbConn.query("Select * from muthowif where id = ? ", id, function (err, res) {
if(err) {
  console.log("error: ", err);
  result(err, null);
}
else{
  result(null, res);
}
});
};
Muthowif.findAll = function (result) {
dbConn.query("Select * from muthowif", function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  console.log('muthowif : ', res);
  result(null, res);
}
});
};
Muthowif.update = function(id, muthowif, result){
dbConn.query("UPDATE muthowif SET first_name=?,last_name=?,email=?,phone=?,password=? WHERE id = ?", [muthowif.first_name,muthowif.last_name,muthowif.email,muthowif.phone,muthowif.password, id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}else{
  result(null, res);
}
});
};
Muthowif.delete = function(id, result){
dbConn.query("DELETE FROM muthowif WHERE id = ?", [id], function (err, res) {
if(err) {
  console.log("error: ", err);
  result(null, err);
}
else{
  result(null, res);
}
});
};
module.exports= Muthowif;
