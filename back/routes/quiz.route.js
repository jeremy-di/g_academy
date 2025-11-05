import { Router } from "express";
import { createQuiz, updateQuiz, getQuiz, submitAnswers } from "../controllers/quiz.controller.js";
import auth from '../middlewares/auth.js'

const router = Router()

// Routes principales
router.post("/", auth, createQuiz);
router.put("/:id", auth, updateQuiz);
router.get("/:id", getQuiz);
router.post("/submit", auth, submitAnswers);

export default router;
