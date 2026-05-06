"use client"

interface NavigationProps {
  activeTab: "home" | "image" | "text" | "video"
  setActiveTab: (tab: "home" | "image" | "text" | "video") => void
}

export function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  return (
    <nav className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
            AI
          </div>
          <span className="font-semibold text-lg">AI Assistant</span>
        </div>

        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab("home")}
            className={`text-sm font-medium transition ${
              activeTab === "home"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab("image")}
            className={`text-sm font-medium transition ${
              activeTab === "image"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Image Generator
          </button>
          <button
            onClick={() => setActiveTab("text")}
            className={`text-sm font-medium transition ${
              activeTab === "text"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Text Generator
          </button>
          <button
            onClick={() => setActiveTab("video")}
            className={`text-sm font-medium transition ${
              activeTab === "video"
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Video Generator
          </button>
        </div>
      </div>
    </nav>
  )
}
