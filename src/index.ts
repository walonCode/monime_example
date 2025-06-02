import express from "express"
import cors from "cors"
import { corsOptions } from "./configs/corsOptions"



const app = express()
app.use(cors(corsOptions))
app.use(express.json())


app.get('/', async(req,res) => {
	res.send("hello world\n")
})

app.listen(3000, () => {
	console.log('server is running on port 3000')
})


