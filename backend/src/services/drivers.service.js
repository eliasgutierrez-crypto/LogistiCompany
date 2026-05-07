const pool = require('../config/db');

exports.getAll = async () => {
  const result = await pool.query(
    `SELECT d.id, d.license_number, d.phone, d.status, d.created_at, u.username AS username, v.plate_number AS vehicle
     FROM drivers d
     JOIN users u ON d.user_id = u.id
     LEFT JOIN vehicles v ON d.vehicle_id = v.id
     ORDER BY d.created_at DESC`
  );
  return result.rows;
};

exports.getById = async (id) => {
  const result = await pool.query(
    `SELECT d.id, d.license_number, d.phone, d.status, d.created_at, u.username AS username, v.plate_number AS vehicle
     FROM drivers d
     JOIN users u ON d.user_id = u.id
     LEFT JOIN vehicles v ON d.vehicle_id = v.id
     WHERE d.id = $1`,
    [id]
  );
  return result.rows[0];
};

exports.create = async ({ user_id, license_number, phone, vehicle_id, status }) => {
  const result = await pool.query(
    'INSERT INTO drivers (user_id, license_number, phone, vehicle_id, status, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *',
    [user_id, license_number, phone, vehicle_id, status || 'Available']
  );
  return result.rows[0];
};

exports.update = async (id, { license_number, phone, vehicle_id, status }) => {
  const result = await pool.query(
    'UPDATE drivers SET license_number = $1, phone = $2, vehicle_id = $3, status = $4 WHERE id = $5 RETURNING *',
    [license_number, phone, vehicle_id, status, id]
  );
  return result.rows[0];
};

exports.remove = async (id) => {
  await pool.query('DELETE FROM drivers WHERE id = $1', [id]);
};
