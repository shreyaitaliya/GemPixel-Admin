const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const blogposthistory = sequelize.define('blogposthistory', {
        blogposthistoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        blogpostID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        metatitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        metadescription: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        publish: {
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
        tableName: "blogposthistory",
    });
    return blogposthistory;
};   