const express = require('express');

const routes = express.Router();

//Admin Controller
AdminController = require('../controllers/adminUserController')

// Login Routes

routes.post('/', AdminController.login)


module.exports = routes