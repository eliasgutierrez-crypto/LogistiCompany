const pool = require('../config/db');

exports.getAll = async () => {
  const result = await pool.query(
    `SELECT p.id, p.amount, p.method, p.paid_date, p.status, i.id AS invoice_id, c.company_name AS customer
     FROM payments p
     JOIN invoices i ON p.invoice_id = i.id
     JOIN orders o ON i.order_id = o.id
     JOIN customers c ON o.customer_id = c.id
     ORDER BY p.paid_date DESC`
  );
  return result.rows;
};

exports.getById = async (id) => {
  const result = await pool.query(
    `SELECT p.*, i.id AS invoice_id, i.amount_due, c.company_name AS customer
     FROM payments p
     JOIN invoices i ON p.invoice_id = i.id
     JOIN orders o ON i.order_id = o.id
     JOIN customers c ON o.customer_id = c.id
     WHERE p.id = $1`,
    [id]
  );
  return result.rows[0];
};

exports.create = async ({ invoice_id, amount, paid_date, method, status }) => {
  const result = await pool.query(
    'INSERT INTO payments (invoice_id, amount, paid_date, method, status, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
    [invoice_id, amount, paid_date, method, status || 'Paid']
  );
  return result.rows[0];
};

exports.update = async (id, { amount, paid_date, method, status }) => {
  const result = await pool.query(
    'UPDATE payments SET amount = $1, paid_date = $2, method = $3, status = $4 WHERE id = $5 RETURNING *',
    [amount, paid_date, method, status, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await pool.query('DELETE FROM payments WHERE id = $1', [id]);
};
