import { useParams } from "react-router-dom"
import QuizView from "../components/QuizView"
import QuizSubmit from "../components/QuizSubmit"

export default function QuizTake() {
    const { id } = useParams()

    return (
        <div className="p-6 space-y-6">
            <QuizView id={id} />
            <QuizSubmit quizId={id} />
        </div>
    )
}