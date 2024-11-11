const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const adverticementType = sequelize.define('adverticementType', {
    typeID: {
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
    tableName: "adverticementType",
});

// Function to create static data
async function createStaticData() {
    const existingAgents = await adverticementType.count();
    if (existingAgents === 0) {
        await adverticementType.bulkCreate([
            { type: "728x90" },
            { type: "300x250" },
            { type: "468x60" },
            { type: "Responsive" },
            { type: "Frame Page" },
            { type: "Splash Page" },
            { type: "Blog Sidebar" },
            { type: "Help Center Sidebar" },
        ]);
    }
}

// Call this after sequelize.sync() in your main server file
sequelize.sync().then(createStaticData);

module.exports = adverticementType;
