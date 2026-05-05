const shipmentsService = require('../services/shipments.service');

const getAll = async (req, res, next) => {
  try {
    const shipments = await shipmentsService.getAll();
    res.json(shipments);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const shipment = await shipmentsService.getById(id);

    if (!shipment) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    res.json(shipment);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { id_order, status } = req.body;

    if (id_order == null || !status) {
      return res.status(400).json({ error: 'id_order and status are required' });
    }

    const newShipment = await shipmentsService.create({ id_order, status });
    res.status(201).json(newShipment);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { id_order, status } = req.body;

    if (id_order == null || !status) {
      return res.status(400).json({ error: 'id_order and status are required' });
    }

    const updatedShipment = await shipmentsService.update(id, { id_order, status });

    if (!updatedShipment) {
      return res.status(404).json({ error: 'Shipment not found' });
    }

    res.json(updatedShipment);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deletedShipment = await shipmentsService.remove(id);

    if (!deletedShipment) {
      return res.status(404).json({ error: 'Shipment not found' });
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
