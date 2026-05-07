const pool = require('../config/db');

exports.getAll = async () => {
  const result = await pool.query(
    'SELECT id, plate_number, model, capacity, status, created_at FROM vehicles ORDER BY created_at DESC'
  );
  return result.rows;
};

exports.getById = async (id) => {
  const result = await pool.query('SELECT * FROM vehicles WHERE id = $1', [id]);
  return result.rows[0];
};

exports.create = async ({ plate_number, model, capacity, status }) => {
  const result = await pool.query(
    'INSERT INTO vehicles (plate_number, model, capacity, status, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
    [plate_number, model, capacity, status || 'Active']
  );
  return result.rows[0];
};

exports.update = async (id, { plate_number, model, capacity, status }) => {
  const result = await pool.query(
    'UPDATE vehicles SET plate_number = $1, model = $2, capacity = $3, status = $4 WHERE id = $5 RETURNING *',
    [plate_number, model, capacity, status, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await pool.query('DELETE FROM vehicles WHERE id = $1', [id]);
};
