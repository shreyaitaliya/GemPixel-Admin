const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const userModel = require("../models/userModel")(sequelize, DataTypes);
const userhistoryModel = require("../models/userHistoryModel")(sequelize, DataTypes);

const AddUSer = async (req, res) => {
    try {
        const { username, email, password, plan, LastPayment, Expiration, admin, active, profile } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        const user = await userModel.create({ username, email, password, plan, LastPayment, Expiration, admin, active, profile, createdBy, LastModifiedBy });

        return res.status(200).send({
            success: true,
            message: 'User Added Sucessfully..',
            Data: user
        })
             
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// All User
const AllUser = async (req, res) => {
    try {
        const findAllUser = await userModel.findAll({});

        if (!findAllUser) {
            return res.status(400).send({
                success: false,
                message: 'User Not Found..'
            })
        }

        return res.status(200).send({
            success: true,
            message: "User view Successfully..",
            Data: findAllUser
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// Get Admin User
const GetAdminUser = async (req, res) => {
    try {
        const FindAdmin = await userModel.findAll({ where: { admin: 1 } })
        if (!FindAdmin) {
            return res.status(400).send({
                success: false,
                message: 'Admin Not Found..'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Admin User Found Successfully..',
            Data: FindAdmin
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// Get InActive User
const GetInActiveUser = async (req, res) => {
    try {
        const FindInActiveUser = await userModel.findAll({ where: { active: 0 } });
        if (!FindInActiveUser) {
            return res.status(400).send({
                success: false,
                message: 'InActive User Not Found..',
            })
        }

        return res.status(200).send({
            success: true,
            message: 'InActive User Found Successfully..',
            Data: FindInActiveUser
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// Delete User
const Delete = async (req, res) => {
    try {
        const id = req.params.id

        const Finduser = await userModel.findOne({ where: { userID: id, IsDeleted: 0 } })
        if (!Finduser) {
            return res.status(400).send({
                success: false,
                message: 'User Not Found',
            })
        }

        const history_user = await userhistoryModel.create({
            userID: Finduser.userID,
            username: Finduser.username,
            email: Finduser.email,
            password: Finduser.password,
            plan: Finduser.plan,
            LastPayment: Finduser.LastPayment,
            Expiration: Finduser.Expiration,
            admin: Finduser.admin,
            active: Finduser.active,
            profile: Finduser.profile,
            BackupCreatedBy: Finduser.createdBy,
            BackupCreatedOn: new Date(),
        })

        const changedata = await userModel.update({ IsDeleted: 1 }, { where: { userID: id } })

        if (changedata[0] === 0) {
            return res.status(400).send({
                success: false,
                message: 'No User Were Deleted.'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'User Deleted Sucessfully..'
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// Get By ID
const GetByID = async (req, res) => {
    try {
        const id = req.params.id;

        const Finduser = await userModel.findOne({ where: { userID: id, IsDeleted: 0 } })
        if (!Finduser) {
            return res.status(400).send({
                success: false,
                message: 'User Not Found..',
            })
        }

        return res.status(200).send({
            success: true,
            message: 'User Found Successfully..',
            Data: Finduser
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
        const { username, email, plan, LastPayment, Expiration, admin, active, profile } = req.body

        const Finduser = await userModel.findOne({ where: { userID: id, IsDeleted: 0 } })
        if (!Finduser) {
            return res.status(400).send({
                success: false,
                message: 'User Not Found..',
            })
        }

        const history_user = await userhistoryModel.create({
            userID: Finduser.userID,
            username: Finduser.username,
            email: Finduser.email,
            password: Finduser.password,
            plan: Finduser.plan,
            LastPayment: Finduser.LastPayment,
            Expiration: Finduser.Expiration,
            admin: Finduser.admin,
            active: Finduser.active,
            profile: Finduser.profile,
            BackupCreatedBy: Finduser.createdBy,
            BackupCreatedOn: new Date(),
        })

        const updateData = await userModel.update({ username, email, plan, LastPayment, Expiration, admin, active, profile }, { where: { userID: id, IsDeleted: 0 } })

        return res.status(200).send({
            success: true,
            message: 'User Data Updated SUccessfully..',
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
    AddUSer, AllUser, GetAdminUser, GetInActiveUser, Delete, GetByID, Update
})