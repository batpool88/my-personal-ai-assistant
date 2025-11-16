import { experimental_generateImage } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 })
    }

    const image = await experimental_generateImage({
      model: openai("dall-e-3"),
      prompt,
      size: "1024x1024",
    })

    return Response.json({ imageUrl: image.url })
  } catch (error) {
    console.error("Image generation error:", error)
    return Response.json({ error: "Failed to generate image" }, { status: 500 })
  }
}
