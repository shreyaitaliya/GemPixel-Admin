const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

module.exports = (sequelize, DataTypes) => {
    const qrcodehistory = sequelize.define('qrcodehistory', {
        qrcodehistoryID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        qrcodeID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
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
        background: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        foreground: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        eyeframecolor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        eyecolor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        design: {
            type: DataTypes.INTEGER,
            default: 0,
            validate: {
                isIn: [[0, 1, 2, 3, 4, 5, 6]]
            },
            comment: "'0 NONE' '1 INSTAGRAM' '2 FACEBOOK' '3 YOUTUBE' '4 TWITTER' '5 TIKTOK' '6 LINKDIN'"
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        matrixstyle: {
            type: DataTypes.INTEGER,
            default: 1,
            validate: {
                isIn: [[1, 2, 3, 4, 5, 6]]
            },
            comment: "'1 SQUAR ALIGN' '2 RECENGAL ALIGN' '3 OVAL ALIGN' '4 CIRCLE ALIGN' '5 DIAMOND ALIGN' '6 HEART ALIGN'"
        },
        eyeframe: {
            type: DataTypes.INTEGER,
            default: 1,
            validate: {
                isIn: [[1, 2, 3, 4, 5, 6]]
            },
            comment: "'1 SQUAR' '2 RECENGAL' '3 CIRCLE' '4 LEAVES LEFT' '5 LEAVES RIGHT' '6 SQUAR POINT'"
        },
        eyestyle: {
            type: DataTypes.INTEGER,
            default: 1,
            validate: {
                isIn: [[1, 2, 3, 4, 5, 6]]
            },
            comment: "'1 SQUAR FILL' '2 RECENGAL FILL' '3 CIRCLE FILL' '4 LEAVES LEFT FILL' '5 LEAVES RIGHT FILL' '6 FLOWER FILL' '7 SQUAR POINT FILL' '8 DIAMOND FILL'"
        },
        framestyle: {
            type: DataTypes.INTEGER,
            default: 0,
            validate: {
                isIn: [[0, 1, 2, 3, 4, 5, 6]]
            },
            comment: "'0 NONE' '1 SQUAR UPPER' '2 SQUARE POINT UPPER' '3 SCAN POINT' '4 MOBILE' '5 ERROW' '6 SQUAR LOWEER'"
        },
        textfont: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        font: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        framecolor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        textcolor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        margin: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        errorcorrection: {
            type: DataTypes.INTEGER,
            default: 0,
            validate: {
                isIn: [[0, 1, 2, 3, 4, 5, 6]]
            },
            comment: "'0 L(7%)' '1 M(15%)' '2 Q(25%)' '3 H(30%)'"
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
        tableName: "qrcodehistory",
    });
    return qrcodehistory;
};   