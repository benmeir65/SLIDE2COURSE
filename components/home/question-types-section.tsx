"use client"

import { useState } from "react"
import { questionTypes } from "@/lib/mock-data"
import {
  CircleDot,
  CheckSquare,
  Move,
  Layers,
  ArrowUpDown,
  MessageSquare,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CircleDot,
  CheckSquare,
  Move,
  Layers,
  ArrowUpDown,
  MessageSquare,
}

const previewContent: Record<string, React.ReactNode> = {
  "single-choice": (
    <div className="space-y-3 text-right">
      <p className="font-semibold text-foreground">מהו האברון האחראי על ייצור אנרגיה בתא?</p>
      <div className="space-y-2">
        {["ריבוזום", "מיטוכונדריה", "גולג'י", "ליזוזום"].map((opt, i) => (
          <div
            key={opt}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
              i === 1
                ? "border-success bg-success/10 text-foreground"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            <div
              className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-bold ${
                i === 1
                  ? "border-success bg-success text-success-foreground"
                  : "border-muted-foreground/30"
              }`}
            >
              {i === 1 ? "V" : ""}
            </div>
            <span>{opt}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  "multiple-choice": (
    <div className="space-y-3 text-right">
      <p className="font-semibold text-foreground">סמנו את כל המאפיינים של תאים פרוקריוטיים:</p>
      <div className="space-y-2">
        {[
          { text: "ללא גרעין", correct: true },
          { text: "DNA מעגלי", correct: true },
          { text: "מיטוכונדריה", correct: false },
          { text: "ריבוזומים", correct: true },
        ].map((opt) => (
          <div
            key={opt.text}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${
              opt.correct
                ? "border-success bg-success/10 text-foreground"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            <div
              className={`flex h-5 w-5 items-center justify-center rounded border-2 text-xs ${
                opt.correct
                  ? "border-success bg-success text-success-foreground"
                  : "border-muted-foreground/30"
              }`}
            >
              {opt.correct ? "V" : ""}
            </div>
            <span>{opt.text}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  "drag-drop-single": (
    <div className="space-y-4 text-right">
      <p className="font-semibold text-foreground">{"גררו כל מושג למקום המתאים:"}</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-3 text-center text-sm">
          <span className="text-muted-foreground">ייצור אנרגיה</span>
          <div className="mt-2 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
            מיטוכונדריה
          </div>
        </div>
        <div className="rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 p-3 text-center text-sm">
          <span className="text-muted-foreground">סינתוז חלבונים</span>
          <div className="mt-2 rounded-lg bg-primary/80 px-3 py-1.5 text-xs font-medium text-primary-foreground">
            ריבוזום
          </div>
        </div>
      </div>
    </div>
  ),
  "drag-drop-multi": (
    <div className="space-y-4 text-right">
      <p className="font-semibold text-foreground">{"מיינו את הפריטים לקטגוריות:"}</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
          <div className="mb-2 text-center text-sm font-semibold text-primary">תא צמחי</div>
          <div className="space-y-1.5">
            {["דופן תא", "כלורופלסט", "ואקואולה"].map((item) => (
              <div key={item} className="rounded-lg bg-card px-3 py-1.5 text-center text-xs shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-primary/15 bg-primary/5 p-3">
          <div className="mb-2 text-center text-sm font-semibold text-primary/80">תא בעלי חיים</div>
          <div className="space-y-1.5">
            {["צנטריול", "ליזוזום"].map((item) => (
              <div key={item} className="rounded-lg bg-card px-3 py-1.5 text-center text-xs shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),
  sorting: (
    <div className="space-y-3 text-right">
      <p className="font-semibold text-foreground">סדרו את שלבי חלוקת התא בסדר הנכון:</p>
      <div className="space-y-2">
        {[
          { text: "אינטרפאזה", num: 1 },
          { text: "פרופאזה", num: 2 },
          { text: "מטאפאזה", num: 3 },
          { text: "אנאפאזה", num: 4 },
          { text: "טלופאזה", num: 5 },
        ].map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 text-sm"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {item.num}
            </div>
            <span className="text-foreground">{item.text}</span>
            <ArrowUpDown className="mr-auto h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  ),
  "open-question": (
    <div className="space-y-3 text-right">
      <p className="font-semibold text-foreground">הסבירו את תהליך האוסמוזה במילים שלכם:</p>
      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {"אוסמוזה היא תהליך שבו מולקולות מים עוברות דרך ממברנה חדירה למחצה מאזור בו ריכוז המים גבוה לאזור בו ריכוז המים נמוך..."}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
          AI ציון: 88/100
        </Badge>
        <Badge variant="outline" className="border-border bg-muted text-muted-foreground">
          ממתין לאישור מורה
        </Badge>
      </div>
    </div>
  ),
}

export function QuestionTypesSection() {
  const [activeType, setActiveType] = useState("single-choice")

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            סוגי השאלות האינטראקטיביות
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            מגוון רחב של שאלות נוצרות אוטומטית מהמצגת שלכם.
            <br />
            כל מה שעליכם לעשות כדי שההמרה תעבוד, הוא לרשום אותן בתבנית הנכונה.
          </p>
          <div className="mt-6">
            <a
              href="/templates"
              className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90"
            >
              לתבניות השאלות
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-180">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Type Selector */}
          <div className="flex flex-row gap-2 overflow-x-auto lg:col-span-2 lg:flex-col lg:gap-1">
            {questionTypes.map((type) => {
              const Icon = iconMap[type.icon]
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-right text-sm font-medium transition-all ${
                    activeType === type.id
                      ? "border border-primary/20 bg-primary/10 text-primary shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {Icon && <Icon className="h-5 w-5 shrink-0" />}
                  <div>
                    <div className="font-semibold">{type.title}</div>
                    <div className="mt-0.5 hidden text-xs opacity-70 lg:block">
                      {type.description}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Preview */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm lg:p-8">
              {previewContent[activeType]}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
