"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import {
  Upload,
  Link2,
  Info,
  FileUp,
  ArrowRight,
  Settings2,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"

const courseSettings = [
  {
    id: "ai-scoring",
    label: "ניקוד AI אוטומטי",
    description: "בינה מלאכותית תחשב את הניקוד של כל שאלה לפי מספר השאלות",
    defaultValue: true,
  },
  {
    id: "show-grade",
    label: "הצגת ציון לתלמיד",
    description: "התלמיד יראה את הציון הסופי בסיום הקורס",
    defaultValue: true,
  },
  {
    id: "immediate-feedback",
    label: "משוב מידי",
    description: "הצגת משוב לאחר כל שאלה (במקום בסוף בלבד)",
    defaultValue: false,
  },
  {
    id: "ai-open-check",
    label: "בדיקת AI לשאלות פתוחות",
    description: "הפעלת בדיקה אוטומטית לתשובות טקסטואליות",
    defaultValue: true,
  },
  {
    id: "free-navigation",
    label: "ניווט חופשי",
    description: "התלמיד יכול לעבור בין יחידות בחופשיות (ללא נעילה)",
    defaultValue: false,
  },
  {
    id: "show-per-question-score",
    label: "הצגת ניקוד לכל שאלה",
    description: "הצגת הניקוד של כל שאלה בנפרד לתלמיד",
    defaultValue: true,
  },
]

export default function NewCoursePage() {
  const [courseName, setCourseName] = useState("")
  const [linkValue, setLinkValue] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [settings, setSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(courseSettings.map((s) => [s.id, s.defaultValue]))
  )

  const toggleSetting = (id: string) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 lg:px-8">
      {/* Back link */}
      <Link
        href="/converter"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowRight className="h-4 w-4" />
        חזרה לספריית הקורסים
      </Link>

      <h1 className="mb-2 text-3xl font-bold text-foreground">יצירת קורס חדש</h1>
      <p className="mb-8 text-muted-foreground">
        תנו שם לקורס, העלו מצגת והגדירו את ההגדרות
      </p>

      <div className="space-y-8">
        {/* Course Name */}
        <Card className="rounded-2xl">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor="course-name" className="text-sm font-semibold">
                שם הקורס
              </Label>
              <Input
                id="course-name"
                placeholder="לדוגמה: מבוא לביולוגיה"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="text-base"
              />
            </div>
          </CardContent>
        </Card>

        {/* Upload Presentation */}
        <Card className="rounded-2xl">
          <CardContent className="pt-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">העלאת מצגת</h2>

            {/* Link Input */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="presentation-link" className="text-sm font-semibold">
                  קישור למצגת
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs text-right" dir="rtl">
                      <p>
                        הדביקו קישור מ-OneDrive או מ-Canva. ודאו שהמצגת משותפת
                        לצפייה ציבורית.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="relative">
                <Link2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="presentation-link"
                  placeholder="https://onedrive.live.com/... או https://canva.com/..."
                  value={linkValue}
                  onChange={(e) => setLinkValue(e.target.value)}
                  className="pr-10 text-left"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 flex items-center gap-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm text-muted-foreground">או</span>
              <div className="h-px flex-1 bg-border" />
            </div>

            {/* File Upload */}
            <div
              className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40"
              }`}
              onDragOver={(e) => {
                e.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setIsDragging(false)
              }}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <FileUp className="h-7 w-7 text-primary" />
              </div>
              <p className="mb-1 text-sm font-semibold text-foreground">
                גררו קובץ לכאן
              </p>
              <p className="mb-4 text-xs text-muted-foreground">
                PPTX, PDF - עד 50MB
              </p>
              <Button variant="outline" size="sm">
                <Upload className="ml-2 h-4 w-4" />
                בחירת קובץ
              </Button>
            </div>

            {/* Yellow slide note */}
            <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#FFD966]">
                <span className="text-xs font-bold text-amber-900">A</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-amber-900">
                  שקופיות כותרת צהובות
                </p>
                <p className="mt-1 text-xs leading-relaxed text-amber-800">
                  שקופית עם רקע צהוב מסמנת תחילת יחידה חדשה בקורס. כל יחידה תופיע
                  כטאב נפרד בתפריט הניווט.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Settings */}
        <Card className="rounded-2xl">
          <CardContent className="pt-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Settings2 className="h-5 w-5 text-primary" />
              הגדרות קורס
            </h2>
            <div className="space-y-5">
              {courseSettings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex-1 space-y-0.5">
                    <Label
                      htmlFor={setting.id}
                      className="text-sm font-medium text-foreground"
                    >
                      {setting.label}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                  <Switch
                    id={setting.id}
                    checked={settings[setting.id]}
                    onCheckedChange={() => toggleSetting(setting.id)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <Button
          className="w-full rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/90"
          size="lg"
          disabled={!courseName || !linkValue}
        >
          המרה לקורס
        </Button>
      </div>
    </div>
  )
}
