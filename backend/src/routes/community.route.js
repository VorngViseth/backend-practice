const express = require("express")
const route = express.Router()
const Community = require("../models/Community")
const User = require("../models/Users")
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Multer storage setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

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

// POST Community
route.post("/", upload.single("image"), async (req, res) => {
    // 1. Helper function to delete file if something goes wrong
    const deleteFile = (filename) => {
        if (filename) {
            const filePath = path.join(__dirname, "../uploads", filename);
            fs.unlink(filePath, (err) => {
                if (err) console.log("Failed to cleanup file:", err.message);
            });
        }
    };

    try {
        const { userId, userName, title, description } = req.body;
        const finalTitle = title; 

        if (!finalTitle || !description) {
            deleteFile(req.file?.filename);
            return res.status(400).json({ success: false, message: "Title and description required" });
        }

        if (!userId || !userName) {
            deleteFile(req.file?.filename);
            return res.status(400).json({ success: false, message: "User information required" });
        }

        // Check user existence
        const userExist = await User.findOne({ id: Number(userId) });

        if (!userExist) {
            deleteFile(req.file?.filename); // <--- Cleanup happens here
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
            tittle: finalTitle, // Match your schema name
            description,
            image: req.file ? `/uploads/${req.file.filename}` : null
        });

        res.status(201).json({ success: true, data: newPost });

    } catch (error) {
        deleteFile(req.file?.filename); // Cleanup on crash
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

        const deletePost = await Community.findOneAndDelete({ id: Number(id)});

        // return if cant find any post with that id
        if(!deletePost)
            return res.status(404).json({
                success: false,
                message: `Place with the id : ${id} doesn't exist in the database`
            });

        // Delete image file if it exists
        if(deletePost.image) {
            const imagePath = path.join(__dirname, "..", deletePost.image);
            fs.unlink(imagePath, (err) => {
                if(err) console.log("Image deletion error:", err);
            });
        }

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