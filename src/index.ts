import express from "express"
import cors from "cors"
import { corsOptions } from "./configs/corsOptions"
import userRouter from "./routes/userRoute"




const app = express()

app.use(cors(corsOptions))
app.use(express.json())


app.get('/', async(req,res) => {
	res.send("hello world\n")
})

//auth route
app.use("/api/v1/user", userRouter)

app.listen(3000, () => {
	console.log('server is running on port 3000')
})


