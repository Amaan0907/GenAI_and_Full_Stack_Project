import express from "express"
import router from "../routes/user.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
export const app=express()

app.use(express.json())

app.use(express.static("public"))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

import { interviewRouter } from "../routes/interview.routes.js"

app.use("/api/auth",router)
app.use("/api/interview",interviewRouter)



