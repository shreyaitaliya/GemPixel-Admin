const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const articleModel = require("../models/articlModel")(sequelize, DataTypes);
const articlehistoryModel = require("../models/articleHistoryModel")(sequelize, DataTypes);
const articlecategoryModel = require("../models/articleCategoryModel")(sequelize, DataTypes);

// Add Article
const AddArticle = async (req, res) => {
    try {
        const { que, slug, category, ans, pricingpage } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        const FindCategory = await articlecategoryModel.findOne({
            where: { title: category, IsDeleted: 0 }
        });

        if (!FindCategory) {
            return res.status(400).send({
                success: false,
                message: 'Article Category Not Found..'
            });
        }

        const AddData = await articleModel.create({
            que,
            slug,
            category,
            ans,
            pricingpage,
            createdBy,
            LastModifiedBy
        });

        return res.status(200).send({
            success: true,
            message: 'Article Data Added Successfully..',
            Data: AddData
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
};

// GetByAllData
const GetByAllData = async (req, res) => {
    try {
        const FindData = await articleModel.findAll({ where: { IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Article Data Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Article Data Find Successfully..',
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
        const FindData = await articleModel.findOne({ where: { articleID: id, IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Article Data Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Article Data Found Successfully..',
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
        const { que, slug, category, ans, pricingpage } = req.body;
        const FindData = await articleModel.findOne({ where: { articleID: id, IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Article Data Not Found..',
            })
        }
        const FindCategory = await articlecategoryModel.findOne({ where: { title: category } });
        if (!FindCategory) {
            return res.status(400).send({
                success: false,
                message: 'ArticleCategory Not Found..'
            })
        }
        const history = await articlehistoryModel.create({
            articleID: FindData.articleID,
            que: FindData.que,
            slug: FindData.slug,
            category: FindData.category,
            ans: FindData.ans,
            pricingpage: FindData.pricingpage,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })
        const update = await articleModel.update({ que, slug, category, ans, pricingpage }, { where: { articleID: id, IsDeleted: 0 } })
        return res.status(200).send({
            success: true,
            message: 'Article Data Updated Successfully..',
            Data: update
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message,
        })
    }
}

// Delete
const Delete = async (req, res) => {
    try {
        const id = req.params.id;
        const FindData = await articleModel.findOne({ where: { articleID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Article Data Not Found..'
            })
        }
        const history = await articlehistoryModel.create({
            articleID: FindData.articleID,
            que: FindData.que,
            slug: FindData.slug,
            category: FindData.category,
            ans: FindData.ans,
            pricingpage: FindData.pricingpage,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })
        const changedata = await articleModel.update({ IsDeleted: 1 }, { where: { articleID: id } })
        if (changedata[0] === 0) {
            return res.status(400).send({
                success: false,
                message: 'No Article Were Deleted.'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Article Deleted Successfully.'
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
    AddArticle, GetByAllData, GetByID, Update, Delete
};
