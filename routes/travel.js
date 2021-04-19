const express = require('express');
const router = express.Router();
const model = require('../models/index');


// var app = express();



// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// GET travel listing.
router.get('/', async function (req, res, next) {
  try {
    const travel = await model.travel.findAll({});
    if (travel.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': travel
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
// GET  travel detail.
router.get('/:id', async function (req, res, next) {
  try {
    const travel = await model.travel.findAll({
      where: {
        id: req.params.id
      }
    });
    if (travel.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': travel
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
// POST travel
router.post('/', async function (req, res, next) {
    try {
      const {
        travelName,
        email,
        password,
        phone,
        address,
        status
      } = req.body;
      const travel = await model.travel.create({
        travelName,
        email,
        password,
        phone,
        address,
        status
      });
    if (travel) {
      res.status(201).json({
        'status': 'OK',
        'messages': 'Data berhasil ditambahkan',
        'data': travel,
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
// UPDATE travel
router.patch('/:id', async function(req, res, next) {
  try {
    const travelId = req.params.id;
    const {
      travelName,
      email,
      password,
      phone,
      address,
      status
    } = req.body;
    const travel = await model.travel.update({
      travelName,
      email,
      password,
      phone,
      address,
      status
    }, {
      where: {
        id: travelId
      }
    });
    if (travel) {
      res.json({
        'status': 'OK',
        'messages': 'Data berhasil diupdate',
        'data': travel,
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
// DELETE travel
router.delete('/:id', async function(req, res, next) {
  try {
    const travelId = req.params.id;
    const travel = await model.travel.destroy({ where: {
      id: travelId
    }})
    if (travel) {
      res.json({
        'status': 'OK',
        'messages': 'Data berhasil dihapus',
        'data': travel,
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