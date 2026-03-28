"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { mockMessages } from "@/lib/mock-data"
import { Send, Paperclip, Mail, MailOpen } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function MessagesTab() {
  return (
    <div className="space-y-6">
      {/* Compose */}
      <Card className="rounded-2xl">
        <CardContent className="p-6">
          <h3 className="mb-4 text-lg font-bold text-foreground">שליחת הודעה</h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>נמען</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="בחרו נמען" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class-1">כיתה י1 (כולם)</SelectItem>
                    <SelectItem value="class-2">כיתה י2 (כולם)</SelectItem>
                    <SelectItem value="class-3">כיתה יא1 (כולם)</SelectItem>
                    <SelectItem value="student-1">יעל כהן</SelectItem>
                    <SelectItem value="student-2">אורי לוי</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>נושא</Label>
                <Input placeholder="נושא ההודעה" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>תוכן ההודעה</Label>
              <Textarea placeholder="כתבו את ההודעה שלכם כאן..." className="min-h-[100px] resize-none" />
            </div>
            <div className="flex items-center justify-between">
              <Button variant="outline" size="sm">
                <Paperclip className="ml-1.5 h-4 w-4" />
                צרף קובץ
              </Button>
              <Button size="sm" className="rounded-xl">
                <Send className="ml-1.5 h-4 w-4" />
                שלח הודעה
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages List */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-foreground">הודעות אחרונות</h3>
        <div className="space-y-3">
          {mockMessages.map((msg) => (
            <Card key={msg.id} className={`rounded-2xl transition-all hover:shadow-sm ${!msg.read ? "border-primary/20 bg-primary/5" : ""}`}>
              <CardContent className="flex items-start gap-4 p-4">
                <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  {msg.read ? (
                    <MailOpen className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Mail className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">{msg.from}</span>
                      <span className="text-xs text-muted-foreground">{">"}</span>
                      <span className="text-sm text-muted-foreground">{msg.to}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{msg.date}</span>
                  </div>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">{msg.subject}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{msg.content}</p>
                  {!msg.read && (
                    <Badge className="mt-2 bg-primary text-primary-foreground">חדש</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
