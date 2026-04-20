import {getAllInterviewReports,getInterviewReportById,generateInterviewReport} from "../services/interview.api.js"


import { useContext } from "react"
import { InterviewContext } from "../services/interview.context.jsx"



export const useInterview=()=>{
    const context=useContext(InterviewContext)

    if(!context){
        throw new Error("UseInterview must be within an Interview Context")
    }

    const {loading,setLoading,report,setReport,reports,setReports}=context

    const generateReport= async({jobDescription,selfDescription,resumeFile})=>{
        setLoading(true)
        let response=null
        try{
            response=await generateInterviewReport({jobDescription,selfDescription,resumeFile})
            setReport(response.interviewReport)
        }catch(error){
            console.log(error);
            
        }finally{
            setLoading(false)
        }
        return response?.interviewReport
    }

    const getReportById=async(interviewId)=>{
        setLoading(true)
        let response=null
        try {
            response=await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
        return response?.interviewReport
    }

    const getReports=async()=>{
        setLoading(true)
        let response = null

        try {
            response=await getAllInterviewReports()
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error);
            
        }finally{
            setLoading(false)
        }
        return response?.interviewReports 
    }

    return {loading,report,reports,generateReport,getReportById,getReports}


}