const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const channelModel = require("../models/channelModel")(sequelize, DataTypes);
const channelHistoryModel = require("../models/channelHistoryModel")(sequelize, DataTypes);

// Add Channel
const AddChannel = async (req, res) => {
    try {
        const { name, description, color, starchannel } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        const AddChannel = await channelModel.create({ name, description, color, starchannel, createdBy, LastModifiedBy })

        return res.status(200).send({
            success: false,
            message: 'Channel Added Successfully..',
            Data: AddChannel
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// View Channel
const GetAllData = async (req, res) => {
    try {
        const FindData = await channelModel.findAll({ where: { IsDeleted: 0 } })

        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Channel Data Not Found..'
            })
        }

        return res.status(200).send({
            success: false,
            message: 'Channel Data Found Successfully..',
            Data: FindData
        })

    } catch (error) {

    }
}

// GetByID
const GetByID = async (req, res) => {
    try {
        const id = req.params.id;

        const FindData = await channelModel.findOne({ where: { channelID: id, IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Channel  Not Found...',
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Channel Found Successfully..',
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

// Delete
const Delete = async (req, res) => {
    try {
        const id = req.params.id;

        const FindData = await channelModel.findOne({ where: { channelID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Channel Not Found..'
            })
        }

        const historydata = await channelHistoryModel.create({
            channelID: FindData.channelID,
            name: FindData.name,
            description: FindData.description,
            color: FindData.color,
            starchannel: FindData.starchannel,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const changedata = await channelModel.update({ IsDeleted: 1 }, { where: { channelID: id } })

        if (changedata[0] === 0) {
            return res.status(400).send({
                success: false,
                message: 'No User Were Deleted.'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Channel Deleted Successfully..',
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
        const { name, description, color, starchannel } = req.body

        const FindData = await channelModel.findOne({ where: { channelID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Channel Not Found...',
            })
        }

        const history = await channelHistoryModel.create({
            channelID: FindData.channelID,
            name: FindData.name,
            description: FindData.description,
            color: FindData.color,
            starchannel: FindData.starchannel,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const updateData = await channelModel.update({ name, description, color, starchannel }, { where: { channelID: id, IsDeleted: 0 } })

        return res.status(200).send({
            success: true,
            message: 'Channel Updated Successfully..',
            Data: updateData
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
    AddChannel, GetAllData, GetByID, Delete, Update
})