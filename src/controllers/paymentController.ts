import Payment from "../models/paymentModel";
import { Response, Request } from "express";
import createPaymentCode from "../utils/generatePayment";
import { ConfirmPayment } from "../types/type";


export const makePayment = async(req:Request, res:Response):Promise<void> => {
    try{
        //getting the user details from req.user
        const user =  req.user
        if(!user){
            res.status(401).json({message:"Not authorized"})
        }
       
        const { amount, phoneNumber} = req.body
        if(!amount || !phoneNumber){
            res.status(400).json({message:"All fields required"})
        }

        const data = await createPaymentCode(user?.username as string, amount, phoneNumber,user?.id as string)

        const newPayment = new Payment({
            paymentId:data?.result.id,
            userId:user?.id,
            amount,
            isCompleted:false
        })

        await newPayment.save()

        const paymentCode = data?.result.ussdCode

        res.status(200).json({message:"Payment code generate", paymentCode})

    }catch(err){
        console.error(err)
        res.status(500).json({message:"Internal server error"})
    }
}

export const confirmPayment = async(req:Request, res:Response):Promise<void> => {
    try{
        const { data } = req.body
        if(!data){
            res.status(400).json({message:"invalid webhook data"})
        }
        console.log(data)
        

        const paymentData = data as ConfirmPayment

        console.log(paymentData.status)

        if (paymentData.status === "completed"){
            const payment = await Payment.findOne({paymentId:paymentData.id})
            payment?.isCompleted === true

            await payment?.save()
            
            console.log("payment completed")
        }
    }catch(error){
        console.error(error)
    }
}