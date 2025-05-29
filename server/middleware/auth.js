import jwt from "jsonwebtoken"

export const authMiddleware = (req,res,next) => {
    try{
        const token = req.headers['authorization']
        if(!token){
            return res.status(401).json({message:"Access denied"})
        }
        const value = token.replace('Bearer ' ,'').trim()
        if(value == ""){
            return res.status(401).json({message:"access denied"})
        }
        const decoded = jwt.verify(value, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message:"Invalid token"})
        }
        req.user = decoded
        next()
    }catch(error){
        return res.status(500).json({message:"server error"})
    }
}