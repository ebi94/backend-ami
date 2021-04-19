const express = require('express');
const router = express.Router();
const model = require('../models/index');


// var app = express();



// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// GET airline listing.
router.get('/', async function (req, res, next) {
    try {
      const airline = await model.airline.findAll({});
      if (airline.length !== 0) {
        res.json({
          'status': 'OK',
          'messages': '',
          'data': airline
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
        'status': 'ERRORs',
        'messages': err.message,
        'data': {}
      })
    }
  });
// GET airline detail 
router.get('/:id', async function (req, res, next) {
  try {
    const airline = await model.airline.findAll({
      where: {
        id: req.params.id
      }
    });
    if (airline.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': airline
      })
    } else {
      res.json({
        'status': 'ERROR',
        'messages': 'EMPTY',
        'data': {}
      })
    }
  } catch (err) {
    console.log("error", err)
    res.json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {}
    })
  }
});
// POST airline
router.post('/', async function (req, res, next) {
    try {
      const {
        code
      } = req.body;
      const airline = await model.airline.create({
        code
      });
    if (airline) {
      res.status(201).json({
        'status': 'OK',
        'messages': 'Data berhasil ditambahkan',
        'data': airline,
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
// UPDATE airline
router.patch('/:id', function(req, res, next) {
  try {
    const ailineId = req.params.id;
    const {
      code
    } = req.body;
    const ailine = await model.ailine.update({
      code
    }, {
      where: {
        id: ailineId
      }
    });
    if (ailine) {
      res.json({
        'status': 'OK',
        'messages': 'Data berhasil diupdate',
        'data': ailine,
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
// DELETE airline
router.delete('/:id', function(req, res, next) {
  try {
    const airlineId = req.params.id;
    const airline = await model.airline.destroy({ where: {
      id: airlineId
    }})
    if (airline) {
      res.json({
        'status': 'OK',
        'messages': 'Data berhasil dihapus',
        'data': airline,
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
module.exports = router;