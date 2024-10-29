const express = require('express');
const routes = express.Router();

// CTANewsLetter Controller
const Ctanewsletter = require('../controllers/CTANewsletterController');

const TokenVerify = require('../middelware/adminToken');

// Routes
routes.post('/', TokenVerify, Ctanewsletter.AddNewsLetter)

routes.get('/', Ctanewsletter.GetAllData)

routes.get('/:id', Ctanewsletter.GetByID)

routes.put('/:id', TokenVerify, Ctanewsletter.Update)

routes.delete('/:id', Ctanewsletter.Delete)

module.exports = routes