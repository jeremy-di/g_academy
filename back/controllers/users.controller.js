
import Users from "../models/users.model.js"
import usersValidation from "../validations/users.validation.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async(req,res)=>{
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "No data in the request"})
        }
        const {error} = usersValidation(body).usersCreate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const searchUsers = await Users.findOne({email: body.email})
        if(searchUsers){
            return res.status(401).json({message: "user already exists"})
        }
        const users = new Users(body)
        const newUsers = await users.save()
        return res.status(201).json(newUsers)        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const login = async(req, res) => {
    try {
        const {login, password } = req.body
        const { error } = usersValidation(req.body).usersLogin
    
        if(error){
            return res.status(401).json(error.details[0].message)
        }

        const users = await Users.findOne({ login: login})
        if(!users){
            return res.status(400).json({message: "invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password, users.password)
        if(!isMatch){
            return res.status(400).json({message: "invalid invalides"})
        }
        res.status(200).json({
            message: users.email+" is connected",
            token: jwt.sign({ id: users._id, email:  users.email }, process.env.SECRET_KEY, { expiresIn: "12h" })
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getAllUserss = async(req, res) => {
    try {
        const userss = await Users.find()
        return res.status(200).json(userss)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const getUsersById = async(req,res) => {
    try {
        const users = await Users.findById(req.params.id)
        if(!users){
            return res.status(404).json({message: "users doesn't exist"})
        }
        return res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const updateUsers = async(req,res) => {
    try {
        const {body} = req
        if(!body){
            return res.status(400).json({message: "No data in the request"})
        }

        const {error} = usersValidation(body).usersUpdate
        if(error){
            return res.status(401).json(error.details[0].message)
        }
        const updatedUsers = await Users.findByIdAndUpdate(req.params.id, body, {new: true})
        if(!updatedUsers){
            res.status(404).json({message: "users doesn't exist"})
        }
        return res.status(200).json(updatedUsers)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

const deleteUsers = async(req, res) => {
    try {
        const users = await Users.findByIdAndDelete(req.params.id)
        if(!users){
            return res.status(404).json({message: "users doesn't exist"})
        }
        return res.status(200).json({message: "users a été supprimé"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error", error: error})
    }
}

export { register, login, getAllUserss, getUsersById, updateUsers, deleteUsers }