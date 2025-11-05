import { useParams } from "react-router-dom"
import { quizService } from "../_services/quiz.service"

export default function QuizEdit() {
    const { id } = useParams()

    const handleUpdate = async () => {
        try {
        await quizService.updateQuiz(id)
        alert("Quiz mis à jour !")
        } catch (err) {
        console.error(err)
        alert("Erreur lors de la mise à jour")
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Modifier le quiz</h1>
            <button type="button" onClick={handleUpdate} class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Yellow</button>
        </div>
    )
}