const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const voucherModel = require("../models/voucherModel")(sequelize, DataTypes);
const voucherhistoryModel = require("../models/voucherHistorymodel")(sequelize, DataTypes);
const planModel = require("../models/planModel")(sequelize, DataTypes);

// Add Voucher
const AddVoucher = async (req, res) => {
    try {
        const { name, description, vouchercode, plan, amount, periods, maxuser, validuntil } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        const FindPlan = await planModel.findOne({ where: { name: plan, IsDeleted: 0 } });
        if (!FindPlan) {
            return res.status(400).send({
                success: false,
                message: 'Plan Data Can Not Found..'
            })
        }

        const AddData = await voucherModel.create({ name, description, vouchercode, plan, amount, periods, maxuser, validuntil, createdBy, LastModifiedBy })

        return res.status(200).send({
            success: true,
            message: 'Voucher Added Successfully..',
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
        const FindData = await voucherModel.findAll({ where: { IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Voucher Data Can not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Voucher Data Found Successfully...',
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
        const FindData = await voucherModel.findOne({ where: { voucherID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Voucher Data Can not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Voucher Data Found Successfully...',
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
        const { name, description, vouchercode, plan, amount, periods, maxuser, validuntil } = req.body;
        const FindData = await voucherModel.findOne({ where: { voucherID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Voucher Data Can not Found..'
            })
        }
        const FindPlan = await planModel.findOne({ where: { name: plan, IsDeleted: 0 } });
        if (!FindPlan) {
            return res.status(400).send({
                success: false,
                message: 'Plan Data Can Not Found..'
            })
        }

        const history = await voucherhistoryModel.create({
            voucherID: FindData.voucherID,
            name: FindData.name,
            description: FindData.description,
            vouchercode: FindData.vouchercode,
            plan: FindData.plan,
            amount: FindData.amount,
            periods: FindData.periods,
            maxuser: FindData.maxuser,
            validuntil: FindData.validuntil,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date()
        })

        const update = await voucherModel.update({ name, description, vouchercode, plan, amount, periods, maxuser, validuntil }, { where: { voucherID: id, IsDeleted: 0 } })

        return res.status(200).send({
            success: true,
            message: 'Voucher Updated Successfully...',
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
        const FindData = await voucherModel.findOne({ where: { voucherID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Voucher Data Can not Found..'
            })
        }
        const history = await voucherhistoryModel.create({
            voucherID: FindData.voucherID,
            name: FindData.name,
            description: FindData.description,
            vouchercode: FindData.vouchercode,
            plan: FindData.plan,
            amount: FindData.amount,
            periods: FindData.periods,
            maxuser: FindData.maxuser,
            validuntil: FindData.validuntil,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date()
        })
        const changedata = await voucherModel.update({ IsDeleted: 1 }, { where: { voucherID: id } })
        if (changedata[0] === 0) {
            return res.status(400).send({
                success: false,
                message: 'No Voucher Were Deleted.'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Voucher Deleted Successfully.'
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
    AddVoucher, GetByAllData, GetByID, Update, Delete
})   