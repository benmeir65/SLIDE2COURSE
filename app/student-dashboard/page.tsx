"use client"

import { mockCourses, mockCourseUnits } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  BookOpen,
  Clock,
  Trophy,
  BarChart3,
  ArrowLeft,
  Star,
  CheckCircle2,
} from "lucide-react"

const studentInfo = {
  name: "יעל כהן",
  className: "כיתה י1",
  averageGrade: 92,
  coursesCompleted: 3,
  totalCourses: 5,
  streak: 12,
}

const enrolledCourses = mockCourses.slice(0, 4).map((course, i) => ({
  ...course,
  progress: [85, 60, 30, 100][i],
  lastGrade: [92, 78, null, 95][i],
  dueDate: ["2026-02-15", "2026-02-18", "2026-02-20", null][i],
}))

export default function StudentDashboardPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-bl from-primary/10 via-card to-secondary/10">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                {"שלום, " + studentInfo.name + "!"}
              </h1>
              <p className="mt-1 text-muted-foreground">
                {studentInfo.className + " | " + "רצף למידה: " + studentInfo.streak + " ימים"}
              </p>
            </div>
            <div className="flex gap-3">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="flex items-center gap-3 p-4">
                  <Trophy className="h-8 w-8 text-primary" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {studentInfo.averageGrade}
                    </div>
                    <div className="text-xs text-muted-foreground">ממוצע ציונים</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-secondary/20 bg-secondary/5">
                <CardContent className="flex items-center gap-3 p-4">
                  <BookOpen className="h-8 w-8 text-secondary" />
                  <div>
                    <div className="text-2xl font-bold text-foreground">
                      {studentInfo.coursesCompleted + "/" + studentInfo.totalCourses}
                    </div>
                    <div className="text-xs text-muted-foreground">קורסים הושלמו</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-foreground">הקורסים שלי</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {enrolledCourses.map((course) => (
                <Card
                  key={course.id}
                  className="group overflow-hidden transition-all hover:border-primary/20 hover:shadow-md"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base leading-tight">
                        {course.title}
                      </CardTitle>
                      {course.progress === 100 ? (
                        <Badge className="bg-success text-success-foreground shrink-0">
                          <CheckCircle2 className="ml-1 h-3 w-3" />
                          הושלם
                        </Badge>
                      ) : course.dueDate ? (
                        <Badge variant="outline" className="shrink-0">
                          <Clock className="ml-1 h-3 w-3" />
                          {"עד " + new Date(course.dueDate).toLocaleDateString("he-IL", { day: "numeric", month: "short" })}
                        </Badge>
                      ) : null}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">התקדמות</span>
                        <span className="font-semibold text-foreground">
                          {course.progress + "%"}
                        </span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    {course.lastGrade !== null && (
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="h-4 w-4 text-accent" />
                        <span className="text-muted-foreground">ציון אחרון:</span>
                        <span className="font-bold text-foreground">
                          {course.lastGrade}
                        </span>
                      </div>
                    )}
                    <Button
                      size="sm"
                      className="w-full rounded-lg"
                      variant={course.progress === 100 ? "outline" : "default"}
                      asChild
                    >
                      <Link href={"/course/" + course.id}>
                        {course.progress === 100
                          ? "צפייה בתוצאות"
                          : "המשך ללמוד"}
                        <ArrowLeft className="mr-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar - Progress + Recent Activity */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground">יחידות הקורס</h2>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">
                  מבוא לביולוגיה - תא החיים
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockCourseUnits.map((unit, index) => (
                    <div
                      key={unit.id}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                        unit.completed
                          ? "bg-success/10 text-foreground"
                          : index === 3
                            ? "border border-primary/20 bg-primary/5 text-foreground"
                            : "text-muted-foreground"
                      }`}
                    >
                      {unit.completed ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                      ) : index === 3 ? (
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                          {index + 1}
                        </div>
                      ) : (
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-muted-foreground/30 text-[10px] font-bold">
                          {index + 1}
                        </div>
                      )}
                      <div className="flex-1">
                        <span className={unit.completed || index === 3 ? "font-medium" : ""}>
                          {unit.title}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {unit.slides + " שקפים"}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  סיכום ציונים
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { subject: "ביולוגיה", grade: 92 },
                    { subject: "היסטוריה", grade: 88 },
                    { subject: "מתמטיקה", grade: 95 },
                    { subject: "אנגלית", grade: 90 },
                  ].map((item) => (
                    <div
                      key={item.subject}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-muted-foreground">
                        {item.subject}
                      </span>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={item.grade}
                          className="h-2 w-20"
                        />
                        <span className="w-8 text-left text-sm font-bold text-foreground">
                          {item.grade}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
