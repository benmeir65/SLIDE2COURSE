import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles } from "lucide-react"

export function CtaSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-10 text-center lg:p-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary">
              <Sparkles className="h-4 w-4" />
              <span>התחילו בחינם עוד היום</span>
            </div>

            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold text-foreground md:text-4xl">
              מוכנים להפוך את המצגות שלכם לקורסים?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-muted-foreground">
              העלו מצגת, הגדירו שאלות, ותנו לתלמידים ללמוד בקצב שלהם - הכל בלי עלות
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                className="h-12 rounded-xl bg-secondary px-8 text-base text-secondary-foreground hover:bg-secondary/90"
                asChild
              >
                <Link href="/teacher-register">
                  הרשמה כמורה
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-primary/30 px-8 text-base text-primary hover:bg-primary/5"

                asChild
              >
                <Link href="/converter">יצירת קורס ראשון</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
