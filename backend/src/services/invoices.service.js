const pool = require('../config/db');

exports.getAll = async () => {
  const result = await pool.query(
    `SELECT i.id, i.amount_due, i.status, i.due_date, o.id AS order_id, c.company_name AS customer
     FROM invoices i
     JOIN orders o ON i.order_id = o.id
     JOIN customers c ON o.customer_id = c.id
     ORDER BY i.created_at DESC`
  );
  return result.rows;
};

exports.getById = async (id) => {
  const result = await pool.query(
    `SELECT i.*, o.id AS order_id, c.company_name AS customer
     FROM invoices i
     JOIN orders o ON i.order_id = o.id
     JOIN customers c ON o.customer_id = c.id
     WHERE i.id = $1`,
    [id]
  );
  return result.rows[0];
};

exports.create = async ({ order_id, amount_due, due_date, status }) => {
  const result = await pool.query(
    'INSERT INTO invoices (order_id, amount_due, due_date, status, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
    [order_id, amount_due, due_date, status || 'Unpaid']
  );
  return result.rows[0];
};

exports.update = async (id, { amount_due, due_date, status }) => {
  const result = await pool.query(
    'UPDATE invoices SET amount_due = $1, due_date = $2, status = $3 WHERE id = $4 RETURNING *',
    [amount_due, due_date, status, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await pool.query('DELETE FROM invoices WHERE id = $1', [id]);
};
