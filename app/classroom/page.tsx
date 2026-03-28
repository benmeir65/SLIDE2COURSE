"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassesTab } from "@/components/classroom/classes-tab"
import { TasksTab } from "@/components/classroom/tasks-tab"
import { SubmissionsTab } from "@/components/classroom/submissions-tab"
import { MessagesTab } from "@/components/classroom/messages-tab"
import { ReportsTab } from "@/components/classroom/reports-tab"
import {
  GraduationCap,
  ClipboardList,
  FileCheck,
  MessageCircle,
  BarChart3,
} from "lucide-react"

export default function ClassroomPage() {
  const [activeTab, setActiveTab] = useState("classes")

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            ניהול כיתות
          </h1>
          <p className="mt-1 text-muted-foreground">
            נהלו את הכיתות, המטלות וההגשות במקום אחד
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
          dir="rtl"
        >
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1 bg-card p-1.5 rounded-xl border border-border">
            <TabsTrigger
              value="classes"
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <GraduationCap className="h-4 w-4" />
              כיתות
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <ClipboardList className="h-4 w-4" />
              מטלות
            </TabsTrigger>
            <TabsTrigger
              value="submissions"
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <FileCheck className="h-4 w-4" />
              הגשות
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              הודעות
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <BarChart3 className="h-4 w-4" />
              דוחות
            </TabsTrigger>
          </TabsList>

          <TabsContent value="classes">
            <ClassesTab />
          </TabsContent>
          <TabsContent value="tasks">
            <TasksTab />
          </TabsContent>
          <TabsContent value="submissions">
            <SubmissionsTab />
          </TabsContent>
          <TabsContent value="messages">
            <MessagesTab />
          </TabsContent>
          <TabsContent value="reports">
            <ReportsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
