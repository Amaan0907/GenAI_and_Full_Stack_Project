import mongoose,{Schema} from "mongoose"
/**
 * Job description:string
 * resume text:string
 * self description:string
 * matchScore:Number
 * 
 * technical questions:[{
 *  question:"",
 *  answer:"",
 *  intention:"",
 *          }]
 * behavioural question:[{
 *  question:"",
 *  answer:"",
 *  intention:"",
 *          }]
 * skill gaps:[{
 *  skill:"",
 *  severity:{
 *      type:string,
 *      enum:["low","medium","high"],
 *      
 *      }
 *          }]
 * preparation plan:[{
 *  day:Number,
 *  focus:String,
 *  tasks:[string]
 *        }]
 * 
 */

const technicalQuestionSchema = new Schema({
    question: {
        type: String,
        required: [true, "Technical question is required"]
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, { _id: false })

const behavioralQuestionSchema = new Schema({
    question: {
        type: String,
        required: [true, "Behavioral question is required"]  
    },
    intention: {
        type: String,
        required: [true, "Intention is required"]
    },
    answer: {
        type: String,
        required: [true, "Answer is required"]
    }
}, { _id: false })

const skillGapSchema = new Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,          
        enum: ["low", "medium", "high"],
        required: [true, "Severity is required"]
    },
    howToAddress: {            
        type: String,
        required: [true, "howToAddress is required"]
    }
}, { _id: false })

const preparationPlanSchema = new Schema({
    day: {
        type: Number,           
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks: [{
        type: String,
        required: [true, "Task is required"]
    }]
}, { _id: false })              

const strengthSchema = new Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    evidence: {
        type: String,
        required: [true, "Evidence is required"]
    }
}, { _id: false })

const interviewReportSchema = new Schema({
    jobDescription: {
        type: String,
        required: true
    },
    resume: {
        type: String
    },
    selfDescription: {
        type: String
    },
    title: {                   
        type: String
    },
    overview: {                 
        type: String
    },
    verdict: {                  
        type: String,
        enum: ["Strong Fit", "Good Fit", "Partial Fit", "Poor Fit"]
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    strengths: [strengthSchema],            
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],  
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema]

}, { timestamps: true })

export const InterviewReport = mongoose.model("InterviewReport", interviewReportSchema)