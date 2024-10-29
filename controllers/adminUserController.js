const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const adminModel = require("../models/adminUserModel")(sequelize, DataTypes);
const userModel = require("../models/userModel")(sequelize, DataTypes);
const jwt = require('jsonwebtoken');


async function createAdmin() {
    const adminExists = await adminModel.findOne();
    if (!adminExists) {
        await adminModel.create({
            username: "shreya123",
            password: "shreya123"
        });
        console.log("Admin created successfully");
    } else {
        console.log("Admin already exists");
    }
}

createAdmin();

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check in userModel first
        const user = await userModel.findOne({ where: { username: username } });

        if (user && user.admin === 1) {
            // Check if the password matches
            if (user.password !== password) {
                return res.status(400).send({
                    success: false,
                    message: 'Passwords Do Not Match. Please Provide a Valid Password..',
                });
            }

            const token = jwt.sign({ id: user.userID, User: user }, 'GemPixel_Admin', { expiresIn: '12365478900000s' });

            return res.status(200).send({
                success: true,
                message: 'Login Successfully..',
                Token: token
            });
        }

        // If not found in userModel, check in adminModel
        const admin = await adminModel.findOne({ where: { username: username } });

        if (!admin) {
            return res.status(400).send({
                success: false,
                message: 'Admin Not Found..',
            });
        }

        // Check if the password matches
        if (admin.password !== password) {
            return res.status(400).send({
                success: false,
                message: 'Passwords Do Not Match. Please Provide a Valid Password..',
            });
        }

        const token = jwt.sign({ id: admin.userID, User: admin }, 'GemPixel_Admin', { expiresIn: '12365478900000s' });

        return res.status(200).send({
            success: true,
            message: 'Login Successfully..',
            Token: token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: error.message
        });
    }
};


module.exports = ({ login })