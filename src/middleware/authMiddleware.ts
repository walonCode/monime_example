import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken"

export default async function(req:Request,res:Response, next:NextFunction):Promise<void>{
    const token = req.headers["authorization"]
    if(!token){
        res.status(401).json({message:"Not authorized"})
    }
    const tokenValue = token?.replace('Bearer ', "" ).trim()
    if(!tokenValue){
        res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decoded = jwt.verify(tokenValue as string, process.env.JWT_SECRET!) as unknown as { id:string, username:string}
        req.user = decoded
        next()
    }catch(err){
        console.error(err)
        res.status(500).json({message:"Internal server error"})
    }
}