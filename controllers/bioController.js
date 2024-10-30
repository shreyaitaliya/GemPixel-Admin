const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const bioModel = require("../models/bioModel")(sequelize, DataTypes);
const biohistoryModel = require("../models/biohistoryModel")(sequelize, DataTypes);

const AddBio = async (req, res) => {
    try {
        const { bio, alias } = req.body
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        const AddData = await bioModel.create({ bio, alias, createdBy, LastModifiedBy })

        return res.status(200).send({
            success: true,
            message: 'Bio Added Successfully..',
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
        const FindData = await bioModel.findAll({ where: { IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Bio Not Found..',
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Bio Data Found Successfulyy..',
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
const GetById = async (req, res) => {
    try {
        const id = req.params.id;
        const FindData = await bioModel.findOne({ where: { IsDeleted: 0, bioID: id } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Bio Data Not Found...'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'BioData Found Successfully..',
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
const update = async (req, res) => {
    try {
        const id = req.params.id;
        const { bio, alias } = req.body;

        // Find the existing data to verify it exists
        const FindData = await bioModel.findOne({ where: { bioID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Bio Data Not Found..'
            });
        }

        // Save current data to history
        await biohistoryModel.create({
            bioID: FindData.bioID,
            bio: FindData.bio,
            alias: FindData.alias,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        });

        // Update the bio data
        await bioModel.update({ bio, alias }, { where: { bioID: id, IsDeleted: 0 } });

        // Fetch the updated data
        const updatedData = await bioModel.findOne({ where: { bioID: id, IsDeleted: 0 } });

        return res.status(200).send({
            success: true,
            message: 'Bio Data Updated Successfully..',
            Data: updatedData
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
const Delete = async (req, res) => {
    try {
        const id = req.params.id;
        const FindData = await bioModel.findOne({ where: { bioID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'BioData Not Found..'
            })
        }
        await biohistoryModel.create({
            bioID: FindData.bioID,
            bio: FindData.bio,
            alias: FindData.alias,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        });

        const changedata = await bioModel.update({ IsDeleted: 1 }, { where: { bioID: id } });

        if (changedata[0] === 0) {
            return res.status(400).send({
                success: false,
                message: 'No Bio Were Deleted.'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Bio Deleted Successfully.'
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}


module.exports = ({
    AddBio, GetAllData, GetById, update, Delete
})