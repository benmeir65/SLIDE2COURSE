"use client"

import { useState, useCallback, useRef } from "react"
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
import { Plus, Upload, Link2, Info, FileUp, Loader2, AlertCircle, CheckCircle2 } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { parsePPTX, convertToHTML } from "@/lib/pptx-parser"

export function CreateCourseDialog() {
  const [open, setOpen] = useState(false)
  const [linkValue, setLinkValue] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [convertedHtml, setConvertedHtml] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [slideCount, setSlideCount] = useState<number>(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.name.endsWith('.pptx') || droppedFile.name.endsWith('.ppt'))) {
      setSelectedFile(droppedFile)
      setConvertedHtml(null)
      setError(null)
    } else {
      setError('נא להעלות קובץ מצגת בפורמט PPTX או PPT')
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setConvertedHtml(null)
      setError(null)
    }
  }, [])

  const handleConvert = async () => {
    if (!selectedFile && !linkValue) return
    
    setIsConverting(true)
    setError(null)
    
    try {
      if (selectedFile) {
        console.log('Starting conversion for file:', selectedFile.name)
        
        // Parse the PPTX file
        const presentation = await parsePPTX(selectedFile)
        console.log('Parsing complete. Slides found:', presentation.slides.length)
        setSlideCount(presentation.slides.length)
        
        // Convert to HTML
        const html = convertToHTML(presentation)
        console.log('HTML generated, length:', html.length)
        setConvertedHtml(html)
      } else {
        // Handle link conversion (placeholder for future implementation)
        setError('המרת קישורים טרם זמינה. אנא השתמשו בהעלאת קובץ.')
      }
    } catch (err) {
      console.error('Conversion error:', err)
      const errorMessage = err instanceof Error ? err.message : 'שגיאה לא ידועה'
      setError(`אירעה שגיאה בהמרת הקובץ: ${errorMessage}`)
    } finally {
      setIsConverting(false)
    }
  }

  const handleDownload = () => {
    if (!convertedHtml) return
    
    const blob = new Blob([convertedHtml], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = selectedFile ? selectedFile.name.replace(/\.(pptx?|ppt)$/i, '.html') : 'course.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const resetDialog = () => {
    setSelectedFile(null)
    setLinkValue("")
    setConvertedHtml(null)
    setError(null)
    setSlideCount(0)
    setIsConverting(false)
  }

  return (
    <Dialog open={open} onOpenChange={(open) => {
      setOpen(open)
      if (!open) {
        resetDialog()
      }
    }}>
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
            className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-colors cursor-pointer ${
              isDragging
                ? "border-primary bg-primary/5"
                : selectedFile
                ? "border-green-500 bg-green-50"
                : "border-border hover:border-primary/40"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".ppt,.pptx"
              className="hidden"
              onChange={handleFileSelect}
            />
            
            {selectedFile ? (
              <>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                  <CheckCircle2 className="h-7 w-7 text-green-600" />
                </div>
                <p className="mb-1 text-sm font-semibold text-foreground">
                  {selectedFile.name}
                </p>
                <p className="mb-4 text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <Button variant="outline" size="sm">
                  <Upload className="ml-2 h-4 w-4" />
                  החלפת קובץ
                </Button>
              </>
            ) : (
              <>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <FileUp className="h-7 w-7 text-primary" />
                </div>
                <p className="mb-1 text-sm font-semibold text-foreground">
                  גררו קובץ לכאן
                </p>
                <p className="mb-4 text-xs text-muted-foreground">
                  PPTX, PPT - עד 50MB
                </p>
                <Button variant="outline" size="sm">
                  <Upload className="ml-2 h-4 w-4" />
                  בחירת קובץ
                </Button>
              </>
            )}
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

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Submit / Results */}
          {!convertedHtml ? (
            <Button
              className="w-full rounded-xl"
              size="lg"
              disabled={!linkValue && !selectedFile || isConverting}
              onClick={handleConvert}
            >
              {isConverting ? (
                <>
                  <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                  ממיר את המצגת...
                </>
              ) : (
                "המרה לקורס"
              )}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="rounded-lg bg-green-50 p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <p className="font-medium text-green-800">
                    ההמרה הושלמה בהצלחה!
                  </p>
                </div>
                <p className="text-sm text-green-600">
                  הומרו {slideCount} שקופיות לקורס HTML
                </p>
              </div>
              
              <Button
                className="w-full rounded-xl"
                size="lg"
                onClick={handleDownload}
              >
                <Upload className="ml-2 h-4 w-4" />
                הורד קובץ HTML
              </Button>
              
              <Button
                variant="outline"
                className="w-full rounded-xl"
                size="lg"
                onClick={resetDialog}
              >
                המר מצגת נוספת
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
