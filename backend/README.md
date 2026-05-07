# LogistiCompany Backend

A simple Node.js + Express backend for logistics management with PostgreSQL.

## Setup

1. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Create `.env` from `.env.example` and set `DATABASE_URL`.

3. Run migrations:

   ```bash
   npm run migrate
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

5. API root: `http://localhost:3000/api`
