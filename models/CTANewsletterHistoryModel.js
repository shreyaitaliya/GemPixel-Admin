const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const ctanewsletterhistory = sequelize.define('ctanewsletterhistory', {
        ctanewsletteHistoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ctanewsletterID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        formlabel: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        formdescription: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        thankyoumessage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        webhooknotification: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        button: {
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
        tableName: "ctanewsletterhistory",
    });
    return ctanewsletterhistory;
};   