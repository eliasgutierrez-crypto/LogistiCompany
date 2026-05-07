# LogistiCompany

LogistiCompany es un proyecto de gestión logística compuesto por un frontend en React + Vite y un backend en Node.js + Express con PostgreSQL.

## Estructura del proyecto

- `frontend/` - Aplicación web React con rutas para administración, conductores y clientes.
- `backend/` - API REST en Express que maneja usuarios, clientes, conductores, vehículos, pedidos, envíos, facturas y pagos.

## Requisitos

- Node.js 18+ o superior
- PostgreSQL

## Configuración

1. Clona el repositorio.
2. Crea un archivo `.env` en `backend/` copiando `backend/.env.example`.
3. Configura `DATABASE_URL` con tu base de datos PostgreSQL.

## Ejecutar la aplicación

### Backend

```bash
cd backend
npm install
npm run migrate
npm run dev
```

El servidor se ejecutará en `http://localhost:3000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend se ejecutará en el puerto que configure Vite, normalmente `http://localhost:5173`.

## Notas

- El backend ya incluye migraciones SQL y ejemplo de datos.
- La autenticación se maneja de forma simple para uso de proyecto escolar.

## Recursos adicionales

- `backend/README.md` - Instrucciones específicas del backend.
- `frontend/` - Código de la interfaz de usuario.
