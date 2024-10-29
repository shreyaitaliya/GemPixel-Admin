const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const ctaimageModel = require("../models/CTAImageModel")(sequelize, DataTypes);
const ctaimagehistoryModel = require("../models/CTAImageHistoryModel")(sequelize, DataTypes);

const AddCTAImage = async (req, res) => {
    try {
        const { name, link, bgcolor } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        // Access the uploaded files
        const logoPath = req.files['logo'] ? req.files['logo'][0].path : null;
        const bgimagePath = req.files['bgimage'] ? req.files['bgimage'][0].path : null;

        // Validate that images are provided
        if (!logoPath || !bgimagePath) {
            return res.status(400).json({
                success: false,
                message: 'Both logo image and background image are required.'
            });
        }

        // Insert data into the database
        const NewImage = await ctaimageModel.create({
            name,
            link,
            logo: logoPath,
            bgimage: bgimagePath,
            bgcolor,
            createdBy,
            LastModifiedBy
        });

        res.status(201).json({
            success: true,
            message: 'CTAImage added successfully!',
            Data: NewImage
        });
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
        const FindData = await ctaimageModel.findAll({ IsDeleted: 0 })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTAImage Not Found..',
            })
        }
        return res.status(200).send({
            success: true,
            message: 'CTAImage Data Found Successfullyy..',
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
        const FindData = await ctaimageModel.findOne({ where: { ctaimageID: id, IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTAImage Not Found'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'CTAImage Found Successfully..',
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
        const { name, link, bgcolor, updatedBy } = req.body;

        const FindData = await ctaimageModel.findOne({ where: { ctaimageID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTAImage Not Found'
            });
        }

        // Create a history record before updating
        await ctaimagehistoryModel.create({
            ctaimageID: FindData.ctaimageID,
            name: FindData.name,
            link: FindData.link,
            logo: FindData.logo,
            bgimage: FindData.bgimage,
            bgcolor: FindData.bgcolor,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        });

        // Initialize updatedData object
        const updatedData = {};

        // Update fields based on request
        if (name) updatedData.name = name;
        if (link) updatedData.link = link;
        if (bgcolor) updatedData.bgcolor = bgcolor;

        // Handle image uploads, if provided
        if (req.files) {
            updatedData.logo = req.files['logo'] ? req.files['logo'][0].path : FindData.logo;
            updatedData.bgimage = req.files['bgimage'] ? req.files['bgimage'][0].path : FindData.bgimage;
        }

        // Add LastModifiedBy if it's provided in the request
        if (updatedBy) {
            updatedData.LastModifiedBy = updatedBy;
        }

        // Update the record in the database
        await ctaimageModel.update(updatedData, { where: { ctaimageID: id, IsDeleted: 0 } });

        // Refetch updated data
        const updatedRecord = await ctaimageModel.findOne({ where: { ctaimageID: id, IsDeleted: 0 } });

        // Send response with updated record details
        res.status(200).json({
            success: true,
            message: 'CTAImage updated successfully!',
            Data: updatedRecord
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
};

// Delete
const Delte = async (req, res) => {
    try {
        const id = req.params.id;
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}


module.exports = ({ AddCTAImage, GetAllData, GetByID, Update })