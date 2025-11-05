// controllers/quizController.js
import Quiz from "../models/quiz.model.js";
import Submission from "../models/submission.model.js";

// Créer un quiz
const createQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.create(req.body);
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mettre à jour un quiz
const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!quiz) return res.status(404).json({ error: "Quiz non trouvé" });
    res.json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Récupérer un quiz par ID
const getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz non trouvé" });
    res.json(quiz);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Soumettre les réponses d'un utilisateur
const submitAnswers = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const userId = req.userId; // injecté par ton middleware JWT
    const quiz = await Quiz.findById(quizId);

    if (!quiz) return res.status(404).json({ error: "Quiz introuvable" });

    const qMap = new Map(quiz.questions.map((q) => [q._id, q]));
    let score = 0;
    const selected = [];
    const correctOnly = [];

    for (const a of answers || []) {
      const q = qMap.get(a.questionId);
      if (!q) continue;

      const correctIds = new Set(q.options.filter((o) => o.correct).map((o) => o._id));
      const chosen = new Set(a.optionIds || []);

      // Enregistrer toutes les réponses choisies
      selected.push({ questionId: q._id, optionIds: [...chosen] });

      // Enregistrer uniquement les bonnes réponses sélectionnées
      const goodChosen = [...chosen].filter((id) => correctIds.has(id));
      if (goodChosen.length) correctOnly.push({ questionId: q._id, optionIds: goodChosen });

      // Calcul du score serveur (pas renvoyé au client)
      const goodSelected = [...chosen].every((id) => correctIds.has(id));
      const allGoodCovered = [...correctIds].every((id) => chosen.has(id));
      if (goodSelected && allGoodCovered) score += q.points || 1;
    }

    const submission = await Submission.create({
      user: userId,
      quiz: quiz._id,
      selected,
      correctOnly,
      score,
    });

    res.status(201).json({
      id: submission._id,
      createdAt: submission.createdAt,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { createQuiz, updateQuiz, getQuiz, submitAnswers }
