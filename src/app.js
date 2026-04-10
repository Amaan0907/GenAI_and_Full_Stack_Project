import express from "express"
import router from "../routes/user.routes.js"

export const app=express()

app.use(express.json())


app.use("/api/auth",router)

app.use(express.json())

