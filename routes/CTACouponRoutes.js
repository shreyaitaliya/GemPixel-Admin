const express = require('express');
const routes = express.Router();

// CTACoupon Controller
const CouponController = require('../controllers/CTACouponController');

const TokenVerify = require('../middelware/adminToken');

// Routes
routes.post('/', TokenVerify, CouponController.AddCoupon);

routes.get('/', CouponController.GetAllData);

routes.get('/:id', CouponController.GetByID);

routes.put('/:id', TokenVerify, CouponController.Update);

routes.delete('/:id', CouponController.Delete);

module.exports = routes