const customersService = require('../services/customers.service');

exports.getAll = async (req, res, next) => {
  try {
    const customers = await customersService.getAll();
    res.json(customers);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const customer = await customersService.getById(req.params.id);
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const customer = await customersService.create(req.body);
    res.status(201).json(customer);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const customer = await customersService.update(req.params.id, req.body);
    res.json(customer);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await customersService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
