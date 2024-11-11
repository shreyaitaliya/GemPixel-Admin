const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const advertisement = sequelize.define('advertisement', {
        advertisementID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        tableName: "advertisement",
    });
    return advertisement;
};   