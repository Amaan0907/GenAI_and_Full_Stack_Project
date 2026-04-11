import express from "express"
import router from "../routes/user.routes.js"
import cookieParser from "cookie-parser"
export const app=express()

app.use(express.json())

app.use(express.static("public"))
app.use(cookieParser())


app.use("/api/auth",router)



