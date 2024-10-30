const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const contacthistory = sequelize.define('contacthistory', {
        contacthistoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        contactID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        emailsubject: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        formlabel: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        formdescription: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        placename: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        placeemail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        placemessage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        placebtn: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        formbgcolor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        formtextcolor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        inputbgcolor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        inputtextcolor: {
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
        notification: {
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
        tableName: "contacthistory",
    });
    return contacthistory;
};   