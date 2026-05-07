INSERT INTO users (username, password, role, created_at)
VALUES
  ('admin', '$2a$08$OVUsm0QZkzT/sW4/21tNcuDoB5Yt6aQbP2MwAekPcx2MMCIrHXd4O', 'Administrator', NOW()),
  ('driver1', '$2a$08$IfEPOUuIuowmNTI7G9/6E.8Ag5rKZcMB/mKBHnVQ3hrlvS5mIwj1u', 'Driver', NOW()),
  ('customer1', '$2a$08$HXL1eEJY1I3UK0fa0fCsoecCPPWXLgGS4V2VLrZvTvYgO.0YbCU0W', 'Customer', NOW());

INSERT INTO customers (user_id, company_name, phone, email, created_at)
VALUES
  (3, 'Sunrise Supply', '+1 555-0102', 'contact@sunrisesupply.com', NOW());

INSERT INTO vehicles (plate_number, model, capacity, status, created_at)
VALUES
  ('LV-3401', 'Freightliner Cascadia', '18 tons', 'Active', NOW()),
  ('MV-1212', 'Volvo VNL', '20 tons', 'Active', NOW());

INSERT INTO drivers (user_id, license_number, phone, vehicle_id, status, created_at)
VALUES
  (2, 'DR0003421', '+1 555-0202', 1, 'On duty', NOW());

INSERT INTO addresses (customer_id, street, city, state, zip, country, created_at)
VALUES
  (1, '120 Harbor Lane', 'Los Angeles', 'California', '90012', 'USA', NOW());

INSERT INTO orders (customer_id, address_id, order_date, status, total_amount, created_at)
VALUES
  (1, 1, NOW() - INTERVAL '4 days', 'Confirmed', 2340.00, NOW() - INTERVAL '4 days');

INSERT INTO shipment_status (name) VALUES ('Pending'), ('In Transit'), ('Delivered');

INSERT INTO shipments (order_id, driver_id, vehicle_id, status_id, pickup_date, delivery_date, created_at)
VALUES
  (1, 1, 1, 2, NOW() - INTERVAL '3 days', NOW() + INTERVAL '1 days', NOW() - INTERVAL '3 days');

INSERT INTO invoices (order_id, amount_due, due_date, status, created_at)
VALUES
  (1, 2340.00, NOW() + INTERVAL '15 days', 'Unpaid', NOW() - INTERVAL '4 days');

INSERT INTO payments (invoice_id, amount, paid_date, method, status, created_at)
VALUES
  (1, 0.00, NOW() - INTERVAL '1 days', 'None', 'Pending', NOW() - INTERVAL '1 days');

INSERT INTO tracking (shipment_id, location, status, timestamp)
VALUES
  (1, 'Los Angeles Distribution Center', 'In Transit', NOW() - INTERVAL '2 days'),
  (1, 'I-5 Northbound', 'In Transit', NOW() - INTERVAL '1 days');
