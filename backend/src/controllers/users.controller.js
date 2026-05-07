const usersService = require('../services/users.service');

exports.getAll = async (req, res, next) => {
  try {
    const users = await usersService.getAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const user = await usersService.getById(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const user = await usersService.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await usersService.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
