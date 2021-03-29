'use strict';
const Muthowif = require('../models/muthowif.model');
exports.findAll = function(req, res) {
Muthowif.findAll(function(err, muthowif) {
  console.log('controller')
  if (err)
  res.send(err);
  console.log('res', muthowif);
  res.send(muthowif);
});
};
exports.create = function(req, res) {
const new_muthowif = new Muthowif(req.body);
//handles null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
  res.status(400).send({ error:true, message: 'Please provide all required field' });
}else{
Muthowif.create(new_muthowif, function(err, muthowif) {
  if (err)
  res.send(err);
  res.json({error:false,message:"Anda Berhasil Terdaftar !",data:muthowif});
});
}
};
exports.findById = function(req, res) {
Muthowif.findById(req.params.id, function(err, muthowif) {
  if (err)
  res.send(err);
  res.json(muthowif);
});
};
exports.update = function(req, res) {
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.status(400).send({ error:true, message: 'Please provide all required field' });
  }else{
    Muthowif.update(req.params.id, new Muthowif(req.body), function(err, muthowif) {
   if (err)
   res.send(err);
   res.json({ error:false, message: 'Muthowif successfully updated' });
});
}
};
exports.delete = function(req, res) {
Muthowif.delete( req.params.id, function(err, muthowif) {
  if (err)
  res.send(err);
  res.json({ error:false, message: 'Muthowif successfully deleted' });
});
};
