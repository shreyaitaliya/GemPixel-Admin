const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const taxRateModel = require("../models/taxRateModel")(sequelize, DataTypes);
const taxRatehistoryModel = require("../models/taxRateHistoryModel")(sequelize, DataTypes);

// AddTaxRate
const AddTaxRate = async (req, res) => {
    try {
        const { name, rate, countries, status } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        if (Array.isArray(countries) && countries.length > 10) {
            return res.status(400).json({ error: "Options cannot exceed 10 items." });
        }

        const AddData = await taxRateModel.create({ name, rate, countries, status, createdBy, LastModifiedBy })

        return res.status(200).send({
            success: true,
            message: 'TaxRate Added Successfully..',
            Data: AddData
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message,
        })
    }
}

// GetByAllData
const GetByAllData = async (req, res) => {
    try {
        const FindData = await taxRateModel.findAll({ where: { IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'TaxRate Data Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'TaxRate Data Found Successfully..',
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
        const FindData = await taxRateModel.findOne({ where: { taxrateID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'TaxRate Data Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'TaxRate Data Found Successfully..',
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
        const { name, rate, countries, status } = req.body;

        if (Array.isArray(countries) && countries.length > 10) {
            return res.status(400).json({ error: "Options cannot exceed 10 items." });
        }

        const FindData = await taxRateModel.findOne({ where: { taxrateID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'TaxRate Data Not Found..'
            })
        }

        const History = await taxRatehistoryModel.create({
            taxrateID: FindData.taxrateID,
            name: FindData.name,
            rate: FindData.rate,
            countries: FindData.countries,
            status: FindData.status,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date()
        })

        const update = await taxRateModel.update({ name, rate, countries, status }, { where: { taxrateID: id, IsDeleted: 0 } });

        return res.status(200).send({
            success: true,
            message: 'TaxRate Updated Successfully..',
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
        const FindData = await taxRateModel.findOne({ where: { taxrateID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'TaxRate Data Not Found..'
            })
        }

        const History = await taxRatehistoryModel.create({
            taxrateID: FindData.taxrateID,
            name: FindData.name,
            rate: FindData.rate,
            countries: FindData.countries,
            status: FindData.status,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date()
        })

        const changedata = await taxRateModel.update({ IsDeleted: 1 }, { where: { taxrateID: id } })

        if (changedata[0] === 0) {
            return res.status(400).send({
                success: false,
                message: 'No TaxRate Were Deleted.'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'TaxRate Deleted Successfully.'
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
    AddTaxRate, GetByAllData, GetByID, Update, Delete
})