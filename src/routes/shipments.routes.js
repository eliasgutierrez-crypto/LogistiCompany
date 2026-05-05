const express = require('express');
const router = express.Router();
const shipmentsController = require('../controllers/shipments.controller');

router.get('/', shipmentsController.getAll);
router.get('/:id', shipmentsController.getById);
router.post('/', shipmentsController.create);
router.put('/:id', shipmentsController.update);
router.delete('/:id', shipmentsController.remove);

module.exports = router;
