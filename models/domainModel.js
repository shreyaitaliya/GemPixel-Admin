const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const ctacontact = sequelize.define('ctacontact', {
        domainID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        tableName: "ctacontact",
    });
    return ctacontact;
};   