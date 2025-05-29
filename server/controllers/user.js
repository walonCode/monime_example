import User from "../models/userModel.js"
import  jwt  from "jsonwebtoken"
import bcryptjs from "bcryptjs"


export const login = async(req,res) => {
    try{
        const { username, password } = req.body
        if (!username || !password){
            return res.status(400).json({message:"All fields required"})
        }
        const user = await User.findOne({ username })
        if (!user){
            return res.status(401).json({message:"invalid user name"})
        }
        const passwordMatched = await bcryptjs.compare(password, user.password)
        if(!passwordMatched){
            return res.status(401).json({message:"Invalid password"})
        }
        const token = jwt.sign({id:user._id, username:user.username}, process.env.JWT_SECRET, {expiresIn:"1d"})
        return res.status(200).json({token})
    }catch(error){
        console.error(error)
        return res.status(500).json({message:"server error"})
    }
}

export const register = async(req,res) => {
    try{
        const {username, password, name} = req.body
        if(!username || !password || !name){
            return res.status(400).json({message:"All field required"})
        }
        const user = await User.findOne({username})
        if (user){
            return res.status(401).json({message:"user already exist"})
        }
        const passwordHashed = await bcryptjs.hash(password, 10)
        const newUser = new User({
            name,
            username,
            password:passwordHashed
        })
        await newUser.save()

        return res.status(201)
    }catch(error){
        console.error(error)
        return res.status(500).json({message:"server error"})
    }
}