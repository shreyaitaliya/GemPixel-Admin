const express = require('express');
const routes = express.Router();

const bioController = require('../controllers/bioController');

const Tokenverify = require('../middelware/adminToken');

routes.post('/', Tokenverify, bioController.AddBio);

routes.get('/', bioController.GetAllData);

routes.get('/:id', bioController.GetById);

routes.put('/:id', Tokenverify, bioController.update);

routes.delete('/:id', bioController.Delete);

module.exports = routes