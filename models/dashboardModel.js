const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const dashboardurl = sequelize.define('dashboardurl', {
        urlID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        options: {
            type: DataTypes.INTEGER,
            default: 0,
            validate: {
                isIn: [[0, 1]]
            },
            comment: "'1 SINGLE' '2 MULTIPLE'"  
        },
        longurl: {
            type: DataTypes.STRING,   
            allowNull: false,    
        },
        shorturl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        qrcode: {
            type: DataTypes.STRING,
            allowNull: false,
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
        tableName: "dashboardurl",
    });
    return dashboardurl;
};   