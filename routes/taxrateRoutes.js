const express = require('express');
const routes = express.Router();

const taxrateController = require('../controllers/taxrateController');

const TokenVerify = require('../middelware/adminToken');

routes.post('/', TokenVerify, taxrateController.AddTaxRate);

routes.get('/', taxrateController.GetByAllData);

routes.get('/:id', taxrateController.GetByID);

routes.put('/:id', taxrateController.Update);

routes.delete('/:id', taxrateController.Delete);

module.exports = routes