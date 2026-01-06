const express = require("express");
const route = express.Router();
const NhamEy = require("../models/NhamEy");

// GET all nhmaey
route.get("/", async(req, res) => {
    try{
        const nhameyData = await NhamEy.find();
        res.status(201).json({
            success: true,
            total: nhameyData.length,
            data: nhameyData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// GET nhamey by id
route.get("/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const nhameyData = await NhamEy.findOne({ id: Number(id) });

        // return if cant find any post with that id
        if(!nhameyData)
            return res.status(404).json({
                success: false,
                message: `Place with the id : ${id} doesn't exist in the database`
            });

        res.status(201).json({
            success: true,
            data: nhameyData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// POST nhamey
route.post("/", async(req, res) => {
    try {
        const { title, description } = req.body;

        // return if input is nothing
        if(!title || !description) 
            return res.status(404).json({
                success: false,
                message: "title and description are required!"
            });

        // if we already have the place in the database
        const existing = await NhamEy.findOne({ title: {$regex: `${title}$`, $options: "i"}});
        if(existing)
            return res.status(404).json({
                success: false,
                message: "This place is already exist"
            });
        
        //get last item's id
        const lastItem = await NhamEy.findOne().sort({id: -1});
        const newId = lastItem && !isNaN(lastItem.id) ? lastItem.id+1 : 1;

        //create new nhamey
        const newNhamEy = new NhamEy({
            id: newId,
            title,
            description
        });

        await newNhamEy.save();
        res.status(201).json({
            success: true,
            data: newNhamEy
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// DELETE nhamey
route.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;

        // return id there is nothing
        if(!id) 
            return res.status(404).json({
                success: false,
                messsage: "id of place is required"
            });

        const deleteNhamEy = NhamEy.findOneAndDelete({id: Number(id)});

        // return if we can't find the id
        if(!deleteNhamEy)
            return res.status(404).json({
                success: false,
                message: `Place with the id: ${id} doesn't exist in our database`
            });
            
        res.status(201).json({
            success: true,
            message: `Place's name: ${deleteNhamEy.title} with the id: ${id} has been deleted from our database`,
            data: {
                id: deleteNhamEy.id,
                title: deleteNhamEy.title,
                description: deleteNhamEy.description
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// UPDATE nhamey
// route.patch("/", async(req, res) => {

// });

module.exports = route;