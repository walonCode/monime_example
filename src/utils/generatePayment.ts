import axios from "axios";
import { CreatePaymentCode } from "../types/type";
import { config } from "dotenv";
import { v4 as uuid4 } from "uuid";

config();

const spaceId = process.env.MONIME_SPACE_ID || "enter monime_space_id";
const token = process.env.TOKEN || "enter access token from monime";

export async function createPaymentCode(
  name: string,
  amount: string,
  phoneNumber: string,
  userId: string
): Promise<CreatePaymentCode | undefined> {
  const postUrl = "https://api.monime.io/payment-codes";

  const bodyData = {
    name: "Premium Payment",
    mode: "recurrent",
    isActive: true,
    amount: {
      currency: "SLE",
      value: Number(amount) * 100,
    },
    duration: "30m",
    customerTarget: {
      name: `${name}`,
      reference: "0123456789",
      payingPhoneNumber: `${phoneNumber}`,
    },
    allowedProviders: ["m17", "m18"],
    metadata: {},
  };

  try {
    const response = await axios.post(postUrl, bodyData, {
      headers: {
        "Monime-Space-Id": `${spaceId}`,
        "Idempotency-Key": `${userId + uuid4()}`,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data as CreatePaymentCode;
  } catch (error) {
    console.error("Error creating payment code:", error);
  }
}

export async function createFinancialAcount() {
  const URL = "https://api.monime.io/v1/financial-accounts";
  const body = {
    name: "testing1",
    currency: "SLE",
    reference: null,
    description: null,
    metadata: {},
  };

  try {
    const res = await axios.post(URL, body, {
      headers: {
        "Monime-Space-Id": `${spaceId}`,
        "Idempotency-Key": `${uuid4()}`,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res.data);
    return res;
  } catch (err) {
    console.error("Error creating financial account: ", err);
  }
}

export async function createPaymentSession() {
  const URL = "https://api.monime.io/v1/checkout-sessions";
  const body = {
    name: "testing",
    description: "hiiii",
    cancelUrl: "https://www.hello.com",
    successUrl: "https://www.google.com",
    callbackState: null,
    reference: "hiiii",
    financialAccountId: "fac-k6G62GavFAAJniq7GskNL1gE89V",
    lineItems: [
      {
        type: "custom",
        name: "hello",
        price: {
          currency: "SLE",
          value: 123,
        },
        quantity: 1,
        reference: null,
        description: null,
        images: ["https://www.google.com/image/words"],
      },
    ],
    paymentOptions: {
      card: { disable: false },
      bank: {
        disable: true,
      },
      momo: {
        disable: false,
        enabledProviders: ["m17","m18"],
      },
      wallet: {
        disable: false,
        enabledProviders: ["dw001"],
      },
    },
    brandingOptions: { primaryColor: "#ffffff" },
    metadata: {},
  };

  try {
    const data = await axios.post(URL, body, {
      headers: {
        "Monime-Space-Id": `${spaceId}`,
        "Idempotency-Key": `${uuid4()}`,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(data.data)
  } catch (err) {
  if (axios.isAxiosError(err)) {
    console.error("❌ Axios request failed");
    console.error("Status:", err.response?.status);
    console.error("Message:", err.response?.statusText);
    console.error("Data:", err.response?.data); // <-- API error details
	console.error("Error: ", err.response?.data.error.details)
  } else {
    console.error("❌ Unexpected error:", err);
  }}

}
