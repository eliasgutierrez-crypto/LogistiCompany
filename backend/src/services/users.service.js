const pool = require('../config/db');

exports.getAll = async () => {
  const result = await pool.query('SELECT id, username, role, created_at FROM users ORDER BY created_at DESC');
  return result.rows;
};

exports.getById = async (id) => {
  const result = await pool.query('SELECT id, username, role, created_at FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

exports.create = async ({ username, password, role }) => {
  const result = await pool.query(
    'INSERT INTO users (username, password, role, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, username, role, created_at',
    [username, password, role]
  );
  return result.rows[0];
};

exports.update = async (id, { username, role }) => {
  const result = await pool.query(
    'UPDATE users SET username = $1, role = $2 WHERE id = $3 RETURNING id, username, role, created_at',
    [username, role, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await pool.query('DELETE FROM users WHERE id = $1', [id]);
};
