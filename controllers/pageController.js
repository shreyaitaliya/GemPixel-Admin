const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const pageModel = require("../models/pageModel")(sequelize, DataTypes);
const pageHistoryModel = require("../models/pageHistoryModel")(sequelize, DataTypes);

// Add Page
const AddPage = async (req, res) => {
    try {
        const { name, slug, category, language, content, metatitle, metadescription } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        const AddData = await pageModel.create({ name, slug, category, language, content, metatitle, metadescription, createdBy, LastModifiedBy })

        return res.status(200).send({
            success: true,
            message: 'Page Data Added Successfullyy..',
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
        const FindData = await pageModel.findAll({ where: { IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Page Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Page Found Successfully..',
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
const GetByID = async (req, res) => {
    try {
        const id = req.params.id;
        const FindPage = await pageModel.findOne({ where: { pageID: id, IsDeleted: 0 } });
        if (!FindPage) {
            return res.status(400).send({
                success: false,
                message: 'Page Data Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Page Data Found Successfully..',
            Data: FindPage
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
        const { name, slug, category, language, content, metatitle, metadescription } = req.body;
        const FindData = await pageModel.findOne({ where: { pageID: id, IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Page Not Found..'
            })
        }

        const History = await pageHistoryModel.create({
            pageID: FindData.pageID,
            name: FindData.name,
            slug: FindData.slug,
            category: FindData.category,
            language: FindData.language,
            content: FindData.content,
            metatitle: FindData.metatitle,
            metadescription: FindData.metadescription,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const Update = await pageModel.update({ name, slug, category, language, content, metatitle, metadescription }, { where: { pageID: id, IsDeleted: 0 } })

        return res.status(200).send({
            success: true,
            message: 'Page Data Updated Successfully..',
            Data: Update
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
        const FindData = await pageModel.findOne({ where: { pageID: id, IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Page Data Not Found..'
            })
        }
        const History = await pageHistoryModel.create({
            pageID: FindData.pageID,
            name: FindData.name,
            slug: FindData.slug,
            category: FindData.category,
            language: FindData.language,
            content: FindData.content,
            metatitle: FindData.metatitle,
            metadescription: FindData.metadescription,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const changedata = await pageModel.update({ IsDeleted: 1 }, { where: { pageID: id } })

        if (changedata[0] === 0) {
            return res.status(400).send({
                success: false,
                message: 'No Bio Were Deleted.'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Page Deleted Successfully..'
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
    AddPage, GetAllData, GetByID, Update, Delete
})