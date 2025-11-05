// models/Quiz.js
import mongoose from "mongoose";

const OptionSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  correct: {
    type: Boolean,
    default: false
  },
});

const QuestionSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["single", "multiple"],
    default: "single"
  },
  points: {
    type: Number,
    default: 1
  },
  shuffleOptions: {
    type: Boolean,
    default: true
  },
  options: {
    type: [OptionSchema],
    default: []
  },
});

const QuizSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true   
    },
    description: String,
    shuffleQuestions: {
        type: Boolean,
        default: false
    },
    timeLimitSec: {
        type: Number,
        default: 0
    },
    questions: {
        type: [QuestionSchema],
        default: []
    },
  },
  { timestamps: true }
);

export default mongoose.model("Quiz", QuizSchema);
