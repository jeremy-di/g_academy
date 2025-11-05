// models/Submission.js
import mongoose from"mongoose";

const AnswerSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true
  },
  optionIds: {
    type: [String],
    default: []
  },
});

const SubmissionSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId, ref: "Quiz",
        required: true
    },
    selected: {
        type: [AnswerSchema],
        default: []
    }, // toutes les réponses choisies
    correctOnly: {
        type: [AnswerSchema],
        default: []
    }, // uniquement les bonnes réponses choisies
    score: {
        type: Number,
        default: 0
    },
  },
  { timestamps: true }
);

export default mongoose.model("Submission", SubmissionSchema);
