const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const taxratehistory = sequelize.define('taxratehistory', {
        taxratehistoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        taxrateID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rate: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        countries: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        status: {
            type: DataTypes.INTEGER,
            default: 0,
            validate: {
                isIn: [[0, 1]]
            },
            comment: "'0 ENABLE' '1 DESABLE'"
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
        tableName: "taxratehistory",
    });
    return taxratehistory;
};   