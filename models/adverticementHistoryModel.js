const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const advertisementhistory = sequelize.define('advertisementhistory', {
        advertisementhistoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        advertisementID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        typeID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        active: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: {
                isIn: [[0, 1]]
            },
            comment: "'0 ENABLED' '1 DISABLED'"
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
        tableName: "advertisementhistory",
    });
    return advertisementhistory;
};   