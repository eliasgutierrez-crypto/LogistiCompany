const pool = require('../config/db');

exports.getAll = async () => {
  const result = await pool.query(
    `SELECT s.id, s.pickup_date, s.delivery_date, ss.name AS status, o.id AS order_id, d.license_number AS driver_license, v.plate_number AS vehicle
     FROM shipments s
     JOIN shipment_status ss ON s.status_id = ss.id
     JOIN orders o ON s.order_id = o.id
     LEFT JOIN drivers d ON s.driver_id = d.id
     LEFT JOIN vehicles v ON s.vehicle_id = v.id
     ORDER BY s.created_at DESC`
  );
  return result.rows;
};

exports.getById = async (id) => {
  const result = await pool.query(
    `SELECT s.*, ss.name AS status, o.id AS order_id, d.license_number AS driver_license, v.plate_number AS vehicle
     FROM shipments s
     JOIN shipment_status ss ON s.status_id = ss.id
     JOIN orders o ON s.order_id = o.id
     LEFT JOIN drivers d ON s.driver_id = d.id
     LEFT JOIN vehicles v ON s.vehicle_id = v.id
     WHERE s.id = $1`,
    [id]
  );
  return result.rows[0];
};

exports.create = async ({ order_id, driver_id, vehicle_id, status_id, pickup_date, delivery_date }) => {
  const result = await pool.query(
    'INSERT INTO shipments (order_id, driver_id, vehicle_id, status_id, pickup_date, delivery_date, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
    [order_id, driver_id, vehicle_id, status_id, pickup_date, delivery_date]
  );
  return result.rows[0];
};

exports.update = async (id, { driver_id, vehicle_id, status_id, pickup_date, delivery_date }) => {
  const result = await pool.query(
    'UPDATE shipments SET driver_id = $1, vehicle_id = $2, status_id = $3, pickup_date = $4, delivery_date = $5 WHERE id = $6 RETURNING *',
    [driver_id, vehicle_id, status_id, pickup_date, delivery_date, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await pool.query('DELETE FROM shipments WHERE id = $1', [id]);
};
