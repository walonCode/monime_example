import {Schema, model, Document} from "mongoose"

interface User extends Document {
    name: string,
    username: string,
    password:string,
    account:number
}

const userSchema = new Schema<User>({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    account:{
        type:Number,
        default:0
    }
},{ timestamps: true })

const User = model("user", userSchema)

export default User