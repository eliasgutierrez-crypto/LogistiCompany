const trackingService = require('../services/tracking.service');

exports.getAll = async (req, res, next) => {
  try {
    const trackings = await trackingService.getAll();
    res.json(trackings);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const tracking = await trackingService.getById(req.params.id);
    res.json(tracking);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const tracking = await trackingService.create(req.body);
    res.status(201).json(tracking);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const tracking = await trackingService.update(req.params.id, req.body);
    res.json(tracking);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await trackingService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
