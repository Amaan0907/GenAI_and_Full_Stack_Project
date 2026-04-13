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

const technicalQuestionSchema=new Schema({
    question:{
        type:String,
        required:[true,"Technical question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{
    _id:false
})
const behaviourialQuestionSchema=new Schema({
    question:{
        type:String,
        required:[true,"Technical question is required"]
    },
    intention:{
        type:String,
        required:[true,"Intention is required"]
    },
    answer:{
        type:String,
        required:[true,"Answer is required"]
    }
},{
    _id:false
})

const skillGaps= new Schema({
    skill: {
        type:String,
        required:[true,"Skills is required"]

    },
    severity: {
    type: string,
    enum: ["low", "medium", "high"],
    required:[true,"Severity is required"]
          
     }
             
},{
    _id:false
})

const preparationPlanSchema=new Schema({
    day:{
        typr:Number,
        required:[true,"Day is required"]
    },
    focus:{
        type:String,
        required:[true,"Focus is required"]
    },
    tasks:[{
        type:String,
        required:[true,"Task is required"]

    }]
})


const interviewReportSchema=new Schema({
    jobDescription:{
        type:String,
        required:true,

    },
    resume:{
        type:String
    },
    selfDescription:{
        type:String
    },
    matchScore:{
        type:Number,
        min:0,
        max:100
    }
},{timestamps:true})

export const InterviewReportModel = mongoose.model("InterviewReportModel",interviewReportSchema)