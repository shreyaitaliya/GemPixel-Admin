const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const ctacontactModel = require("../models/CTAContactModel")(sequelize, DataTypes);
const ctacontactHistoryModel = require("../models/CTAContactHistoryModel")(sequelize, DataTypes);

//AddContact
const AddContact = async (req, res) => {
    try {
        const { name, email, emailsubject, formlabel, formdescription, message, placename, placeemail, placemessage, placebtn, formbgcolor, formtextcolor, inputbgcolor, inputtextcolor, btnbgcolor, btntextcolor, notification } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        const AddData = await ctacontactModel.create({ name, email, emailsubject, formlabel, formdescription, message, placename, placeemail, placemessage, placebtn, formbgcolor, formtextcolor, inputbgcolor, inputtextcolor, btnbgcolor, btntextcolor, notification, createdBy, LastModifiedBy })

        return res.status(200).send({
            success: true,
            message: 'CTAContact Data Created Successfully..',
            Data: AddData
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// GetByAllData
const GetAllData = async (req, res) => {
    try {
        const FindData = await ctacontactModel.findAll({ where: { IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTAContact Not Found...'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'CTAContact Data Found Successfully..',
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
        const FindData = await ctacontactModel.findOne({ where: { IsDeleted: 0, contactID: id } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTAContact Not Found...'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'CTAContact Found Successfully..',
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

// Update
const Update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email, emailsubject, formlabel, formdescription, message, placename, placeemail, placemessage, placebtn, formbgcolor, formtextcolor, inputbgcolor, inputtextcolor, btnbgcolor, btntextcolor, notification } = req.body;
        const FindData = await ctacontactModel.findOne({ where: { contactID: id, IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Ctacontact Data Not Found..'
            })
        }
        const history = await ctacontactHistoryModel.create({
            contactID: FindData.contactID,
            name: FindData.name,
            email: FindData.email,
            emailsubject: FindData.emailsubject,
            formlabel: FindData.formlabel,
            formdescription: FindData.formdescription,
            message: FindData.message,
            placename: FindData.placename,
            placeemail: FindData.placeemail,
            placemessage: FindData.placemessage,
            placebtn: FindData.placebtn,
            formbgcolor: FindData.formbgcolor,
            formtextcolor: FindData.formtextcolor,
            inputbgcolor: FindData.inputbgcolor,
            inputtextcolor: FindData.inputtextcolor,
            btnbgcolor: FindData.btnbgcolor,
            btntextcolor: FindData.btntextcolor,
            notification: FindData.notification,
            btnbgcolor: FindData.btnbgcolor,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const Update = await ctacontactModel.update({ name, email, emailsubject, formlabel, formdescription, message, placename, placeemail, placemessage, placebtn, formbgcolor, formtextcolor, inputbgcolor, inputtextcolor, btnbgcolor, btntextcolor, notification }, { where: { contactID: id, IsDeleted: 0 } })

        return res.status(200).send({
            success: true,
            message: 'CTAContact Upadted Successfully..',
            Data: Update
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
        const FindData = await ctacontactModel.findOne({ where: { contactID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTAContact Data Not Found..'
            })
        }
        const history = await ctacontactHistoryModel.create({
            contactID: FindData.contactID,
            name: FindData.name,
            email: FindData.email,
            emailsubject: FindData.emailsubject,
            formlabel: FindData.formlabel,
            formdescription: FindData.formdescription,
            message: FindData.message,
            placename: FindData.placename,
            placeemail: FindData.placeemail,
            placemessage: FindData.placemessage,
            placebtn: FindData.placebtn,
            formbgcolor: FindData.formbgcolor,
            formtextcolor: FindData.formtextcolor,
            inputbgcolor: FindData.inputbgcolor,
            inputtextcolor: FindData.inputtextcolor,
            btnbgcolor: FindData.btnbgcolor,
            btntextcolor: FindData.btntextcolor,
            notification: FindData.notification,
            btnbgcolor: FindData.btnbgcolor,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })
        const changedstatus = await ctacontactModel.update(
            { IsDeleted: 1 },
            { where: { contactID: id } }
        )

        if (changedstatus[0] === 0) {
            return res.status(500).send({
                success: false,
                message: "Contact Not Deleted."
            })
        }

        return res.status(200).send({
            message: "CTAContact Deleted Sucessfully.."
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
    AddContact, GetAllData, GetByID, Update, Delete
})