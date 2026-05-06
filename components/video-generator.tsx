"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ParticleBackground } from "@/components/particle-background"

export function VideoGenerator() {
  const [prompt, setPrompt] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl)
      }
    }
  }, [videoUrl])

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/generate-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(data?.error || "Failed to generate video")
      }

      const videoBlob = await response.blob()
      const nextVideoUrl = URL.createObjectURL(videoBlob)

      setVideoUrl((currentVideoUrl) => {
        if (currentVideoUrl) {
          URL.revokeObjectURL(currentVideoUrl)
        }

        return nextVideoUrl
      })
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
        <h2 className="text-3xl font-bold mb-8">Video Generator</h2>

        <Card className="p-6 mb-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Describe your video</label>
              <Textarea
                placeholder="e.g., A cinematic drone shot of a neon city at night in the rain"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isLoading}
                className="min-h-[120px]"
              />
            </div>

            <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
              {isLoading ? "Generating..." : "Generate Video"}
            </Button>

            <p className="text-sm text-muted-foreground">
              Video generation can take longer than text or image generation.
            </p>

            {error && <p className="text-destructive text-sm">{error}</p>}
          </div>
        </Card>

        {videoUrl && (
          <Card className="p-6">
            <div className="space-y-4">
              <h3 className="font-semibold">Generated Video</h3>
              <video src={videoUrl} controls className="w-full rounded-lg" />
            </div>
          </Card>
        )}
      </div>
    </section>
  )
}
