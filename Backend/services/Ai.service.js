import { GoogleGenAI } from "@google/genai";

const ai=new GoogleGenAI({
    apiKey:process.env.GOOGLE_GENAI_API_KEY
})

async function invokeGemini() {
    const response=await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:"hello gemini ! explain what is interview"
    })

    console.log(response.text)
}

export {invokeGemini}
