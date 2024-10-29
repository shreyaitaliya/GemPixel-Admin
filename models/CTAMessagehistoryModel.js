const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const ctaMessagehistory = sequelize.define('ctaMessagehistory', {
        ctamessagehistoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ctamessageID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
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
        tableName: "ctaMessagehistory",
    });
    return ctaMessagehistory;
};   