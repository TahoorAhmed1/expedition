const express = require('express');
const cors = require('cors');

const clientRoutes = require('./routes/client');
const adminRoutes = require('./routes/admin');
const { reqLogger } = require('./configs/logger');
const errorHandler = require('./middleware/errorHandler.middleware');

const app = express();

app.use(express.json({ limit: '100mb' }));
app.use(cors());
app.use(reqLogger);
app.use(express.static('public'));

app.use('/api', clientRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorHandler);

module.exports = app;
