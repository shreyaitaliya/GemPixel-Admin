const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const planoption = sequelize.define('planoption', {
    optionID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: "planoption",
});

// Function to create static data
async function createStaticData() {
    const existingAgents = await planoption.count();
    if (existingAgents === 0) {
        await planoption.bulkCreate([
            { type: "Bio Pages" },
            { type: "QR Codes" },
            { type: "Bulk QR Codes" },
            { type: "Custom Landing Page" },
            { type: "CTA Overlays" },
            { type: "Branded Domains" },
            { type: "Tracking Pixels" },
            { type: "Channels" },
            { type: "Campaigns" },
            { type: "Team Members" },
            { type: "Custom Aliases" },
            { type: "Deep Linking" },
            { type: "Geo Targeting" },
            { type: "Device Targeting" },
            { type: "Language Targeting" },
            { type: "A/B Testing & Rotator" },
            { type: "Expiration" },
            { type: "Click Limitation" },
            { type: "Parameters" },
            { type: "Custom Logo on QR" },
            { type: "Frames on QR" },
            { type: "Custom CSS on Bio Page" },
            { type: "Custom Favicon" },
            { type: "Remove Branding" },
            { type: "Premium Domains" },
            { type: "Developer API" },
            { type: "API Rate Limit" },
            { type: "Import Links" },
            { type: "Export Data" },
        ]);
    }
}

// Call this after sequelize.sync() in your main server file
sequelize.sync().then(createStaticData);

module.exports = planoption;
