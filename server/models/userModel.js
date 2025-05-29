import { Schema, model } from "mongoose"

const userSchema = new Schema({
    name:{
        type: String,
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    paymentId:[{
        type:String,
    }]
},{ timestamps:true })

const User = model("user", userSchema)

export default User