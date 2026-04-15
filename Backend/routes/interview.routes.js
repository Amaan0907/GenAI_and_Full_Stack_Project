import express from "express"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/file.middleware.js"
import { generateInterviewController } from "../controllers/interview.controller.js"


const interviewRouter=express.Router()

/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user self description,resume pdf,and job description
 * @access private
 */

interviewRouter.route("/").post(verifyJwt,upload.single("resume"),generateInterviewController)



export {interviewRouter}