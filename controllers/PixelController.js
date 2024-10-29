const { DataTypes, where } = require('sequelize');
const db = require('../config/db');
const sequelize = db.sequelize;
const pixelPoviderModel = require('../models/pixelProviderModel')(sequelize, DataTypes);
const pixelModel = require('../models/pixelModel')(sequelize, DataTypes);
const pixelHistoryModel = require('../models/pixelHistoryModel')(sequelize, DataTypes);
const path = require('path');
const fs = require('fs');

async function fetchDataAndInsertIntoDB() {
    try {
        const filePath = path.join(__dirname, '../JsonFiles/pixelProvider.json');
        const jsonData = fs.readFileSync(filePath);
        const pixelproviderData = JSON.parse(jsonData);

        const subscriptionModel = await pixelPoviderModel.findOne({});
        if (!subscriptionModel) {
            const insertDataPromises = pixelproviderData.map(async (data) => {
                try {
                    return await pixelPoviderModel.create(data);
                } catch (error) {
                    console.error('Error Inserting Data : ', error.message);
                    throw error;
                }
            })

            const insertData = await Promise.all(insertData);
            if (!insertData.some(data => !!data)) {
                return {
                    ErrorCode: "REQUEST",
                    ErrorMessage: 'Attribute Not Inserted In Table'
                }
            }

        }
    } catch (error) {
        console.error('Error Processing Data:', error.message)
    }
}

fetchDataAndInsertIntoDB();

// Add Pixel
const AddPixel = async (req, res) => {
    try {
        const { pixelprovider, name, pixeltag } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        const FindProvider = await pixelPoviderModel.findOne({ where: { name: pixelprovider } })
        if (!FindProvider) {
            return res.status(400).send({
                success: false,
                message: 'Pixel Provider Not Valid...'
            })
        }

        const AddData = await pixelModel.create({ pixelprovider, name, pixeltag, createdBy, LastModifiedBy })

        return res.status(200).send({
            success: false,
            message: 'Pixel Data Added Successfully..',
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

// GetAllData
const GetAllData = async (req, res) => {
    try {
        const FindData = await pixelModel.findAll({ where: { IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Pixel Data Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Pixel Data Found Successfully..',
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
        const FindData = await pixelModel.findOne({ where: { pixelID: id, IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Pixel Data Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Pixel Data Found Successfully..',
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
        const { pixelprovider, name, pixeltag } = req.body
        const FindData = await pixelModel.findOne({ where: { pixelID: id, IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Pixel Data Not Found..'
            })
        }

        const FindProvider = await pixelPoviderModel.findOne({ where: { name: pixelprovider } })
        if (!FindProvider) {
            return res.status(400).send({
                success: false,
                message: 'Pixel Provider Not Valid...'
            })
        }

        const History = await pixelHistoryModel.create({
            pixelID: FindData.pixelID,
            pixelprovider: FindData.pixelprovider,
            name: FindData.name,
            pixeltag: FindData.pixeltag,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const update = await pixelModel.update({ pixelprovider, name, pixeltag }, { where: { pixelID: id, IsDeleted: 0 } })

        return res.status(200).send({
            success: true,
            message: 'Pixel Data Updated Successfully..',
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
        const FindData = await pixelModel.findOne({ where: { pixelID: id } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Pixel Data Not Found..'
            })
        }

        const History = await pixelHistoryModel.create({
            pixelID: FindData.pixelID,
            pixelprovider: FindData.pixelprovider,
            name: FindData.name,
            pixeltag: FindData.pixeltag,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const changeData = await pixelModel.update({ IsDeleted: 1 }, { where: { pixelID: id } })

        if (changeData[0] === 0) {
            return res.status(400).send({
                success: false,
                message: 'No Pixel Were Deleted..',
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Pixel Deleted Successfully..'
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
    AddPixel, GetAllData, GetByID, Update, Delete
})