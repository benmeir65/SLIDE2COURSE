"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { Upload, FileUp, Loader2, Download, Eye, AlertCircle, Sparkles } from "lucide-react"
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
      const fileSizeMB = file.size / 1024 / 1024
      const shouldSkipImages = skipImages || fileSizeMB > 15
      
      if (shouldSkipImages && !skipImages) {
        setProgress("קובץ גדול - מדלג על תמונות לביצועים טובים יותר...")
      }
      
      setProgress("מחלץ תוכן מהמצגת...")
      
      const presentation = await parsePPTX(file, shouldSkipImages)
      setSlideCount(presentation.slides.length)
      
      setProgress("ממיר ל-HTML...")
      
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
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cyan-400 rounded flex items-center justify-center">
                <Download className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">Slide2Course</span>
            </div>

            <nav className="hidden lg:flex items-center gap-6 text-sm">
              <Link href="/" className="text-slate-600 hover:text-slate-900">דף הבית</Link>
              <Link href="/converter" className="text-cyan-500 font-medium">יצירת קורס</Link>
              <Link href="#" className="text-slate-600 hover:text-slate-900">מדריך תבניות</Link>
              <Link href="/teacher-register" className="text-slate-600 hover:text-slate-900">רישום מורה</Link>
              <Link href="#" className="text-slate-600 hover:text-slate-900">צור קשר</Link>
            </nav>

            <Button asChild className="bg-cyan-400 hover:bg-cyan-500 text-white rounded-md px-6">
              <Link href="/teacher-register">הרשמה</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 text-cyan-600 text-sm mb-6 border border-cyan-100">
              <Sparkles className="h-4 w-4" />
              <span>המרה חכמה באמצעות AI</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              יצירת קורס
            </h1>
            <p className="text-lg text-slate-600">
              העלו מצגת PowerPoint והמירו אותה לקורס HTML אינטראקטיבי
            </p>
          </div>
          
          <Card className="border border-slate-200">
            <CardContent className="p-8">
              {/* Upload Area */}
              <div
                className={`relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all ${
                  isDragging
                    ? 'border-cyan-400 bg-cyan-50'
                    : file
                    ? 'border-green-400 bg-green-50'
                    : 'border-slate-300 hover:border-cyan-400 hover:bg-slate-50'
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
                    <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                      <FileUp className="h-8 w-8 text-green-500" />
                    </div>
                    <p className="text-lg font-semibold text-slate-900">{file.name}</p>
                    <p className="text-sm text-slate-500 mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p className="mt-3 text-xs text-slate-400">
                      לחץ להחלפת הקובץ
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-cyan-50 rounded-xl flex items-center justify-center mb-4">
                      <Upload className="h-8 w-8 text-cyan-500" />
                    </div>
                    <p className="text-lg font-semibold text-slate-900">
                      גרור מצגת לכאן
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      או לחץ לבחירת קובץ
                    </p>
                    <p className="mt-3 text-xs text-slate-400">
                      קבצים נתמכים: PPTX (PowerPoint)
                    </p>
                  </>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-5 flex items-center gap-3 rounded-lg bg-red-50 p-4 text-red-700 border border-red-100">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Convert Options */}
              {file && !convertedHtml && (
                <div className="mt-6 space-y-4">
                  {file.size > 5 * 1024 * 1024 && (
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        checked={skipImages}
                        onChange={(e) => setSkipImages(e.target.checked)}
                        className="rounded border-slate-300 text-cyan-500 focus:ring-cyan-500"
                      />
                      דלג על תמונות (מומלץ לקבצים גדולים)
                    </label>
                  )}
                  
                  <Button
                    className="w-full bg-cyan-400 hover:bg-cyan-500 text-white h-12 text-base rounded-lg"
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
                        <Sparkles className="ml-2 h-5 w-5" />
                        המר לקורס HTML
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Results */}
              {convertedHtml && (
                <div className="mt-6 space-y-5">
                  <div className="rounded-xl bg-green-50 p-5 text-center border border-green-100">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="font-semibold text-green-800 text-lg">
                      ההמרה הושלמה בהצלחה!
                    </p>
                    <p className="text-sm text-green-600 mt-1">
                      הומרו {slideCount} שקופיות לקורס HTML
                    </p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      className="flex-1 h-11"
                      variant="outline"
                      onClick={handlePreview}
                    >
                      <Eye className="ml-2 h-4 w-4" />
                      תצוגה מקדימה
                    </Button>
                    <Button
                      className="flex-1 h-11 bg-cyan-400 hover:bg-cyan-500 text-white"
                      onClick={handleDownload}
                    >
                      <Download className="ml-2 h-4 w-4" />
                      הורד קובץ HTML
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full text-slate-600"
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
          <Card className="mt-8 border border-slate-200">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">איך זה עובד?</h2>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">1</span>
                  <span>העלו מצגת PowerPoint (PPTX)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">2</span>
                  <span>המערכת תחלץ את כל התוכן: טקסטים, כותרות, בולטים ותמונות</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">3</span>
                  <span>שקופיות שער צהובות יהפכו לכותרות פרקים בניווט</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">4</span>
                  <span>הורידו את הקורס כקובץ HTML מוכן לשימוש</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
