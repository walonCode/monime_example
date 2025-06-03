import {Schema, model, Document} from "mongoose"

interface Payment extends Document {
    paymentId: string,
    isCompleted:boolean,
    userId:string | undefined
    amount:number
}

const paymentSchmema = new Schema<Payment>({
    paymentId: {
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
}, { timestamps:true })


const Payment = model("payments", paymentSchmema)

export default Payment