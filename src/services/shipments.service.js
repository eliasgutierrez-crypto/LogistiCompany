const db = require('../config/db');

const getAll = async () => {
  const { rows } = await db.query('SELECT * FROM shipments ORDER BY id_shipment', []);
  return rows;
};

const getById = async (id) => {
  const { rows } = await db.query('SELECT * FROM shipments WHERE id_shipment = $1', [id]);
  return rows[0];
};

const create = async ({ id_order, status }) => {
  const { rows } = await db.query(
    'INSERT INTO shipments (id_order, status) VALUES ($1, $2) RETURNING *',
    [id_order, status]
  );
  return rows[0];
};

const update = async (id, { id_order, status }) => {
  const { rows } = await db.query(
    'UPDATE shipments SET id_order = $1, status = $2 WHERE id_shipment = $3 RETURNING *',
    [id_order, status, id]
  );
  return rows[0];
};

const remove = async (id) => {
  const { rows } = await db.query('DELETE FROM shipments WHERE id_shipment = $1 RETURNING *', [id]);
  return rows[0];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
