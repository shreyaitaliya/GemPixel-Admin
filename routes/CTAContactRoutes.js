const express = require('express');
const routes = express.Router();

// Controller
const CtaconactController = require('../controllers/CTAContactController')

const Tokenverify = require('../middelware/adminToken');

routes.post('/', Tokenverify, CtaconactController.AddContact);

routes.get('/', CtaconactController.GetAllData);

routes.get('/:id', CtaconactController.GetByID);

routes.put('/:id', Tokenverify, CtaconactController.Update);

routes.delete('/:id', CtaconactController.Delete);

module.exports = routes