"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    particlesJS: any
  }
}

export function ParticleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load particles.js library
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"
    script.async = true
    script.onload = () => {
      if (window.particlesJS && containerRef.current) {
        window.particlesJS("particle-container", {
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#00d9ff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: 0.2 },
            size: { value: 3, random: 2 },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#00d9ff",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              out_mode: "bounce",
              bounce: true,
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "grab" },
              onclick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              grab: { distance: 200, line_linked: { opacity: 1 } },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 },
            },
          },
          retina_detect: true,
        })
      }
    }
    document.body.appendChild(script)

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div
      id="particle-container"
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  )
}
