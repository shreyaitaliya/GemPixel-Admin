// routes/customsplashRoutes.js
const express = require('express');
const routes = express.Router();
const customsplashController = require('../controllers/customsplashController');
const tokenverify = require('../middelware/adminToken');
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Routes
routes.post('/', tokenverify, upload.fields([{ name: 'bannerimage' }, { name: 'avtarimage' }]), customsplashController.AddCustomsplash);

routes.get('/', tokenverify, customsplashController.GetAllData);

routes.get('/:id', tokenverify, customsplashController.GetById);

routes.put('/:id', tokenverify, upload.fields([{ name: 'bannerimage' }, { name: 'avtarimage' }]), customsplashController.Update);

routes.delete('/:id', tokenverify, customsplashController.Delete);


module.exports = routes;