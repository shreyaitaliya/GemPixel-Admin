const express = require('express');

const routes = express.Router();

const adverticemntController = require('../controllers/adverticementController');

const TokenVerify = require('../middelware/adminToken');

routes.get('/type', adverticemntController.TypeDataGet);

routes.post('/', TokenVerify, adverticemntController.AddData);

routes.get('/', adverticemntController.GetByAllData);

routes.get('/:id', adverticemntController.GetById);

routes.put('/:id', adverticemntController.Update);

routes.delete('/:id', adverticemntController.Delete);

module.exports = routes