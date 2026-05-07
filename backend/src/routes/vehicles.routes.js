const express = require('express');
const router = express.Router();
const vehiclesController = require('../controllers/vehicles.controller');

router.get('/', vehiclesController.getAll);
router.get('/:id', vehiclesController.getById);
router.post('/', vehiclesController.create);
router.put('/:id', vehiclesController.update);
router.delete('/:id', vehiclesController.remove);

module.exports = router;
