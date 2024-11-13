const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const notificationhistory = sequelize.define('notificationhistory', {
        notificationhistoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        notificationID: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        users: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        plan: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        notificationtitle: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        expiredat: {
            type: DataTypes.DATE,
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
        tableName: "notificationhistory",
    });
    return notificationhistory;
};   