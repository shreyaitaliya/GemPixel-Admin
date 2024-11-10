const express = require('express');
const routes = express.Router();

const ArticleCOntroller = require('../controllers/articleController');
const TokenVerify = require('../middelware/adminToken');

routes.post('/', TokenVerify, ArticleCOntroller.AddArticle);

routes.get('/', ArticleCOntroller.GetByAllData);

routes.get('/:id', ArticleCOntroller.GetByID);

routes.put('/:id', ArticleCOntroller.Update);

routes.delete('/:id', ArticleCOntroller.Delete);

module.exports = routes