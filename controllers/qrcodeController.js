const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const { application } = require("express");
const sequelize = db.sequelize;
const qrcodeModel = require("../models/qrcodeModel")(sequelize, DataTypes);
const qrcodehistoryModel = require("../models/qrcodeHistoryModel")(sequelize, DataTypes);
const QRCode = require('qrcode');
const { text } = require("body-parser");

// Add QrCode
const AddQrCode = async (req, res) => {
    try {
        const { codename, domain, background, foreground, eyeframecolor, eyecolor, design, matrixstyle, eyeframe, eyestyle, framestyle, textfont, font, framecolor, textcolor, margin, errorcorrection, text, smsmessage, wifi, staticvcard, event, link, email, phone, application, whatsapp, cryptocurrency } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        const qrCodeData = {
            codename, domain, background, foreground, eyeframecolor, eyecolor, design, matrixstyle, eyeframe, eyestyle, framestyle, textfont, font, framecolor, textcolor, margin, errorcorrection, createdBy, LastModifiedBy,
            image: req.file?.path || ""
        };

        let qrContentData = null;
        let qrType = '';

        // Assign content to qrContentData based on provided type
        if (text && text.yourtext) {
            qrContentData = { yourtext: text.yourtext };
            qrType = 'text';
        } else if (smsmessage && smsmessage.phonenumber && smsmessage.message) {
            qrContentData = { phonenumber: smsmessage.phonenumber, message: smsmessage.message };
            qrType = 'smsmessage';
        } else if (wifi && wifi.ssid && wifi.password && wifi.encryption) {
            qrContentData = { ssid: wifi.ssid, password: wifi.password, encryption: wifi.encryption };
            qrType = 'wifi';
        } else if (staticvcard && staticvcard.firstname && staticvcard.lastname) {
            qrContentData = {
                firstname: staticvcard.firstname,
                lastname: staticvcard.lastname,
                organization: staticvcard.organization,
                phone: staticvcard.phone,
                cell: staticvcard.cell,
                fax: staticvcard.fax,
                email: staticvcard.email,
                website: staticvcard.website,
            };
            qrType = 'staticvcard';
        } else if (event && event.title && event.startdate) {
            qrContentData = {
                title: event.title,
                description: event.description,
                location: event.location,
                url: event.url,
                startdate: event.startdate,
                enddate: event.enddate
            };
            qrType = 'event';
        } else if (link && link.yourlink) {
            qrContentData = { yourlink: link.yourlink };
            qrType = 'link';
        } else if (email && email.email && email.subject) {
            qrContentData = {
                email: email.email,
                subject: email.subject,
                message: email.message,
            };
            qrType = 'email';
        } else if (phone && phone.phonenumber) {
            qrContentData = { phonenumber: phone.phonenumber };
            qrType = 'phone';
        } else if (application && application.appstore) {
            qrContentData = {
                appstore: application.appstore,
                googleplay: application.googleplay,
                others: application.others,
            };
            qrType = 'application';
        } else if (whatsapp && whatsapp.phonenumber) {
            qrContentData = { phonenumber: whatsapp.phonenumber, message: whatsapp.message };
            qrType = 'whatsapp';
        } else if (cryptocurrency && cryptocurrency.walletaddress) {
            qrContentData = { walletaddress: cryptocurrency.walletaddress };
            qrType = 'cryptocurrency';
        } else {
            return res.status(400).send({ success: false, message: 'No valid QR code content provided' });
        }

        qrCodeData[qrType] = qrContentData;

        const AddData = await qrcodeModel.create(qrCodeData);

        const qrCodeString = JSON.stringify(qrContentData);
        const qrCodeImage = await QRCode.toDataURL(qrCodeString);

        await AddData.update({ qrcode: qrCodeImage });

        return res.status(200).send({
            success: true,
            message: 'QR code generated successfully!',
            Data: AddData,
            qrType
        });

    } catch (error) {
        console.error('Error in AddQrCode:', error);
        return res.status(400).send({ success: false, message: error.message });
    }
};

