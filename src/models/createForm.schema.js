const mongoose = require("mongoose");

const inputSchema = new mongoose.Schema({
  id:{
    type:String,
    required:true
  },
  title: { type: String, required: true },
  placeholder: { type: String },
  type: {
    type: String,
    enum: ["email", "text", "password", "number", "date"],
    required: true,
  },
});

const sectionSchema = new mongoose.Schema({
  id:{
    type:String,
    required:true
  },
  sectionName: { type: String, default:""},
  inputs: [inputSchema],
});

const formSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  title: { type: String, required: true },
  sections: [sectionSchema],
  createdAt: { type: Date, default: Date.now },
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
