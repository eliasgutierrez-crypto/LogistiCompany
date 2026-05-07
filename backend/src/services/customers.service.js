const pool = require('../config/db');

exports.getAll = async () => {
  const result = await pool.query(
    `SELECT c.id, c.company_name, c.phone, c.email, u.username AS owner, c.created_at
     FROM customers c
     JOIN users u ON c.user_id = u.id
     ORDER BY c.created_at DESC`
  );
  return result.rows;
};

exports.getById = async (id) => {
  const result = await pool.query(
    `SELECT c.id, c.company_name, c.phone, c.email, u.username AS owner, c.created_at
     FROM customers c
     JOIN users u ON c.user_id = u.id
     WHERE c.id = $1`,
    [id]
  );
  return result.rows[0];
};

exports.create = async ({ user_id, company_name, phone, email }) => {
  const result = await pool.query(
    'INSERT INTO customers (user_id, company_name, phone, email, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id, company_name, phone, email, user_id, created_at',
    [user_id, company_name, phone, email]
  );
  return result.rows[0];
};

exports.update = async (id, { company_name, phone, email }) => {
  const result = await pool.query(
    'UPDATE customers SET company_name = $1, phone = $2, email = $3 WHERE id = $4 RETURNING id, company_name, phone, email, user_id, created_at',
    [company_name, phone, email, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await pool.query('DELETE FROM customers WHERE id = $1', [id]);
};
