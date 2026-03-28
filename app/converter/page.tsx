"use client"

import type { Metadata } from "next"
import { useState, useCallback } from "react"
import { Upload, FileUp, Loader2, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ConverterPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [convertedHtml, setConvertedHtml] = useState<string | null>(null)

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
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setConvertedHtml(null)
    }
  }, [])

  const handleConvert = async () => {
    if (!file) return
    
    setIsConverting(true)
    
    // Simulate conversion process - in production this would call an API
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Generate sample HTML course structure
    const sampleHtml = `
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>קורס: ${file.name.replace(/\.(pptx?|ppt)$/i, '')}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    .slide { border: 1px solid #ddd; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .slide-title { color: #0ea5e9; font-size: 24px; margin-bottom: 10px; }
    nav { background: #f5f5f5; padding: 10px; border-radius: 8px; margin-bottom: 20px; }
    nav a { margin-left: 15px; color: #333; text-decoration: none; }
    nav a:hover { color: #0ea5e9; }
  </style>
</head>
<body>
  <nav>
    <a href="#unit1">יחידה 1</a>
    <a href="#unit2">יחידה 2</a>
    <a href="#quiz">שאלות</a>
  </nav>
  
  <section id="unit1" class="slide">
    <h2 class="slide-title">יחידה 1: מבוא</h2>
    <p>תוכן השקופית הראשונה יופיע כאן...</p>
  </section>
  
  <section id="unit2" class="slide">
    <h2 class="slide-title">יחידה 2: תוכן מרכזי</h2>
    <p>תוכן השקופית השנייה יופיע כאן...</p>
  </section>
  
  <section id="quiz" class="slide">
    <h2 class="slide-title">שאלות לבדיקה</h2>
    <p>שאלות אינטראקטיביות יופיעו כאן...</p>
  </section>
</body>
</html>
`
    
    setConvertedHtml(sampleHtml)
    setIsConverting(false)
  }

  const handleDownload = () => {
    if (!convertedHtml) return
    
    const blob = new Blob([convertedHtml], { type: 'text/html' })
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
    
    const blob = new Blob([convertedHtml], { type: 'text/html' })
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
                    קבצים נתמכים: PPT, PPTX
                  </p>
                </>
              )}
            </div>

            {/* Convert Button */}
            {file && !convertedHtml && (
              <Button
                className="mt-6 w-full"
                size="lg"
                onClick={handleConvert}
                disabled={isConverting}
              >
                {isConverting ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    ממיר את המצגת...
                  </>
                ) : (
                  <>
                    המר לקורס HTML
                  </>
                )}
              </Button>
            )}

            {/* Results */}
            {convertedHtml && (
              <div className="mt-6 space-y-4">
                <div className="rounded-lg bg-green-50 p-4 text-center">
                  <p className="font-medium text-green-800">
                    ההמרה הושלמה בהצלחה!
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
                  }}
                >
                  המר מצגת נוספת
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
