const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const domainModel = require("../models/domainModel")(sequelize, DataTypes);
const domainhistoryModel = require("../models/domainHistoryModel")(sequelize, DataTypes);
const bioModel = require("../models/bioModel")(sequelize, DataTypes);

// Add Domain
const AddDomain = async (req, res) => {
    try {
        const { domain, domainroot, biopage, domainpage } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        const FindBioData = await bioModel.findOne({ where: { IsDeleted: 0, bio: biopage } })
        if (!FindBioData) {
            return res.status(400).send({
                success: false,
                message: 'Can Not Find Bio Data...'
            })
        }

        const DataAdd = await domainModel.create({ domain, domainroot, biopage, domainpage, createdBy, LastModifiedBy })

        return res.status(200).send({
            success: true,
            message: 'Domain Added Successfully..',
            Data: DataAdd
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
        const FindData = await domainModel.findAll({ where: { IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Can Not Find Domain'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Domain Found Successfully..',
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
        const FindData = await domainModel.findOne({ where: { domainID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Domain Data Not Found..'
            })
        }
        return res.status(400).send({
            success: true,
            message: 'Domain Find Successfully..',
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
        const { domain, domainroot, biopage, domainpage } = req.body;
        const FindData = await domainModel.findOne({ where: { domainID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Domain Not Found..'
            })
        }

        const FindBioData = await bioModel.findOne({ where: { IsDeleted: 0, bio: biopage } })
        if (!FindBioData) {
            return res.status(400).send({
                success: false,
                message: 'Can Not Find Bio Data...'
            })
        }

        const history = await domainhistoryModel.create({
            domainID: FindData.domainID,
            domain: FindData.domain,
            domainroot: FindData.domainroot,
            biopage: FindData.biopage,
            domainpage: FindData.domainpage,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const update = await domainModel.update({ domain, domainroot, biopage, domainpage }, { where: { domainID: id, IsDeleted: 0 } })

        return res.status(200).send({
            success: true,
            message: 'Domain Updated successfully..',
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
        const FindData = await domainModel.findOne({ where: { domainID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: error.message
            })
        }

        const history = await domainhistoryModel.create({
            domainID: FindData.domainID,
            domain: FindData.domain,
            domainroot: FindData.domainroot,
            biopage: FindData.biopage,
            domainpage: FindData.domainpage,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const changedata = await domainModel.update({ IsDeleted: 1 }, { where: { domainID: id } })

        if (changedata[0] === 0) {
            return res.status(400).send({
                success: false,
                message: 'No Bio Were Deleted.'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Domain Deleted Successfully..'
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
    AddDomain, GetAllData, GetByID, Update, Delete
})