// GetAll Data 
const GetAllData = async (req, res) => {
    try {
        const FindData = await qrcodeModel.findAll({ where: { IsDeleted: 0 } });
        if (FindData.length === 0) {  // Check if FindData is an empty array
            return res.status(400).send({
                success: false,
                message: 'QrCode Data Not Found..',
            });
        }

        // Map through the FindData array to extract qrcode and codename
        const formattedData = FindData.map(data => ({  
            qrcode: data.qrcode,
            codename: data.codename,
        }));

        return res.status(200).send({
            success: true,  // Change to true since data is found
            message: 'QrCode Data Found Successfully..',
            data: formattedData,  // Return the formatted data
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message,
        });
    }
};

// const GetAllData = async (req, res) => {
//     try {
//         const FindData = await qrcodeModel.findAll({ where: { IsDeleted: 0 } });
//         if (FindData.length === 0) {
//             return res.status(400).send({
//                 success: false,
//                 message: 'QrCode Data Not Found..',
//             });
//         }

//         const currentTime = new Date(); 

//         const formattedData = FindData.map(data => {
//             console.log('Created At:', data.createdAt); 

//             const generatedAt = new Date(data.createdAt); 

//             // Check if the generatedAt date is valid
//             if (isNaN(generatedAt.getTime())) { 
//                 return {
//                     qrcode: data.qrcode,
//                     codename: data.codename,
//                     timeCount: 'Invalid date',
//                 };
//             }

//             const timeDiff = currentTime - generatedAt; 

//             // Convert time difference to seconds, minutes, or hours
//             const seconds = Math.floor(timeDiff / 1000);
//             const minutes = Math.floor(seconds / 60);
//             const hours = Math.floor(minutes / 60);
//             const days = Math.floor(hours / 24);

//             let timeCount; // Variable to hold the time count

//             // Determine the appropriate time count format
//             if (days > 0) {
//                 timeCount = `${days} day${days > 1 ? 's' : ''} ago`;
//             } else if (hours > 0) {
//                 timeCount = `${hours} hour${hours > 1 ? 's' : ''} ago`;
//             } else if (minutes > 0) {
//                 timeCount = `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
//             } else {
//                 timeCount = `${seconds} second${seconds > 1 ? 's' : ''} ago`;
//             }

//             return {
//                 qrcode: data.qrcode,
//                 codename: data.codename,
//                 generatedAt: data.createdAt,
//                 timeCount, // Add the time count to the response
//             };
//         });

