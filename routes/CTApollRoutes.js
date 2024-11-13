const express = require('express');
const routes = express.Router();

// CtaPoll Controoler
const CTAController = require('../controllers/CTApollController');

const TokenVerify = require('../middelware/adminToken');

// Routes
routes.post('/', TokenVerify, CTAController.AddCtaPoll);

routes.get('/', CTAController.GetAllData);

routes.get('/:id', TokenVerify, CTAController.GetById);

routes.put('/:id', TokenVerify, CTAController.Update);

routes.delete('/:id', TokenVerify, CTAController.Delete);

routes.get('/alldata', CTAController.GetAllCTAData);


module.exports = routes