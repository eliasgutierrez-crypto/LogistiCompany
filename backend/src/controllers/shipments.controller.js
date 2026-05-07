const shipmentsService = require('../services/shipments.service');

exports.getAll = async (req, res, next) => {
  try {
    const shipments = await shipmentsService.getAll();
    res.json(shipments);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const shipment = await shipmentsService.getById(req.params.id);
    res.json(shipment);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const shipment = await shipmentsService.create(req.body);
    res.status(201).json(shipment);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const shipment = await shipmentsService.update(req.params.id, req.body);
    res.json(shipment);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await shipmentsService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
