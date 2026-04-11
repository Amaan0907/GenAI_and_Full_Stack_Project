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
}

},{timestamps:true})

userSchema.pre("save",async function (){
    if(!this.isModified("password"))return 
    this.password= await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect=async function (password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken= function(){
    return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email,
        fullname:this.fullname
    },
        process.env.ACCESS_TOKEN_SECRET
    ,{
       expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}
userSchema.methods.generateRefreshToken= function(){
    return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email,
        fullname:this.fullname
    },
        process.env.REFRESH_TOKEN_SECRET
    ,{
       expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}









export const User =mongoose.model("User",userSchema)