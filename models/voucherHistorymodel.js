const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const voucherhistory = sequelize.define('voucherhistory', {
        voucherhistoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        voucherID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        vouchercode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        plan: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        periods: {
            type: DataTypes.INTEGER,
            default: 0,
            validate: {
                isIn: [[0, 1, 2]]
            },
            comment: "'0 DAYS' '1 MONTHS' '2 YEAR'"
        },
        maxuser: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        validuntil: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        BackupCreatedBy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        BackupCreatedOn: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    }, {
        timestamps: false,
        tableName: "voucherhistory",
    });
    return voucherhistory;
};   