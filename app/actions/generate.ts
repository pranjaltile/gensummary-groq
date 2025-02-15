'use server'

import { ChatGroq } from "@langchain/groq"
import { PromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser } from "@langchain/core/output_parsers"
import { RunnableSequence } from "@langchain/core/runnables"

const groq = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama3-8b-8192",
  temperature: 0.2,
  maxTokens: 1024,
})

const prompt = PromptTemplate.fromTemplate(`
Create a 2 paragraph summary from the following CV using this format:

"[Number] years working in [Industry]. 2nd sentence is a short sentence with some of the recent companies and highlight some recent relevant projects."

Instructions:
1. Replace [Number] with the calculated number of years of experience based on the CV.
2. Replace [Industry]  based on the companies mentioned in the CV. If Industries can't be determined, mention the company name instead with the correct grammar.  
3. Provide a concise summary of the person's experience, projects, and key technologies.
4. Start directly with the summary content. DO NOT include any introductory phrases.
5. Ensure the response begins immediately with "[Number] years working in [Industry]".
6. Do not include any text before or after the summary paragraph.

CV:
{cv}

Summary:
`)

const chain = RunnableSequence.from([
  prompt,
  groq,
  new StringOutputParser(),
])

export async function generateCVSummary(cv: string): Promise<ReadableStream<Uint8Array>> {
  console.log("Generating CV summary for:", cv.substring(0, 200) + "...")
  
  try {
    const stream = await chain.stream({
      cv,
    })

    const encoder = new TextEncoder()
    return new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(encoder.encode(chunk))
        }
        controller.close()
      },
    })
  } catch (error) {
    console.error("Error generating CV summary:", error)
    throw new Error("Error generating CV summary")
  }
}