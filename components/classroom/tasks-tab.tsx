"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { mockTasks } from "@/lib/mock-data"
import { CalendarDays, Users, AlertTriangle } from "lucide-react"

export function TasksTab() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-foreground">מטלות פעילות</h3>
      {mockTasks.map((task) => {
        const pct = Math.round((task.submittedCount / task.totalStudents) * 100)
        return (
          <Card key={task.id} className="rounded-2xl transition-all hover:shadow-sm">
            <CardContent className="p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-foreground">{task.title}</h4>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {task.courseName} | {task.className}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className="gap-1 text-xs">
                    <CalendarDays className="h-3 w-3" />
                    {task.dueDate}
                  </Badge>
                  <Badge variant="outline" className="gap-1 text-xs">
                    <Users className="h-3 w-3" />
                    {task.submittedCount}/{task.totalStudents}
                  </Badge>
                  {task.lateCount > 0 && (
                    <Badge variant="outline" className="gap-1 border-destructive/30 text-xs text-destructive">
                      <AlertTriangle className="h-3 w-3" />
                      {task.lateCount} באיחור
                    </Badge>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <Progress value={pct} className="h-2 flex-1" />
                <span className="text-xs font-medium text-muted-foreground">{pct}%</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
