"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { mockGradesByStudent, mockClassProgress } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

export function ReportsTab() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="by-student" dir="rtl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="by-student">לפי תלמיד</TabsTrigger>
          <TabsTrigger value="by-course">לפי קורס</TabsTrigger>
          <TabsTrigger value="by-class">לפי כיתה</TabsTrigger>
        </TabsList>

        <TabsContent value="by-student" className="mt-6 space-y-6">
          {/* Bar Chart */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">ציונים ממוצעים לפי תלמיד</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockGradesByStudent} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="bio" name="ביולוגיה" fill="hsl(262, 83%, 58%)" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="history" name="היסטוריה" fill="hsl(187, 92%, 41%)" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="math" name="מתמטיקה" fill="hsl(38, 92%, 50%)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Grade Table */}
          <Card className="rounded-2xl">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 py-3 text-right font-semibold text-muted-foreground">שם</th>
                      <th className="px-4 py-3 text-right font-semibold text-muted-foreground">ביולוגיה</th>
                      <th className="px-4 py-3 text-right font-semibold text-muted-foreground">היסטוריה</th>
                      <th className="px-4 py-3 text-right font-semibold text-muted-foreground">מתמטיקה</th>
                      <th className="px-4 py-3 text-right font-semibold text-muted-foreground">אנגלית</th>
                      <th className="px-4 py-3 text-right font-semibold text-muted-foreground">ממוצע</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockGradesByStudent.map((s) => {
                      const avg = Math.round((s.bio + s.history + s.math + s.english) / 4)
                      return (
                        <tr key={s.name} className="border-b border-border last:border-0 hover:bg-muted/30">
                          <td className="px-4 py-3 font-medium text-foreground">{s.name}</td>
                          <td className="px-4 py-3">{s.bio}</td>
                          <td className="px-4 py-3">{s.history}</td>
                          <td className="px-4 py-3">{s.math}</td>
                          <td className="px-4 py-3">{s.english}</td>
                          <td className="px-4 py-3">
                            <Badge
                              variant="outline"
                              className={`${
                                avg >= 90
                                  ? "border-success/30 bg-success/10 text-success"
                                  : avg >= 70
                                  ? "border-primary/30 bg-primary/10 text-primary"
                                  : "border-accent/30 bg-accent/10 text-accent"
                              }`}
                            >
                              {avg}
                            </Badge>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-course" className="mt-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">ביצועים לפי קורס</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "מבוא לביולוגיה", avg: 84, students: 34, completion: 78 },
                  { name: "היסטוריה - מלה\"ע השנייה", avg: 77, students: 28, completion: 65 },
                  { name: "מתמטיקה - אלגברה", avg: 81, students: 42, completion: 72 },
                  { name: "אנגלית - Reading", avg: 80, students: 19, completion: 85 },
                ].map((course) => (
                  <div key={course.name} className="flex items-center justify-between rounded-xl border border-border p-4">
                    <div>
                      <div className="font-semibold text-foreground">{course.name}</div>
                      <div className="text-xs text-muted-foreground">{course.students} תלמידים</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-foreground">{course.avg}</div>
                        <div className="text-xs text-muted-foreground">ממוצע</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-foreground">{course.completion}%</div>
                        <div className="text-xs text-muted-foreground">השלמה</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-class" className="mt-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base">מגמת התקדמות כיתתית</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockClassProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[60, 100]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="average"
                      name="ממוצע כיתתי"
                      stroke="hsl(262, 83%, 58%)"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
