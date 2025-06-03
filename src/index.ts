import express from "express"
import cors from "cors"
import { corsOptions } from "./configs/corsOptions"
import userRouter from "./routes/userRoute"
import paymentRouter from "./routes/paymentRoute"
import { config } from "dotenv"
import ConnectDB from "./configs/connectDB"
import authMiddleware from "./middleware/authMiddleware"

config()

const app = express()

ConnectDB()

app.use(cors(corsOptions))
app.use(express.json())


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


