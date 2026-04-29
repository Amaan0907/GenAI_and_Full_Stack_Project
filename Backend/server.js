import "./config.js"
import { app } from "./src/app.js"
import { connectToDB } from "./database.js"



connectToDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("ERROR:",error)
        throw error
    })
    const port = process.env.PORT || 3000
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })
    // generateInterviewReport({resume,selfDescription,jobDescription})
}

).catch((error)=>{
    console.log("Error in connecting to DB",error)
})

