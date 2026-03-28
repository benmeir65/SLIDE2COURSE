import JSZip from 'jszip'

export interface SlideElement {
  type: 'text' | 'title' | 'bullet' | 'image'
  content: string
  position: {
    x: number
    y: number
    width: number
    height: number
  }
  textProperties?: {
    isRTL: boolean
    fontSize: number
    fontFamily: string
    isBold: boolean
    isItalic: boolean
    color: string
  }
  bulletLevel?: number
  imageData?: { data: string; contentType: string }
}

export interface TableCell {
  content: string
  isBold: boolean
}

export interface TableData {
  rows: TableCell[][]
}

export interface TextWithFormatting {
  content: string
  isBold: boolean
}

export interface SlideContent {
  slideNumber: number
  title: string
  texts: TextWithFormatting[]
  bulletPoints: TextWithFormatting[][]
  images: { data: string; contentType: string }[]
  elements: SlideElement[]
  tables: TableData[]
  isYellowSlide: boolean
}

export interface ParsedPresentation {
  slides: SlideContent[]
  title: string
}

// Parse PPTX file and extract content
export async function parsePPTX(file: File): Promise<ParsedPresentation> {
  console.log('[v0] Starting PPTX parsing for file:', file.name, 'size:', file.size)
  
  const zip = new JSZip()
  let contents
  
  try {
    contents = await zip.loadAsync(file)
    console.log('[v0] ZIP loaded successfully. Files found:', Object.keys(contents.files).length)
  } catch (zipError) {
    console.error('[v0] Failed to load ZIP:', zipError)
    throw new Error('Failed to load PPTX file as ZIP')
  }
  
  const slides: SlideContent[] = []
  const images: Map<string, { data: string; contentType: string }> = new Map()
  
  // Extract images from ppt/media folder with improved handling
  const mediaFiles = Object.keys(contents.files).filter(name => 
    name.startsWith('ppt/media/') && !contents.files[name].dir
  )
  
  console.log('[v0] Media files found:', mediaFiles.length)
  
  for (const mediaPath of mediaFiles) {
    try {
      const mediaFile = contents.files[mediaPath]
      
      // Get uncompressed size to check if image is too large
      const fileData = await mediaFile.async('uint8array')
      const fileSizeKB = fileData.length / 1024
      
      console.log('[v0] Processing media:', mediaPath, 'size:', fileSizeKB.toFixed(1), 'KB')
      
      // More flexible image size handling - try to compress or resize large images
      if (fileSizeKB > 1000) {
        console.log('[v0] Skipping very large image (>1MB):', mediaPath)
        continue
      }
      
      // More efficient base64 conversion using built-in methods when possible
      let data: string
      try {
        // Use FileReader-like approach for better memory efficiency
        const blob = new Blob([fileData])
        const reader = new FileReader()
        
        data = await new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const result = reader.result as string
            resolve(result.split(',')[1]) // Remove data URL prefix
          }
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
      } catch {
        // Fallback to manual conversion
        let binary = ''
        const bytes = fileData
        const len = bytes.byteLength
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        data = btoa(binary)
      }
      
      const extension = mediaPath.split('.').pop()?.toLowerCase() || 'png'
      const contentType = getImageContentType(extension)
      
      const fileName = mediaPath.split('/').pop() || ''
      images.set(fileName, { data: `data:${contentType};base64,${data}`, contentType })
    } catch (imgError) {
      console.error('[v0] Error processing image:', mediaPath, imgError)
      // Continue processing other images instead of failing completely
    }
  }

  // Helper function for content type determination
  function getImageContentType(extension: string): string {
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg'
      case 'png':
        return 'image/png'
      case 'gif':
        return 'image/gif'
      case 'webp':
        return 'image/webp'
      case 'svg':
        return 'image/svg+xml'
      case 'bmp':
        return 'image/bmp'
      default:
        return 'image/png'
    }
  }
  
  // Find all slide XML files
  const allFiles = Object.keys(contents.files)
  console.log('[v0] All files in PPTX:', allFiles.slice(0, 20), '... total:', allFiles.length)
  
  const slideFiles = allFiles
    .filter(name => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort((a, b) => {
      const numA = parseInt(a.match(/slide(\d+)/)?.[1] || '0')
      const numB = parseInt(b.match(/slide(\d+)/)?.[1] || '0')
      return numA - numB
    })
  
  console.log('[v0] Slide files found:', slideFiles)
  
  if (slideFiles.length === 0) {
    console.error('[v0] No slide files found in PPTX')
    throw new Error('No slides found in PPTX file')
  }
  
  // Parse each slide
  for (let i = 0; i < slideFiles.length; i++) {
    const slideFile = contents.files[slideFiles[i]]
    console.log('[v0] Parsing slide:', slideFiles[i])
    const xmlContent = await slideFile.async('string')
    console.log('[v0] Slide XML length:', xmlContent.length)
    const slideContent = parseSlideXML(xmlContent, i + 1, images)
    console.log('[v0] Slide parsed:', slideContent.title, 'texts:', slideContent.texts.length)
    slides.push(slideContent)
  }
  
  // Determine presentation title from first yellow slide or first slide
  const titleSlide = slides.find(s => s.isYellowSlide) || slides[0]
  const title = titleSlide?.title || file.name.replace(/\.(pptx?|ppt)$/i, '')
  
  return { slides, title }
}

