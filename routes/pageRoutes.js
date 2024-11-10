const express = require('express');
const routes = express.Router();

// Controller
const pageController = require('../controllers/pageController');
const TokenVerify = require('../middelware/adminToken')

routes.post('/', TokenVerify, pageController.AddPage);

routes.get('/', pageController.GetAllData);

routes.get('/:id', pageController.GetByID);

routes.put('/:id', pageController.Update);

routes.delete('/:id', pageController.Delete);

module.exports = routes