import { CorsOptions } from "cors"

const allowedOrigins = ["http://localhost:5173"]

export const corsOptions:CorsOptions = {
    origin:(origin,callback) => {
        console.log(`Origin ${origin}`)
        if(!origin || allowedOrigins?.includes(origin)){
            callback(null,true)
        }else{
            callback(new Error(`Not Allowed by CORS`))
        }
    },
    methods: ["POST","GET","PUT","DELETE","PATCH"],
    allowedHeaders : [
        'Content-Type',
        'Set-Cookie',
        'Authorization',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Credentials'
    ],
    credentials:true
}