const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const campaignModel = require("../models/campaignModel")(sequelize, DataTypes);
const campaignHistoryModel = require("../models/campaignHistoryModel")(sequelize, DataTypes);

// Add Campaign
const AddCampaign = async (req, res) => {
    try {
        const { name, domain, rotatorslug, access } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        const AddData = await campaignModel.create({ name, domain, rotatorslug, access, createdBy, LastModifiedBy });

        return res.status(200).send({
            success: true,
            message: 'Campaign Added Successfully..',
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

// View Campaign
const GetAllData = async (req, res) => {
    try {
        const FindData = await campaignModel.findAll({ where: { IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Campagin Data Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Campaign Data Found Successfully..',
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
        const FindData = await campaignModel.findOne({ where: { campaignID: id } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Campaign Data Not Found..',
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Campagin Data Found Successfully..',
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
        const { name, domain, rotatorslug, access } = req.body;

        const FindData = await campaignModel.findOne({ where: { campaignID: id } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Campaign Data Not Found..',
            })
        }

        const history = await campaignHistoryModel.create({
            campaignID: FindData.campaignID,
            name: FindData.name,
            domain: FindData.domain,
            rotatorslug: FindData.rotatorslug,
            access: FindData.access,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date()
        })

        const UpdateData = await campaignModel.update({ name, domain, rotatorslug, access }, { where: { campaignID: id, IsDeleted: 0 } });

        return res.status(200).send({
            success: true,
            message: 'Campaign Data Updated Successfullyy..',
            Data: UpdateData
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
        const FindData = await campaignModel.findOne({ where: { campaignID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: true,
                message: 'Campagin Data Not Found..',
            })
        }

        const History = await campaignHistoryModel.create({
            campaignID: FindData.campaignID,
            name: FindData.name,
            domain: FindData.domain,
            rotatorslug: FindData.rotatorslug,
            access: FindData.access,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date()
        })

        const update = await campaignModel.update({ IsDeleted: 1 }, { where: { campaignID: id } })

        return res.status(200).send({
            success: true,
            message: 'Campaign Data Deleted Successfully..'
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
    AddCampaign, GetAllData, GetByID, Update, Delete
})