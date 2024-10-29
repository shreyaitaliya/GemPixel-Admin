const { DataTypes, where } = require("sequelize");
const db = require('../config/db');
const sequelize = db.sequelize;
const blogcategoryModel = require("../models/blogCategoryModel")(sequelize, DataTypes);
const blogpostModel = require("../models/blogPostModel")(sequelize, DataTypes);
const blogposthistoryModel = require("../models/blogPostHistoryModel")(sequelize, DataTypes);

// Add Data
const AddBlogPost = async (req, res) => {
    try {
        const { title, slug, category, content, metatitle, metadescription, publish } = req.body;
        const createdBy = req.user.username;
        const LastModifiedBy = req.user.username

        const findCategory = await blogcategoryModel.findOne({ where: { title: category } });
        if (!findCategory) {
            return res.status(400).send({
                success: false,
                message: 'Blog Category Not Found...'
            })
        }

        const data = await blogpostModel.create({ image: req.file?.path || "", title, slug, category, content, metatitle, metadescription, publish, createdBy, LastModifiedBy })

        return res.status(200).send({
            success: true,
            message: 'Blog Post Added Successfully..',
            Data: data
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// GetAll Data
const GetAllData = async (req, res) => {
    try {
        const GetData = await blogpostModel.findAll({ where: { IsDeleted: 0 } })
        if (!GetData) {
            return res.status(400).send({
                success: false,
                message: 'BlogPost Not Found..'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'BlogPost View Succesfully..',
            Data: GetData
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

//Get ByID
const GetByID = async (req, res) => {
    try {
        const id = req.params.id;

        const findData = await blogpostModel.findOne({ where: { blogpostID: id, IsDeleted: 0 } });
        if (!findData) {
            return res.status(400).send({
                success: false,
                message: 'BlogPost Not Found..',
            })
        }

        return res.status(200).send({
            success: true,
            message: 'BlogPost Found Successfully..',
            Data: findData
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}

// Delete
const Delete = async (req, res) => {
    try {
        const id = req.params.id;
        const findData = await blogpostModel.findOne({ where: { blogpostID: id, IsDeleted: 0 } })
        if (!findData) {
            return res.status(400).send({
                success: false,
                message: 'BlogPost Not Found'
            })
        }

        const history = await blogposthistoryModel.create({
            blogpostID: findData.blogpostID,
            title: findData.title,
            slug: findData.slug,
            category: findData.category,
            image: findData.image,
            content: findData.content,
            metatitle: findData.metatitle,
            metadescription: findData.metadescription,
            publish: findData.publish,
            BackupCreatedBy: findData.createdBy,
            BackupCreatedOn: new Date(),
        })

        const changedata = await blogpostModel.update({ IsDeleted: 1 }, { where: { blogpostID: id } });

        if (changedata[0] === 0) {
            return res.status(400).send({
                success: false,
                message: 'No User Were Deleted.'
            });
        }

        return res.status(400).send({
            success: true,
            message: 'BlogPost Deleted Successfully..'
        })

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message
        })
    }
}


// <------------------- update pending for not adding database ----------------------------------------->
// Update
// const Update = async (req, res) => {
//     const id = req.params.id;
//     const { title, slug, category, content, metatitle, metadescription, publish } = req.body

//     const findData = await blogpostModel.findOne({ where: { blogpostID: id, IsDeleted: 0 } });
//     if (!findData) {
//         return res.status(400).send({
//             success: false,
//             message: 'BlogPost Data Not Found..',
//         })
//     }

//     const findCategory = await blogcategoryModel.findOne({ where: { title: category, IsDeleted: 0 } });
//     if (!findCategory) {
//         return res.status(400).send({
//             success: false,
//             message: 'Blog Category Not Found...'
//         })
//     }

//     const history = await blogposthistoryModel.create({
//         blogpostID: findData.blogpostID,
//         title: findData.title,
//         slug: findData.slug,
//         category: findData.category,
//         image: findData.image,
//         content: findData.content,
//         metatitle: findData.metatitle,
//         metadescription: findData.metadescription,
//         publish: findData.publish,
//         BackupCreatedBy: findData.createdBy,
//         BackupCreatedOn: new Date(),
//     })

//     // If a new image is uploaded, handle the image replacement
//     let imagePath = existingstaff.image;
//     if (req.file) {
//         const newImagePath = req.file.path;

//         if (findData.image && fs.existsSync(path.resolve(findData.image))) {
//             fs.unlinkSync(path.resolve(findData.image));
//         }

//         imagePath = newImagePath;
//     }

//     const updatedData = await findData.update({
//         image: imagePath, title, slug, category, content, metatitle, metadescription, publish
//     })

//     return res.status(200).send({
//         success: true,
//         message: 'BlogPost Updated Successfully..',
//         Data: updatedData
//     })

// }

const Update = async (req, res) => {
    try {
        const id = req.params.id;

        const { title, slug, category, content, metatitle, metadescription, publish } = req.body;

        const existingblogpost = await blogpostModel.findByPk(id);

        if (!existingblogpost) {
            return res.status(404).send({
                message: 'Blog post not found',
                success: false
            });
        }

        const findCategory = await blogcategoryModel.findOne({ where: { title: category } });
        if (!findCategory) {
            return res.status(400).send({
                success: false,
                message: 'Blog Category Not Found...'
            });
        }

        // Save old data to the history table
        await staffhistoryModel.create({
            blogpostID: existingblogpost.blogpostID,
            image: existingblogpost.image,
            title: existingblogpost.title,
            slug: existingblogpost.slug,
            category: existingblogpost.category,
            content: existingblogpost.content,
            metatitle: existingblogpost.metatitle,
            metadescription: existingblogpost.metadescription,
            publish: existingblogpost.publish,
            BackupCreatedBy: existingblogpost.createdBy,
            BackupCreatedOn: new Date()
        });

        // If a new image is uploaded, handle the image replacement
        let imagePath = existingblogpost.image;
        if (req.file) {
            const newImagePath = req.file.path;

            if (existingblogpost.image && fs.existsSync(path.resolve(existingblogpost.image))) {
                fs.unlinkSync(path.resolve(existingblogpost.image));
            }
            imagePath = newImagePath;
        }

        const updatedData = await blogpostModel.update({
            image: imagePath,
            title,
            slug,
            category,
            content,
            metatitle,
            metadescription,
            publish
        });

        return res.status(200).send({
            message: 'BlogPost Updated successfully.',
            success: true,
            updatedData
        });

    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: error.message,
        });
    }
};

module.exports = ({
    AddBlogPost, GetAllData, GetByID, Delete, Update
})