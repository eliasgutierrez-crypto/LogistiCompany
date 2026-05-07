const ordersService = require('../services/orders.service');

exports.getAll = async (req, res, next) => {
  try {
    const orders = await ordersService.getAll();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const order = await ordersService.getById(req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const order = await ordersService.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const order = await ordersService.update(req.params.id, req.body);
    res.json(order);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await ordersService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
