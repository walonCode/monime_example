import axios from "axios";
import {v4 as uuid4} from "uuid"
import { config } from "dotenv";

config()

const spaceId = process.env.MONIME_SPACE_ID || "enter monime_space_id"
const token = process.env.TOKEN || "enter access token from monime";

const generateCode = async(name, number) => {
    const body = {
        "name":"test",
        "mode": "oneTime",
        "isActive":true,
        "amount":{
            "currency":"SLE",
            "value": 100,
        },
        "duration":"1h30m",
        "customerTarget":{
            "name": `${name}`,
            "reference":"test",
            "payingPhoneNumber":`${number}`,
        },
        "allowedProviders": ["m17","m18"],
    }

    try {
        const response = await axios.post("https://api.monime.io/payment-codes", body, {
        headers: {
            "Monime-Space-Id": spaceId,
            "Idempotency-Key": uuid4(),
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        });
        console.log(response.data);
        return response;
    }catch(error){
        console.log(error)
        return null
    }
}


export const sendPayment = async(req,res) => {
    const { name, number} = req.body
    if (!name || !number){
        return res.status(400).json({message:"all field required"})
    }
    const response = await generateCode(name,number)
    return res.status(200).json(response.data)

}

const payMentId = "pmc-k6DTFSGgTgovKdeQNwRu6eFEWKW"

export const getPayment = async(req, res) => {
    try{
        const response = await axios.get(`https://api.monime.io/payment-codes/${payMentId}`,{
            headers:{
                'Monime-Space-Id': `${spaceId}`,
                "Authorization": `Bearer ${token}`,
            }
        })

        return res.status(200).json(response.data)
    }catch(err){
        console.error(err)
        return res.status(500).json({message:"server error"})
    }
}






