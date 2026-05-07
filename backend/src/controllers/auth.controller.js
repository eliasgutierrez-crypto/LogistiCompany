const bcrypt = require('bcryptjs');
const pool = require('../config/db');

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const query = 'SELECT id, username, password, role FROM users WHERE username = $1 LIMIT 1';
    const result = await pool.query(query, [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const safeUser = { id: user.id, username: user.username, role: user.role };
    return res.json({ user: safeUser });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const insertQuery = 'INSERT INTO users (username, password, role, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, username, role';
    const result = await pool.query(insertQuery, [username, hashedPassword, role]);
    const user = result.rows[0];
    return res.status(201).json({ user });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'Username already exists' });
    }
    next(err);
  }
};
