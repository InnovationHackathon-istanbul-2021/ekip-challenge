const express = require('express');
const routes = express.Router();

const authRoutes = require('./auth');
const orderRoutes = require('./order');
const userRoutes = require('./user');

routes.use('/auth', authRoutes);
routes.use('/order', orderRoutes);
routes.use('/user', userRoutes);

module.exports = routes;
