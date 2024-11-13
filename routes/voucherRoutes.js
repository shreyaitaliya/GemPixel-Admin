const express = require('express');
const routes = express.Router();

const voucherController = require('../controllers/voucherController');
const TokenVerify = require('../middelware/adminToken');

routes.post('/', TokenVerify, voucherController.AddVoucher);

routes.get('/', voucherController.GetByAllData);

routes.get('/:id', voucherController.GetByID);

routes.put('/:id', voucherController.Update);

routes.delete('/:id', voucherController.Delete);

module.exports = routes