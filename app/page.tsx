'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { generateCVSummary } from './actions/generate'

export default function CVSummaryGenerator() {
  const [cv, setCV] = useState('')
  const [summary, setSummary] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage('')
    setSummary('')
    if (!cv.trim()) {
      setErrorMessage("Please enter your CV before generating a summary.")
      return
    }
    setIsLoading(true)
    try {
      const stream = await generateCVSummary(cv)
      const reader = stream.getReader()
      const decoder = new TextDecoder()
      let accumulatedSummary = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        accumulatedSummary += chunk
        setSummary(accumulatedSummary)
      }
    } catch (error) {
      console.error("Error generating summary:", error)
      setErrorMessage("An error occurred while generating the summary. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>CV Input</CardTitle>
            <CardDescription>Paste your CV and get an AI-generated summary</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <Textarea
                placeholder="Paste your CV here..."
                value={cv}
                onChange={(e) => setCV(e.target.value)}
                rows={10}
                className="w-full mb-4"
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Summary'}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Generated Summary</CardTitle>
          </CardHeader>
          <CardContent>
            {errorMessage && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            {summary ? (
              <p className="whitespace-pre-wrap">{summary}</p>
            ) : (
              <p className="text-muted-foreground">Your summary will appear here...</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}