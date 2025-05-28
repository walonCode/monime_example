import mongoose from "mongoose"

export const ConnectDB = async() => {
    console.log("MongoDb connection with retry")
    try{
        await mongoose.connect(process.env.DATABASE_URI,{
            dbName:"monime-test"
        })
        console.log("Connected to the Database")
    }catch(error){
        console.log("failed to connect to the database: ",error)
        setTimeout(() => {
            ConnectDB()
        },5000)
    }
}