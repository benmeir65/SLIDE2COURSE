"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockSubmissions } from "@/lib/mock-data"
import { CheckCircle2, Clock, Brain, Eye } from "lucide-react"

export function SubmissionsTab() {
  const uncheckedCount = mockSubmissions.filter((s) => s.status === "unchecked").length
  const aiCheckedCount = mockSubmissions.filter((s) => s.status === "ai-checked").length
  const checkedCount = mockSubmissions.filter((s) => s.status === "checked").length

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10">
              <Clock className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{uncheckedCount}</div>
              <div className="text-xs text-muted-foreground">ממתינות לבדיקה</div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{aiCheckedCount}</div>
              <div className="text-xs text-muted-foreground">נבדקו ע&quot;י AI</div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
              <CheckCircle2 className="h-5 w-5 text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{checkedCount}</div>
              <div className="text-xs text-muted-foreground">נבדקו ואושרו</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submissions List */}
      <Card className="rounded-2xl">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-right font-semibold text-muted-foreground">תלמיד/ה</th>
                  <th className="px-4 py-3 text-right font-semibold text-muted-foreground">קורס</th>
                  <th className="px-4 py-3 text-right font-semibold text-muted-foreground">תאריך הגשה</th>
                  <th className="px-4 py-3 text-right font-semibold text-muted-foreground">סטטוס</th>
                  <th className="px-4 py-3 text-right font-semibold text-muted-foreground">ציון</th>
                  <th className="px-4 py-3 text-right font-semibold text-muted-foreground">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {mockSubmissions.map((sub) => (
                  <tr key={sub.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium text-foreground">{sub.studentName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{sub.courseName}</td>
                    <td className="px-4 py-3 text-muted-foreground" dir="ltr">{sub.submittedAt}</td>
                    <td className="px-4 py-3">
                      {sub.status === "checked" && (
                        <Badge className="bg-success text-success-foreground">
                          <CheckCircle2 className="ml-1 h-3 w-3" />
                          נבדק
                        </Badge>
                      )}
                      {sub.status === "ai-checked" && (
                        <Badge className="bg-primary text-primary-foreground">
                          <Brain className="ml-1 h-3 w-3" />
                          AI בדק
                        </Badge>
                      )}
                      {sub.status === "unchecked" && (
                        <Badge variant="outline" className="border-destructive/30 text-destructive">
                          <Clock className="ml-1 h-3 w-3" />
                          ממתין
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {sub.grade !== null ? (
                        <span className="font-bold text-foreground">{sub.grade}</span>
                      ) : sub.aiRecommendedGrade ? (
                        <span className="text-primary">
                          AI: {sub.aiRecommendedGrade}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm">
                        <Eye className="ml-1 h-3.5 w-3.5" />
                        צפייה
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
