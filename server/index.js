import express from "express"
import { config } from "dotenv";
import paymentRouter from "./routes/paymentRoute.js";
import userRouter from "./routes/userRoute.js";
import { authMiddleware } from "./middleware/auth.js";

const app = express()

config()

app.use(express.json())

app.use("/api/v1", paymentRouter)
app.use("/api/v1", userRouter)

app.post("/webhook", async(req,res) => {
    const body = req.body
    console.log(body)
    return res.status(200).json(body)
})

app.listen(3000, () => {
    console.log("server is running on `http://localhost:3000`")
})
