const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const adverticementModel = require("../models/AdverticementModel")(sequelize, DataTypes);
const adverticementhistoryModel = require("../models/adverticementHistoryModel")(sequelize, DataTypes);
const adverticementTypeModel = require("../models/AdverticementTypeModel");

// Type Data Get
const TypeDataGet = async (req, res) => {
    try {
        const FindData = await adverticementTypeModel.findAll({});
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Type Data Not Found..'
            });
        }
        return res.status(200).send({
            success: true,
            message: 'Data Find Successfully..',
            Data: FindData
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
};

// Add Adverticement 
const AddData = async (req, res) => {
    try {
        const { name, typeID, code } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        const FindType = await adverticementTypeModel.findOne({ where: { typeID: typeID } });
        if (!FindType) {
            return res.status(400).send({
                success: false,
                message: 'Type Data Not Found..'
            })
        }

        const addData = await adverticementModel.create({ name, typeID, code, createdBy, LastModifiedBy })

        return res.status(200).send({
            success: true,
            message: 'Adverticement Data Added Successfully..',
            Data: addData
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
const GetByAllData = async (req, res) => {
    try {
        const FindData = await adverticementModel.findAll({ where: { IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Adverticement Data Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Adverticement Data Found Successfully..',
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
        const FindData = await adverticementModel.findOne({ where: { advertisementID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Adverticement Data Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Adverticement Data Found Successfully..',
            Data: FindData
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: true,
            message: error.message
        })
    }
}

// update
const Update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, typeID, code } = req.body;

        const FindData = await adverticementModel.findOne({ where: { advertisementID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Adverticement Data Not Found..'
            })
        }

        const FindType = await adverticementTypeModel.findOne({ where: { typeID: typeID } });
        if (!FindType) {
            return res.status(400).send({
                success: false,
                message: 'Type Data Not Found..'
            })
        }

        const history = await adverticementhistoryModel.create({
            advertisementID: FindData.advertisementID,
            name: FindData.name,
            typeID: FindData.typeID,
            code: FindData.code,
            active: FindData.active,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const update = await adverticementModel.update({ name, typeID, code }, { where: { advertisementID: id, IsDeleted: 0 } })

        return res.status(200).send({
            success: true,
            message: 'Adverticemenet Data Updated Successfully..',
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
        const FindData = await adverticementModel.findOne({ where: { advertisementID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Adverticement Data Not Found..'
            })
        }

        const history = await adverticementhistoryModel.create({
            advertisementID: FindData.advertisementID,
            name: FindData.name,
            typeID: FindData.typeID,
            code: FindData.code,
            active: FindData.active,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const changedata = await adverticementModel.update({ IsDeleted: 1 }, { where: { advertisementID: id } });
        if (changedata[0] === 0) {
            return res.status(400).send({
                success: false,
                message: 'No Adverticement Were Deleted.'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Adverticement Deleted Successfully.'
        });


    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    TypeDataGet, AddData, GetByAllData, GetById, Update, Delete
};
