const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const urlModel = require("../models/dashboardModel")(sequelize, DataTypes);
const QRCode = require('qrcode');

function generateShortURL() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortUrl = '';
    for (let i = 0; i < 6; i++) {
        shortUrl += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return shortUrl;
}

// AddURL
const AddUrl = async (req, res) => {
    try {
        const { longurl, options } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        // Base URL for QR Code generation
        const baseUrl = `${req.protocol}://${req.get('host')}`;

        if (options === 1) {
            // Single URL shortening
            const existingUrl = await urlModel.findOne({ where: { longurl } });
            if (existingUrl) {
                return res.status(200).send({
                    success: true,
                    message: 'URL already exists.',
                    Data: {
                        urlID: existingUrl.urlID,
                        longurl: existingUrl.longurl,
                        shorturl: `${baseUrl}/${existingUrl.shorturl}`,
                        qrCode: existingUrl.qrcode
                    }
                });
            }

            let shorturl;
            let urlExists;
            do {
                shorturl = generateShortURL();
                urlExists = await urlModel.findOne({ where: { shorturl } });
            } while (urlExists);

            const qrCodeDataUrl = await QRCode.toDataURL(`${baseUrl}/${shorturl}`);
            const url = await urlModel.create({ options, longurl, shorturl, qrcode: qrCodeDataUrl, createdBy, LastModifiedBy });

            return res.status(201).send({
                success: true,
                message: 'Short URL and QR Code generated successfully.',
                Data: {
                    urlID: url.urlID,
                    longurl: url.longurl,
                    shorturl: `${baseUrl}/${url.shorturl}`,
                    qrCode: qrCodeDataUrl
                }
            });

        } else if (options === 2) {
            // Bulk URL shortening
            if (!Array.isArray(longurl) || longurl.length === 0) {
                return res.status(400).send({
                    success: false,
                    message: 'Please provide an array of URLs for bulk shortening.'
                });
            }

            const urlsToCreate = [];
            for (const url of longurl) {
                // Check if URL already exists
                let existingUrl = await urlModel.findOne({ where: { longurl: url } });
                if (!existingUrl) {
                    let shorturl;
                    let urlExists;
                    do {
                        shorturl = generateShortURL();
                        urlExists = await urlModel.findOne({ where: { shorturl } });
                    } while (urlExists);

                    const qrCodeDataUrl = await QRCode.toDataURL(`${baseUrl}/${shorturl}`);
                    urlsToCreate.push({ options, longurl: url, shorturl, qrcode: qrCodeDataUrl, createdBy, LastModifiedBy });
                } else {
                    urlsToCreate.push(existingUrl);
                }
            }

            // Create all new URLs at once
            const createdUrls = await urlModel.bulkCreate(urlsToCreate);

            const results = createdUrls.map(url => ({
                urlID: url.urlID,
                longurl: url.longurl,
                shorturl: `${baseUrl}/${url.shorturl}`,
                qrCode: url.qrcode
            }));

            return res.status(201).send({
                success: true,
                message: 'Bulk short URLs and QR Codes generated successfully.',
                Data: results
            });
        } else {
            return res.status(400).send({
                success: false,
                message: 'Invalid option. Use 1 for single URL and 2 for bulk URLs.'
            });
        }
    } catch (error) {
        console.error("Error generating short URL:", error);
        return res.status(500).send({
            success: false,
            message: 'Server error, please try again later.'
        });
    }
};

// GetByAllData
const GetByAllData = async (req, res) => {
    try {
        const findData = await urlModel.findAll({ where: { IsDeleted: 0 } });
        if (!findData) {
            return res.status(400).send({
                success: false,
                message: 'URL Data Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'URL Data Found Successfully..',
            Data: findData
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = ({
    AddUrl, GetByAllData
})