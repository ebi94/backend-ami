const express = require('express');
const router = express.Router();
const model = require('../models/index');
// GET siswas listing.
router.get('/', async function (req, res, next) {
  try {
    console.log('res', res.err)
    const siswas = await model.siswas.findAll({});
    if (siswas.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': siswas
      })
    } else {
      res.json({
        'status': 'ERRORsss',
        'messages': 'EMPTY',
        'data': {}
      })
    }
  } catch (err) {
    res.json({
      'status': 'ERRORaaaaaaaaaa',
      'messages': err.message,
      'data': {}
    })
  }
});
// POST siswas
router.post('/', function(req, res, next) {
});
// UPDATE siswas
router.patch('/:id', function(req, res, next) {
});
// DELETE siswas
router.delete('/:id', function(req, res, next) {
});
module.exports = router;