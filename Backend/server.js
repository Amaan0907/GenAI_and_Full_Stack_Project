import { app } from "./src/app.js"
import { connectToDB } from "./database.js"
import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
})


connectToDB()
.then(()=>{
    app.on("error",()=>{
        console.log("ERROR:",error)
        throw error
    })
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}
    
).catch((error)=>{
    console.log("Error in connecting to DB",error)
})
