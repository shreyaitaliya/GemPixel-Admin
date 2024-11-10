const express = require('express');
const routes = express.Router();

const articleCategoryController = require('../controllers/articleCategoryController');

const TokenVerify = require('../middelware/adminToken');

routes.post('/', TokenVerify, articleCategoryController.AddCategory);

routes.get('/', articleCategoryController.GetByAllData);

routes.get('/:id', articleCategoryController.GetByID);

routes.put('/:id', articleCategoryController.Update);

routes.delete('/:id', articleCategoryController.Delete);

module.exports = routes