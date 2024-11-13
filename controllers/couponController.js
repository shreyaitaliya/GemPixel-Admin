const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const couponModel = require("../models/couponModel")(sequelize, DataTypes);
const planModel = require("../models/planModel")(sequelize, DataTypes);

// AddCoupon
const AddCoupon = async (req, res) => {
    try {
        const { name, description, promocode, discountpercentage, maxuser, plans, validuntil } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        const FindPlans = await planModel.findOne({ where: { name: plans, IsDeleted: 0 } });
        if (!FindPlans) {
            return res.status(400).send({
                success: false,
                message: 'Plan Can Not Found..',
            })
        }

        const AddData = await couponModel.create({ name, description, promocode, discountpercentage, maxuser, plans, validuntil, createdBy, LastModifiedBy })

        return res.status(400).send({
            success: true,
            message: 'Coupon Data Added Successfully..',
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
        const FindAllData = await couponModel.findAll({ where: { IsDeleted: 0 } });
        if (!FindAllData) {
            return res.status(400).send({
                success: false,
                message: 'Data Can Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Data Found Successfully..',
            Data: FindAllData
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

const GetByID = async (req, res) => {
    try {
        const id = req.params.id;
        const FindAllData = await couponModel.findAll({ where: { couponID: id, IsDeleted: 0 } });
        if (!FindAllData) {
            return res.status(400).send({
                success: false,
                message: 'Data Can Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Data Found Successfully..',
            Data: FindAllData
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
    AddCoupon, GetByAllData, GetByID
})