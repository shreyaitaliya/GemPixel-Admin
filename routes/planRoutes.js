const express = require('express');
const routes = express.Router();

const planController = require('../controllers/planController');

const TokenVerify = require('../middelware/adminToken')

routes.get('/option', planController.GetAllOption);

routes.post('/', TokenVerify, planController.AddPlan);

routes.get('/', planController.GetAllPlan);

routes.get('/:id', planController.GetByID);

routes.put('/:id', planController.Update);

routes.delete('/:id', planController.Delete);

module.exports = routes