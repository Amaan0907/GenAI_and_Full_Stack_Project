import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { asyncHandler } from "../utils/AsyncHandler.js";
const pdfParse = require("pdf-parse");
import { generateInterviewReport } from "../services/Ai.service.js";
import { InterviewReport } from "../models/interviewReport.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const generateInterviewController=asyncHandler(async(req,res)=>{
   

    const resumeContent= await( new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

    if(!resumeContent){
        throw new ApiError(500,"Problem in reaading resume file")
    }

    const {selfDescription,jobDescription}=req.body

    if(!selfDescription || !jobDescription){
        throw new ApiError(401,"Self Description and Job description is needed")
    }

    const interviewReportByAi=await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
    })

    if(!interviewReportByAi){
        throw new ApiError(500,"Problem in generating Report")
    }

    const interviewReport=await InterviewReport.create({
        user:req.user._id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    if(!interviewReport){
        throw new ApiError(500,"Report not saved on Database")
    }



    return res
    .status(200)
    .json(new ApiResponse(200,interviewReport.data,"Interview Report generated successfully"))

})



const getInterviewReport = asyncHandler(async(req,res)=>{
    const {interviewId}=req.params

    const interviewReport = await InterviewReport.findOne({_id:interviewId,user:req.user.id})

    if(!interviewReport){
        throw new ApiError(404,"Interview report not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,interviewReport,"interview report fetched successfully"))

})

const getInterviewReportByIdController=asyncHandler(async(req,res)=>{
    const interviewReports=await InterviewReport.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")
})

export {generateInterviewController,getInterviewReport,getInterviewReportByIdController}