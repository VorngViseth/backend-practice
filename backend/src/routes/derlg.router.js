const express = require("express");
const router = express.Router();
const DerLg = require("../models/DerLg");

// GET all DerLg
router.get("/", async(req, res) => {
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

// POST DerLg
router.post("/", async(req, res) => {
    try {
        const { tittle, description } = req.body;

        //if input is nothing
        if(!tittle || !description) 
            return res.status(404).json({
                success: false,
                message: "tittle and description are required"
            });

        // if input is the same as existing data
        const existing = await DerLg.findOne({ tittle: {$regex: `^${tittle}$`, $options: "i"} });
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
            tittle,
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
router.delete("/", async(req, res) => {
    try {
        const { id } = req.body;
        
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
            message: `Place's name: ${deletePlace.tittle} with the id:${id} has been deleted form the database`,
            data: {
                id: deletePlace.id,
                tittle: deletePlace.tittle,
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
// router.patch("/:id", (req, res) => {

// });

module.exports = router;