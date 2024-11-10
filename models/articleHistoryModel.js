const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const articlehistory = sequelize.define('articlehistory', {
        articlehistoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        articleID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        que: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ans: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pricingpage: {
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
        tableName: "articlehistory",
    });
    return articlehistory;
};   