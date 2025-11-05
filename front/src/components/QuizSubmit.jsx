import { useState } from "react"
import { quizService } from "../services/quiz.service"

export default function QuizSubmit({ quizId }) {
    const [answers, setAnswers] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await quizService.submitQuiz({ quizId, answers })
            alert("Quiz soumis avec succès !")
        } catch (err) {
            console.error(err)
            alert("Erreur lors de la soumission du quiz")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-2">Soumettre vos réponses</h3>
            {/* Ici tu pourrais afficher les questions dynamiquement */}
            <button className="bg-green-600 text-white rounded p-2 hover:bg-green-700">
            Envoyer
            </button>
        </form>
    )
}