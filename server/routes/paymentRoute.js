import { Router } from "express";
import { sendPayment  } from "../controllers/payment.js";

const paymentRouter = Router()

paymentRouter.post("/payment",sendPayment)
// paymentRouter.get("/", getPayment)

export default paymentRouter