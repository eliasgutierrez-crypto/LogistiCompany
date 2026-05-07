const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

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
    const token = jwt.sign(safeUser, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ user: safeUser, token });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 8);
    const insertQuery = 'INSERT INTO users (username, password, role, created_at) VALUES ($1, $2, $3, NOW()) RETURNING id, username, role';
    const result = await pool.query(insertQuery, [username, hashedPassword, role || 'customer']);
    const user = result.rows[0];
    
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '24h' });
    return res.status(201).json({ user, token });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'Username already exists' });
    }
    next(err);
  }
};
