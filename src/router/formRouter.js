const express = require("express");
const formRouter = express.Router();
const Form = require("../models/createForm.schema");

formRouter.post("/createForm", async(req,res) => {
    try {
        const {title,sections} = req.body;
        if(!title || !sections){
            return res.status(400).json({message:"title and sections are required"})
        }

        const form = new Form({
            title,
            sections
        })
        await form.save();
        res.status(201).json({ message: "Form created successfully!", form });
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


module.exports = formRouter;