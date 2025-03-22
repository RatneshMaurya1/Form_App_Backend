const express = require("express");
const formRouter = express.Router();
const Form = require("../models/createForm.schema");

formRouter.post("/createForm/:userId", async(req,res) => {
    try {
        const {userId} = req.params;
        const {title,sections} = req.body;
        console.log(title)
        console.log(sections)
        if(!title || !sections){
            return res.status(400).json({message:"title and sections are required"})
        }

        const form = new Form({
            userId,
            title,
            sections
        })
        await form.save();
        res.status(201).json({ message: "Form created successfully!", form });
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

formRouter.get("/getForms/:userId", async(req,res) => {
    try {
        const {userId} = req.params;
        const forms = await Form.find({userId});
        res.status(200).json({forms})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

formRouter.delete("/deleteForm/:formId", async (req, res) => {
    try {
        const { formId } = req.params;

        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ message: "Form not found." });
        }

        await Form.findByIdAndDelete(formId);

        res.status(200).json({ message: "Form deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = formRouter;