const express = require('express');
const app = express();
const ordersRoutes = require('./routes/orders.routes');
const shipmentsRoutes = require('./routes/shipments.routes');

app.use(express.json());
app.use('/api/orders', ordersRoutes);
app.use('/api/shipments', shipmentsRoutes);

app.get('/', (req, res) => {
  res.send('API funcionando');
});

module.exports = app;