"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Settings2 } from "lucide-react"

interface Setting {
  id: string
  label: string
  description: string
  defaultValue: boolean
}

const courseSettings: Setting[] = [
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

export function CourseSettings() {
  const [settings, setSettings] = useState<Record<string, boolean>>(
    Object.fromEntries(courseSettings.map((s) => [s.id, s.defaultValue]))
  )

  const toggleSetting = (id: string) => {
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Settings2 className="h-5 w-5 text-primary" />
          הגדרות קורס
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
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
      </CardContent>
    </Card>
  )
}
