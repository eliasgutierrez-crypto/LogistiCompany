const paymentsService = require('../services/payments.service');

exports.getAll = async (req, res, next) => {
  try {
    const payments = await paymentsService.getAll();
    res.json(payments);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const payment = await paymentsService.getById(req.params.id);
    res.json(payment);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const payment = await paymentsService.create(req.body);
    res.status(201).json(payment);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const payment = await paymentsService.update(req.params.id, req.body);
    res.json(payment);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await paymentsService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
