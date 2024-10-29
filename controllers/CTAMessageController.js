const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const ctamessageModel = require("../models/CTAMessageModel")(sequelize, DataTypes);
const ctamessageHistroyModel = require("../models/CTAMessagehistoryModel")(sequelize, DataTypes);
const fs = require('fs');
const path = require('path');

// Add CTAMessage
const AddCTAMessage = async (req, res) => {
    try {
        const { name, message, label, btnlink, btntext, overlaybgcolor, overlaytextcolor, labelbgcolor, labeltextcolor, btnbgcolor, btntextcolor } = req.body
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username;

        const AddData = await ctamessageModel.create({ name, image: req.file?.path || "", message, label, btnlink, btntext, overlaybgcolor, overlaytextcolor, labelbgcolor, labeltextcolor, btnbgcolor, btntextcolor, createdBy, LastModifiedBy })

        return res.status(200).send({
            success: true,
            message: 'CTAMessage Added Successfully..',
            Data: AddData
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// Get All Data 
const GetAllData = async (req, res) => {
    try {
        const FindData = await ctamessageModel.findAll({ where: { IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTAMessage Not Found...'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'CTAMessage Found Successfully...',
            Data: FindData
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// GetByID
const GetByID = async (req, res) => {
    try {
        const id = req.params.id;
        const FindData = await ctamessageModel.findOne({ where: { ctamessageID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTAMessage Data Not Found..'
            })
        }
        return res.status(200).send({
            success: true,
            message: 'CTAMessage Found Successfully..',
            Data: FindData
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// Update
const Update = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, message, label, btnlink, btntext, overlaybgcolor, overlaytextcolor, labelbgcolor, labeltextcolor, btnbgcolor, btntextcolor } = req.body;

        const FindData = await ctamessageModel.findOne({ where: { ctamessageID: id, IsDeleted: 0 } });
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTAMessage Data Not Found.'
            });
        }

        await ctamessageHistroyModel.create({
            ctamessageID: FindData.ctamessageID,
            name: FindData.name,
            image: FindData.image,
            message: FindData.message,
            label: FindData.label,
            btnlink: FindData.btnlink,
            btntext: FindData.btntext,
            overlaybgcolor: FindData.overlaybgcolor,
            overlaytextcolor: FindData.overlaytextcolor,
            labelbgcolor: FindData.labelbgcolor,
            labeltextcolor: FindData.labeltextcolor,
            btnbgcolor: FindData.btnbgcolor,
            btntextcolor: FindData.btntextcolor,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        });

        let imagePath = FindData.image;
        if (req.file) {
            const newImagePath = req.file.path;

            if (FindData.image && fs.existsSync(path.resolve(FindData.image))) {
                fs.unlinkSync(path.resolve(FindData.image));
            }

            imagePath = newImagePath;
        }

        const Update = await ctamessageModel.update(
            { name, image: imagePath, message, label, btnlink, btntext, overlaybgcolor, overlaytextcolor, labelbgcolor, labeltextcolor, btnbgcolor, btntextcolor },
            { where: { ctamessageID: id } }
        );

        return res.status(200).send({
            success: true,
            message: 'CTAMessage Data Updated Successfully.',
            UpdateData: Update
        });
    } catch (error) {
        return res.status(400).send({
            success: false,
            message: error.message
        });
    }
};

// Delete
const Delete = async (req, res) => {
    try {
        const id = req.params.id;
        const FindData = await ctamessageModel.findOne({ where: { ctamessageID: id, IsDeleted: 0 } })
        if (!FindData) {
            return res.status(400).send({
                success: false,
                message: 'CTAMessage Not Found..'
            })
        }

        const history = await ctamessageHistroyModel.create({
            ctamessageID: FindData.ctamessageID,
            name: FindData.name,
            image: FindData.image,
            message: FindData.message,
            label: FindData.label,
            btnlink: FindData.btnlink,
            btntext: FindData.btntext,
            overlaybgcolor: FindData.overlaybgcolor,
            overlaytextcolor: FindData.overlaytextcolor,
            labelbgcolor: FindData.labelbgcolor,
            labeltextcolor: FindData.labeltextcolor,
            btnbgcolor: FindData.btnbgcolor,
            btntextcolor: FindData.btntextcolor,
            BackupCreatedBy: FindData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const changedStatus = await ctamessageModel.update(
            { IsDeleted: 1 },
            { where: { ctamessageID: id } }
        );
        if (changedStatus[0] === 0) {
            return res.status(500).send({
                success: false,
                message: "No Staff were deleted."
            });
        }

        return res.status(200).send({
            success: true,
            message: 'CTAMessage Delete Successfullyy..'
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

module.exports = ({
    AddCTAMessage, GetAllData, GetByID, Update, Delete
})