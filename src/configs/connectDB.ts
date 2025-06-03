import mongoose from "mongoose";

export default async function ConnectDB(){
    console.log("Database connection with retry")
    try{
        await mongoose.connect(process.env.DATABASE_URI!,{
            dbName:"monimeTest",
        })
        console.log("✅ Connected to Database")
    }catch(err){
        console.error("failed to conneect to the database: ",err)
        setTimeout(() =>{
            ConnectDB()
        },5000)
    }
}