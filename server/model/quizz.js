const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  duration: { type: Number, required: true }, 
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Quiz", quizSchema);
