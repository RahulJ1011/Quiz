const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  type: { type: String, enum: ["mcq", "fill"], required: true },
  options: [String], 
  correctAnswer: { type: String, required: true }, 
  marks: { type: Number, default: 1 },

  
  timeLimit: { type: Number, default: 30 } 
});

module.exports = mongoose.model("Question", questionSchema);