//         return res.status(200).send({
//             success: true,
//             message: 'QrCode Data Found Successfully..',
//             data: formattedData,
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(400).send({
//             success: false,
//             message: error.message,
//         });
//     }
// };


// Delete
const Delete = async (req, res) => {
    try {
        const id = req.params.id;

        const FindData = await qrcodeModel.findOne({ where: { qrcodeID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'QRCode Not Found..'
            })
        }

        const HistoryData = await qrcodehistoryModel.create({
            qrcodeID: FindData.qrcodeID,
            codename: FindData.codename,
            domain: FindData.domain,
            text: FindData.text,
            smsmessage: FindData.smsmessage,
            wifi: FindData.wifi,
            staticvcard: FindData.staticvcard,
            event: FindData.event,
            link: FindData.link,
            email: FindData.email,
            phone: FindData.phone,
            application: FindData.application,
            whatsapp: FindData.whatsapp,
            cryptocurrency: FindData.cryptocurrency,
            qrcode: FindData.qrcode,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const changeData = await qrcodeModel.update({ IsDeleted: 1 }, { where: { qrcodeID: id } })

        if (changeData[0] === 0) {
            return res.status(400).send({
                success: false,
                message: 'No QRCode Were Deleted..',
            })
        }

        return res.status(200).send({
            success: true,
            message: 'QRCode Is Deleted Successfullyy..',
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// GetByID
const GetById = async (req, res) => {
    try {
        const id = req.params.id;
        const FindData = await qrcodeModel.findOne({ where: { qrcodeID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'QrCode Data Not Found..'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'QrCode Found Successfullyy..',
            Data: FindData
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// Update  <<<<------------------ Update Pending -------------------------->>>>
const UpdateQrCode = async (req, res) => {
    try {
        const id = req.params.id;
        const { codename, domain, background, foreground, eyeframecolor, eyecolor, design, matrixstyle, eyeframe, eyestyle, framestyle, textfont, font, framecolor, textcolor, margin, errorcorrection, text, smsmessage, wifi, staticvcard, event, link, email, phone, application, whatsapp, cryptocurrency } = req.body;

        // Fetch the existing data
        const qrCodeRecord = await qrcodeModel.findByPk(id);
        if (!qrCodeRecord) {
            return res.status(404).send({ success: false, message: 'QR Code not found' });
        }

        // Store the old data in the history table
        await qrcodehistoryModel.create({
            qrcodeID: qrCodeRecord.qrcodeID,
            codename: qrCodeRecord.codename,
            domain: qrCodeRecord.domain,
            text: qrCodeRecord.text,
            smsmessage: qrCodeRecord.smsmessage,
            wifi: qrCodeRecord.wifi,
            staticvcard: qrCodeRecord.staticvcard,
            event: qrCodeRecord.event,
            link: qrCodeRecord.link,
            email: qrCodeRecord.email,
            phone: qrCodeRecord.phone,
            application: qrCodeRecord.application,
            whatsapp: qrCodeRecord.whatsapp,
            cryptocurrency: qrCodeRecord.cryptocurrency,
            background: qrCodeRecord.background,
            foreground: qrCodeRecord.foreground,
            eyeframecolor: qrCodeRecord.eyeframecolor,
            eyecolor: qrCodeRecord.eyecolor,
            design: qrCodeRecord.design,
            image: qrCodeRecord.image,
            matrixstyle: qrCodeRecord.matrixstyle,
            eyeframe: qrCodeRecord.eyeframe,
            eyestyle: qrCodeRecord.eyestyle,
            framestyle: qrCodeRecord.framestyle,
            textfont: qrCodeRecord.textfont,
            font: qrCodeRecord.font,
            framecolor: qrCodeRecord.framecolor,
            textcolor: qrCodeRecord.textcolor,
            margin: qrCodeRecord.margin,
            errorcorrection: qrCodeRecord.errorcorrection,
            BackupCreatedBy: qrCodeRecord.createdBy,
            BackupCreatedOn: new Date(),
        });

        // Object to hold updated data
        let qrContentData = null;
        let qrType = '';
        let updatedFields = {};

        // Validate and update only the provided fields
        if (text) {
            if (!text.yourtext) {
                return res.status(400).send({ success: false, message: 'Text content is required' });
            }
            qrContentData = { yourtext: text.yourtext };
            qrType = 'text';
            updatedFields.text = qrContentData;
        } else if (smsmessage) {
            if (!smsmessage.phonenumber || !smsmessage.message) {
                return res.status(400).send({ success: false, message: 'Both phone number and message are required for SMS' });
            }
            qrContentData = { phonenumber: smsmessage.phonenumber, message: smsmessage.message };
            qrType = 'smsmessage';
            updatedFields.smsmessage = qrContentData;
        } else if (wifi) {
            if (!wifi.ssid || !wifi.password || !wifi.encryption) {
                return res.status(400).send({ success: false, message: 'SSID, Password, and Encryption are required for WiFi' });
            }
            qrContentData = { ssid: wifi.ssid, password: wifi.password, encryption: wifi.encryption };
            qrType = 'wifi';
            updatedFields.wifi = qrContentData;
        } else if (staticvcard) {
            if (!staticvcard.firstname || !staticvcard.lastname || !staticvcard.organization || !staticvcard.phone || !staticvcard.cell || !staticvcard.fax || !staticvcard.email || !staticvcard.website) {
                return res.status(400).send({ success: false, message: 'All Fields are required for VCard' });
            }
            qrContentData = {
                firstname: staticvcard.firstname,
                lastname: staticvcard.lastname,
                organization: staticvcard.organization,
                phone: staticvcard.phone,
                cell: staticvcard.cell,
                fax: staticvcard.fax,
                email: staticvcard.email,
                website: staticvcard.website,
            };
            qrType = 'staticvcard';
            updatedFields.staticvcard = qrContentData;
        } else if (event) {
            if (!event.title || !event.description || !event.location || !event.url || !event.startdate || !event.enddate) {
                return res.status(400).send({ success: false, message: 'All Fields are required for Event' });
            }
            qrContentData = {
                title: event.title,
                description: event.description,
                location: event.location,
                url: event.url,
                startdate: event.startdate,
                enddate: event.enddate
            };
            qrType = 'event';
            updatedFields.event = qrContentData;
        } else if (link) {
            if (!link.yourlink) {
                return res.status(400).send({ success: false, message: 'Link content is required' });
            }
            qrContentData = { yourlink: link.yourlink };
            qrType = 'link';
            updatedFields.link = qrContentData;
        } else if (email) {
            if (!email.email || !email.subject || !email.message) {
                return res.status(400).send({ success: false, message: 'Email, Subject And Message Fields are required' });
            }
            qrContentData = {
                email: email.email,
                subject: email.subject,
                message: email.message,
            };
            qrType = 'email';
            updatedFields.email = qrContentData;
        } else if (phone) {
            if (!phone.phonenumber) {
                return res.status(400).send({ success: false, message: 'Phone content is required' });
            }
            qrContentData = { phonenumber: phone.phonenumber };
            qrType = 'phone';
            updatedFields.phone = qrContentData;
        } else if (application) {
            if (!application.appstore || !application.googleplay || !application.others) {
                return res.status(400).send({ success: false, message: 'Application content is required' });
            }
            qrContentData = {
                appstore: application.appstore,
                googleplay: application.googleplay,
                others: application.others,
            };
            qrType = 'application';
            updatedFields.application = qrContentData;
        } else if (whatsapp) {
            if (!whatsapp.phonenumber || !whatsapp.message) {
                return res.status(400).send({ success: false, message: 'Whatsapp content is required' });
            }
            qrContentData = { phonenumber: whatsapp.phonenumber, message: whatsapp.message };
            qrType = 'whatsapp';
            updatedFields.whatsapp = qrContentData;
        } else if (cryptocurrency) {
            if (!cryptocurrency.walletaddress) {
                return res.status(400).send({ success: false, message: 'Cryptocurrency content is required' });
            }
            qrContentData = { walletaddress: cryptocurrency.walletaddress };
            qrType = 'cryptocurrency';
            updatedFields.cryptocurrency = qrContentData;
        } else {
            return res.status(400).send({ success: false, message: 'No valid QR code content provided for update' });
        }

        if (!qrContentData) {
            return res.status(400).send({ success: false, message: 'No valid data provided to update QR code.' });
        }

        let imagePath = qrCodeRecord.image;
        if (req.file) {
            const newImagePath = req.file.path;

            // Check if an old image exists and delete it
            if (qrCodeRecord.image && fs.existsSync(path.resolve(qrCodeRecord.image))) {
                fs.promises.unlink(path.resolve(qrCodeRecord.image))  // Async deletion
                    .catch((err) => console.error('Error deleting old image:', err));
            }

            imagePath = newImagePath;
        }

        if (codename) updatedFields.codename = codename;
        if (domain) updatedFields.domain = domain;
        if (background) updatedFields.background = background;
        if (foreground) updatedFields.foreground = foreground;
        if (eyeframecolor) updatedFields.eyeframecolor = eyeframecolor;
        if (eyecolor) updatedFields.eyecolor = eyecolor;
        if (design) updatedFields.design = design;
        if (matrixstyle) updatedFields.matrixstyle = matrixstyle;
        if (eyeframe) updatedFields.eyeframe = eyeframe;
        if (eyestyle) updatedFields.eyestyle = eyestyle;
        if (framestyle) updatedFields.framestyle = framestyle;
        if (textfont) updatedFields.textfont = textfont;
        if (font) updatedFields.font = font;
        if (framecolor) updatedFields.framecolor = framecolor;
        if (textcolor) updatedFields.textcolor = textcolor;
        if (margin) updatedFields.margin = margin;
        if (errorcorrection) updatedFields.errorcorrection = errorcorrection;
        if (imagePath) updatedFields.image = imagePath;

        // Update only the provided fields
        await qrCodeRecord.update(updatedFields)

        // Generate the QR code
        const qrCodeData = JSON.stringify(qrContentData);
        const qrCodeImageUrl = await QRCode.toDataURL(qrCodeData);

        // Send response with the generated QR code
        return res.status(200).send({
            success: true,
            message: 'QR code updated and generated successfully!',
            Data: qrCodeRecord,
            qrType,
            qrCodeImage: qrCodeImageUrl
        });

    } catch (error) {
        console.error('Error in UpdateQrCode:', error);
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
};

module.exports = ({
    AddQrCode, GetAllData, Delete, GetById, UpdateQrCode
})