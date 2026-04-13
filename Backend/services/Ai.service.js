import { GoogleGenAI } from "@google/genai";
import {json, z} from "zod"
import zodToJsonSchema from "zod-to-json-schema"
const ai=new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
})

const interviewReportSchema = z.object({

    title: z.string()
        .describe("The title of the job for which the interview report is generated"),

    matchScore: z.number()
        .describe("A score between 0 and 100 indicating how well the candidate matches the job"),

    verdict: z.enum(["Strong Fit", "Good Fit", "Partial Fit", "Poor Fit"])
        .describe("Overall assessment of candidate fit for the role"),

    overview: z.string()
        .describe("A 3-4 sentence honest summary of the candidate's fit, strengths, and challenges"),

    strengths: z.array(z.object({
        skill: z.string()
            .describe("A skill or quality the candidate has that matches the job"),
        evidence: z.string()
            .describe("Evidence from resume or self-description supporting this strength")
    })).describe("List of candidate strengths that align well with the job requirements"),

    skillGaps: z.array(z.object({
        skill: z.string()
            .describe("The skill which the candidate is lacking"),
        severity: z.enum(["low", "medium", "high"])
            .describe("How critical this gap is for the role"),
        howToAddress: z.string()
            .describe("Specific suggestion on how to bridge this gap before the interview")
    })).describe("List of skill gaps in the candidate's profile along with severity"),

    technicalQuestions: z.array(z.object({
        question: z.string()
            .describe("The technical question likely to be asked in the interview"),
        intention: z.string()
            .describe("What the interviewer is really testing with this question"),
        answer: z.string()
            .describe("How to answer — key concepts, approach, what to avoid")
    })).describe("Technical questions likely to be asked with guidance on answering"),

    behavioralQuestions: z.array(z.object({
        question: z.string()
            .describe("The behavioral question likely to be asked in the interview"),
        intention: z.string()
            .describe("The underlying competency being evaluated"),
        answer: z.string()
            .describe("STAR framework guide — what to highlight and what result to emphasize")
    })).describe("Behavioral questions likely to be asked with STAR answer guidance"),

    preparationPlan: z.array(z.object({
        day: z.number()
            .describe("The day number starting from 1"),
        focus: z.string()
            .describe("The main focus area for this day"),
        tasks: z.array(z.string())
            .describe("Specific actionable tasks to complete on this day")
    })).describe("A 7-day preparation plan targeting skill gaps and interview readiness"),

})

async function generateInterviewReport({resume,selfDescription,jobDescription}) {

    const schema= zodToJsonSchema(interviewReportSchema)

    const rawPrompt =`You are an expert technical interviewer and career coach with 15+ years of experience hiring at top tech companies.

Analyze the candidate's resume, self description, and job description provided below. Generate a structured and honest interview preparation report.

---

RESUME:
{resume}

SELF DESCRIPTION:
{selfDescription}

JOB DESCRIPTION:
{jobDescription}

---

Generate the report by filling the following fields:

TITLE
Extract the exact job title from the job description.

MATCH SCORE
Give an honest score between 0 and 100 representing how well the candidate's profile matches the job requirements. Consider technical skills overlap, years of experience, domain knowledge, and project relevance. Do not inflate this score.

VERDICT
Choose exactly one of the following based on the match score:
- "Strong Fit" if score is 80 to 100
- "Good Fit" if score is 60 to 79
- "Partial Fit" if score is 40 to 59
- "Poor Fit" if score is 0 to 39

OVERVIEW
Write 3 to 4 sentences giving an honest summary of the candidate. Cover their strongest points, where they fall short, and whether they should pursue this role.

STRENGTHS
List 3 to 5 genuine strengths of the candidate that directly match the job requirements. For each strength provide:
- skill: the name of the strength or skill
- evidence: specific proof from the resume or self description

SKILL GAPS
List 3 to 5 honest gaps between the candidate profile and the job requirements. Only include real and important gaps. For each gap provide:
- skill: the name of the missing skill
- severity: exactly one of "low", "medium", or "high"
  - high means the skill is mandatory for the role and candidate has no evidence of it
  - medium means the skill is important and candidate has only partial experience
  - low means the skill is nice to have and has minor impact
- howToAddress: a specific and actionable suggestion to bridge this gap before the interview

TECHNICAL QUESTIONS
Generate 8 technical interview questions based on the job description tech stack and the candidate resume. For each question provide:
- question: a realistic and specific technical interview question
- intention: what the interviewer is actually testing with this question
- answer: a detailed answer guide covering key concepts to mention, the right approach to take, things to reference from the candidate's own projects, and what to avoid saying

BEHAVIORAL QUESTIONS
Generate 5 behavioral interview questions based on the candidate's project history and the soft skills required by the job. For each question provide:
- question: a realistic behavioral interview question
- intention: the underlying competency or soft skill being evaluated
- answer: a STAR format guide specifically tailored to this candidate's background, telling them which project or experience to reference, what action to highlight, and what result to emphasize

PREPARATION PLAN
Generate exactly 7 days of preparation. Prioritize high severity skill gaps in the first few days. Day 7 must always be mock interview and revision. For each day provide:
- day: the day number from 1 to 7
- focus: the single main topic or area to focus on that day
- tasks: a list of 3 to 4 specific and actionable tasks such as reading a specific topic, solving a set of problems, building a small project, or watching a tutorial on a named concept

---

IMPORTANT RULES:
- Always reference actual skills, project names, and tools from the inputs. Never be generic.
- Be honest. If the candidate is not a good fit, reflect that clearly in the score and verdict.
- Every task in the preparation plan must be concrete and actionable, not vague advice.
- Do not add any fields that are not listed above.
- Return only valid JSON. No markdown, no explanation, no extra text outside the JSON.`

const prompt=rawPrompt
.replace("{resume}",resume)
.replace("{selfDescription}",selfDescription)
.replace("{jobDescription}",jobDescription)


    const response=await ai.models.generateContent({
        
        model:"gemini-2.5-flash-lite",
        contents:prompt,
        config:{
            responseMimeType:"application/json",
            responseSchema:schema
        }
    })

    console.log(response.text)
}

export {generateInterviewReport}
