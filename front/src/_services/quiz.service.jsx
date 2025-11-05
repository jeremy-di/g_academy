import Axios from "./caller.service"

let newQuiz = (infos) => {
    return Axios.post('/quiz/', infos)
}

let updateQuiz = (id) => {
    return Axios.put(`/quiz/${id}`)
}

let getQuiz= (id) => {
    return Axios.get(`/quiz/${id}`)
}

let submitQuiz = (payload) => {
    return Axios.put(`/quiz/submit`, payload)
}

export const quizService = {
    newQuiz, updateQuiz, getQuiz, submitQuiz
}