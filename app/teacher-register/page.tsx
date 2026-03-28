import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GraduationCap, Globe, BookOpen, BarChart3, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "רישום מורה | SlidesUp Learning",
  description: "הירשמו כמורה וקבלו גישה מלאה ליצירת קורסים וניהול כיתות",
}

const benefits = [
  {
    icon: BookOpen,
    text: "יצירת קורסים אינטראקטיביים ללא הגבלה",
  },
  {
    icon: Users,
    text: "ניהול כיתות ותלמידים ממקום אחד",
  },
  {
    icon: BarChart3,
    text: "דוחות וסטטיסטיקות מפורטות",
  },
  {
    icon: Globe,
    text: "תת-דומיין אישי לבית הספר שלכם",
  },
]

export default function TeacherRegisterPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Benefits Side */}
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            הצטרפו כמורה
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            הירשמו עכשיו וקבלו גישה מלאה לכל הכלים ליצירת חוויות למידה מעולות
          </p>

          <div className="mt-8 space-y-4">
            {benefits.map((b) => (
              <div key={b.text} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{b.text}</span>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            {"כבר רשומים? "}
            <Link href="#" className="font-semibold text-primary hover:underline">
              התחברו כאן
            </Link>
          </p>
        </div>

        {/* Form Side */}
        <Card className="rounded-2xl border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">טופס רישום מורה</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">שם פרטי</Label>
                <Input id="firstName" placeholder="רחל" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">שם משפחה</Label>
                <Input id="lastName" placeholder="מזרחי" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">דוא&quot;ל</Label>
              <Input id="email" type="email" placeholder="rachel@school.ac.il" dir="ltr" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">שם משתמש</Label>
              <Input id="username" placeholder="rachel_teacher" dir="ltr" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">סיסמה</Label>
                <Input id="password" type="password" placeholder="********" dir="ltr" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">אימות סיסמה</Label>
                <Input id="confirmPassword" type="password" placeholder="********" dir="ltr" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="school">בית ספר / מוסד (אופציונלי)</Label>
              <Input id="school" placeholder="בית ספר תיכון הרצליה" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">תחום הוראה</Label>
              <Select>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="בחרו תחום" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="biology">ביולוגיה</SelectItem>
                  <SelectItem value="math">מתמטיקה</SelectItem>
                  <SelectItem value="history">היסטוריה</SelectItem>
                  <SelectItem value="english">אנגלית</SelectItem>
                  <SelectItem value="physics">פיזיקה</SelectItem>
                  <SelectItem value="chemistry">כימיה</SelectItem>
                  <SelectItem value="literature">ספרות</SelectItem>
                  <SelectItem value="cs">מדעי המחשב</SelectItem>
                  <SelectItem value="other">אחר</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full rounded-xl" size="lg">
              יצירת חשבון מורה
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
