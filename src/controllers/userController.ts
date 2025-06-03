import User from "../models/userModel";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Response, Request } from "express";

export const login = async(req:Request,res:Response):Promise<void> => {
    try{
        const { username, password } = req.body
        if(!username || !password){
            res.status(400).json({message:"All fields required"})
        }
        const user = await User.findOne({ username })
        if (!user){
            res.status(404).json({message:"User not found. Invalid username"})
        }
        const passwordMatch = await bcrypt.compare(password, user?.password as string)
        if (!passwordMatch){
            res.status(401).json({message:"Invalid password"})
        }

        const accessToken = jwt.sign({ id:user?._id, username:user?.username}, process.env.JWT_SECRET!, {
            expiresIn:"1d"
        })

        res.status(200).json({message:"login", accessToken})
    }catch(err){
        console.error(err)
        res.status(500).json({message:"Internal server error"})
    }
}



export const register = async(req:Request, res:Response):Promise<void> => {
    try {
        const {name, username, password} = req.body
        if(!username || !password || !name){
            res.status(400).json({message:"All fields required"})
        }
        const user = await User.findOne({ username })
        if (user){
            res.status(404).json({message:"User already exist.."})
        }
        const passwordHashed = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            username,
            password:passwordHashed
        })
        await newUser.save()

        res.status(201).json({message:"User registered successfully"})
    }catch(err){
        console.error(err)
        res.status(500).json({message:"Internal server error"})
    }
}