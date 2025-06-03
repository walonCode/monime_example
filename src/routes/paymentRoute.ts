import { Router } from "express";
import { confirmPayment, makePayment } from "../controllers/paymentController";
import authMiddleware from "../middleware/authMiddleware";

const paymentRouter = Router()

paymentRouter.post("/payment",authMiddleware, makePayment)
paymentRouter.post("/webhook", confirmPayment)

export default paymentRouter