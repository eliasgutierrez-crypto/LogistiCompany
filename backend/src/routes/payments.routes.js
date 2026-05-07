const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/payments.controller');

router.get('/', paymentsController.getAll);
router.get('/:id', paymentsController.getById);
router.post('/', paymentsController.create);
router.put('/:id', paymentsController.update);
router.delete('/:id', paymentsController.remove);

module.exports = router;
