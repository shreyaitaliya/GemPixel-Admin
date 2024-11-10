const express = require('express');
const routes = express.Router();

const domainController = require('../controllers/domainController')

const Tokenverify = require('../middelware/adminToken');

// ROutes
routes.post('/', Tokenverify, domainController.AddDomain);

routes.get('/', domainController.GetAllData);

routes.get('/:id', domainController.GetByID);

routes.put('/:id', Tokenverify, domainController.Update);

routes.delete('/:id', domainController.Delete);

module.exports = routes