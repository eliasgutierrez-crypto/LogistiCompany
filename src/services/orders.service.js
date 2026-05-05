const db = require('../config/db');

const getAll = async () => {
  const { rows } = await db.query('SELECT * FROM orders ORDER BY id_order', []);
  return rows;
};

const getById = async (id) => {
  const { rows } = await db.query('SELECT * FROM orders WHERE id_order = $1', [id]);
  return rows[0];
};

const create = async ({ id_cliente, fecha }) => {
  const { rows } = await db.query(
    'INSERT INTO orders (id_cliente, fecha) VALUES ($1, $2) RETURNING *',
    [id_cliente, fecha]
  );
  return rows[0];
};

const update = async (id, { id_cliente, fecha }) => {
  const { rows } = await db.query(
    'UPDATE orders SET id_cliente = $1, fecha = $2 WHERE id_order = $3 RETURNING *',
    [id_cliente, fecha, id]
  );
  return rows[0];
};

const remove = async (id) => {
  const { rows } = await db.query('DELETE FROM orders WHERE id_order = $1 RETURNING *', [id]);
  return rows[0];
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
