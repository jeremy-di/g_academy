import { useState } from "react"
import { quizService } from "../_services/quiz.service"

export default function QuizForm({ onCreated }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [questions, setQuestions] = useState([""])

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions]
    newQuestions[index] = value
    setQuestions(newQuestions)
  }

  const addQuestion = () => {
    setQuestions([...questions, ""])
  }

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const infos = { title, description, questions }
    try {
      const res = await quizService.newQuiz(infos)
      onCreated && onCreated(res.data)
      alert("Quiz créé avec succès !")
    } catch (err) {
      console.error(err)
      alert("Erreur lors de la création du quiz")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold">Créer un quiz</h2>
      <input
        type="text"
        placeholder="Titre du quiz"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded"
      />

      <h3 className="font-semibold mt-2">Questions :</h3>
      {questions.map((q, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            placeholder={`Question ${index + 1}`}
            value={q}
            onChange={(e) => handleQuestionChange(index, e.target.value)}
            className="border p-2 rounded w-full"
          />
          {questions.length > 1 && (
            <button
              type="button"
              onClick={() => removeQuestion(index)}
              className="bg-red-500 text-white px-2 rounded"
            >
              –
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={addQuestion}
        className="bg-gray-300 text-black rounded p-1"
      >
        + Ajouter une question
      </button>

      <button className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600">
        Enregistrer
      </button>
    </form>
  )
}
