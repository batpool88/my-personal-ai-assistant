import { InferenceClient } from '@huggingface/inference'

const huggingFaceToken = process.env.HF_TOKEN

export const hf = huggingFaceToken
  ? new InferenceClient(huggingFaceToken)
  : null

export const HF_TEXT_MODEL = 'deepseek-ai/DeepSeek-V4-Flash:novita'
export const HF_IMAGE_MODEL = 'black-forest-labs/FLUX.1-Krea-dev'
export const HF_IMAGE_PROVIDER = 'fal-ai'
export const HF_VIDEO_MODEL = 'Wan-AI/Wan2.2-T2V-A14B'
export const HF_VIDEO_PROVIDER = 'fal-ai'

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  return 'Unknown error'
}

export function requireHuggingFaceClient() {
  if (!hf) {
    throw new Error('HF_TOKEN is not configured on the server.')
  }

  return hf
}
