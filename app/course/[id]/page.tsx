"use client"

import { useState } from "react"
import { mockCourses, mockCourseUnits } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ChevronRight,
  ChevronLeft,
  BookOpen,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react"

const course = mockCourses[0]

const mockSlides = [
  {
    id: "1",
    type: "content" as const,
    title: "מהו תא?",
    content:
      "התא הוא יחידת החיים הבסיסית. כל אורגניזם חי מורכב מתא אחד או יותר. התא מכיל את כל החומרים והמבנים הדרושים לקיום חיים.",
    image: null,
  },
  {
    id: "2",
    type: "content" as const,
    title: "סוגי תאים",
    content:
      "ישנם שני סוגים עיקריים של תאים: תאים פרוקריוטיים (כמו חיידקים) ותאים אוקריוטיים (כמו תאי צמחים ובעלי חיים). ההבדל המרכזי הוא נוכחות גרעין עטוף ממברנה.",
    image: null,
  },
  {
    id: "3",
    type: "question" as const,
    title: "שאלת בדיקה",
    questionType: "single-choice",
    question: "מהו האברון האחראי על ייצור אנרגיה בתא?",
    options: ["ריבוזום", "מיטוכונדריה", "גולג'י", "ליזוזום"],
    correctAnswer: 1,
  },
  {
    id: "4",
    type: "content" as const,
    title: "מבנה קרום התא",
    content:
      "קרום התא (ממברנה) הוא מבנה דק המקיף את התא ומפריד בין תוכן התא לסביבתו. הקרום בנוי ממודל הפסיפס הנוזלי - שכבה כפולה של זרחנים עם חלבונים המשובצים בה.",
    image: null,
  },
  {
    id: "5",
    type: "question" as const,
    title: "שאלת בדיקה",
    questionType: "multiple-choice",
    question: "סמנו את כל המאפיינים של תאים פרוקריוטיים:",
    options: [
      { text: "ללא גרעין", correct: true },
      { text: "DNA מעגלי", correct: true },
      { text: "מיטוכונדריה", correct: false },
      { text: "ריבוזומים", correct: true },
    ],
  },
]