function parseSlideXML(
  xml: string, 
  slideNumber: number,
  images: Map<string, { data: string; contentType: string }>
): SlideContent {
  const texts: TextWithFormatting[] = []
  const bulletPoints: TextWithFormatting[][] = []
  const elements: SlideElement[] = []
  const tables: TableData[] = []
  let title = ''
  let isYellowSlide = false
  const slideImages: { data: string; contentType: string }[] = []
  
  // Check for yellow/gold background (title slide indicator)
  const yellowPatterns = [
    /srgbClr val="(FF[DEC][0-9A-F]{3}|FFC000|FFD700|F[FE][BC][0-9A-F]{3})"/gi,
    /schemeClr val="accent[1-4]"/gi
  ]
  for (const pattern of yellowPatterns) {
    if (pattern.test(xml)) {
      // Additional check - if it has limited text, likely a title slide
      const textMatches = xml.match(/<a:t>([^<]+)<\/a:t>/g)
      if (textMatches && textMatches.length <= 3) {
        isYellowSlide = true
      }
    }
  }
  
  // Parse text boxes with positioning information
  const textBoxRegex = /<p:sp>([\s\S]*?)<\/p:sp>/g
  let match
  const allParagraphs: { 
    text: string; 
    isBullet: boolean; 
    isTitle: boolean;
    position: { x: number; y: number; width: number; height: number };
    textProperties: {
      isRTL: boolean;
      fontSize: number;
      fontFamily: string;
      isBold: boolean;
      isItalic: boolean;
      color: string;
    };
    bulletLevel: number;
  }[] = []
  
  while ((match = textBoxRegex.exec(xml)) !== null) {
    const shapeContent = match[1]
    
    // Extract position and size information
    const positionMatch = shapeContent.match(/<a:xfrm>([\s\S]*?)<\/a:xfrm>/)
    let position = { x: 0, y: 0, width: 100, height: 20 }
    
    if (positionMatch) {
      const xfrmContent = positionMatch[1]
      const offsetMatch = xfrmContent.match(/<a:off x="([^"]+)" y="([^"]+)"/)
      const extentMatch = xfrmContent.match(/<a:ext cx="([^"]+)" cy="([^"]+)"/)
      
      if (offsetMatch && extentMatch) {
        // Convert EMUs (English Metric Units) to approximate percentages
        // 1 inch = 914400 EMUs, typical slide is ~10" x 7.5"
        position = {
          x: Math.round((parseInt(offsetMatch[1]) / 914400) * 10), // Convert to approximate slide units
          y: Math.round((parseInt(offsetMatch[2]) / 914400) * 7.5),
          width: Math.round((parseInt(extentMatch[1]) / 914400) * 10),
          height: Math.round((parseInt(extentMatch[2]) / 914400) * 7.5)
        }
      }
    }
    
    // Parse paragraphs within this text box
    const paragraphRegex = /<a:p>([\s\S]*?)<\/a:p>/g
    let paraMatch
    
    while ((paraMatch = paragraphRegex.exec(shapeContent)) !== null) {
      const paragraphContent = paraMatch[1]
      
      // Check if this paragraph has bullet point marker
      const hasBullet = /<a:buChar/.test(paragraphContent) || 
                        /<a:buAutoNum/.test(paragraphContent)
      
      // Extract bullet level
      const levelMatch = paragraphContent.match(/<a:pPr[^>]*lvl="([^"]+)"/)
      const bulletLevel = levelMatch ? parseInt(levelMatch[1]) : 0
      
      // Check if this is a title placeholder
      const isTitle = /<p:ph type="title"/.test(shapeContent) ||
                      /<p:ph type="ctrTitle"/.test(shapeContent)
      
      // Extract text properties
      const textProperties = extractTextProperties(paragraphContent)
      
      // Extract ALL text runs within this paragraph and join them (same line)
      const textParts: string[] = []
      const innerTextRegex = /<a:t>([^<]*)<\/a:t>/g
      let innerMatch
      while ((innerMatch = innerTextRegex.exec(paragraphContent)) !== null) {
        // Keep the text as-is, including spaces and preserve RTL characters
        if (innerMatch[1]) {
          textParts.push(innerMatch[1])
        }
      }
      
      // Join all text parts within the same paragraph (they belong to the same line)
      const fullText = textParts.join('').trim()
      
      if (fullText) {
        allParagraphs.push({ 
          text: fullText, 
          isBullet: hasBullet, 
          isTitle,
          position,
          textProperties,
          bulletLevel
        })
      }
    }
  }
  
  // Helper function to extract text properties including RTL detection
  function extractTextProperties(paragraphContent: string) {
    const properties = {
      isRTL: false,
      fontSize: 18,
      fontFamily: 'Arial',
      isBold: false,
      isItalic: false,
      color: '#000000'
    }
    
    // Detect RTL text (Hebrew, Arabic characters)
    const hebrewRegex = /[\u0590-\u05FF]/
    const arabicRegex = /[\u0600-\u06FF]/
    if (hebrewRegex.test(paragraphContent) || arabicRegex.test(paragraphContent)) {
      properties.isRTL = true
    }
    
    // Extract font size
    const sizeMatch = paragraphContent.match(/<a:rPr[^>]*sz="([^"]+)"/)
    if (sizeMatch) {
      properties.fontSize = parseInt(sizeMatch[1]) / 100 // Convert from points*100
    }
    
    // Extract font family
    const fontMatch = paragraphContent.match(/<a:latin[^>]*typeface="([^"]+)"/)
    if (fontMatch) {
      properties.fontFamily = fontMatch[1]
    }
    
    // Check for bold
    if (/<a:rPr[^>]*b="1"/.test(paragraphContent)) {
      properties.isBold = true
    }
    
    // Check for italic
    if (/<a:rPr[^>]*i="1"/.test(paragraphContent)) {
      properties.isItalic = true
    }
    
    // Extract color
    const colorMatch = paragraphContent.match(/<a:srgbClr val="([^"]+)"/)
    if (colorMatch) {
      properties.color = '#' + colorMatch[1]
    }
    
    return properties
  }
  
  // Sort paragraphs by position (top to bottom, then right to left for RTL)
  allParagraphs.sort((a, b) => {
    if (Math.abs(a.position.y - b.position.y) > 20) {
      return a.position.y - b.position.y // Sort by Y position first
    }
    // For elements at similar Y positions, sort by X (RTL consideration)
    return a.textProperties.isRTL ? b.position.x - a.position.x : a.position.x - b.position.x
  })
  
  // First paragraph or title-marked paragraph becomes the title
  const titleParagraph = allParagraphs.find(p => p.isTitle) || allParagraphs[0]
  if (titleParagraph) {
    title = titleParagraph.text
    
    // Add title as an element
    elements.push({
      type: 'title',
      content: titleParagraph.text,
      position: titleParagraph.position,
      textProperties: titleParagraph.textProperties
    })
  }
  
  // Process remaining paragraphs
  let currentBulletGroup: TextWithFormatting[] = []
  let currentBulletLevel = 0
  
  for (const para of allParagraphs) {
    // Skip the title paragraph
    if (para.text === title && para === titleParagraph) continue
    
    const textWithFormatting: TextWithFormatting = {
      content: para.text,
      isBold: para.textProperties.isBold
    }
    
    if (para.isBullet) {
      // Handle nested bullet points
      if (para.bulletLevel !== currentBulletLevel && currentBulletGroup.length > 0) {
        bulletPoints.push([...currentBulletGroup])
        currentBulletGroup = []
      }
      
      currentBulletGroup.push(textWithFormatting)
      currentBulletLevel = para.bulletLevel
      
      // Add bullet as an element
      elements.push({
        type: 'bullet',
        content: para.text,
        position: para.position,
        textProperties: para.textProperties,
        bulletLevel: para.bulletLevel
      })
    } else {
      // If we were in a bullet group, close it
      if (currentBulletGroup.length > 0) {
        bulletPoints.push([...currentBulletGroup])
        currentBulletGroup = []
      }
      // Add as regular text with formatting
      texts.push(textWithFormatting)
      
      // Add text as an element
      elements.push({
        type: 'text',
        content: para.text,
        position: para.position,
        textProperties: para.textProperties
      })
    }
  }
  
  // Don't forget last bullet group
  if (currentBulletGroup.length > 0) {
    bulletPoints.push(currentBulletGroup)
  }
  
  // Parse tables from the slide
  const tableRegex = /<a:tbl>([\s\S]*?)<\/a:tbl>/g
  let tableMatch
  
  while ((tableMatch = tableRegex.exec(xml)) !== null) {
    const tableContent = tableMatch[1]
    const tableData: TableData = { rows: [] }
    
    // Parse rows
    const rowRegex = /<a:tr[^>]*>([\s\S]*?)<\/a:tr>/g
    let rowMatch
    
    while ((rowMatch = rowRegex.exec(tableContent)) !== null) {
      const rowContent = rowMatch[1]
      const row: TableCell[] = []
      
      // Parse cells
      const cellRegex = /<a:tc>([\s\S]*?)<\/a:tc>/g
      let cellMatch
      
      while ((cellMatch = cellRegex.exec(rowContent)) !== null) {
        const cellContent = cellMatch[1]
        
        // Extract text from cell
        const cellTexts: string[] = []
        const cellTextRegex = /<a:t>([^<]*)<\/a:t>/g
        let cellTextMatch
        
        while ((cellTextMatch = cellTextRegex.exec(cellContent)) !== null) {
          if (cellTextMatch[1]) {
            cellTexts.push(cellTextMatch[1])
          }
        }
        
        // Check for bold in cell
        const isBold = /<a:rPr[^>]*b="1"/.test(cellContent)
        
        row.push({
          content: cellTexts.join('').trim(),
          isBold
        })
      }
      
      if (row.length > 0) {
        tableData.rows.push(row)
      }
    }
    
    if (tableData.rows.length > 0) {
      tables.push(tableData)
    }
  }
  
  // Parse images with improved positioning
  const imageShapeRegex = /<p:pic>([\s\S]*?)<\/p:pic>/g
  let imageMatch
  
  while ((imageMatch = imageShapeRegex.exec(xml)) !== null) {
    const imageShapeContent = imageMatch[1]
    
    // Extract position information for image
    const positionMatch = imageShapeContent.match(/<a:xfrm>([\s\S]*?)<\/a:xfrm>/)
    let position = { x: 0, y: 0, width: 100, height: 100 }
    
    if (positionMatch) {
      const xfrmContent = positionMatch[1]
      const offsetMatch = xfrmContent.match(/<a:off x="([^"]+)" y="([^"]+)"/)
      const extentMatch = xfrmContent.match(/<a:ext cx="([^"]+)" cy="([^"]+)"/)
      
      if (offsetMatch && extentMatch) {
        position = {
          x: Math.round((parseInt(offsetMatch[1]) / 914400) * 10),
          y: Math.round((parseInt(offsetMatch[2]) / 914400) * 7.5),
          width: Math.round((parseInt(extentMatch[1]) / 914400) * 10),
          height: Math.round((parseInt(extentMatch[2]) / 914400) * 7.5)
        }
      }
    }
    
    // Extract image reference
    const embedMatch = imageShapeContent.match(/r:embed="([^"]+)"/)
    if (embedMatch) {
      // Find the corresponding image in our images map
      images.forEach((imgData, fileName) => {
        if (xml.includes(fileName) || imageShapeContent.includes(embedMatch[1])) {
          slideImages.push(imgData)
          
          // Add image as an element with positioning
          elements.push({
            type: 'image',
            content: fileName,
            position: position,
            imageData: imgData
          })
        }
      })
    }
  }
  
  return {
    slideNumber,
    title,
    texts,
    bulletPoints,
    images: slideImages,
    elements,
    tables,
    isYellowSlide
  }
}

