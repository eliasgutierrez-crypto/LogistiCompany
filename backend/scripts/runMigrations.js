const fs = require('fs');
const path = require('path');
const pool = require('../src/config/db');

async function run() {
  try {
    const migrationPath = path.resolve(__dirname, '../migrations/001_create_schema.sql');
    const seedPath = path.resolve(__dirname, '../migrations/002_seed_data.sql');

    const schemaSql = fs.readFileSync(migrationPath, 'utf8');
    const seedSql = fs.readFileSync(seedPath, 'utf8');

    await pool.query(schemaSql);
    console.log('Schema migration completed.');
    await pool.query(seedSql);
    console.log('Seed data inserted.');
    await pool.end();
    process.exit(0);
  } catch (err) {
    console.error('Migration error', err);
    process.exit(1);
  }
}

run();
