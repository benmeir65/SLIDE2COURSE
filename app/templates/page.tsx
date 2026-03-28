"use client"

import { useState } from "react"
import { templateInstructions } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  FileText,
  ArrowLeft,
  Info,
  Copy,
  Check,
} from "lucide-react"

function CopyableTemplate({
  template,
  color,
  isYellow = false,
}: {
  template: string
  color: string
  isYellow?: boolean
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(template)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <pre
        dir="rtl"
        className={`overflow-x-auto rounded-lg border-2 p-4 text-sm leading-relaxed text-foreground ${isYellow ? "bg-[#FFD966]" : "bg-muted/50"}`}
        style={{ borderColor: color }}
      >
        {template}
      </pre>
      <Button
        variant="outline"
        size="sm"
        className="absolute left-2 top-2 gap-1.5 rounded-lg text-xs"
        onClick={handleCopy}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-success" />
            הועתק
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            העתק למצגת
          </>
        )}
      </Button>
    </div>
  )
}

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-bl from-accent/10 via-card to-primary/10">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-accent text-accent-foreground">
              <FileText className="ml-1 h-3 w-3" />
              מדריך תבניות
            </Badge>
            <h1 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
              איך להכין מצגת שתומר לקורס
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              העתיקו את התבניות הבאות ישירות לתוך המצגת שלכם - כל תבנית היא שקופית אחת
            </p>
            <div className="mt-6">
              <Button className="rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
                <Link href="/converter">
                  יצירת קורס עכשיו
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="mx-auto max-w-4xl px-4 pt-8 lg:px-8">
        <div className="flex items-start gap-3 rounded-xl border border-secondary/30 bg-secondary/10 p-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
          <div className="text-sm text-foreground">
            <strong>איך להשתמש:</strong> לחצו על &quot;העתק למצגת&quot; בכל תבנית, פתחו שקופית חדשה
            במצגת שלכם והדביקו. שנו את הטקסט לתוכן שלכם ושמרו על אותו מבנה.
          </div>
        </div>
      </div>

      {/* Templates */}
      <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
        <div className="space-y-6">
          {templateInstructions.map((template, index) => (
            <Card
              key={template.id}
              className="overflow-hidden transition-all hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-card"
                    style={{ backgroundColor: template.color }}
                  >
                    {index + 1}
                  </span>
                  <div>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <p className="mt-0.5 whitespace-pre-line text-sm text-muted-foreground">
                      {template.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <CopyableTemplate
                  template={template.template}
                  color={template.color}
                  isYellow={template.id === "title-slide"}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
