import express from "express"
import cors from "cors"
import { corsOptions } from "./configs/corsOptions"
import userRouter from "./routes/userRoute"
import paymentRouter from "./routes/paymentRoute"
import { config } from "dotenv"
import ConnectDB from "./configs/connectDB"
import authMiddleware from "./middleware/authMiddleware"
import { createFinancialAcount, createPaymentSession } from "./utils/generatePayment"
import axios from "axios"
import { v4 as uuid4 } from "uuid";

const spaceId = process.env.MONIME_SPACE_ID || "enter monime_space_id";
const token = process.env.TOKEN || "enter access token from monime";

console.log(token)

config()

const app = express()

// ConnectDB()

app.use(cors(corsOptions))
app.use(express.json())

// createFinancialAcount()
// createPaymentSession()


app.get('/', async(req,res) => {
	res.send("hello world\n")
})

//auth route
app.use("/api/v1/user", userRouter)
//payment route
app.use("/api/v1/", paymentRouter)

app.listen(3000, () => {
	console.log('server is running on port 3000')
})



