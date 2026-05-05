const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || process.env.PG_CONNECTION_STRING,
});

const migrationsDir = path.join(__dirname, '..', 'src', 'migrations');

const runMigrations = async () => {
  const files = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.sql'))
    .sort();

  for (const file of files) {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, 'utf8');

    console.log(`Running migration: ${file}`);
    await pool.query(sql);
  }

  console.log('All migrations completed.');
};

runMigrations()
  .then(() => pool.end())
  .catch((error) => {
    console.error('Migration failed:', error);
    pool.end();
    process.exit(1);
  });
