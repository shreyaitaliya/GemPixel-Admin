const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const qrcode = sequelize.define('qrcode', {
        qrcodeID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        codename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        domain: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        smsmessage: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        wifi: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        staticvcard: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        event: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        link: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        email: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        phone: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        application: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        whatsapp: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        cryptocurrency: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        qrcode: {
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
        tableName: "qrcode",
    });
    return qrcode;
};   