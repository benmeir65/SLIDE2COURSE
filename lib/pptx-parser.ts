import JSZip from 'jszip'

export interface SlideContent {
  slideNumber: number
  title: string
  texts: string[]
  bulletPoints: string[][]
  images: { data: string; contentType: string }[]
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
  
  // Extract images from ppt/media folder (skip very large images to avoid memory issues)
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
      
      // Skip images larger than 500KB to avoid memory issues
      if (fileSizeKB > 500) {
        console.log('[v0] Skipping large image:', mediaPath)
        continue
      }
      
      // Convert to base64
      let binary = ''
      const bytes = fileData
      const len = bytes.byteLength
      for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      const data = btoa(binary)
      
      const extension = mediaPath.split('.').pop()?.toLowerCase() || 'png'
      const contentType = extension === 'jpg' || extension === 'jpeg' 
        ? 'image/jpeg' 
        : extension === 'png' 
        ? 'image/png' 
        : extension === 'gif'
        ? 'image/gif'
        : 'image/png'
      
      const fileName = mediaPath.split('/').pop() || ''
      images.set(fileName, { data: `data:${contentType};base64,${data}`, contentType })
    } catch (imgError) {
      console.error('[v0] Error processing image:', mediaPath, imgError)
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
  const texts: string[] = []
  const bulletPoints: string[][] = []
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
  
  // Parse paragraphs - each <a:p> is one line/paragraph in PowerPoint
  const paragraphRegex = /<a:p>([\s\S]*?)<\/a:p>/g
  let match
  const allParagraphs: { text: string; isBullet: boolean; isTitle: boolean }[] = []
  
  while ((match = paragraphRegex.exec(xml)) !== null) {
    const paragraphContent = match[1]
    
    // Check if this paragraph has bullet point marker
    const hasBullet = /<a:buChar/.test(paragraphContent) || 
                      /<a:buAutoNum/.test(paragraphContent)
    
    // Check if this is a title placeholder
    const isTitle = /<p:ph type="title"/.test(paragraphContent) ||
                    /<p:ph type="ctrTitle"/.test(paragraphContent)
    
    // Extract ALL text runs within this paragraph and join them (same line)
    const textParts: string[] = []
    const innerTextRegex = /<a:t>([^<]*)<\/a:t>/g
    let innerMatch
    while ((innerMatch = innerTextRegex.exec(paragraphContent)) !== null) {
      // Keep the text as-is, including spaces
      if (innerMatch[1]) {
        textParts.push(innerMatch[1])
      }
    }
    
    // Join all text parts within the same paragraph (they belong to the same line)
    const fullText = textParts.join('').trim()
    
    if (fullText) {
      allParagraphs.push({ text: fullText, isBullet: hasBullet, isTitle })
    }
  }
  
  // First paragraph or title-marked paragraph becomes the title
  const titleParagraph = allParagraphs.find(p => p.isTitle) || allParagraphs[0]
  if (titleParagraph) {
    title = titleParagraph.text
  }
  
  // Process remaining paragraphs
  let currentBulletGroup: string[] = []
  
  for (const para of allParagraphs) {
    // Skip the title paragraph
    if (para.text === title && para === titleParagraph) continue
    
    if (para.isBullet) {
      currentBulletGroup.push(para.text)
    } else {
      // If we were in a bullet group, close it
      if (currentBulletGroup.length > 0) {
        bulletPoints.push([...currentBulletGroup])
        currentBulletGroup = []
      }
      // Add as regular text
      texts.push(para.text)
    }
  }
  
  // Don't forget last bullet group
  if (currentBulletGroup.length > 0) {
    bulletPoints.push(currentBulletGroup)
  }
  
  // Extract image references
  const imageRefRegex = /r:embed="(rId\d+)"/g
  const relFile = xml.match(/Target="\.\.\/media\/([^"]+)"/g)
  
  // Add images that were found in relations
  const imageRefs = xml.match(/blip.*?r:embed/g)
  if (imageRefs) {
    images.forEach((imgData, fileName) => {
      if (xml.includes(fileName) || slideImages.length < images.size / Math.max(1, slideNumber)) {
        slideImages.push(imgData)
      }
    })
  }
  
  return {
    slideNumber,
    title,
    texts,
    bulletPoints,
    images: slideImages,
    isYellowSlide
  }
}

// Convert parsed presentation to HTML
export function convertToHTML(presentation: ParsedPresentation): string {
  const { slides, title } = presentation
  
  // Group slides by yellow slides (chapters)
  const chapters: { title: string; slides: SlideContent[] }[] = []
  let currentChapter: { title: string; slides: SlideContent[] } | null = null
  
  for (const slide of slides) {
    if (slide.isYellowSlide) {
      if (currentChapter) {
        chapters.push(currentChapter)
      }
      currentChapter = { title: slide.title, slides: [] }
    } else if (currentChapter) {
      currentChapter.slides.push(slide)
    } else {
      // Slides before first yellow slide
      if (!currentChapter) {
        currentChapter = { title: slide.title || 'מבוא', slides: [] }
      }
      currentChapter.slides.push(slide)
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
          ${chapter.slides.length > 0 ? `
            <div class="nav-subchapters">
              ${chapter.slides.map((slide, slideIndex) => `
                <a href="#chapter-${index + 1}-slide-${slideIndex + 1}" class="nav-subchapter">
                  ${escapeHtml(slide.title || `שקופית ${slide.slideNumber}`)}
                </a>
              `).join('')}
            </div>
          ` : ''}
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
              <div class="slide-content">
                ${slide.texts.map(text => `<p>${escapeHtml(text)}</p>`).join('')}
                ${slide.bulletPoints.map(group => `
                  <ul class="bullet-list">
                    ${group.map(item => `<li>${escapeHtml(item)}</li>`).join('')}
                  </ul>
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