// Convert parsed presentation to HTML
export function convertToHTML(presentation: ParsedPresentation): string {
  const { slides, title } = presentation
  
  // Group slides by yellow slides (chapters) - ONLY yellow slides become chapters
  const chapters: { title: string; slides: SlideContent[] }[] = []
  let currentChapter: { title: string; slides: SlideContent[] } | null = null
  
  for (const slide of slides) {
    if (slide.isYellowSlide) {
      // Yellow slide = new chapter
      if (currentChapter) {
        chapters.push(currentChapter)
      }
      currentChapter = { title: slide.title, slides: [] }
    } else if (currentChapter) {
      // Non-yellow slide goes into current chapter
      currentChapter.slides.push(slide)
    } else {
      // Slides before first yellow slide - create a default chapter
      currentChapter = { title: title || 'מבוא', slides: [slide] }
    }
  }
  
  if (currentChapter) {
    chapters.push(currentChapter)
  }
  
  // Generate HTML
  const html = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
    }
    
    .course-container {
      display: flex;
      min-height: 100vh;
    }
    
    /* Navigation Sidebar */
    .nav-sidebar {
      width: 280px;
      background: #1a1a2e;
      color: #fff;
      padding: 20px;
      position: fixed;
      height: 100vh;
      overflow-y: auto;
      right: 0;
    }
    
    .nav-title {
      font-size: 1.3rem;
      font-weight: bold;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 2px solid #0ea5e9;
      color: #0ea5e9;
    }
    
    .nav-chapter {
      margin-bottom: 15px;
    }
    
    .nav-chapter-title {
      display: block;
      padding: 10px 15px;
      background: #16213e;
      border-radius: 8px;
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s;
    }
    
    .nav-chapter-title:hover {
      background: #0ea5e9;
    }
    
    .nav-subchapters {
      margin-top: 8px;
      padding-right: 15px;
    }
    
    .nav-subchapter {
      display: block;
      padding: 6px 12px;
      color: #a0a0a0;
      text-decoration: none;
      font-size: 0.9rem;
      border-right: 2px solid transparent;
      transition: all 0.3s;
    }
    
    .nav-subchapter:hover {
      color: #0ea5e9;
      border-right-color: #0ea5e9;
    }
    
    /* Main Content */
    .main-content {
      flex: 1;
      margin-right: 280px;
      padding: 40px;
    }
    
    .chapter {
      background: #fff;
      border-radius: 12px;
      padding: 40px;
      margin-bottom: 30px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .chapter-title {
      font-size: 2rem;
      color: #1a1a2e;
      margin-bottom: 30px;
      padding-bottom: 15px;
      border-bottom: 3px solid #0ea5e9;
    }
    
    .slide-section {
      margin-bottom: 40px;
      padding-bottom: 30px;
      border-bottom: 1px solid #eee;
    }
    
    .slide-section:last-child {
      border-bottom: none;
    }
    
    .slide-title {
      font-size: 1.4rem;
      color: #333;
      margin-bottom: 20px;
      font-weight: 600;
    }
    
    .slide-content p {
      margin-bottom: 15px;
      font-size: 1.1rem;
    }
    
    /* Enhanced positioning and RTL support */
    .slide-elements {
      position: relative;
      min-height: 400px;
      background: #fff;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      margin: 20px 0;
    }
    
    .slide-element {
      position: absolute;
      word-wrap: break-word;
    }
    
    .slide-element.rtl {
      direction: rtl;
      text-align: right;
    }
    
    .slide-element.ltr {
      direction: ltr;
      text-align: left;
    }
    
    .slide-element.title {
      font-weight: bold;
      font-size: 1.4em;
      color: #1a1a2e;
    }
    
    .slide-element.bullet {
      padding-right: 20px;
    }
    
    .slide-element.bullet.rtl::before {
      content: "• ";
      margin-left: 8px;
    }
    
    .slide-element.bullet.ltr::before {
      content: "• ";
      margin-right: 8px;
    }
    
    .slide-element.bullet.level-1 {
      padding-right: 40px;
    }
    
    .slide-element.bullet.level-2 {
      padding-right: 60px;
    }
    
    .slide-element img {
      max-width: 100%;
      height: auto;
      border-radius: 4px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.2);
    }
    
    .bullet-list {
      list-style: none;
      margin: 20px 0;
    }
    
    .bullet-list li {
      padding: 10px 20px;
      margin-bottom: 8px;
      background: #f8f9fa;
      border-radius: 8px;
      border-right: 4px solid #0ea5e9;
      font-size: 1.05rem;
    }
    
    .slide-image {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 20px 0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .slide-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      background: #fff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    }
    
    .slide-table th,
    .slide-table td {
      padding: 12px 16px;
      text-align: right;
      border: 1px solid #e0e0e0;
    }
    
    .slide-table th {
      background: #1a1a2e;
      color: #fff;
      font-weight: 600;
    }
    
    .slide-table tr:nth-child(even) {
      background: #f8f9fa;
    }
    
    .slide-table tr:hover {
      background: #e8f4fc;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .nav-sidebar {
        position: relative;
        width: 100%;
        height: auto;
      }
      
      .main-content {
        margin-right: 0;
      }
      
      .course-container {
        flex-direction: column;
      }
    }
  </style>
