const ordersService = require('../services/orders.service');

const getAll = async (req, res, next) => {
  try {
    const orders = await ordersService.getAll();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const order = await ordersService.getById(id);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { id_cliente, fecha } = req.body;

    if (id_cliente == null || !fecha) {
      return res.status(400).json({ error: 'id_cliente and fecha are required' });
    }

    const newOrder = await ordersService.create({ id_cliente, fecha });
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { id_cliente, fecha } = req.body;

    if (id_cliente == null || !fecha) {
      return res.status(400).json({ error: 'id_cliente and fecha are required' });
    }

    const updatedOrder = await ordersService.update(id, { id_cliente, fecha });

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedOrder = await ordersService.remove(id);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
