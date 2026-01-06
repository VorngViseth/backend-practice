const express = require("express");
const route = express.Router();
const DerLg = require("../models/DerLg");

// GET all DerLg
route.get("/", async(req, res) => {
    try {
        const derlgData = await DerLg.find();
        res.status(201).json({
            success: true,
            total: derlgData.length,
            data: derlgData 
        });
    }catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
// GET DerLg by id
route.get("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const derlgData = await DerLg.findOne({ id: Number(id) });

        // return if cant find any post with that id
        if(!derlgData)
            return res.status(404).json({
                success: false,
                message: `Place with the id : ${id} doesn't exist in the database`
            });

        res.status(201).json({
            success: true,
            data: derlgData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// POST DerLg
route.post("/", async(req, res) => {
    try {
        const { title, description } = req.body;

        //if input is nothing
        if(!title || !description) 
            return res.status(404).json({
                success: false,
                message: "title and description are required"
            });

        // if input is the same as existing data
        const existing = await DerLg.findOne({ title: {$regex: `^${title}$`, $options: "i"} });
        if(existing) 
            return res.status(404).json({
                success: false,
                message: "This place is already exist"
            });

        // if pass all of this we store it in our data base
        // get last item's id
        const lastItem = await DerLg.findOne().sort({id: -1});
        const newId = lastItem && !isNaN(lastItem.id) ? lastItem.id+1 : 1;

        //create a new item
        const newDerLg = new DerLg({
            id: newId,
            title,
            description
        });

        // save the newDerLg to our database
        await newDerLg.save();
        res.status(201).json({
            success: true,
            data: newDerLg
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// DELETE Derlg
route.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        
        // return if nothing 
        if(!id) 
            return res.status(404).json({
                success: false,
                message: "place's id is needed to delete the place!"
            });

        const deletePlace = await DerLg.findOneAndDelete({ id: Number(id) });
        
        // reuturn if cant find the id
        if(!deletePlace) 
            return res.status(404).json({
                success: false,
                message: `Place with the id:${id} doesn't exist in the database`
            });

        res.status(201).json({
            success: true,
            message: `Place's name: ${deletePlace.title} with the id:${id} has been deleted form the database`,
            data: {
                id: deletePlace.id,
                title: deletePlace.title,
                description: deletePlace.description
            }
        });        

    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

//UPDATE DerLg
// route.patch("/:id", (req, res) => {

// });

module.exports = route;