const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const ctaMessage = sequelize.define('ctaMessage', {
        ctamessageID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        label: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        btnlink: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        btntext: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        overlaybgcolor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        overlaytextcolor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        labelbgcolor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        labeltextcolor: {
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
        tableName: "ctaMessage",
    });
    return ctaMessage;
};   