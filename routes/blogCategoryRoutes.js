const express = require('express');

const routes = express.Router();

// Blog Category Controller 
const blogCategoryController = require('../controllers/blogCategoryController');

const tokenVerify = require('../middelware/adminToken');

//Routes
routes.post('/', tokenVerify, blogCategoryController.AddBlogCategory);

routes.get('/', tokenVerify, blogCategoryController.GetAllData);

routes.delete('/:id', tokenVerify, blogCategoryController.DeleteData);

routes.get('/:id', tokenVerify, blogCategoryController.GetByID);

routes.put('/:id', tokenVerify, blogCategoryController.Update);

module.exports = routes