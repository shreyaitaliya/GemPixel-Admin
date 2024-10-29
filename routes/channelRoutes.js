const express = require('express');

const routes = express.Router();

// Channel Controller
const channelController = require('../controllers/channelController');

const tokenVerify = require('../middelware/adminToken');

// Routes
routes.post('/', tokenVerify, channelController.AddChannel);

routes.get('/', tokenVerify, channelController.GetAllData);

routes.get('/:id', tokenVerify, channelController.GetByID);

routes.delete('/:id', tokenVerify, channelController.Delete);

routes.put('/:id', tokenVerify, channelController.Update);

module.exports = routes