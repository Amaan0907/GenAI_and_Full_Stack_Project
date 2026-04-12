import mongoose from "mongoose";


export async function connectToDB(){
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
    
        console.log("Connected to Database")
    } catch (error) {
        console.log(error)
    }
}