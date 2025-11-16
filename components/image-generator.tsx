"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ParticleBackground } from "@/components/particle-background"

declare global {
  interface Window {
    puter?: {
      ai: {
        txt2img: (prompt: string, options?: { testMode?: boolean }) => Promise<HTMLImageElement>
      }
    }
  }
}

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState<string | null>(null)
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

      // Use Puter.js AI txt2img API with testMode set to false
      const imageElement = await window.puter.ai.txt2img(prompt, { testMode: false })
      
      // Extract the image source from the returned image element
      setImage(imageElement.src)
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
        <h2 className="text-3xl font-bold mb-8">Image Generator</h2>

        <Card className="p-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Describe your image</label>
              <Input
                placeholder="e.g., A serene landscape with mountains and lake"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleGenerate()}
                disabled={isLoading}
              />
            </div>

            <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
              {isLoading ? "Generating..." : "Generate Image"}
            </Button>

            {error && <p className="text-destructive text-sm">{error}</p>}
          </div>
        </Card>

        {image && (
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Generated Image</h3>
              <img src={image || "/placeholder.svg"} alt="Generated" className="w-full rounded-lg" />
            </div>
          </Card>
        )}
      </div>
    </section>
  )
}
