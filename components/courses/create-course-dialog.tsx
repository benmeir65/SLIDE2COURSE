"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Upload, Link2, Info, FileUp } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function CreateCourseDialog() {
  const [open, setOpen] = useState(false)
  const [linkValue, setLinkValue] = useState("")
  const [isDragging, setIsDragging] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="h-12 rounded-xl px-6 text-base">
          <Plus className="ml-2 h-5 w-5" />
          יצירת קורס חדש
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-right text-xl">יצירת קורס חדש</DialogTitle>
          <DialogDescription className="text-right">
            העלו מצגת PowerPoint, מ-OneDrive או מ-Canva והמירו אותה לקורס אינטראקטיבי
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Link Input */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="presentation-link" className="text-sm font-semibold">
                קישור למצגת
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs text-right" dir="rtl">
                    <p>
                      הדביקו קישור מ-OneDrive או מ-Canva. ודאו שהמצגת משותפת
                      לצפייה ציבורית.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="relative">
              <Link2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="presentation-link"
                placeholder="https://onedrive.live.com/... או https://canva.com/..."
                value={linkValue}
                onChange={(e) => setLinkValue(e.target.value)}
                className="pr-10 text-left"
                dir="ltr"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">או</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* File Upload */}
          <div
            className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/40"
            }`}
            onDragOver={(e) => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setIsDragging(false)
            }}
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <FileUp className="h-7 w-7 text-primary" />
            </div>
            <p className="mb-1 text-sm font-semibold text-foreground">
              גררו קובץ לכאן
            </p>
            <p className="mb-4 text-xs text-muted-foreground">
              PPTX, PDF - עד 50MB
            </p>
            <Button variant="outline" size="sm">
              <Upload className="ml-2 h-4 w-4" />
              בחירת קובץ
            </Button>
          </div>

          {/* Yellow slide note */}
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#FFD966]">
              <span className="text-xs font-bold text-amber-900">A</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-amber-900">
                שקופיות כותרת צהובות
              </p>
              <p className="mt-1 text-xs leading-relaxed text-amber-800">
                שקופית עם רקע צהוב מסמנת תחילת יחידה חדשה בקורס. כל יחידה תופיע
                כטאב נפרד בתפריט הניווט.
              </p>
            </div>
          </div>

          {/* Submit */}
          <Button className="w-full rounded-xl" size="lg" disabled={!linkValue}>
            המרה לקורס
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
