const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/tracking.controller');

router.get('/', trackingController.getAll);
router.get('/:id', trackingController.getById);
router.post('/', trackingController.create);
router.put('/:id', trackingController.update);
router.delete('/:id', trackingController.remove);

module.exports = router;
