import {
  getErrorMessage,
  HF_IMAGE_MODEL,
  HF_IMAGE_PROVIDER,
  requireHuggingFaceClient,
} from '@/lib/huggingface'

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 })
    }

    const client = requireHuggingFaceClient()
    const image = await client.textToImage({
      model: HF_IMAGE_MODEL,
      provider: HF_IMAGE_PROVIDER,
      inputs: prompt,
      parameters: {
        width: 1024,
        height: 1024,
        num_inference_steps: 28,
      },
    })

    return new Response(image, {
      headers: {
        'Content-Type': image.type || 'image/png',
      },
    })
  } catch (error) {
    console.error("Image generation error:", error)
    return Response.json(
      { error: `Failed to generate image: ${getErrorMessage(error)}` },
      { status: 500 },
    )
  }
}
