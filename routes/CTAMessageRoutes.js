const express = require('express');

const routes = express.Router();
const multer = require('multer');
const path = require('path');

// CTAMessage Routes
const ctaMessageController = require('../controllers/CTAMessageController');

const Tokenverify = require('../middelware/adminToken');

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
routes.post('/', Tokenverify, upload, ctaMessageController.AddCTAMessage);

routes.get('/', ctaMessageController.GetAllData);

routes.get('/:id', ctaMessageController.GetByID);

routes.put('/:id', Tokenverify, upload, ctaMessageController.Update);

routes.delete('/:id', ctaMessageController.Delete);


module.exports = routes