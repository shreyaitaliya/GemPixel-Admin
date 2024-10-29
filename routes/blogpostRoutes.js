const express = require('express');

const routes = express.Router();
const multer = require('multer');
const path = require('path');

// BlogPost Controller
const blogPostCnotroller = require('../controllers/blogPostController');

const tokenVerify = require('../middelware/adminToken');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
})

const upload = multer({ storage: storage }).single('image');

// Routes
routes.post('/', tokenVerify, upload, blogPostCnotroller.AddBlogPost);

routes.get('/', tokenVerify, blogPostCnotroller.GetAllData);

routes.get('/:id', tokenVerify, blogPostCnotroller.GetByID);

routes.delete('/:id', tokenVerify, blogPostCnotroller.Delete);

routes.put('/:id', tokenVerify, blogPostCnotroller.Update);

module.exports = routes