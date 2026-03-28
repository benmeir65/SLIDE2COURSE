import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { UserCircle, BookOpen, Trophy, Bell } from "lucide-react"

export const metadata: Metadata = {
  title: "רישום תלמיד | SlidesUp Learning",
  description: "הירשמו כתלמיד והתחילו ללמוד קורסים אינטראקטיביים",
}

const benefits = [
  {
    icon: BookOpen,
    text: "גישה לקורסים אינטראקטיביים ומרתקים",
  },
  {
    icon: Trophy,
    text: "מעקב אחרי ציונים והתקדמות",
  },
  {
    icon: Bell,
    text: "קבלת הודעות ומטלות מהמורה",
  },
]

export default function StudentRegisterPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Benefits Side */}
        <div className="flex flex-col justify-center">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
            <UserCircle className="h-8 w-8 text-secondary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            הצטרפות כתלמיד
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            הירשמו עם הפרטים שקיבלתם מהמורה והתחילו ללמוד קורסים אינטראקטיביים
          </p>

          <div className="mt-8 space-y-4">
            {benefits.map((b) => (
              <div key={b.text} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10">
                  <b.icon className="h-5 w-5 text-secondary" />
                </div>
                <span className="text-sm font-medium text-foreground">{b.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-border bg-muted/50 p-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground">שימו לב: </span>
              לאחר הרישום הראשוני, ההתחברות נשמרת ולא תצטרכו להירשם שוב. לקורסים
              נוספים פשוט לחצו על &quot;הרשמה לקורס&quot; בתוך אזור התלמיד.
            </p>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            {"כבר רשומים? "}
            <Link href="#" className="font-semibold text-secondary hover:underline">
              התחברו כאן
            </Link>
          </p>
        </div>

        {/* Form Side */}
        <Card className="rounded-2xl border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">טופס רישום תלמיד</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="studentUsername">שם משתמש</Label>
              <Input
                id="studentUsername"
                placeholder="שם המשתמש שקיבלתם מהמורה"
                dir="ltr"
              />
              <p className="text-xs text-muted-foreground">
                שם המשתמש נמסר על ידי המורה בעת הקצאת הקורס
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="studentPassword">סיסמה</Label>
              <Input
                id="studentPassword"
                type="password"
                placeholder="הסיסמה שקיבלתם מהמורה"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseCode">קוד קורס / כיתה (אופציונלי)</Label>
              <Input
                id="courseCode"
                placeholder="למשל: BIO101-A"
                dir="ltr"
              />
              <p className="text-xs text-muted-foreground">
                אם קיבלתם קוד הצטרפות לקורס או כיתה, הזינו אותו כאן
              </p>
            </div>

            <Button className="w-full rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/90" size="lg">
              כניסה ללמידה
            </Button>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                בעיה בהתחברות? פנו למורה שלכם או{" "}
                <Link href="/contact" className="font-semibold text-secondary hover:underline">
                  צרו קשר
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
