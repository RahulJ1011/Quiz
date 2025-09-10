const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  attempts: [
    {
      quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
      score: { type: Number, default: 0 },
      startedAt: { type: Date },
      finishedAt: { type: Date },
      answers: [
        {
          questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
          givenAnswer: String,  
          isCorrect: Boolean
        }
      ]
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
