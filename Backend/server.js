import "./config.js"
import { app } from "./src/app.js"
import { connectToDB } from "./database.js"



connectToDB()
.then(()=>{
    app.on("error",()=>{
        console.log("ERROR:",error)
        throw error
    })
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
    // generateInterviewReport({resume,selfDescription,jobDescription})
}

).catch((error)=>{
    console.log("Error in connecting to DB",error)
})

