const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const domainhistory = sequelize.define('domainhistory', {
        domainhistoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        domainID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        domain: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        domainroot: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        biopage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        domainpage: {
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
        tableName: "domainhistory",
    });
    return domainhistory;
};   