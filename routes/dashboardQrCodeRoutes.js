const express = require('express');

const routes = express.Router();

const dashboardQrCodeController = require('../controllers/dashboardQrCodeController');

const TokenVerify = require('../middelware/adminToken');

routes.post('/', TokenVerify, dashboardQrCodeController.AddUrl)

routes.get('/', dashboardQrCodeController.GetByAllData)

module.exports = routes