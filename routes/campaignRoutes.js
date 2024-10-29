const express = require('express');

const routes = express.Router();

// campaignController
const campaignController = require('../controllers/campaignController');

const tokenVerify = require('../middelware/adminToken')

// Routes
routes.post('/', tokenVerify, campaignController.AddCampaign);

routes.get('/', tokenVerify, campaignController.GetAllData);

routes.get('/:id', tokenVerify, campaignController.GetByID);

routes.put('/:id', tokenVerify, campaignController.Update);

routes.delete('/:id', tokenVerify, campaignController.Delete);

module.exports = routes