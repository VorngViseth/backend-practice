const express = require("express");
const route = express.Router();
const User = require("../models/Users");
const Community = require("../models/Community");
const cloudinary = require("cloudinary").v2;

//GET all user
route.get("/", async(req, res) => {
    try {
        const usersData = await User.find();
        res.status(201).json({
            success: true,
            total: usersData.length,
            data: usersData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// GET user by id
route.get("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const userData = await User.findOne({ id: Number(id) });

        // return if cant find any user with that id
        if(!userData)
            return res.status(404).json({
                success: false,
                message: `User with the id : ${id} doesn't exist in the database`
            });

        res.status(201).json({
            success: true,
            data: userData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

//POST user
route.post("/", async(req, res) => {
    try {
        const { name, password, email } = req.body;

        // return if there is nothing
        if(!name || !password || !email) 
            return res.status(404).json({
                success: false,
                message: "name, password and email are required"
            });

        // name validation
        const existingName = await User.findOne({name: name});
        if(existingName) 
            return res.status(404).json({
                success: false,
                message: `This name: ${name} already exist`
            });

        // password validation
        // leave if blank for now

        //email validation

        const existingAcc = await User.findOne({email: {$regex: `${email}$`, $options: "i"}});
        if(existingAcc)
            return res.status(404).json({
                success: false,
                message: `Account with this email: ${email} is already exist. Please click Login`
            });

        const lastUser = await User.findOne().sort({id: -1});
        const newId = lastUser && !isNaN(lastUser.id) ? lastUser.id+1 : 1;

        const newUser = new User({
            id: newId,
            name,
            email,
            password
        });

        await newUser.save();
        res.status(201).json({
            success: true,
            data: newUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// //DELETE user
route.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;

        // return if there is nothing
        if (!id) 
            return res.status(404).json({
               success: false,
               message: "Id is required to perform this operations"
            });
        
        const deletedUser = await User.findOne({id: Number(id)});

        // return if there is no user with this id
        if(!deletedUser)
            return res.status(404).json({
                success: false,
                message: `There is no user with this id: ${id}` 
            });

        await User.deleteOne({id: Number(id)});
        
        const posts = await Community.find({"user.userId": deletedUser.id});
        for (const post of posts) {
            if (post.image && post.image.publicId) {
                try {
                    await cloudinary.uploader.destroy(post.image.publicId);
                } catch (err) {
                    console.error(`Failed to delete image: ${post.image}`);
                }
            }
        }

        // delete all post of that user
        await Community.deleteMany({"user.userId": deletedUser.id});

        res.status(201).json({
            success: true,
            message: `User: ${deletedUser.name} with the id: ${deletedUser.id} has been deleted from the database and all their posts have been removed`,
            data: deletedUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
// //GET all user
// route.get("/", async(req, res) => {

// });

module.exports = route;