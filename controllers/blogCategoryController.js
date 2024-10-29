const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const blogcategoryModel = require("../models/blogCategoryModel")(sequelize, DataTypes);
const blogcategoryhistoryModel = require("../models/blogCategoryHistoryModel")(sequelize, DataTypes);

// Add BlogCategoryModel
const AddBlogCategory = async (req, res) => {
    try {
        const { title, slug, icon, description, active } = req.body
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        const AddCategory = await blogcategoryModel.create({ title, slug, icon, description, active, createdBy, LastModifiedBy })

        return res.status(200).send({
            success: true,
            message: 'BlogCategory Addded Successfully..',
            Data: AddCategory
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// Get All Data
const GetAllData = async (req, res) => {
    try {
        const FindData = await blogcategoryModel.findAll({ where: { IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Blog Category Not Found..'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Blog category Found Successfully..',
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

// Delete
const DeleteData = async (req, res) => {
    try {
        const id = req.params.id;

        const FindData = await blogcategoryModel.findOne({ where: { blogcategoryID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Blog Category Not Found..'
            })
        }

        const historyData = await blogcategoryhistoryModel.create({
            blogcategoryID: FindData.blogcategoryID,
            title: FindData.title,
            slug: FindData.slug,
            icon: FindData.icon,
            description: FindData.description,
            active: FindData.active,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const changedata = await blogcategoryModel.update({ IsDeleted: 1 }, { where: { blogcategoryID: id } })

        if (changedata[0] === 0) {
            return res.status(400).send({
                success: false,
                message: 'No User Were Deleted.'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'BlogCategory Deleted Successfully..',
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

//GetByID 
const GetByID = async (req, res) => {
    try {
        const id = req.params.id;

        const findData = await blogcategoryModel.findOne({ where: { blogcategoryID: id, IsDeleted: 0 } })

        if (!findData) {
            return res.status(400).send({
                success: false,
                message: 'BlogCategory Data Not Found..',
            })
        }

        return res.status(200).send({
            success: true,
            message: 'BlogCategory Found Successfully..',
            Data: findData
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
        const { title, slug, icon, description, active } = req.body

        const findUser = await blogcategoryModel.findOne({ where: { blogcategoryID: id, IsDeleted: 0 } })

        if (!findUser) {
            return res.status(200).send({
                success: false,
                message: 'Blog Categorynot Found..'
            })
        }

        const historyData = await blogcategoryhistoryModel.create({
            blogcategoryID: findUser.blogcategoryID,
            title: findUser.title,
            slug: findUser.slug,
            icon: findUser.icon,
            description: findUser.description,
            active: findUser.active,
            BackupCreatedBy: findUser.createdBy,
            BackupCreatedOn: new Date(),
        })

        const updateData = await blogcategoryModel.update({ title, slug, icon, description, active }, { where: { blogcategoryID: id, IsDeleted: 0 } })

        return res.status(200).send({
            success: true,
            message: 'BlogCategory Updated SUccessfully..',
            Data: updateData
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
    AddBlogCategory, GetAllData, DeleteData, GetByID, Update
})