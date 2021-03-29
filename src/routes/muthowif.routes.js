const express = require('express')
const router = express.Router()
const muthowifController =   require('../controllers/muthowif.controller');
// Retrieve all muthowifs
router.get('/', muthowifController.findAll);
// Create a new muthowif
router.post('/', muthowifController.create);
// Retrieve a single muthowif with id
router.get('/:id', muthowifController.findById);
// Update a muthowif with id
router.put('/:id', muthowifController.update);
// Delete a muthowif with id
router.delete('/:id', muthowifController.delete);
module.exports = router