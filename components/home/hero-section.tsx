import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            <span>{'פלטפורמה חינוכית מבוססת AI'}</span>
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="block leading-tight">הפכו את המצגות שלכם</span>
            <span className="mt-3 block leading-tight text-cyan-500">
              לקורסים אינטראקטיביים
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            העלו מצגת מ-PowerPoint, מ-OneDrive או מ-Canva והפכו אותה לקורס ווב עם
            שאלות אינטראקטיביות, סנכרון חי של שינויים וחיווי בינה מלאכותית
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="h-12 rounded-xl bg-secondary px-8 text-base text-secondary-foreground hover:bg-secondary/90" asChild>
              <Link href="/converter">
                יצירת קורס חינם
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl px-8 text-base"
              asChild
            >
              <Link href="/templates">
                <Play className="ml-2 h-5 w-5" />
                איך זה עובד?
              </Link>
            </Button>
          </div>

          {/* Value props */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {[
              { icon: "🎯", label: "ניקוד אוטומטי לכל שאלה" },
              { icon: "🤖", label: "חיווי בינה מלאכותית לשאלות פתוחות" },
              { icon: "🔄", label: "סנכרון חי של שינויים" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 rounded-full bg-muted px-5 py-2.5 text-sm font-medium text-foreground">
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
