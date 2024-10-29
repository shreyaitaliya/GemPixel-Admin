const express = require('express');

const routes = express.Router();

// QrCode Controller
const qrcodeController = require('../controllers/qrcodeController');

const verifyToken = require('../middelware/adminToken');

// Routes
routes.post('/', verifyToken, qrcodeController.AddQrCode);

routes.get('/', verifyToken, qrcodeController.GetAllData);

routes.delete('/:id', verifyToken, qrcodeController.Delete);

routes.get('/:id', verifyToken, qrcodeController.GetById);

routes.put('/:id', verifyToken, qrcodeController.UpdateQrCode);


module.exports = routes