export default function CourseViewerPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [selectedMultiple, setSelectedMultiple] = useState<boolean[]>([])
  const [showResult, setShowResult] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeUnit, setActiveUnit] = useState(0)

  const slide = mockSlides[currentSlide]
  const totalSlides = mockSlides.length
  const progressPercent = ((currentSlide + 1) / totalSlides) * 100

  function handleNext() {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1)
      setSelectedAnswer(null)
      setSelectedMultiple([])
      setShowResult(false)
    }
  }

  function handlePrev() {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
      setSelectedAnswer(null)
      setSelectedMultiple([])
      setShowResult(false)
    }
  }

  function handleCheckAnswer() {
    setShowResult(true)
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/30 lg:flex-row">
      {/* Sidebar - Units */}
      <aside
        className={`border-l border-border bg-card transition-all ${
          sidebarOpen ? "w-full lg:w-80" : "w-0 overflow-hidden"
        }`}
      >
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">יחידות הקורס</h2>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-1">
            {mockCourseUnits.map((unit, index) => (
              <button
                key={unit.id}
                onClick={() => setActiveUnit(index)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-right text-sm transition-colors ${
                  activeUnit === index
                    ? "bg-primary/10 text-primary font-semibold"
                    : unit.completed
                      ? "text-foreground hover:bg-muted"
                      : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {unit.completed ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                ) : index > 3 ? (
                  <Lock className="h-4 w-4 shrink-0 text-muted-foreground/50" />
                ) : (
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-current text-[10px] font-bold">
                    {index + 1}
                  </div>
                )}
                <span className="flex-1 truncate">{unit.title}</span>
                <span className="text-xs text-muted-foreground">
                  {unit.slides}
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Bar */}
        <div className="flex items-center gap-4 border-b border-border bg-card px-4 py-3">
          {!sidebarOpen && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <BookOpen className="h-4 w-4" />
            </Button>
          )}
          <div className="flex-1">
            <h1 className="text-sm font-bold text-foreground lg:text-base">
              {course.title}
            </h1>
            <div className="mt-1 flex items-center gap-3">
              <Progress value={progressPercent} className="h-1.5 flex-1" />
              <span className="text-xs text-muted-foreground">
                {currentSlide + 1 + "/" + totalSlides}
              </span>
            </div>
          </div>
        </div>

        {/* Slide Content */}
        <div className="flex flex-1 items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-3xl">
            {slide.type === "content" ? (
              <div className="space-y-6">
                <Badge variant="outline" className="text-xs">
                  {"שקף " + (currentSlide + 1)}
                </Badge>
                <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                  {slide.title}
                </h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {slide.content}
                </p>
              </div>
            ) : slide.type === "question" && "question" in slide ? (
              <div className="space-y-6">
                <Badge className="bg-primary text-primary-foreground">
                  {slide.questionType === "single-choice"
                    ? "בחירה יחידה"
                    : "בחירה מרובה"}
                </Badge>
                <h2 className="text-xl font-bold text-foreground md:text-2xl">
                  {slide.question}
                </h2>

                {slide.questionType === "single-choice" && "options" in slide && Array.isArray(slide.options) ? (
                  <div className="space-y-3">
                    {(slide.options as string[]).map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedAnswer(i)}
                        className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-right text-sm transition-all ${
                          showResult
                            ? i === ("correctAnswer" in slide ? slide.correctAnswer : -1)
                              ? "border-success bg-success/10 text-foreground"
                              : selectedAnswer === i
                                ? "border-destructive bg-destructive/10 text-foreground"
                                : "border-border bg-card text-muted-foreground"
                            : selectedAnswer === i
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border bg-card text-muted-foreground hover:border-primary/30"
                        }`}
                      >
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold ${
                            showResult
                              ? i === ("correctAnswer" in slide ? slide.correctAnswer : -1)
                                ? "border-success bg-success text-success-foreground"
                                : selectedAnswer === i
                                  ? "border-destructive bg-destructive text-destructive-foreground"
                                  : "border-muted-foreground/30"
                              : selectedAnswer === i
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-muted-foreground/30"
                          }`}
                        >
                          {String.fromCharCode(1488 + i)}
                        </div>
                        <span>{opt}</span>
                      </button>
                    ))}
                  </div>
                ) : slide.questionType === "multiple-choice" && "options" in slide ? (
                  <div className="space-y-3">
                    {(slide.options as Array<{ text: string; correct: boolean }>).map(
                      (opt, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            const newSelected = [...selectedMultiple]
                            newSelected[i] = !newSelected[i]
                            setSelectedMultiple(newSelected)
                          }}
                          className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-right text-sm transition-all ${
                            showResult
                              ? opt.correct
                                ? "border-success bg-success/10 text-foreground"
                                : selectedMultiple[i]
                                  ? "border-destructive bg-destructive/10 text-foreground"
                                  : "border-border bg-card text-muted-foreground"
                              : selectedMultiple[i]
                                ? "border-primary bg-primary/10 text-foreground"
                                : "border-border bg-card text-muted-foreground hover:border-primary/30"
                          }`}
                        >
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded border-2 text-xs ${
                              showResult
                                ? opt.correct
                                  ? "border-success bg-success text-success-foreground"
                                  : selectedMultiple[i]
                                    ? "border-destructive bg-destructive text-destructive-foreground"
                                    : "border-muted-foreground/30"
                                : selectedMultiple[i]
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-muted-foreground/30"
                            }`}
                          >
                            {(selectedMultiple[i] || (showResult && opt.correct)) && "V"}
                          </div>
                          <span>{opt.text}</span>
                        </button>
                      )
                    )}
                  </div>
                ) : null}

                {!showResult ? (
                  <Button
                    onClick={handleCheckAnswer}
                    disabled={
                      selectedAnswer === null &&
                      !selectedMultiple.some(Boolean)
                    }
                    className="rounded-xl"
                  >
                    בדוק תשובה
                  </Button>
                ) : (
                  <div className="rounded-xl border border-success/30 bg-success/10 p-4">
                    <p className="text-sm font-medium text-foreground">
                      {selectedAnswer ===
                      ("correctAnswer" in slide ? slide.correctAnswer : -1)
                        ? "כל הכבוד! תשובה נכונה"
                        : "לא מדויק. נסו שוב בפעם הבאה"}
                    </p>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-border bg-card px-4 py-3">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className="rounded-lg"
          >
            <ArrowRight className="ml-2 h-4 w-4" />
            הקודם
          </Button>
          <span className="text-sm text-muted-foreground">
            {"שקף " + (currentSlide + 1) + " מתוך " + totalSlides}
          </span>
          <Button
            onClick={handleNext}
            disabled={currentSlide === totalSlides - 1}
            className="rounded-lg"
          >
            הבא
            <ChevronLeft className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
