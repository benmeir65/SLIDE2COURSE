"use client"

import { useState, useCallback } from "react"
import { Upload, FileUp, Loader2, Download, Eye, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { parsePPTX, convertToHTML } from "@/lib/pptx-parser"

export default function ConverterPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [convertedHtml, setConvertedHtml] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [slideCount, setSlideCount] = useState<number>(0)
  const [skipImages, setSkipImages] = useState(false)
  const [progress, setProgress] = useState<string>("")

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
      setFile(droppedFile)
      setConvertedHtml(null)
      setError(null)
    } else {
      setError('נא להעלות קובץ מצגת בפורמט PPTX או PPT')
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setConvertedHtml(null)
      setError(null)
    }
  }, [])

  const handleConvert = async () => {
    if (!file) return
    
    setIsConverting(true)
    setError(null)
    setProgress("מעבד את הקובץ...")
    
    try {
      // Check file size and suggest skipping images for large files
      const fileSizeMB = file.size / 1024 / 1024
      const shouldSkipImages = skipImages || fileSizeMB > 15
      
      if (shouldSkipImages && !skipImages) {
        setProgress("קובץ גדול - מדלג על תמונות לביצועים טובים יותר...")
      }
      
      setProgress("מחלץ תוכן מהמצגת...")
      
      // Parse the PPTX file
      const presentation = await parsePPTX(file, shouldSkipImages)
      setSlideCount(presentation.slides.length)
      
      setProgress("ממיר ל-HTML...")
      
      // Convert to HTML
      const html = convertToHTML(presentation)
      setConvertedHtml(html)
      setProgress("")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'שגיאה לא ידועה'
      setError(`אירעה שגיאה בהמרת הקובץ: ${errorMessage}`)
      setProgress("")
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
    a.download = file ? file.name.replace(/\.(pptx?|ppt)$/i, '.html') : 'course.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handlePreview = () => {
    if (!convertedHtml) return
    
    const blob = new Blob([convertedHtml], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-8 text-center text-3xl font-bold text-foreground">
          יצירת קורס
        </h1>
        
        <Card>
          <CardContent className="p-6">
            {/* Upload Area */}
            <div
              className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                isDragging
                  ? 'border-primary bg-primary/5'
                  : file
                  ? 'border-green-500 bg-green-50'
                  : 'border-muted-foreground/25 hover:border-primary hover:bg-muted/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <input
                id="file-input"
                type="file"
                accept=".ppt,.pptx"
                className="hidden"
                onChange={handleFileSelect}
              />
              
              {file ? (
                <>
                  <FileUp className="mb-3 h-12 w-12 text-green-500" />
                  <p className="text-lg font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    לחץ להחלפת הקובץ
                  </p>
                </>
              ) : (
                <>
                  <Upload className="mb-3 h-12 w-12 text-muted-foreground" />
                  <p className="text-lg font-medium text-foreground">
                    גרור מצגת לכאן
                  </p>
                  <p className="text-sm text-muted-foreground">
                    או לחץ לבחירת קובץ
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    קבצים נתמכים: PPTX (PowerPoint)
                  </p>
                </>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-red-700">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Convert Options */}
            {file && !convertedHtml && (
              <div className="mt-6 space-y-4">
                {/* Skip images checkbox for large files */}
                {file.size > 5 * 1024 * 1024 && (
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={skipImages}
                      onChange={(e) => setSkipImages(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    דלג על תמונות (מומלץ לקבצים גדולים)
                  </label>
                )}
                
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleConvert}
                  disabled={isConverting}
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                      {progress || "ממיר את המצגת..."}
                    </>
                  ) : (
                    <>
                      המר לקורס HTML
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Results */}
            {convertedHtml && (
              <div className="mt-6 space-y-4">
                <div className="rounded-lg bg-green-50 p-4 text-center">
                  <p className="font-medium text-green-800">
                    ההמרה הושלמה בהצלחה!
                  </p>
                  <p className="text-sm text-green-600">
                    הומרו {slideCount} שקופיות לקורס HTML
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    className="flex-1"
                    variant="outline"
                    onClick={handlePreview}
                  >
                    <Eye className="ml-2 h-4 w-4" />
                    תצוגה מקדימה
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={handleDownload}
                  >
                    <Download className="ml-2 h-4 w-4" />
                    הורד קובץ HTML
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setFile(null)
                    setConvertedHtml(null)
                    setSlideCount(0)
                  }}
                >
                  המר מצגת נוספת
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <div className="mt-8 rounded-lg bg-muted/50 p-6">
          <h2 className="mb-4 text-lg font-semibold text-foreground">איך זה עובד?</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>1. העלה מצגת PowerPoint (PPTX)</li>
            <li>2. המערכת תחלץ את כל התוכן: טקסטים, כותרות, בולטים ותמונות</li>
            <li>3. שקופיות שער צהובות יהפכו לכותרות פרקים בניווט</li>
            <li>4. הורד את הקורס כקובץ HTML מוכן לשימוש</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
