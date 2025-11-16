"use client"

import { ParticleBackground } from "./particle-background"

export function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative min-h-[500px] flex items-center justify-center px-4 py-20 overflow-hidden">
      <ParticleBackground />

      <div className="text-center max-w-2xl relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">AI-Powered Image & Text Tools</h1>
        <p className="text-lg text-muted-foreground mb-8 text-balance">
          Generate stunning images and create compelling text using advanced AI. Transform your creative ideas into
          reality in seconds.
        </p>
        <button
          onClick={onGetStarted}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
        >
          Get Started
        </button>
      </div>
    </section>
  )
}
