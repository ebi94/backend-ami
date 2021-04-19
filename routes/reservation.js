const express = require('express');
const router = express.Router();
const model = require('../models/index');


// var app = express();



// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// GET reservation listing.
router.get('/', async function (req, res, next) {
    try {
      const reservation = await model.reservation.findAll({});
      if (reservation.length !== 0) {
        res.json({
          'status': 'OK',
          'messages': '',
          'data': reservation
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
// GET reservation detail
router.get('/:id', async function (req, res, next) {
  try {
    const reservation = await model.reservation.findAll({
      where: {
        id: req.params.id
      }
    });
    if (reservation.length !== 0) {
      res.json({
        'status': 'OK',
        'messages': '',
        'data': reservation
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
// POST reservation
router.post('/', async function (req, res, next) {
    try {
      const {
        startDate,
        endData,
        route,
        picTravel,
        muthowifId,
        travelId
      } = req.body;
      const reservation = await model.reservation.create({
        startDate,
        endData,
        route,
        picTravel,
        muthowifId,
        travelId
      });
    if (reservation) {
      res.status(201).json({
        'status': 'OK',
        'messages': 'Data berhasil ditambahkan',
        'data': reservation,
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
// UPDATE reservation
router.patch('/:id', function(req, res, next) {
  try {
    const reservationId = req.params.id;
    const {
      startDate,
      endData,
      route,
      picTravel,
      muthowifId,
      travelId
    } = req.body;
    const reservation = await model.reservation.update({
      startDate,
      endData,
      route,
      picTravel,
      muthowifId,
      travelId
    }, {
      where: {
        id: reservationId
      }
    });
    if (reservation) {
      res.json({
        'status': 'OK',
        'messages': 'Data berhasil diupdate',
        'data': reservation,
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
// DELETE reservation
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