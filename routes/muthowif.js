const express = require('express');
const router = express.Router();
const model = require('../models/index');
// GET muthowif listing.
router.get('/', async function (req, res, next) {
    try {
      const muthowif = await model.muthowif.findAll({});
      if (muthowif.length !== 0) {
        res.json({
          'status': 'OK',
          'messages': '',
          'data': muthowif
        })
      } else {
        res.json({
          'status': 'ERROR',
          'messages': 'EMPTY',
          'data': {}
        })
      }
    } catch (err) {
      res.json({
        'status': 'ERROR',
        'messages': err.message,
        'data': {}
      })
    }
  });
// POST muthowif
router.post('/', async function (req, res, next) {
    try {
      const {
        first_name,
        last_name,
        phone,
        address
      } = req.body;
      const muthowif = await model.muthowif.create({
        first_name,
        last_name,
        phone,
        address
      });
    if (muthowif) {
      res.status(201).json({
        'status': 'OK',
        'messages': 'User berhasil ditambahkan',
        'data': muthowif,
      })
    }
   } catch (err) {
     res.status(400).json({
       'status': 'ERROR',
       'messages': err.message,
       'data': {},
     })
   }
  });
// UPDATE muthowif
router.patch('/:id', function(req, res, next) {
});
// DELETE muthowif
router.delete('/:id', function(req, res, next) {
});
module.exports = router;