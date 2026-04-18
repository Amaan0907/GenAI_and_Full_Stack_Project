import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "The title of the job for which the interview report is generated"
        },
        matchScore: {
            type: Type.NUMBER,
            description: "A score between 0 and 100 indicating how well the candidate matches the job"
        },
        verdict: {
            type: Type.STRING,
            enum: ["Strong Fit", "Good Fit", "Partial Fit", "Poor Fit"],
            description: "Overall assessment of candidate fit for the role"
        },
        overview: {
            type: Type.STRING,
            description: "A 3-4 sentence honest summary of the candidate's fit, strengths, and challenges"
        },
        strengths: {
            type: Type.ARRAY,
            description: "List of candidate strengths that align well with the job requirements",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: {
                        type: Type.STRING,
                        description: "A skill or quality the candidate has that matches the job"
                    },
                    evidence: {
                        type: Type.STRING,
                        description: "Evidence from resume or self-description supporting this strength"
                    }
                },
                required: ["skill", "evidence"]
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            description: "List of skill gaps in the candidate's profile along with severity",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: {
                        type: Type.STRING,
                        description: "The skill which the candidate is lacking"
                    },
                    severity: {
                        type: Type.STRING,
                        enum: ["low", "medium", "high"],
                        description: "How critical this gap is for the role"
                    },
                    howToAddress: {
                        type: Type.STRING,
                        description: "Specific suggestion on how to bridge this gap before the interview"
                    }
                },
                required: ["skill", "severity", "howToAddress"]
            }
        },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "Technical questions likely to be asked with guidance on answering",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: {
                        type: Type.STRING,
                        description: "The technical question likely to be asked in the interview"
                    },
                    intention: {
                        type: Type.STRING,
                        description: "What the interviewer is really testing with this question"
                    },
                    answer: {
                        type: Type.STRING,
                        description: "How to answer — key concepts, approach, what to avoid"
                    }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            description: "Behavioral questions likely to be asked with STAR answer guidance",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: {
                        type: Type.STRING,
                        description: "The behavioral question likely to be asked in the interview"
                    },
                    intention: {
                        type: Type.STRING,
                        description: "The underlying competency being evaluated"
                    },
                    answer: {
                        type: Type.STRING,
                        description: "STAR framework guide — what to highlight and what result to emphasize"
                    }
                },
                required: ["question", "intention", "answer"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "A 7-day preparation plan targeting skill gaps and interview readiness",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: {
                        type: Type.NUMBER,
                        description: "The day number starting from 1"
                    },
                    focus: {
                        type: Type.STRING,
                        description: "The main focus area for this day"
                    },
                    tasks: {
                        type: Type.ARRAY,
                        description: "Specific actionable tasks to complete on this day",
                        items: {
                            type: Type.STRING
                        }
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        }
    },
    required: [
        "title", 
        "matchScore", 
        "verdict", 
        "overview", 
        "strengths", 
        "skillGaps", 
        "technicalQuestions", 
        "behavioralQuestions", 
        "preparationPlan"
    ]
};

async function generateInterviewReport({resume,selfDescription,jobDescription}) {

    const prompt = `Generate an interview report for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}
`;

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportSchema,
        }
    });
    console.log(response.text);
    
    return JSON.parse(response.text);
}

export {generateInterviewReport};
