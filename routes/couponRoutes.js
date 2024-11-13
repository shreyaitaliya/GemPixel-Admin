const express = require('express');

const routes = express.Router();

const couponController = require('../controllers/couponController');

const TokenVerify = require('../middelware/adminToken');

routes.post('/', TokenVerify, couponController.AddCoupon);

routes.get('/', couponController.GetByAllData);

routes.get('/:id', couponController.GetByID);

module.exports = routes