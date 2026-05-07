# LogistiCompany Frontend

A React + Vite dashboard for logistics operations, built with TailwindCSS and React Router.

## Setup

1. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

3. Run development server:

   ```bash
   npm run dev
   ```

4. Visit the app at `http://localhost:5173`.

## Features

- Login and register flow with JWT support
- Role-based admin, driver, and customer dashboards
- Orders and shipments management pages
- Protected routes and persistent authentication
- Responsive sidebar layout with modern cards and tables
- Axios service layer and API interceptor
