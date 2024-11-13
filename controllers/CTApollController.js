const { DataTypes, where } = require('sequelize');
const db = require('../config/db');
const sequelize = db.sequelize;
const ctapollModel = require('../models/CTApollModel')(sequelize, DataTypes);
const ctapollhistoryModel = require('../models/CTApollHistoryModel')(sequelize, DataTypes);
const ctacontactModel = require('../models/CTAContactModel')(sequelize, DataTypes);
const CtacouponModel = require('../models/CTACouponModel')(sequelize, DataTypes);
const ctaimageModel = require('../models/CTAImageModel')(sequelize, DataTypes);
const ctamessageModel = require('../models/CTAMessageModel')(sequelize, DataTypes);
const ctanewsletterModel = require('../models/CTANewsletterModel')(sequelize, DataTypes);


// Add Data
const AddCtaPoll = async (req, res) => {
    try {
        const { name, question, options, votebutton, thanksmessage } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        if (Array.isArray(options) && options.length > 10) {
            return res.status(400).json({ error: "Options cannot exceed 10 items." });
        }

        const AddData = await ctapollModel.create({ name, question, options, votebutton, thanksmessage, createdBy, LastModifiedBy })

        return res.status(200).send({
            success: true,
            message: 'CTAPoll Data Added Successfully..',
            Data: AddData
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({

        })
    }
}

// GetAllData
const GetAllData = async (req, res) => {
    try {
        const FindData = await ctapollModel.findAll({ where: { IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTAPoll Data Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'CTAPoll Data Found Successfully..',
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

// GetById
const GetById = async (req, res) => {
    try {
        const id = req.params.id;
        const FindData = await ctapollModel.findOne({ where: { ctapollID: id, IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTAPoll Data Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'CTAPoll Data Found Successfully..',
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

// Upadte
const Update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, question, options, votebutton, thanksmessage } = req.body;

        const FindData = await ctapollModel.findOne({ where: { ctapollID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTAPoll Data Not Found..'
            })
        }

        if (Array.isArray(options) && options.length > 10) {
            return res.status(400).json({ error: "Options cannot exceed 10 items." });
        }

        const history = await ctapollhistoryModel.create({
            ctapollID: FindData.ctapollID,
            name: FindData.name,
            question: FindData.question,
            options: FindData.options,
            votebutton: FindData.votebutton,
            thanksmessage: FindData.thanksmessage,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const upadte = await ctapollModel.update({ name, question, options, votebutton, thanksmessage }, { where: { ctapollID: id, IsDeleted: 0 } })

        return res.status(200).send({
            success: true,
            message: 'CTAPoll Updated Successfuully..',
            Data: upadte
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
        const FindData = await ctapollModel.findOne({ where: { ctapollID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTAPoll Data Not Found..'
            })
        }
        const history = await ctapollhistoryModel.create({
            ctapollID: FindData.ctapollID,
            name: FindData.name,
            question: FindData.question,
            options: FindData.options,
            votebutton: FindData.votebutton,
            thanksmessage: FindData.thanksmessage,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const changeData = await ctapollModel.update({ IsDeleted: 1 }, { where: { ctapollID: id } })

        if (changeData[0] === 0) {
            return res.status(400).send({
                success: false,
                message: 'No Pixel Were Deleted..',
            })
        }

        return res.status(200).send({
            success: true,
            message: 'CTAPoll Deleted Successfully..'
        })


    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

const GetAllCTAData = async (req, res) => {
    try {
        // Fetch data from each model
        const [contacts, coupons, images, messages, newsletters, polls] = await Promise.all([
            ctacontactModel.findAll({}),
            CtacouponModel.findAll({}),
            ctaimageModel.findAll({}),
            ctamessageModel.findAll({}),
            ctanewsletterModel.findAll({}),
            ctapollModel.findAll({})
        ]);

        // Handle null values by setting them to empty arrays
        const allData = {
            contacts: contacts || [],
            coupons: coupons || [],
            images: images || [],
            messages: messages || [],
            newsletters: newsletters || [],
            polls: polls || []
        };

        return res.status(200).send({
            success: true,
            message: 'All CTA Data Retrieved Successfully.',
            data: allData
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message || 'Error retrieving CTA data.'
        });
    }
};

module.exports = ({
    AddCtaPoll, GetAllData, GetById, Update, Delete, GetAllCTAData
})