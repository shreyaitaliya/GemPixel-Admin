const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const PixelProvider = sequelize.define(
    "pixelprovider",
    {
        pixelproviderID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        tableName: "pixelprovider",
    }
);

// Default data to insert
const defaultData = [
    { name: "Google Tag Manager" },
    { name: "Google Analytics" },
    { name: "Facebook" },
    { name: "Google Ads" },
    { name: "LinkedIn" },
    { name: "Twitter" },
    { name: "AdRoll" },
    { name: "Quora" },
    { name: "Pinterest" },
    { name: "Bing" },
    { name: "Snapchat" },
    { name: "Reddit" },
    { name: "TikTok" },
];

// Sync the model and insert default data
(async () => {
    try {
        // Sync the model with the database
        await sequelize.sync({ alter: true });
        console.log("PixelProvider model synchronized with the database.");

        // Insert default data
        for (const data of defaultData) {
            await PixelProvider.findOrCreate({
                where: { name: data.name },
                defaults: data,
            });
        }
        console.log("Default pixel providers added successfully.");
    } catch (error) {
        console.error("Error during PixelProvider initialization:", error);
    }
})();

module.exports = PixelProvider;