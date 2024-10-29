const express = require('express');

const routes = express.Router();
const multer = require('multer');
const path = require('path');

// CTAImage Controller
const ctaimageController = require('../controllers/CTAImageController');

const TokenVerify = require('../middelware/adminToken');

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
routes.post('/', TokenVerify, upload.fields([{ name: 'logo' }, { name: 'bgimage' }]), ctaimageController.AddCTAImage);

routes.get('/', ctaimageController.GetAllData);

routes.get('/:id', ctaimageController.GetByID);

routes.put('/:id', TokenVerify, upload.fields([{ name: 'logo' }, { name: 'bgimage' }]), ctaimageController.Update);


module.exports = routes