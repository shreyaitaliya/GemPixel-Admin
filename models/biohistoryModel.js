const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const biohistory = sequelize.define('biohistory', {
        biohistoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bioID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alias: {
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
        tableName: "biohistory",
    });
    return biohistory;
};   