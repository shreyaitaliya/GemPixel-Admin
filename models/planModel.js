const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const plan = sequelize.define('plan', {
        planID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        planicon: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('Enabled', 'Disabled'),
            allowNull: false,
            defaultValue: 'Enabled',
        },
        hidden: {
            type: DataTypes.ENUM('Visible', 'Hidden'),
            allowNull: false,
            defaultValue: 'Visible',
        },
        isPaidPlan: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                isIn: [[0, 1]]
            },
            comment: "'0 active' '1 inactive'"
        },
        trialDays: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null,
        },
        priceMonthly: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: null,
        },
        priceYearly: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: null,
        },
        priceLifetime: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            defaultValue: null,
        },
        linkcount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                isIn: [[0, 1]]
            },
            comment: "'0 TOTAL' '1 MONTHLY'"
        },
        numberoflink: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        numberofclick: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        statsdays: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        customtext: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        options: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        LastModifiedBy: {
            type: DataTypes.STRING
        },
        LastModifiedOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        IsActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        IsDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {
        timestamps: false,
        tableName: "plan",
    });
    return plan;
};   