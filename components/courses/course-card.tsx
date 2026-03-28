"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Copy,
  Check,
  Users,
  HelpCircle,
  BookOpen,
  ExternalLink,
} from "lucide-react"
import type { Course } from "@/lib/mock-data"

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(course.shareLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="group overflow-hidden rounded-2xl transition-all hover:shadow-lg hover:shadow-primary/5">
      {/* Thumbnail */}
      <div
        className="flex h-36 items-center justify-center bg-[hsl(200,15%,92%)]"
      >
        <BookOpen className="h-12 w-12 text-[hsl(200,15%,70%)]" />
      </div>

      <CardContent className="p-5">
        {/* Title + Status */}
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="text-base font-bold leading-snug text-foreground">
            {course.title}
          </h3>
          <Badge
            variant={course.status === "published" ? "default" : "secondary"}
            className={`shrink-0 ${
              course.status === "published"
                ? "bg-success text-success-foreground"
                : ""
            }`}
          >
            {course.status === "published" ? "פורסם" : "טיוטה"}
          </Badge>
        </div>

        <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {course.description}
        </p>

        {/* Stats */}
        <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {course.studentCount} תלמידים
          </span>
          <span className="flex items-center gap-1">
            <HelpCircle className="h-3.5 w-3.5" />
            {course.questionCount} שאלות
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5" />
            {course.unitCount} יחידות
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={handleCopy}>
            {copied ? (
              <>
                <Check className="ml-1.5 h-3.5 w-3.5 text-success" />
                הועתק!
              </>
            ) : (
              <>
                <Copy className="ml-1.5 h-3.5 w-3.5" />
                העתק קישור
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/course/${course.id}`}>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
