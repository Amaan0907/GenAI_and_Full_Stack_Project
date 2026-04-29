import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { asyncHandler } from "../utils/AsyncHandler.js";
const pdfParse = require("pdf-parse");
import { generateInterviewReport } from "../services/Ai.service.js";
import { InterviewReport } from "../models/interviewReport.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const generateInterviewController=asyncHandler(async(req,res)=>{
   
    if (!req.file) {
        throw new ApiError(400, "Resume file is required")
    }

    const dataBuffer = req.file.buffer;
    const pdfData = await pdfParse(dataBuffer);
    const resumeText = pdfData.text;

    if(!resumeText){
        throw new ApiError(500,"Problem in reading resume file")
    }

    const {selfDescription,jobDescription}=req.body

    if(!selfDescription || !jobDescription){
        throw new ApiError(400,"Self Description and Job description is needed")
    }

    const interviewReportByAi=await generateInterviewReport({
        resume:resumeText,
        selfDescription,
        jobDescription,
    })

    if(!interviewReportByAi){
        throw new ApiError(500,"Problem in generating Report")
    }

    const interviewReport=await InterviewReport.create({
        user:req.user._id,
        resume:resumeText,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    if(!interviewReport){
        throw new ApiError(500,"Report not saved on Database")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,interviewReport,"Interview Report generated successfully"))

})



const getInterviewReport = asyncHandler(async(req,res)=>{
    const {interviewId}=req.params

    const interviewReport = await InterviewReport.findOne({_id:interviewId,user:req.user._id})

    if(!interviewReport){
        throw new ApiError(404,"Interview report not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,interviewReport,"interview report fetched successfully"))

})

const getInterviewReportByIdController=asyncHandler(async(req,res)=>{
    const interviewReports=await InterviewReport.find({user:req.user._id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    return res
    .status(200)
    .json(new ApiResponse(200,{interviewReports},"Interview reports fetched successfully"))
})

export {generateInterviewController,getInterviewReport,getInterviewReportByIdController}