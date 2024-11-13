const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const notificationModel = require("../models/notificationModel")(sequelize, DataTypes);
const userModel = require("../models/userModel")(sequelize, DataTypes);
const planModel = require("../models/planModel")(sequelize, DataTypes);
const notificationhistoryModel = require("../models/notificationhistoryModel")(sequelize, DataTypes);

// AddNotification
const AddNotification = async (req, res) => {
    try {
        const { users, plan, notificationtitle, content, expiredat } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        if (Array.isArray(users) && users.length > 10) {
            return res.status(400).json({ error: "Users cannot exceed 10 items." });
        } if (Array.isArray(plan) && plan.length > 10) {
            return res.status(400).json({ error: "Plan cannot exceed 10 items." });
        }

        const FindUser = await userModel.findOne({ where: { email: users } })
        if (!FindUser) {
            return res.status(400).send({
                success: false,
                message: 'User Can Not Found..'
            })
        }
        const Findplan = await planModel.findOne({ where: { name: plan } })
        if (!FindUser) {
            return res.status(400).send({
                success: false,
                message: 'Plan Can Not Found..'
            })
        }

        const AddData = await notificationModel.create({ users, plan, notificationtitle, content, expiredat, createdBy, LastModifiedBy });

        return res.status(200).send({
            success: true,
            message: 'Notification Data Added Successfully..',
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
        const FindData = await notificationModel.findOne({ where: { IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Notification Data Can Not Found...'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Notification Found Sccessfully...',
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
        const FindData = await notificationModel.findOne({ where: { notificationID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Notification Data Can Not Found...'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Notification Found Sccessfully...',
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
        const { users, plan, notificationtitle, content, expiredat } = req.body;
        const FindData = await notificationModel.findOne({ where: { notificationID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Notification Data Can Not Found...'
            })
        }
        if (Array.isArray(users) && users.length > 10) {
            return res.status(400).json({ error: "Users cannot exceed 10 items." });
        } if (Array.isArray(plan) && plan.length > 10) {
            return res.status(400).json({ error: "Plan cannot exceed 10 items." });
        }

        const FindUser = await userModel.findOne({ where: { email: users } })
        if (!FindUser) {
            return res.status(400).send({
                success: false,
                message: 'User Can Not Found..'
            })
        }
        const Findplan = await planModel.findOne({ where: { name: plan } })
        if (!FindUser) {
            return res.status(400).send({
                success: false,
                message: 'Plan Can Not Found..'
            })
        }

        const History = await notificationhistoryModel.create({
            notificationID: FindData.notificationID,
            users: FindData.users,
            plan: FindData.plan,
            notificationtitle: FindData.notificationtitle,
            content: FindData.content,
            expiredat: FindData.expiredat,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const Update = await notificationModel.update({ users, plan, notificationtitle, content, expiredat }, { where: { notificationID: id, IsDeleted: 0 } })

        return res.status(200).send({
            success: true,
            message: 'Notification Found Successfully..',
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
        const FindData = await notificationModel.findOne({ where: { notificationID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Notification Data Can Not Found...'
            })
        }
        const History = await notificationhistoryModel.create({
            notificationID: FindData.notificationID,
            users: FindData.users,
            plan: FindData.plan,
            notificationtitle: FindData.notificationtitle,
            content: FindData.content,
            expiredat: FindData.expiredat,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const changedata = await notificationModel.update({ IsDeleted: 1 }, { where: { notificationID: id } })

        if (changedata[0] === 0) {
            return res.status(400).send({
                success: false,
                message: 'No Notification Were Deleted.'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Notification Deleted Successfully.'
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
    AddNotification, GetByAllData, GetByID, Update, Delete
})