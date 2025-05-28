import express from "express"
import { config } from "dotenv";
import paymentRouter from "../routes/paymentRoute.js";

const app = express()

config()

app.use(express.json())

app.use("/api/v1", paymentRouter)

app.listen(3000, () => {
    console.log("server is running on `http://localhost:3000`")
})
