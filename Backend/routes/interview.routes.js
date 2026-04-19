import express from "express"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/file.middleware.js"
import { generateInterviewController, getInterviewReport, getInterviewReportByIdController } from "../controllers/interview.controller.js"


const interviewRouter=express.Router()

/**
 * @route POST /api/interview
 * @description generate new interview report on the basis of user self description,resume pdf,and job description
 * @access private
 */

interviewRouter.route("/").post(verifyJwt,upload.single("resume"),generateInterviewController)


/**
 * @route GET /api/auth/interview/report/:interviewId
 * @description get interview report by interviewId
 * @access private
 */

interviewRouter.get("/report/:interviewId",verifyJwt,getInterviewReport)
/**
 * @route GET /api/auth/interview/
 * @description get all interview reports of the logged in user
 * @access private
 */

interviewRouter.get("/",verifyJwt,getInterviewReportByIdController)


export {interviewRouter}