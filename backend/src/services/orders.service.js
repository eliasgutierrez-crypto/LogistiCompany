const pool = require('../config/db');

exports.getAll = async () => {
  const result = await pool.query(
    `SELECT o.id, o.order_date, o.status, o.total_amount, c.company_name AS customer, a.city AS delivery_city, u.username AS owner
     FROM orders o
     JOIN customers c ON o.customer_id = c.id
     JOIN users u ON c.user_id = u.id
     LEFT JOIN addresses a ON o.address_id = a.id
     ORDER BY o.order_date DESC`
  );
  return result.rows;
};

exports.getById = async (id) => {
  const result = await pool.query(
    `SELECT o.*, c.company_name AS customer, a.street, a.city, a.state, a.zip, a.country
     FROM orders o
     JOIN customers c ON o.customer_id = c.id
     LEFT JOIN addresses a ON o.address_id = a.id
     WHERE o.id = $1`,
    [id]
  );
  return result.rows[0];
};

exports.create = async ({ customer_id, address_id, status, total_amount }) => {
  const result = await pool.query(
    'INSERT INTO orders (customer_id, address_id, order_date, status, total_amount, created_at) VALUES ($1, $2, NOW(), $3, $4, NOW()) RETURNING *',
    [customer_id, address_id, status || 'Pending', total_amount]
  );
  return result.rows[0];
};

exports.update = async (id, { status, total_amount, address_id }) => {
  const result = await pool.query(
    'UPDATE orders SET status = $1, total_amount = $2, address_id = $3 WHERE id = $4 RETURNING *',
    [status, total_amount, address_id, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await pool.query('DELETE FROM orders WHERE id = $1', [id]);
};
