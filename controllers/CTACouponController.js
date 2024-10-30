const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const CtacouponModel = require("../models/CTACouponModel")(sequelize, DataTypes);
const ctacouponHistoryModel = require("../models/CTACouponHistoryModel")(sequelize, DataTypes);

const AddCoupon = async (req, res) => {
    try {
        const { name, couponcode, message, btntext, bgcolor, bgtext, btnbgcolor, btntextcolor } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username

        const AddData = await CtacouponModel.create({ name, couponcode, message, btntext, bgcolor, bgtext, btnbgcolor, btntextcolor, createdBy, LastModifiedBy })

        return res.status(200).send({
            success: true,
            message: 'CTACoupon Data Added Successfully..',
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
        const FindData = await CtacouponModel.findAll({ where: { IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTACoupon Data Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'CTACoupon Data Found Sucessfully..',
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
        const FindData = await CtacouponModel.findOne({ where: { IsDeleted: 0, couponID: id } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTACoupon Data Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'CTACoupon Data Found Successfully..',
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
        const { name, couponcode, message, btntext, bgcolor, bgtext, btnbgcolor, btntextcolor } = req.body;
        const FindData = await CtacouponModel.findOne({ where: { IsDeleted: 0, couponID: id } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTACoupon Not Found..'
            })
        }

        const History = await ctacouponHistoryModel.create({
            couponID: FindData.couponID,
            name: FindData.name,
            couponcode: FindData.couponcode,
            message: FindData.message,
            btntext: FindData.btntext,
            bgcolor: FindData.bgcolor,
            bgtext: FindData.bgtext,
            btnbgcolor: FindData.btnbgcolor,
            btntextcolor: FindData.btntextcolor,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),

        })

        const Update = await CtacouponModel.update({ name, couponcode, message, btntext, bgcolor, bgtext, btnbgcolor, btntextcolor }, { where: { couponID: id, IsDeleted: 0 } })

        return res.status(200).send({
            success: true,
            message: 'CTACoupon Data Upadted Successfully..',
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
        const FindData = await CtacouponModel.findOne({ where: { couponID: id, IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTACoupon Not Found..'
            })
        }
        const History = await ctacouponHistoryModel.create({
            couponID: FindData.couponID,
            name: FindData.name,
            couponcode: FindData.couponcode,
            message: FindData.message,
            btntext: FindData.btntext,
            bgcolor: FindData.bgcolor,
            bgtext: FindData.bgtext,
            btnbgcolor: FindData.btnbgcolor,
            btntextcolor: FindData.btntextcolor,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),

        })

        const changedstatus = await CtacouponModel.update(
            { IsDeleted: 1 },
            { where: { couponID: id } }
        )

        if (changedstatus[0] === 0) {
            return res.status(500).send({
                success: false,
                message: "Coupon Not Deleted."
            })
        }

        return res.status(200).send({
            success: true,
            message: 'CTACoupon Delete Successfully..',
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = ({ AddCoupon, GetAllData, GetByID, Update, Delete })