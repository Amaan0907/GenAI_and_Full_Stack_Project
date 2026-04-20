import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

/**
 * @description generate interview report by providing job description,self description and resume file
 * 
 */
export const generateInterviewReport= async({jobDescription,selfDescription,resumeFile})=>{

    const formData=new FormData()
    formData.append("jobDescription",jobDescription)
    formData.append("selfDescription",selfDescription)
    formData.append("resume",resumeFile)

    const response = await api.post("/api/interview",formData,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })

    return response.data
}

/**
 * @description get an interview report by its ID
 */

export const getInterviewReportById=async(interviewId)=>{
    const response=await api.get(`/api/interview/report/${interviewId}`)
    return response.data
}
/**
 * @description get all interview reports of the logged in user
 * 
 */

export const getAllInterviewReports=async()=>{
    const response=await api.get("/api/interview/")
    return response.data
}