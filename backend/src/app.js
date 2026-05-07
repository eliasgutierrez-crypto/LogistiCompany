const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const customersRoutes = require('./routes/customers.routes');
const driversRoutes = require('./routes/drivers.routes');
const vehiclesRoutes = require('./routes/vehicles.routes');
const ordersRoutes = require('./routes/orders.routes');
const shipmentsRoutes = require('./routes/shipments.routes');
const invoicesRoutes = require('./routes/invoices.routes');
const paymentsRoutes = require('./routes/payments.routes');
const trackingRoutes = require('./routes/tracking.routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/drivers', driversRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/shipments', shipmentsRoutes);
app.use('/api/invoices', invoicesRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/tracking', trackingRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'LogistiCompany API is running' });
});

app.use(errorMiddleware);

module.exports = app;
