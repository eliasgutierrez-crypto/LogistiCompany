const vehiclesService = require('../services/vehicles.service');

exports.getAll = async (req, res, next) => {
  try {
    const vehicles = await vehiclesService.getAll();
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const vehicle = await vehiclesService.getById(req.params.id);
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const vehicle = await vehiclesService.create(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const vehicle = await vehiclesService.update(req.params.id, req.body);
    res.json(vehicle);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await vehiclesService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
