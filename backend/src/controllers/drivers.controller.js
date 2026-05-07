const driversService = require('../services/drivers.service');

exports.getAll = async (req, res, next) => {
  try {
    const drivers = await driversService.getAll();
    res.json(drivers);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const driver = await driversService.getById(req.params.id);
    res.json(driver);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const driver = await driversService.create(req.body);
    res.status(201).json(driver);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const driver = await driversService.update(req.params.id, req.body);
    res.json(driver);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await driversService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
