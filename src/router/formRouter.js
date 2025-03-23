const express = require("express");
const formRouter = express.Router();
const Form = require("../models/createForm.schema");
const mongoose = require("mongoose")

formRouter.post("/createForm/:userId", async(req,res) => {
    try {
        const {userId} = req.params;
        const {title,sections} = req.body;
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
formRouter.get("/getFormsById/:formId", async (req, res) => {
    try {
        const { formId } = req.params;

        if (!mongoose.isValidObjectId(formId)) {
            return res.status(400).json({ message: "Invalid Form ID" });
        }

        const form = await Form.findById(formId);
        if (!form) {
            return res.status(404).json({ message: "Form not found." });
        }

        res.status(200).json({ forms: [form] }); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

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

formRouter.put("/updateForm/:formId", async (req,res) => {
    try {
        const {formId} = req.params;
        const {title,sections} = req.body;
        if(!title || !sections){
            return res.status(400).json({message:"title and section are required."})
        }

        if (!mongoose.isValidObjectId(formId)) {
            return res.status(400).json({ message: "Invalid Form ID" });
          }
        const form = await Form.findById(formId)
        if(!form){
            return res.status(404).json({message:"Form not found."})
        }

        form.title = title;
        form.sections = sections;
        form.markModified("sections"); 
        await form.save();
        res.status(200).json({message:"Form updated successfully",form})

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


module.exports = formRouter;