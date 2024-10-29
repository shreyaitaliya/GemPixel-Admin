const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const userhistory = sequelize.define('userhistory', {
        userhistoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        plan: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[1, 2, 3]]
            },
            comment: "'1 STATER(FREE)', '2 BUSINESS(PAID)','3 ENTERPRISE(PAID)'",
        },
        LastPayment: {
            type: DataTypes.DATE,
        },
        Expiration: {
            type: DataTypes.DATE
        },
        admin: {
            type: DataTypes.INTEGER,
            default: false,
            validate: {
                isIn: [[0, 1]]
            },
            comment: "'0 USER' '1 ADMIN'"
        },
        active: {
            type: DataTypes.INTEGER,
            default: false,
            validate: {
                isIn: [[0, 1]]
            },
            comment: "'0 INACTIVE' '1 ACTIVE'"
        },
        profile: {
            type: DataTypes.INTEGER,
            default: false,
            validate: {
                isIn: [[0, 1]]
            },
            comment: "'0 USER' '1 PUBLIC'"
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
        tableName: "userhistory",
    });
    return userhistory;
};   