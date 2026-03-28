"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { mockClasses, mockStudents } from "@/lib/mock-data"
import { Plus, Users, BookOpen, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ClassesTab() {
  return (
    <div className="space-y-6">
      {/* Class Cards */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">הכיתות שלי</h3>
        <Button size="sm" className="rounded-xl">
          <Plus className="ml-1.5 h-4 w-4" />
          כיתה חדשה
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockClasses.map((cls) => (
          <Card key={cls.id} className="group rounded-2xl transition-all hover:shadow-md">
            <CardContent className="p-5">
              <div className="mb-3 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
                    style={{ backgroundColor: cls.color }}
                  >
                    {cls.name.charAt(cls.name.length - 2)}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{cls.name}</h4>
                    <p className="text-xs text-muted-foreground">{cls.teacherName}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>ערוך כיתה</DropdownMenuItem>
                    <DropdownMenuItem>הוסף תלמידים</DropdownMenuItem>
                    <DropdownMenuItem>הקצה קורס</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {cls.studentCount} תלמידים
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {cls.courseCount} קורסים
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Student List */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-foreground">תלמידים</h3>
        <Card className="rounded-2xl">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-right font-semibold text-muted-foreground">תלמיד/ה</th>
                    <th className="px-4 py-3 text-right font-semibold text-muted-foreground">כיתה</th>
                    <th className="px-4 py-3 text-right font-semibold text-muted-foreground">התקדמות</th>
                    <th className="px-4 py-3 text-right font-semibold text-muted-foreground">ממוצע</th>
                    <th className="px-4 py-3 text-right font-semibold text-muted-foreground">פעילות אחרונה</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStudents.map((student) => (
                    <tr key={student.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                              {student.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-foreground">{student.name}</div>
                            <div className="text-xs text-muted-foreground" dir="ltr">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-xs">{student.className}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Progress value={student.progress} className="h-2 w-20" />
                          <span className="text-xs text-muted-foreground">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            student.averageGrade >= 90
                              ? "border-success/30 bg-success/10 text-success"
                              : student.averageGrade >= 70
                              ? "border-primary/30 bg-primary/10 text-primary"
                              : "border-accent/30 bg-accent/10 text-accent"
                          }`}
                        >
                          {student.averageGrade}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{student.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
