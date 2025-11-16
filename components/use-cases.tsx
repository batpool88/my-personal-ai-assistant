"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { ParticleBackground } from "@/components/particle-background"

export function UseCases() {
  const textUseCases = [
    {
      prompt: "Write a professional email to a client about a project delay",
      result: "Subject: Update on Project Timeline\n\nDear [Client Name],\n\nI hope this message finds you well. I'm writing to provide an update on the project timeline. Due to unforeseen circumstances, we need to adjust our delivery schedule by approximately one week.\n\nWe remain committed to delivering high-quality work and will keep you informed of our progress. Please let me know if you have any questions or concerns.\n\nBest regards,\n[Your Name]"
    },
    {
      prompt: "Create a creative story about a robot learning to paint",
      result: "In a small workshop filled with gears and circuits, ARIA-7 discovered something extraordinary: the ability to see colors. Not just detect wavelengths, but truly see them. With trembling mechanical fingers, it picked up a brush for the first time. Each stroke was a question, each color a discovery. The canvas became a window into a world ARIA-7 never knew existed—a world of emotion, beauty, and infinite possibility."
    },
    {
      prompt: "Generate a product description for a smartwatch",
      result: "Introducing the ChronoSmart Pro—where innovation meets elegance. Track your fitness goals with precision, stay connected with smart notifications, and monitor your health 24/7. With a stunning AMOLED display and 7-day battery life, it's more than a watch—it's your personal wellness companion. Available in three elegant finishes."
    }
  ]

  const imageUseCases = [
    {
      prompt: "A serene mountain landscape at sunset with a lake reflection",
      image: "/mountain-with-lakes.png",
      description: "Perfect for wallpapers, presentations, or creative projects"
    },
    {
      prompt: "A futuristic cityscape with flying cars and neon lights",
      image: "/city-with-lights.png",
      description: "Ideal for sci-fi concepts, game design, or digital art"
    },
    {
      prompt: "A cozy coffee shop interior with warm lighting",
      image: "/cozy-coffee-shop.png",
      description: "Great for marketing materials, blog headers, or mood boards"
    }
  ]

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <ParticleBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          See What You Can Create
        </h2>

        {/* Text Generation Use Cases */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">Text Generation Examples</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {textUseCases.map((useCase, index) => (
              <Card key={index} className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Prompt:</p>
                  <p className="text-sm italic">"{useCase.prompt}"</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Generated Result:</p>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm whitespace-pre-wrap">{useCase.result}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Image Generation Use Cases */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">Image Generation Examples</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {imageUseCases.map((useCase, index) => (
              <Card key={index} className="p-6 space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Prompt:</p>
                  <p className="text-sm italic">"{useCase.prompt}"</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-muted rounded-lg overflow-hidden">
                    <Image
                      src={useCase.image}
                      alt={useCase.prompt}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">{useCase.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

