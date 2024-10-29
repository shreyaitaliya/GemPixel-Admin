const express = require('express');

const routes = express.Router();

// UserController
const userController = require('../controllers/userController');

const TokenVerify = require('../middelware/adminToken');

//Routes
routes.post('/', TokenVerify, userController.AddUSer);

routes.get('/', TokenVerify, userController.AllUser);

routes.get('/adminuser', TokenVerify, userController.GetAdminUser);

routes.get('/inactiveuser', TokenVerify, userController.GetInActiveUser);

routes.delete('/:id', TokenVerify, userController.Delete);

routes.get('/:id', TokenVerify, userController.GetByID);

routes.put('/:id', TokenVerify, userController.Update);

module.exports = routes;