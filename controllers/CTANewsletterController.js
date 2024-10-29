const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const ctanewsletterModel = require("../models/CTANewsletterModel")(sequelize, DataTypes);
const ctanewsletterhistoryModel = require("../models/CTANewsletterHistoryModel")(sequelize, DataTypes);

// Add Newsletter
const AddNewsLetter = async (req, res) => {
    try {
        const { name, formlabel, formdescription, thankyoumessage, webhooknotification, button, bgcolor, bgtext, btnbgcolor, btntextcolor } = req.body
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        const AddData = await ctanewsletterModel.create({ name, formlabel, formdescription, thankyoumessage, webhooknotification, button, bgcolor, bgtext, btnbgcolor, btntextcolor, createdBy, LastModifiedBy })

        return res.status(200).send({
            success: true,
            message: 'CTANewsletter Data Added Successfully..',
            Data: AddData
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            Message: error.Message
        })
    }
}

// GetAllData
const GetAllData = async (req, res) => {
    try {
        const FindData = await ctanewsletterModel.findAll({ where: { IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTANewsletter Data Not Found..'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'CTANewsletter Found Successfullyy..',
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

// GetByID
const GetByID = async (req, res) => {
    try {
        const id = req.params.id;
        const FindData = await ctanewsletterModel.findOne({ where: { IsDeleted: 0, ctanewsletterID: id } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTANewsletter Data Not Found...'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'CTANewsletter Data Found Successfully..',
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

//update
const Update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, formlabel, formdescription, thankyoumessage, webhooknotification, button, bgcolor, bgtext, btnbgcolor, btntextcolor } = req.body

        const Finddata = await ctanewsletterModel.findOne({ where: { ctanewsletterID: id, IsDeleted: 0 } });
        if (!Finddata) {
            return res.status(400).send({
                success: false,
                message: 'CTANewsletter Can Not Found..'
            })
        }

        const history = await ctanewsletterhistoryModel.create({
            ctanewsletterID: Finddata.ctanewsletterID,
            name: Finddata.name,
            formlabel: Finddata.formlabel,
            formdescription: Finddata.formdescription,
            thankyoumessage: Finddata.thankyoumessage,
            webhooknotification: Finddata.webhooknotification,
            button: Finddata.button,
            bgcolor: Finddata.bgcolor,
            bgtext: Finddata.bgtext,
            btnbgcolor: Finddata.btnbgcolor,
            btntextcolor: Finddata.btntextcolor,
            BackupCreatedBy: Finddata.createdBy,
            BackupCreatedOn: new Date(),
        })

        const update = await ctanewsletterModel.update({ name, formlabel, formdescription, thankyoumessage, webhooknotification, button, bgcolor, bgtext, btnbgcolor, btntextcolor }, { where: { ctanewsletterID: id, IsDeleted: 0 } })

        return res.status(200).send({
            success: true,
            message: 'CTANewsletter Found Successfully..',
            Data: update
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// Delete
const Delete = async (req, res) => {
    try {
        const id = req.params.id;
        const Finddata = await ctanewsletterModel.findOne({ where: { IsDeleted: 0, ctanewsletterID: id } })
        if (!Finddata) {
            return res.status(400).send({
                success: false,
                message: 'CTANewsletter Data Not Found..'
            })
        }

        const history = await ctanewsletterhistoryModel.create({
            ctanewsletterID: Finddata.ctanewsletterID,
            name: Finddata.name,
            formlabel: Finddata.formlabel,
            formdescription: Finddata.formdescription,
            thankyoumessage: Finddata.thankyoumessage,
            webhooknotification: Finddata.webhooknotification,
            button: Finddata.button,
            bgcolor: Finddata.bgcolor,
            bgtext: Finddata.bgtext,
            btnbgcolor: Finddata.btnbgcolor,
            btntextcolor: Finddata.btntextcolor,
            BackupCreatedBy: Finddata.createdBy,
            BackupCreatedOn: new Date(),
        })

        const changedStatus = await ctanewsletterModel.update(
            { IsDeleted: 1 },
            { where: { ctanewsletterID: id } }
        );
        if (changedStatus[0] === 0) {
            return res.status(500).send({
                success: false,
                message: "No CTANewsletter were deleted."
            });
        }

        return res.status(200).send({
            success: true,
            message: 'CTANewsletter Delete Successfullyy..'
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = ({ AddNewsLetter, GetAllData, GetByID, Update, Delete })