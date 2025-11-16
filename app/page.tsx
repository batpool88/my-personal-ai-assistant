"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ImageGenerator } from "@/components/image-generator"
import { TextGenerator } from "@/components/text-generator"
import { UseCases } from "@/components/use-cases"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "image" | "text">("home")

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "home" && (
        <>
          <HeroSection onGetStarted={() => setActiveTab("image")} />
          <UseCases />
        </>
      )}

      {activeTab === "image" && <ImageGenerator />}
      {activeTab === "text" && <TextGenerator />}
    </div>
  )
}
