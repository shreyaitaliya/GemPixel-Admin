const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const customsplashhistory = sequelize.define('customsplashhistory', {
        customsplashhistoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        customsplashID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        counter: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customtitle: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bannerimage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avtarimage: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
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
        tableName: "customsplashhistory",
    });
    return customsplashhistory;
};   