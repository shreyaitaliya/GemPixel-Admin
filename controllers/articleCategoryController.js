const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const articleCategoryModel = require("../models/articleCategoryModel")(sequelize, DataTypes);
const articleCategoryhistoryModel = require("../models/articleCategoryHistoryModel")(sequelize, DataTypes);

// Add ArticleCategory
const AddCategory = async (req, res) => {
    try {
        const { title, iconstyle, iconemoji, language, description } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        const AddData = await articleCategoryModel.create({ title, iconstyle, iconemoji, language, description, createdBy, LastModifiedBy })

        return res.status(200).send({
            success: true,
            message: 'ArticlCategory Data Added Successfully..',
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

// GetByAllData
const GetByAllData = async (req, res) => {
    try {
        const FindData = await articleCategoryModel.findAll({ where: { IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: true,
                message: 'Articl Category Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'ArticlCategory Data Found Successfully..',
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
        const FindData = await articleCategoryModel.findOne({ where: { categoryID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'ArticlCategory Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'ArticlCategory Found Successfully..',
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
        const { title, iconstyle, iconemoji, language, description } = req.body;
        const FindData = await articleCategoryModel.findOne({ where: { categoryID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'ArticlCategory Not Found..'
            })
        }
        const history = await articleCategoryhistoryModel.create({
            categoryID: FindData.categoryID,
            title: FindData.title,
            iconstyle: FindData.iconstyle,
            iconemoji: FindData.iconemoji,
            language: FindData.categoryID,
            description: FindData.description,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })
        const Update = await articleCategoryModel.update({ title, iconstyle, iconemoji, language, description }, { where: { categoryID: id, IsDeleted: 0 } })

        return res.status(200).send({
            success: true,
            message: 'ArticlCategory Data Found Successfully..',
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
    const id = req.params.id;
    const FindData = await articleCategoryModel.findOne({ where: { categoryID: id, IsDeleted: 0 } });
    if (!FindData) {
        return res.status(400).send({
            success: false,
            message: 'ArticlCategory Data Not Found...'
        })
    }
    const history = await articleCategoryhistoryModel.create({
        categoryID: FindData.categoryID,
        title: FindData.title,
        iconstyle: FindData.iconstyle,
        iconemoji: FindData.iconemoji,
        language: FindData.categoryID,
        description: FindData.description,
        BackupCreatedBy: FindData.createdBy,
        BackupCreatedOn: new Date(),
    })

    const changedata = await articleCategoryModel.update({ IsDeleted: 1 }, { where: { categoryID: id } })

    if (changedata[0] === 0) {
        return res.status(400).send({
            success: false,
            message: 'No category Were Deleted.'
        });
    }

    return res.status(200).send({
        success: true,
        message: 'ArticlCategory Deleted Successfully.'
    });
}

module.exports = ({
    AddCategory, GetByAllData, GetByID, Update, Delete
})