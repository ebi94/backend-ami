const express = require('express');
const router = express.Router();
const model = require('../models/index');
const bcrypt = require('bcryptjs');


// var app = express();



// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

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
    console.log("error", err)
    res.json({
      'status': 'ERROR',
      'messages': err.message,
      'data': {}
    })
  }
});
// GET  muthowif detail.
router.get('/:id', async function (req, res, next) {
  try {
    const muthowif = await model.muthowif.findAll({
      where: {
        id: req.params.id
      }
    });
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
    console.log("error", err)
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
        firstName,
        lastName,
        email,
        password,
        phone,
        address,
        status
      } = req.body;
      const muthowif = await model.muthowif.create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 8),
        phone,
        address,
        status
      });
    if (muthowif) {
      res.status(201).json({
        'status': 'OK',
        'messages': 'Registrasi berhasil',
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
router.patch('/:id', async function(req, res, next) {
  try {
    const muthowifId = req.params.id;
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      status
    } = req.body;
    const muthowif = await model.muthowif.update({
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 8),
      phone,
      address,
      status
    }, {
      where: {
        id: muthowifId
      }
    });
    if (muthowif) {
      res.json({
        'status': 'OK',
        'messages': 'Data berhasil diupdate',
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
// DELETE muthowif
router.delete('/:id', async function(req, res, next) {
  try {
    const muthowifId = req.params.id;
    const muthowif = await model.muthowif.destroy({ where: {
      id: muthowifId
    }})
    if (muthowif) {
      res.json({
        'status': 'OK',
        'messages': 'Data berhasil dihapus',
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
module.exports = router;