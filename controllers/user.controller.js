import {User} from "../models/user.model.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
// const bcrypt=require('bcrypt')

import {ApiResponse} from "../utils/ApiResponse.js"


/**
 * @name registerUser
 * @description register a new User
 * @access public
 */


const registerUser=asyncHandler(async(req,res)=>{

    
    const {username,email,password}=req.body
    if(
        ['username','email','password'].some((field)=>field?.trim()==="")
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
        username,
        email,
        password
    })

    const createdUser=await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(500,"Problem in registring the User")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,createdUser,"User Craeted Successfully"))

})



export {
    registerUser
}