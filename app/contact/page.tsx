"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-bl from-secondary/10 via-card to-primary/10">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground md:text-4xl">
              צרו קשר
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              יש לכם שאלה, הצעה או בעיה טכנית? אנחנו כאן כדי לעזור
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">אימייל</div>
                  <div className="text-sm text-muted-foreground">
                    support@slidesup.learn
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                  <Phone className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">טלפון</div>
                  <div className="text-sm text-muted-foreground" dir="ltr">
                    +972-3-555-0123
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <MapPin className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">כתובת</div>
                  <div className="text-sm text-muted-foreground">
                    רחוב הארבעה 28, תל אביב
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-5">
                <h3 className="mb-2 font-semibold text-foreground">
                  שעות מענה
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>ראשון - חמישי</span>
                    <span>08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>שישי</span>
                    <span>08:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>שבת</span>
                    <span>סגור</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>שלחו לנו הודעה</CardTitle>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div className="flex flex-col items-center gap-4 py-12 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                      <CheckCircle2 className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      ההודעה נשלחה בהצלחה!
                    </h3>
                    <p className="max-w-md text-muted-foreground">
                      קיבלנו את פנייתכם ונחזור אליכם בהקדם. זמן מענה ממוצע: עד 24 שעות עבודה.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 rounded-xl"
                      onClick={() => setSubmitted(false)}
                    >
                      שליחת הודעה נוספת
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">שם מלא</Label>
                        <Input
                          id="name"
                          placeholder="הכניסו את שמכם"
                          required
                          className="rounded-lg"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">אימייל</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@example.com"
                          required
                          className="rounded-lg"
                          dir="ltr"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="role">תפקיד</Label>
                        <Select dir="rtl">
                          <SelectTrigger className="rounded-lg">
                            <SelectValue placeholder="בחרו תפקיד" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="teacher">מורה</SelectItem>
                            <SelectItem value="student">תלמיד/ה</SelectItem>
                            <SelectItem value="admin">מנהל/ת בית ספר</SelectItem>
                            <SelectItem value="other">אחר</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">נושא הפנייה</Label>
                        <Select dir="rtl">
                          <SelectTrigger className="rounded-lg">
                            <SelectValue placeholder="בחרו נושא" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">תמיכה טכנית</SelectItem>
                            <SelectItem value="feature">בקשת פיצ'ר</SelectItem>
                            <SelectItem value="billing">חיוב ותשלומים</SelectItem>
                            <SelectItem value="general">שאלה כללית</SelectItem>
                            <SelectItem value="bug">דיווח על באג</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">הודעה</Label>
                      <Textarea
                        id="message"
                        placeholder="תארו את הפנייה שלכם..."
                        required
                        className="min-h-[150px] rounded-lg"
                      />
                    </div>

                    <Button type="submit" className="rounded-xl px-8">
                      <Send className="ml-2 h-4 w-4" />
                      שליחת הודעה
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
