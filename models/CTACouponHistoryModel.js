const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const ctacouponhistory = sequelize.define('ctacouponhistory', {
        couponHistoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        couponID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        couponcode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        btntext: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bgcolor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bgtext: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        btnbgcolor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        btntextcolor: {
            type: DataTypes.STRING,
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
        tableName: "ctacouponhistory",
    });
    return ctacouponhistory;
};   