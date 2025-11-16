"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ParticleBackground } from "@/components/particle-background"

declare global {
  interface Window {
    puter?: {
      ai: {
        chat: (prompt: string) => Promise<string>
      }
    }
  }
}

export function TextGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [generatedText, setGeneratedText] = useState("")
  const [error, setError] = useState("")

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Check if Puter.js is loaded
      if (!window.puter || !window.puter.ai) {
        throw new Error("Puter.js is not loaded. Please refresh the page.")
      }

      // Use Puter.js AI chat API
      const response = await window.puter.ai.chat(prompt)
      setGeneratedText(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative min-h-screen px-4 py-12 overflow-hidden">
      <ParticleBackground />
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold mb-8">Text Generator</h2>

        <Card className="p-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">What would you like to generate?</label>
              <Textarea
                placeholder="e.g., Write a professional email about a project update"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
                className="min-h-[120px]"
              />
            </div>

            <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
              {isLoading ? "Generating..." : "Generate Text"}
            </Button>

            {error && <p className="text-destructive text-sm">{error}</p>}
          </div>
        </Card>

        {generatedText && (
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Generated Text</h3>
              <Textarea value={generatedText} readOnly className="min-h-[200px]" />
              <Button onClick={() => navigator.clipboard.writeText(generatedText)} variant="outline">
                Copy to Clipboard
              </Button>
            </div>
          </Card>
        )}
      </div>
    </section>
  )
}
