import type { Metadata } from "next"
import Link from "next/link"
import { CourseCard } from "@/components/courses/course-card"
import { mockCourses } from "@/lib/mock-data"
import { BookOpen, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "הקורסים שלי | SlidesUp Learning",
  description: "ניהול ספריית הקורסים שלך והמרת מצגות לקורסים אינטראקטיביים",
}

export default function ConverterPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8">
      {/* Page Header */}
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">הקורסים שלי</h1>
          <p className="mt-1 text-muted-foreground">
            נהלו את הקורסים שלכם וצרו קורסים חדשים
          </p>
        </div>
        <Button size="lg" className="h-12 rounded-xl bg-secondary px-6 text-base text-secondary-foreground hover:bg-secondary/90" asChild>
          <Link href="/converter/new">
            <Plus className="ml-2 h-5 w-5" />
            יצירת קורס חדש
          </Link>
        </Button>
      </div>

      {/* Course Library */}
      <div className="mb-6 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold text-foreground">ספריית הקורסים</h2>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
          {mockCourses.length}
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mockCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
