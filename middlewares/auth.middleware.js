import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/AsyncHandler";
import jwt from "jsonwebtoken"




export const verifyJwt=asyncHandler(async(req,_,next)=>{
    
try {
        const token=req.cookies?.accessToken||
        req.headers("Authorization")?.replace("Bearer ","")
    
        if(!token){
            throw new ApiError(401,"Unauthorized access")
    
        }
    
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user=await User.findOne(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            throw new ApiError(401,"Invalid Access Token")
        }
    
        req.user=user
    
        next()
    
} catch (error) {
    throw new ApiError(401,error?.message)
}

    
})
