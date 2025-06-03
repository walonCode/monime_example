import axios from "axios"
import { CreatePaymentCode } from "../types/type";

const spaceId = process.env.MONIME_SPACE_ID || "enter monime_space_id"
const token = process.env.TOKEN || "enter access token from monime";


export default async function createPaymentCode(name:string, amount:number, phoneNumber:string,userId:string):Promise<CreatePaymentCode | undefined> {
  const postUrl = "https://api.monime.io/payment-codes";

  const bodyData = {
    name: "Premium Payment",
    mode: "oneTime",
    isActive: true,
    amount: {
      currency: "SLE",
      value: amount
    },
    duration: "1h30m",
    customerTarget: {
      name: `${name}`,
      reference: "0123456789",
      payingPhoneNumber: `${phoneNumber}`
    },
    allowedProviders: ["m17", "m18"],
    metadata: {}
  };

  try {
    const response = await axios.post(postUrl, bodyData, {
        headers: {
            'Monime-Space-Id': `${spaceId}`,
            'Idempotency-Key': `${userId}`,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return response.data as CreatePaymentCode
  } catch (error) {
    console.error("Error creating payment code:", error);
  }
}