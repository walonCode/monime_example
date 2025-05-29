import { config } from "dotenv";
import axios from "axios"
import {v4 as uuid4} from "uuid"

config()

const spaceId = process.env.MONIME_SPACE_ID || "enter monime_space_id"
const token = process.env.TOKEN || "enter access token from monime";


async function createPaymentCode(name, number, campaig) {
  const postUrl = "https://api.monime.io/payment-codes";

  const bodyData = {
    name: "EDSA Office Top-up",
    mode: "oneTime",
    isActive: true,
    amount: {
      currency: "SLE",
      value: 100
    },
    duration: "1h30m",
    customerTarget: {
      name: `${name}`,
      reference: "0123456789",
      payingPhoneNumber: `${number}`
    },
    // financialTarget: {
    //   expectedPaymentCount: 1,
    //   expectedPaymentSum: {
    //     currency: "SLE",
    //     value: 100
    //   }
    // },
    allowedProviders: ["m17", "m18"],
    metadata: {}
  };

  try {
    const response = await axios.post(postUrl, bodyData, {
        headers: {
            'Monime-Space-Id': `${spaceId}`,
            'Idempotency-Key': `${uuid4()}`,
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    return response
  } catch (error) {
    console.error("Error creating payment code:", error);
  }
}

async function pollPaymentStatus(paymentCodeId) {
  const pollUrl = `https://api.monime.io/payment-codes/${paymentCodeId}`;
  const POLL_INTERVAL_MS = 30 * 1000; // 30 seconds

  async function checkStatus() {
    try {
      const res = await fetch(pollUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Monime-Space-Id": `${spaceId}`
        }
      });

      if (!res.ok) throw new Error(`Status check failed: ${res.status}`);

      const data = await res.json();
      const progress = data.result.progress;

      console.log(`Payments so far: ${progress.totalPaymentCount}`);
      console.log(`Total amount paid: ${progress.totalPaymentSum.value} ${progress.totalPaymentSum.currency}`);

      if (progress.isCompleted) {
        console.log("🎉 Payment is complete!");
        clearInterval(polling);
      } else {
        console.log("⏳ Waiting for payment...");
      }
    } catch (error) {
      console.error("Error checking payment status:", error.message);
    }
  }

  const polling = setInterval(checkStatus, POLL_INTERVAL_MS);
  checkStatus();

  return polling; 
}



export const sendPayment = async(req,res) => {
  const { name, number,cID} = req.body
  if (!name || !number){
    return res.status(400).json({message:"all field required"})
  }

  const response = await createPaymentCode(name,number)
  return res.status(200).json(response.data)
}







