const express = require("express")
const route = express.Router()
const Community = require("../models/Community")
const User = require("../models/Users")
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary storage setup
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: "communityImages",
            public_id: `${Date.now()}-${file.originalname}`,
            resource_type: "image",
        };
    }
});

const upload = multer({ storage: storage });

// GET all Community
route.get("/", async(req, res) => {
    try {
        const communityData = await Community.find()
        res.status(200).json({
            success: true,
            total: communityData.length,
            data: communityData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// GET Community by id
route.get("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const communityData = await Community.findOne({ id: Number(id) });

        // return if cant find any post with that id
        if(!communityData)
            return res.status(404).json({
                success: false,
                message: `Place with the id : ${id} doesn't exist in the database`
            });

        res.status(200).json({
            success: true,
            data: communityData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// GET all post vai userid
route.get(`/user/:userId`, async(req, res) => {
    try {
        const { userId } = req.params;
        const communityData = await Community.find({ "user.userId": Number(userId) });

        // return if cant find any post with that userid
        if(communityData.length === 0)
            return res.status(404).json({
                success: false,
                message: `No posts found for user ID : ${userId}`
            });

        res.status(200).json({
            success: true,
            total: communityData.length,
            data: communityData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// POST Community
route.post("/", upload.single("image"), async (req, res) => {

    try {
        const { userId, userName, title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ success: false, message: "Title and description required" });
        }

        if (!userId || !userName) {
            return res.status(400).json({ success: false, message: "User information required" });
        }

        // Check user existence
        const userExist = await User.findOne({ id: Number(userId) });
        if (!userExist) {
            return res.status(404).json({
                success: false,
                message: "User ID not found. Please create an account first."
            });
        }

        const lastPost = await Community.findOne().sort({ id: -1 });
        const newPostId = lastPost?.id ? lastPost.id + 1 : 1;

        const newPost = await Community.create({
            id: newPostId,
            user: { userId: userExist.id, userName: userExist.name },
            title: title,
            description,
            image: req.file ? {
                url: req.file.path,
                publicId: req.file.filename
            } : null
        });

        res.status(201).json({ success: true, data: newPost });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE post Community
route.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        
        // return if the input is nothing
        if(!id)
            return res.status(404).json({
                success: false,
                message: "id is required"
            });

        const deletePost = await Community.findOne({ id: Number(id)});
        // return if cant find any post with that id
        if(!deletePost)
            return res.status(404).json({
                success: false,
                message: `Place with the id : ${id} doesn't exist in the database`
            });

        //delete image from cloudinary if exists
        if(deletePost.image && deletePost.image.publicId) {
            await cloudinary.uploader.destroy(deletePost.image.publicId);
        }

        // delete the post from database
        await Community.deleteOne({ id: Number(id) });

        res.status(200).json({
            success: true,
            message: `Post with the title: ${deletePost.title} and id: ${deletePost.id} posted by user: ${deletePost.user.userName} has been deleted`,
            data: deletePost
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// UPDATE post in Community
// route.get("/", async(req, res) => {
//     try{
//         const { id } = req.body;

//         //return if there is nothing
//         if(!id) 
//             return res.status(201).json({
//                 success: false,
//                 message: "Id is required for this operation"
//             });
        
//         const deletePost
//     } catch(error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// });

module.exports = route