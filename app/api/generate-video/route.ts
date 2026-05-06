import {
  getErrorMessage,
  HF_VIDEO_MODEL,
  HF_VIDEO_PROVIDER,
  requireHuggingFaceClient,
} from '@/lib/huggingface'

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return Response.json({ error: 'Prompt is required' }, { status: 400 })
    }

    const client = requireHuggingFaceClient()
    const video = await client.textToVideo({
      model: HF_VIDEO_MODEL,
      provider: HF_VIDEO_PROVIDER,
      inputs: prompt,
      parameters: {
        num_frames: 49,
        num_inference_steps: 30,
      },
    })

    return new Response(video, {
      headers: {
        'Content-Type': video.type || 'video/mp4',
      },
    })
  } catch (error) {
    console.error('Video generation error:', error)
    return Response.json(
      { error: `Failed to generate video: ${getErrorMessage(error)}` },
      { status: 500 },
    )
  }
}
