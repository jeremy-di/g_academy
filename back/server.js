import express from 'express'
import cors from 'cors'
import db from './db/db.js'
import quizRoutes from './routes/quiz.route.js'
import usersRoutes from './routes/users.route.js'

const app = express()

app.use(express.json())

const port = process.env.PORT

db()

app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}));

app.listen(port, () => {
    console.log(`Connecté sur port ${port}`)
})

app.use("/quiz", quizRoutes);
app.use('/users', usersRoutes)