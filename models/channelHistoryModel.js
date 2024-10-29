const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const channelhistory = sequelize.define('channelhistory', {
        channelhistoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        channelID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {  
            type: DataTypes.STRING,
            allowNull: false,
        },
        starchannel: {
            type: DataTypes.INTEGER,
            default: false,
            validate: {
                isIn: [[0, 1]]
            },
            comment: "'0 INACTIVE' '1 ACTIVE'"
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
        tableName: "channelhistory",
    });
    return channelhistory;
};   