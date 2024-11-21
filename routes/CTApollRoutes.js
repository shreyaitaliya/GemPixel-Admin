const express = require('express');
const routes = express.Router();

// CtaPoll Controoler
const CTAController = require('../controllers/CTApollController');

const TokenVerify = require('../middelware/adminToken');

// Routes
routes.post('/', TokenVerify, CTAController.AddCtaPoll);

routes.get('/', CTAController.GetAllData);

routes.get('/:id', CTAController.GetById);

routes.put('/:id', CTAController.Update);

routes.delete('/:id', CTAController.Delete);

routes.get('/cta/alldata', CTAController.AllData);

module.exports = routes