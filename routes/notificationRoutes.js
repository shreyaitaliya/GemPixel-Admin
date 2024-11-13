const express = require('express');
const routes = express.Router();

const notificationController = require('../controllers/notificationController');

const TokenVerify = require('../middelware/adminToken');

routes.post('/', TokenVerify, notificationController.AddNotification);

routes.get('/', notificationController.GetByAllData);

routes.get('/:id', notificationController.GetByID);

routes.put('/:id', notificationController.Update);

routes.delete('/:id', notificationController.Delete);

module.exports = routes