BEGIN;

CREATE TABLE IF NOT EXISTS orders (
  id_order SERIAL PRIMARY KEY,
  id_cliente INTEGER NOT NULL,
  fecha DATE NOT NULL,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

CREATE TABLE IF NOT EXISTS shipments (
  id_shipment SERIAL PRIMARY KEY,
  id_order INTEGER NOT NULL,
  status VARCHAR(50) NOT NULL,
  FOREIGN KEY (id_order) REFERENCES orders(id_order) ON DELETE CASCADE
);

COMMIT;
