const express = require('express');
const routes = express.Router();

const authRoutes = require('./auth');
const orderRoutes = require('./order');
const userRoutes = require('./user');
const productRoutes = require('./product');

routes.use('/auth', authRoutes);
routes.use('/order', orderRoutes);
routes.use('/user', userRoutes);
routes.use('/product', productRoutes);

module.exports = routes;
