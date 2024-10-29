const express = require('express');

const routes = express.Router();

// Pixel Controller
const pixelController = require('../controllers/PixelController')

const Tokenverify = require('../middelware/adminToken');

// Routes
routes.post('/', Tokenverify, pixelController.AddPixel);

routes.get('/', Tokenverify, pixelController.GetAllData);

routes.get('/:id', Tokenverify, pixelController.GetByID);

routes.put('/:id', Tokenverify, pixelController.Update);

routes.delete('/:id', Tokenverify, pixelController.Delete);

module.exports = routes