const express = require('express');
const router = express.Router();
const model = require('../models/index');
const config = require('../config/auth.config')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

// Sign In
router.post('/', async function (req, res, next) {
    try {
        const {
            firstName,
            email,
            password,
        } = req.body;
        const auth = await model.muthowif.findOne({
            where: {
                email: email
            }
        });
        if (auth) {
            const passwordIsValid = bcrypt.compareSync(
                password,
                auth.password
            );

            if (!passwordIsValid) {
                res.status(400).json({
                    'status': 'FAIL',
                    'messages': 'Password Salah',
                    'data': null
                    ,
                })
            }

            var token = jwt.sign({ id: auth.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).json({
                'status': 'OK',
                'messages': 'Sukses !',
                'data': auth,
                'accessToken': token
                ,
            })

        } else {
            res.status(400).json({
                'status': 'FAIL',
                'messages': 'Email tidak ditemukan',
                'data': auth
                ,
            })
        }
    }
    catch (err) {
        res.status(400).json({
            'status': 'ERROR',
            'messages': err.message,
            'data': {},
        })
    }
});

// Reset Password


module.exports = router;