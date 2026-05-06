import {
  getErrorMessage,
  HF_TEXT_MODEL,
  requireHuggingFaceClient,
} from '@/lib/huggingface'

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 })
    }

    const client = requireHuggingFaceClient()
    const response = await client.chatCompletion({
      model: HF_TEXT_MODEL,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 400,
      temperature: 0.7,
    })

    const text = response.choices[0]?.message?.content

    if (!text || typeof text !== 'string') {
      throw new Error('No text was returned by the model.')
    }

    return Response.json({ text: text.trim() })
  } catch (error) {
    console.error("Text generation error:", error)
    return Response.json(
      { error: `Failed to generate text: ${getErrorMessage(error)}` },
      { status: 500 },
    )
  }
}
