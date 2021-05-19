const express = require('express');
const router = express.Router();
const model = require('../models/index');
const config = require('../config/auth.config')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    pool: true,
    host: "asosiasiami.com",
    port: 465,
    secure: true,
    auth: {
        user: "no-reply@asosiasiami.com",
        pass: "EVFIU8QV6BGJ"
    }
});

// Send Email Verification 
router.post('/send-email', async function (req, res, next) {

    const {
        email
    } = req.body

    const token = jwt.sign({
        email: email,
    }, config.secret, {
        expiresIn: 86400 // 24 hours
    });

    const mailOptions = {
        from: "no-reply@asosiasiami.com",
        to: email,
        subject: "Asosiasi AMI | Email Verification",
        html: `
        <h1 style="color: #5e9ca0; ">Confirm your Email</h1>
        <h2 style = "color: #2e6c80;">Mohon klik link dibawah untuk konfimasi email anda:& nbsp;</h2>
        <p><a href="https://asosiasiami.com/confirm/${token}">https://asosiasiami.com/confirm/${token}</a></p>
        <p>&nbsp;</p>
        <p><strong>Mohon untuk tidak membalas email ini</strong></p>
        <p><strong>Terima Kasih. </strong></p>
        <p><strong>&nbsp;</strong></p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(400).json({
                'status': 'FAIL',
                'messages': 'Gagal Mengirim Email',
                'data': error,
                'email': email
            })
            console.log('gagal kirim email', error)
        } else {
            res.status(200).json({
                'status': 'OK',
                'messages': 'Email Telah diKirim',
                'data': info.response,
                'email': email
            })
            console.log('Email sent: ' + info.response);
        }
    })
});

// Confirm Email
router.patch('/confirm/:email', async function (req, res, next) {
    try {
        const email = req.params.email;
        const {
            status
        } = req.body;
        const muthowif = await model.muthowif.update({
            status
        }, {
            where: {
                email: email
            }
        });
        if (muthowif) {
            res.status(200).json({
                'status': 'OK',
                'messages': 'Email Terkonfirmasi',
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

            var token = jwt.sign({
                id: auth.id,
                email: auth.email,
            }, config.secret, {
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

// Change Password
router.post('/change-password', async function (req, res, next) {
    try {
        const {
            email,
            password,
            newPassword
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

            // var token = jwt.sign({ id: auth.id }, config.secret, {
            //     expiresIn: 86400 // 24 hours
            // });

            const updatePass = await model.muthowif.update({
                password: bcrypt.hashSync(newPassword, 8),
            }, {
                where: {
                    email: email
                }
            });

            if (updatePass) {
                res.status(200).json({
                    'status': 'OK',
                    'messages': 'Password berhasil diupdate',
                    'data': updatePass,
                })
            }
            // res.status(200).json({
            //     'status': 'OK',
            //     'messages': 'Sukses !',
            //     'data': auth,
            //     'accessToken': token
            //     ,
            // })

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

module.exports = router;