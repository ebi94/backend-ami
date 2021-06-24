const express = require('express');
const router = express.Router();
const model = require('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");

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

// var app = express();



// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

// GET muthowif listing.
router.get('/', async function (req, res, next) {
    try {
        const muthowif = await model.muthowif.findAll({
            attributes: [
                'id',
                'firstName',
                'lastName',
                'email',
                'phone',
                'address',
                'gender',
                'dateOfBirthday',
                'describeProfile',
                'photoProfileUrl',
                'backgroundUrl',
                'status'
            ]
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
// GET  muthowif detail.
router.get('/:id', async function (req, res, next) {
    try {
        const muthowif = await model.muthowif.findAll({
            attributes: [
                'firstName',
                'lastName',
                'email',
                'phone',
                'address',
                'gender',
                'dateOfBirthday',
                'describeProfile',
                'photoProfileUrl',
                'backgroundUrl',
                'ktpUrl',
                'npwpUrl',
                'status'
            ],
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

// Upload Image KTP
router.patch('/:id/upload-ktp', function (req, res) {
    const muthowifId = req.params.id;

    const storage = multer.diskStorage({
        destination: path.join(__dirname + './../public/images/ktp/'),
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() +
                path.extname(file.originalname));
        }
    });

    const upload = multer({
        storage: storage
    }).single('imagektp');
    upload(req, res, err => {
        console.log('req image', req.file.filename)
        try {
            const muthowif = model.muthowif.update({
                ktpUrl: req.file.filename,
            }, {
                where: {
                    id: muthowifId
                }
            });
            if (muthowif) {
                res.status(200).json({
                    'status': 'OK',
                    'messages': 'Upload Berhasil',
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
});

// Upload Image NPWP
router.patch('/:id/upload-npwp', function (req, res) {
    const muthowifId = req.params.id;

    const storage = multer.diskStorage({
        destination: path.join(__dirname + './../public/images/npwp/'),
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() +
                path.extname(file.originalname));
        }
    });

    const upload = multer({
        storage: storage
    }).single('imagenpwp');
    upload(req, res, err => {
        console.log('req image', req.file.filename)
        try {
            const muthowif = model.muthowif.update({
                npwpUrl: req.file.filename,
            }, {
                where: {
                    id: muthowifId
                }
            });
            if (muthowif) {
                res.status(200).json({
                    'status': 'OK',
                    'messages': 'Upload Berhasil',
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
});

// Register muthowif
router.post('/', async function (req, res, next) {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            phone,
            address,
            gender,
            dateOfBirthday,
            describeProfile,
            photoProfileUrl,
            backgroundUrl,
            status
        } = req.body;
        const token = jwt.sign({
            id: auth.id,
            email: auth.email,
        }, config.secret, {
            expiresIn: 86400 // 24 hours
        });
        const muthowif = await model.muthowif.create({
            firstName,
            lastName,
            email,
            password: bcrypt.hashSync(password, 8),
            phone,
            address,
            gender,
            dateOfBirthday,
            describeProfile,
            photoProfileUrl,
            backgroundUrl,
            status
        });
        if (muthowif) {
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
                        'status': 'ERROR',
                        'messages': error,
                        'data': {},
                    })
                } else {
                    res.status(201).json({
                        'status': 'OK',
                        'messages': 'Registrasi berhasil',
                        'data': muthowif,
                    })
                }
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
router.patch('/:id', async function (req, res, next) {
    try {
        const muthowifId = req.params.id;
        const {
            firstName,
            lastName,
            email,
            password,
            phone,
            address,
            gender,
            dateOfBirthday,
            describeProfile,
            photoProfileUrl,
            backgroundUrl,
            status
        } = req.body;
        const muthowif = await model.muthowif.update({
            firstName,
            lastName,
            email,
            password,
            phone,
            address,
            gender,
            dateOfBirthday,
            describeProfile,
            photoProfileUrl,
            backgroundUrl,
            status
        }, {
            where: {
                id: muthowifId
            }
        });
        if (muthowif) {
            res.status(200).json({
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
// Change Password Muthowif 

// DELETE muthowif
router.delete('/:id', async function (req, res, next) {
    try {
        const muthowifId = req.params.id;
        const muthowif = await model.muthowif.destroy({
            where: {
                id: muthowifId
            }
        })
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