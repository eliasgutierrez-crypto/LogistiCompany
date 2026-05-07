const pool = require('../config/db');

exports.getAll = async () => {
  const result = await pool.query(
    `SELECT t.id, t.location, t.status, t.timestamp, s.id AS shipment_id
     FROM tracking t
     JOIN shipments s ON t.shipment_id = s.id
     ORDER BY t.timestamp DESC`
  );
  return result.rows;
};

exports.getById = async (id) => {
  const result = await pool.query('SELECT * FROM tracking WHERE id = $1', [id]);
  return result.rows[0];
};

exports.create = async ({ shipment_id, location, status, timestamp }) => {
  const result = await pool.query(
    'INSERT INTO tracking (shipment_id, location, status, timestamp) VALUES ($1, $2, $3, $4) RETURNING *',
    [shipment_id, location, status, timestamp || new Date()]
  );
  return result.rows[0];
};

exports.update = async (id, { location, status, timestamp }) => {
  const result = await pool.query(
    'UPDATE tracking SET location = $1, status = $2, timestamp = $3 WHERE id = $4 RETURNING *',
    [location, status, timestamp, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await pool.query('DELETE FROM tracking WHERE id = $1', [id]);
};
