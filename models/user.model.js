import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=new Schema({
username:{
    type:String,
    required:true,
    unique:[true,"Username already Taken"],
    trim:true

},
email:{
    type:String,
    unique:[true,"User with this email already exists"],
    required:true,
    trim:true
},
fullname:{
    type:String,
    trim:true,   
},
password:{
    type:String,
    required:true,
    trim:true

},
refreshToken:{
    type:String
},
accessToken:{
    type:String
}

},{timestamps:true})

userSchema.pre("save",async function (){
    if(!this.isModified("password"))return
    return await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect=async function (password){
    return await bcrypt.compare(password,this.password)
}







export const User=mongoose.model("User",userSchema)