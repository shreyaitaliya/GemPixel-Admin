const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const customsplashModel = require("../models/customsplashModel")(sequelize, DataTypes);
const customsplashHistoryModel = require("../models/customsplashHistoryModel")(sequelize, DataTypes);

// Add CustomSplash 
const AddCustomsplash = async (req, res) => {
    try {
        const { name, counter, customtitle, message } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        // Access the uploaded files
        const bannerimagePath = req.files['bannerimage'] ? req.files['bannerimage'][0].path : null;
        const avtarimagePath = req.files['avtarimage'] ? req.files['avtarimage'][0].path : null;

        // Validate that images are provided
        if (!bannerimagePath || !avtarimagePath) {
            return res.status(400).json({
                success: false,
                message: 'Both banner image and avatar image are required.'
            });
        }

        // Insert data into the database
        const newProduct = await customsplashModel.create({
            name,
            counter,
            customtitle,
            message,
            bannerimage: bannerimagePath,
            avtarimage: avtarimagePath,
            createdBy,
            LastModifiedBy
        });

        res.status(201).json({
            message: 'Product added successfully!',
            product: newProduct
        });
    } catch (error) {
        console.error(error);
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
};

// GetAllData
const GetAllData = async (req, res) => {
    try {
        const FindData = await customsplashModel.findAll({ where: { IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CustomSplash Data Not Found...'
            })
        }

        return res.status(200).send({
            success: true,
            nesssage: 'Customsplash Found Successfully..',
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
        const FindData = await customsplashModel.findOne({ where: { customsplashID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CustomSplash Data Not Found..'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'CustomSplash Data Found Successfully..',
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
        const { name, counter, customtitle, message } = req.body;

        const FindData = await customsplashModel.findOne({ where: { customsplashID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Customsplash Data Not Found..',
            });
        }

        // Create a history record before updating
        await customsplashHistoryModel.create({
            customsplashID: FindData.customsplashID,
            name: FindData.name,
            counter: FindData.counter,
            customtitle: FindData.customtitle,
            bannerimage: FindData.bannerimage,
            avtarimage: FindData.avtarimage,
            message: FindData.message,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        });

        // Initialize updatedData object
        const updatedData = {};

        // Update fields based on request
        if (name) updatedData.name = name;
        if (counter) updatedData.counter = counter;
        if (customtitle) updatedData.customtitle = customtitle;
        if (message) updatedData.message = message;

        // Handle image uploads, if provided
        if (req.files) {
            updatedData.bannerimage = req.files['bannerimage'] ? req.files['bannerimage'][0].path : FindData.bannerimage;
            updatedData.avtarimage = req.files['avtarimage'] ? req.files['avtarimage'][0].path : FindData.avtarimage;
        }

        // Add LastModifiedBy if it's provided in the request
        if (req.body.updatedBy) {
            updatedData.LastModifiedBy = req.body.updatedBy;
        }

        // Update the record in the database
        await customsplashModel.update(updatedData, { where: { customsplashID: id, IsDeleted: 0 } });

        // Send response with updated product details
        res.status(200).json({
            message: 'Product updated successfully!',
            product: { ...FindData.dataValues, ...updatedData }
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
}

// Delete
const Delete = async (req, res) => {
    try {
        const id = req.params.id;
        const FindData = await customsplashModel.findOne({ where: { customsplashID: id, IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CustomSplash Not Found..'
            })
        }

        const history = await customsplashHistoryModel.create({
            customsplashID: FindData.customsplashID,
            name: FindData.name,
            counter: FindData.counter,
            customtitle: FindData.customtitle,
            bannerimage: FindData.bannerimage,
            avtarimage: FindData.avtarimage,
            message: FindData.message,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const changedata = await customsplashModel.update({ IsDeleted: 1 }, { where: { customsplashID: id } })

        if (changedata[0] === 0) {
            return res.status(400).send({
                success: false,
                message: 'No User Were Deleted.'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'CustomSplash Deleted Successfully...'
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    AddCustomsplash, GetAllData, GetById, Update, Delete
};         