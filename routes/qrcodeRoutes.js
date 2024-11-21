const express = require('express');

const routes = express.Router();

const multer = require('multer');
const path = require('path')

// QrCode Controller
const qrcodeController = require('../controllers/qrcodeController');

const verifyToken = require('../middelware/adminToken');

//Multer 
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
routes.post('/', verifyToken, upload, qrcodeController.AddQrCode);

routes.get('/', verifyToken, qrcodeController.GetAllData);

routes.delete('/:id', verifyToken, qrcodeController.Delete);

routes.get('/:id', verifyToken, qrcodeController.GetById);

routes.put('/:id', verifyToken, qrcodeController.UpdateQrCode);


module.exports = routes