const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const bio = sequelize.define('bio', {
        bioID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alias: {
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
        tableName: "bio",
    });
    return bio;
};   