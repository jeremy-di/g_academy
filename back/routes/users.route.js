
import { Router } from "express";
import { register, login, getAllUserss, getUsersById, updateUsers, deleteUsers } from "../controllers/users.controller.js"

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/all', getAllUserss)
router.get('/:id', getUsersById)
router.put('/:id', updateUsers)
router.delete('/:id', deleteUsers)

export default router