import {User} from "../models/user.model.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
// const bcrypt=require('bcrypt')
import {ApiResponse} from "../utils/ApiResponse.js"
import bcrypt from "bcrypt"


const generateAccessAndRefreshToken=async(userId)=>{
   
       console.log("userId received:", userId)        // ← add this
       console.log("userId type:", typeof userId)
     const user=await User.findById(userId)
     console.log(user)
 
     const accessToken=user.generateAccessToken()
     const refreshToken= user.generateRefreshToken()
     user.refreshToken=refreshToken
     await user.save({validateBeforeSave:false})
     return {accessToken,refreshToken}
 
   
    
}






/**
 * @name registerUser
 * @description register a new User
 * @access public
 */

const registerUser=asyncHandler(async(req,res)=>{

    
    const {username,email,password}=req.body
    if(
        [username,email,password].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"Username,email or password is missing")
    }

    const isUserExist= await User.findOne({
        $or:[{username},{email}]
    })

    if(isUserExist){
        throw new ApiError(400,"User already exist ")
    }

    
    const user= await User.create({
        username:username.toLowerCase(),
        email,
        password
    })

    const createdUser=await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500,"Problem in registring the User")
    }
    console.log(createdUser)

    return res
    .status(200)
    .json(new ApiResponse(200,createdUser,"User Craeted Successfully"))

})

const loginUser =asyncHandler(async(req,res)=>{

    const {username,password,email}=req.body

    if(
        !username && !email
    ){
        throw new ApiError(400,"Username or email is required")
    }

        

    const user=await User.findOne({
        $or:[{username},{email}]
    })
    if (!user){
        throw new ApiError(400,"User Does Not Exist Please Register")
    }
    console.log(user)

    const isPasswordValid = await user.isPasswordCorrect(password)

    console.log(isPasswordValid)

    if(!isPasswordValid){
        throw new ApiError(400,"Password is incorrect")
    }

    const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)

    const loggedInUser= await User.findById(user?._id).select("-password -refreshToken")

    const options={
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(

        200,{

        loggedInUser,
        accessToken,
        refreshToken

    },"user Logged in Successfully")
    )

})


export {
    registerUser,loginUser
}