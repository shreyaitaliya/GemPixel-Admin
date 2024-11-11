const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const planoptionModel = require("../models/planoptionModel");
const planModel = require("../models/planModel")(sequelize, DataTypes);
const planhistoryModel = require("../models/planHistoryModel")(sequelize, DataTypes);

// GetAllData PlanOption
const GetAllOption = async (req, res) => {
    try {
        const GetData = await planoptionModel.findAll({})
        if (!GetData) {
            return res.status(400).send({
                success: false,
                message: 'PlanOption data Not Found...'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'Planoption Data Found Successfully..',
            Data: GetData
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// AddPlan
const AddPlan = async (req, res) => {
    try {
        const { name, description, planicon, status, hidden, isPaidPlan, trialDays, priceMonthly, priceYearly, priceLifetime, linkcount, numberoflink, numberofclick, statsdays, customtext, options } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        if (Array.isArray(options) && options.length > 10) {
            return res.status(400).json({ error: "Options cannot exceed 10 items." });
        }

        const FindOptions = await planoptionModel.findOne({ where: { optionID: options } });
        if (!FindOptions) {
            return res.status(400).send({
                success: false,
                message: 'PlanOptions Data Not Found..'
            })
        }

        if (isPaidPlan === 1) {
            if (!priceLifetime || !priceYearly || !priceMonthly || !trialDays) {
                return res.status(400).json({ error: "All pricing fields (priceLifetime, priceYearly, priceMonthly) and trialDays are required when the plan is paid." });
            }
        } else if (isPaidPlan === 0) {
            if (priceLifetime || priceYearly || priceMonthly || trialDays) {
                return res.status(400).json({ error: "Pricing fields should not be provided for free plans." });
            }
        }

        const AddData = await planModel.create({ name, description, planicon, status, hidden, isPaidPlan, trialDays, priceMonthly, priceYearly, priceLifetime, linkcount, numberoflink, numberofclick, statsdays, customtext, options, createdBy, LastModifiedBy })

        return res.status(200).send({
            success: true,
            message: 'Plan Added Successfullyy..',
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

// GetAllPlan
const GetAllPlan = async (req, res) => {
    try {
        const GetData = await planModel.findAll({ where: { IsDeleted: 0 } });
        if (!GetData || GetData.length === 0) {
            return res.status(400).send({
                success: false,
                message: 'Plan Can Not be Found.'
            });
        }

        const plansWithOptions = await Promise.all(
            GetData.map(async (plan) => {
                const optionIDs = JSON.parse(plan.options);

                const planOptions = await planoptionModel.findAll({
                    where: { optionID: optionIDs }
                });

                const optionTypes = planOptions.map(option => option.type);

                plan.dataValues.optionTypes = optionTypes;

                return plan;
            })
        );

        return res.status(200).send({
            success: true,
            message: 'Plan Data Viewed Successfully..',
            plansWithOptions
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
};

// GetByID
const GetByID = async (req, res) => {
    try {
        const id = req.params.id;
        const FindData = await planModel.findOne({ where: { planID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Plan Data Not found..'
            })
        }
        return res.status(200).send({
            success: false,
            message: 'Plan Data Viewed Successfully...',
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
        const { name, description, planicon, status, hidden, isPaidPlan, trialDays, priceMonthly, priceYearly, priceLifetime, linkcount, numberoflink, numberofclick, statsdays, customtext, options } = req.body;

        const FindData = await planModel.findOne({ where: { planID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Plan Data Not found..'
            });
        }

        if (Array.isArray(options) && options.length > 10) {
            return res.status(400).json({ error: "Options cannot exceed 10 items." });
        }

        const FindOptions = await planoptionModel.findOne({ where: { optionID: options } });
        if (!FindOptions) {
            return res.status(400).send({
                success: false,
                message: 'PlanOptions Data Not Found..'
            });
        }

        if (parseInt(isPaidPlan) === 1) {
            if (!priceLifetime || !priceYearly || !priceMonthly || !trialDays) {
                return res.status(400).json({ error: "All pricing fields (priceLifetime, priceYearly, priceMonthly) and trialDays are required when the plan is paid." });
            }
        } else if (parseInt(isPaidPlan) === 0) {
            if (priceLifetime || priceYearly || priceMonthly || trialDays) {
                return res.status(400).json({ error: "Pricing fields should not be provided for free plans." });
            }
        }

        await planhistoryModel.create({
            planID: FindData.planID,
            name: FindData.name,
            description: FindData.description,
            planicon: FindData.planicon,
            status: FindData.status,
            hidden: FindData.hidden,
            isPaidPlan: FindData.isPaidPlan,
            trialDays: FindData.trialDays,
            priceMonthly: FindData.priceMonthly,
            priceYearly: FindData.priceYearly,
            priceLifetime: FindData.priceLifetime,
            linkcount: FindData.linkcount,
            numberoflink: FindData.numberoflink,
            numberofclick: FindData.numberofclick,
            statsdays: FindData.statsdays,
            customtext: FindData.customtext,
            options: FindData.options,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        });

        const update = await planModel.update({
            name, description, planicon, status, hidden, isPaidPlan: parseInt(isPaidPlan),
            trialDays, priceMonthly, priceYearly, priceLifetime, linkcount, numberoflink,
            numberofclick, statsdays, customtext, options
        }, { where: { planID: id, IsDeleted: 0 } });

        return res.status(200).send({
            success: true,
            message: 'Plan Data Updated Successfully..',
            Data: update
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
};

// Delete
const Delete = async (req, res) => {
    try {
        const id = req.params.id;
        const FindData = await planModel.findOne({ where: { planID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'Plan Data Not found..'
            })
        }
        await planhistoryModel.create({
            planID: FindData.planID,
            name: FindData.name,
            description: FindData.description,
            planicon: FindData.planicon,
            status: FindData.status,
            hidden: FindData.hidden,
            isPaidPlan: FindData.isPaidPlan,
            trialDays: FindData.trialDays,
            priceMonthly: FindData.priceMonthly,
            priceYearly: FindData.priceYearly,
            priceLifetime: FindData.priceLifetime,
            linkcount: FindData.linkcount,
            numberoflink: FindData.numberoflink,
            numberofclick: FindData.numberofclick,
            statsdays: FindData.statsdays,
            customtext: FindData.customtext,
            options: FindData.options,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        });
        const changedata = await planModel.update({ IsDeleted: 1 }, { where: { planID: id } })
        if (changedata[0] === 0) {
            return res.status(400).send({
                success: false,
                message: 'No Plan Were Deleted.'
            });
        }

        return res.status(200).send({
            success: true,
            message: 'Plan Deleted Successfully.'
        });


    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}


module.exports = ({ GetAllOption, AddPlan, GetAllPlan, GetByID, Update, Delete })