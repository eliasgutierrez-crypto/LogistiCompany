const invoicesService = require('../services/invoices.service');

exports.getAll = async (req, res, next) => {
  try {
    const invoices = await invoicesService.getAll();
    res.json(invoices);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const invoice = await invoicesService.getById(req.params.id);
    res.json(invoice);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const invoice = await invoicesService.create(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const invoice = await invoicesService.update(req.params.id, req.body);
    res.json(invoice);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await invoicesService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
