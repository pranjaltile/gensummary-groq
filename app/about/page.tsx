'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About CV Summary Generator</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>A step-by-step guide to using our app</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-4">
            <li>
              <strong>Input Your CV:</strong> Paste your complete CV text into the provided textarea on the main page.
              <p className="mt-2 text-sm text-muted-foreground">
                The textarea is designed to handle large amounts of text, allowing you to input your entire CV regardless of its length. It&apos;s important to include all relevant information from your CV to ensure the most accurate summary generation.
              </p>
            </li>
            <li>
              <strong>Generate Summary:</strong> Click the &quot;Generate Summary&quot; button to start the AI-powered analysis.
              <p className="mt-2 text-sm text-muted-foreground">
                When you click this button, our application sends your CV text to our server-side processing pipeline. This triggers a series of operations including natural language processing and AI-driven analysis to extract the most relevant information from your CV.
              </p>
            </li>
            <li>
              <strong>Review Results:</strong> The AI-generated summary will appear below, highlighting key aspects of your CV.
              <p className="mt-2 text-sm text-muted-foreground">
                The generated summary is designed to be concise yet comprehensive. It typically includes your years of experience, primary industry, key skills, and notable achievements. This summary is streamed back to your browser in real-time, allowing you to see the results as they&apos;re generated.
              </p>
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Inner Workings</CardTitle>
          <CardDescription>The technology behind our CV summary generation</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="ai-model">AI Model</TabsTrigger>
              <TabsTrigger value="libraries">Libraries</TabsTrigger>
              <TabsTrigger value="server-actions">Server Actions</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <ul className="list-disc list-inside space-y-4">
                <li>
                  <strong>AI Model:</strong> We use a large language model (LLM) from Groq to analyze and summarize your CV.
                  <p className="mt-2 text-sm text-muted-foreground">
                    The Groq LLM is a state-of-the-art language model capable of understanding complex text structures and generating human-like summaries. It&apos;s particularly well-suited for tasks like CV analysis due to its ability to comprehend professional jargon and extract key information.
                  </p>
                </li>
                <li>
                  <strong>Natural Language Processing:</strong> The AI uses advanced NLP techniques to understand the context and content of your CV.
                  <p className="mt-2 text-sm text-muted-foreground">
                    Our NLP pipeline includes tokenization, named entity recognition, and semantic analysis. This allows the system to identify important elements like job titles, company names, skills, and achievements within the context of a CV.
                  </p>
                </li>
                <li>
                  <strong>Data Extraction:</strong> Key information such as years of experience and industry are automatically extracted.
                  <p className="mt-2 text-sm text-muted-foreground">
                    The system uses pattern recognition and contextual understanding to identify and extract crucial data points. For example, it can calculate total years of experience by analyzing job duration across multiple positions.
                  </p>
                </li>
                <li>
                  <strong>Summary Generation:</strong> The AI crafts a concise summary based on the most relevant information from your CV.
                  <p className="mt-2 text-sm text-muted-foreground">
                    Using the extracted data and understanding of the CV&apos;s content, the AI generates a coherent and concise summary. This summary is structured to highlight your professional profile, key skills, and most significant achievements in a format that&apos;s easy for potential employers or recruiters to quickly understand.
                  </p>
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="ai-model">
              <p className="mb-4">We use the Groq API to access their powerful language models. Here&apos;s a snippet of how we initialize the AI model:</p>
              <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                <code>{`import { ChatGroq } from "@langchain/groq"

const groq = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama3-8b-8192",
  temperature: 1,
  maxTokens: 1024,
})`}</code>
              </pre>
              <p className="mt-4">This model is capable of understanding complex CV structures and generating concise summaries. The &quot;llama3-8b-8192&quot; model we use is particularly adept at processing and summarizing long-form text, making it ideal for CV analysis.</p>
            </TabsContent>
            <TabsContent value="libraries">
              <p className="mb-4">Our application leverages several key libraries:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>LangChain:</strong> For building applications with large language models.</li>
                <li><strong>Next.js:</strong> Our React framework for building the user interface.</li>
                <li><strong>shadcn/ui:</strong> For pre-built, customizable UI components.</li>
              </ul>
              <p className="mt-4">Here&apos;s an example of how we use LangChain to create a processing chain:</p>
              <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                <code>{`import { PromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser } from "@langchain/core/output_parsers"
import { RunnableSequence } from "@langchain/core/runnables"

const prompt = PromptTemplate.fromTemplate(\`
  Create a 1 paragraph summary from the following CV:
  {cv}
\`)

const chain = RunnableSequence.from([
  prompt,
  groq,
  new StringOutputParser(),
])`}</code>
              </pre>
              <p className="mt-4">This chain allows us to process the CV text through a series of steps, including prompt formatting, AI processing, and output parsing, resulting in a structured and consistent summary output.</p>
            </TabsContent>
            <TabsContent value="server-actions">
              <p className="mb-4">We use Next.js Server Actions to handle the CV summary generation process securely on the server. Server Actions allow us to execute server-side code directly from client components, providing a seamless and secure way to process sensitive data like CV information.</p>
              <p className="mb-4">Here&apos;s a simplified version of our server action:</p>
              <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                <code>{`'use server'

import { ChatGroq } from "@langchain/groq"
import { PromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser } from "@langchain/core/output_parsers"
import { RunnableSequence } from "@langchain/core/runnables"

export async function generateCVSummary(cv: string): Promise<ReadableStream<Uint8Array>> {
  // Initialize AI model and create processing chain
  // ...

  const stream = await chain.stream({
    cv,
  })

  // Convert the stream to a ReadableStream for client-side consumption
  const encoder = new TextEncoder()
  return new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        controller.enqueue(encoder.encode(chunk))
      }
      controller.close()
    },
  })
}`}</code>
              </pre>
              <p className="mt-4">This server action is called from our client-side component, allowing us to process the CV securely on the server and stream the results back to the client in real-time. The use of streaming enables a responsive user experience, as the summary appears progressively as it&apos;s generated.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Privacy Note</AlertTitle>
        <AlertDescription>
          Your CV data is processed securely and is not stored after generating the summary. We prioritize your privacy and data security by using server-side processing and not retaining any personal information beyond the current session.
        </AlertDescription>
      </Alert>
    </div>
  )
}