</head>
<body>
  <div class="course-container">
    <nav class="nav-sidebar">
      <div class="nav-title">${escapeHtml(title)}</div>
      ${chapters.map((chapter, index) => `
        <div class="nav-chapter">
          <a href="#chapter-${index + 1}" class="nav-chapter-title">${escapeHtml(chapter.title)}</a>
        </div>
      `).join('')}
    </nav>
    
    <main class="main-content">
      ${chapters.map((chapter, index) => `
        <article class="chapter" id="chapter-${index + 1}">
          <h2 class="chapter-title">${escapeHtml(chapter.title)}</h2>
          ${chapter.slides.map((slide, slideIndex) => `
            <section class="slide-section" id="chapter-${index + 1}-slide-${slideIndex + 1}">
              ${slide.title && slide.title !== chapter.title ? `
                <h3 class="slide-title">${escapeHtml(slide.title)}</h3>
              ` : ''}
              
              <!-- Enhanced positioned slide elements -->
              <div class="slide-elements">
                ${slide.elements.map(element => {
                  const rtlClass = element.textProperties?.isRTL ? 'rtl' : 'ltr'
                  const typeClass = element.type
                  const levelClass = element.bulletLevel ? `level-${element.bulletLevel}` : ''
                  
                  const style = `
                    left: ${Math.max(0, Math.min(90, element.position.x))}%;
                    top: ${Math.max(0, Math.min(90, element.position.y))}%;
                    width: ${Math.max(10, Math.min(100, element.position.width))}%;
                    height: auto;
                    font-size: ${element.textProperties?.fontSize || 16}px;
                    font-family: ${element.textProperties?.fontFamily || 'Arial'};
                    font-weight: ${element.textProperties?.isBold ? 'bold' : 'normal'};
                    font-style: ${element.textProperties?.isItalic ? 'italic' : 'normal'};
                    color: ${element.textProperties?.color || '#000000'};
                  `.replace(/\\s+/g, ' ').trim()
                  
                  if (element.type === 'image' && element.imageData) {
                    return `<div class="slide-element ${typeClass}" style="${style}">
                      <img src="${element.imageData.data}" alt="${escapeHtml(element.content)}" />
                    </div>`
                  } else {
                    return `<div class="slide-element ${typeClass} ${rtlClass} ${levelClass}" style="${style}">
                      ${escapeHtml(element.content)}
                    </div>`
                  }
                }).join('')}
              </div>
              
              <!-- Content in order: Title, Text, Bullets, Tables, Images -->
              <div class="slide-content" style="margin-top: 20px;">
                ${slide.texts.map(textItem => {
                  const content = escapeHtml(textItem.content)
                  return textItem.isBold 
                    ? `<p><strong>${content}</strong></p>` 
                    : `<p>${content}</p>`
                }).join('')}
                ${slide.bulletPoints.map(group => `
                  <ul class="bullet-list">
                    ${group.map(item => {
                      const content = escapeHtml(item.content)
                      return item.isBold 
                        ? `<li><strong>${content}</strong></li>` 
                        : `<li>${content}</li>`
                    }).join('')}
                  </ul>
                `).join('')}
                ${slide.tables.map(table => `
                  <table class="slide-table">
                    ${table.rows.map((row, rowIndex) => `
                      <tr>
                        ${row.map(cell => {
                          const content = escapeHtml(cell.content)
                          const cellTag = rowIndex === 0 ? 'th' : 'td'
                          return cell.isBold 
                            ? `<${cellTag}><strong>${content}</strong></${cellTag}>` 
                            : `<${cellTag}>${content}</${cellTag}>`
                        }).join('')}
                      </tr>
                    `).join('')}
                  </table>
                `).join('')}
                ${slide.images.map(img => `
                  <img src="${img.data}" alt="תמונה מהמצגת" class="slide-image" />
                `).join('')}
              </div>
            </section>
          `).join('')}
        </article>
      `).join('')}
    </main>
  </div>
</body>
</html>`

  return html
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}


