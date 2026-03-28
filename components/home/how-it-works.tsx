import { Upload, PenLine, Wand2, Images, Share2 } from "lucide-react"

function UploadIllustration() {
  return (
    <div className="mt-4 w-full rounded-lg border border-dashed border-border bg-muted/40 p-3">
      <div className="flex flex-col items-center gap-2">
        {/* Upload arrow */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-primary">
            <path d="M7 11V3M4 5.5L7 2.5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {/* File types */}
        <div className="flex gap-1.5">
          {[
            { label: "PPTX", color: "bg-orange-100 text-orange-600 border-orange-200" },
            { label: "OneDrive", color: "bg-blue-50 text-blue-500 border-blue-200" },
            { label: "Canva", color: "bg-purple-50 text-purple-500 border-purple-200" },
          ].map((f) => (
            <div key={f.label} className={`rounded border px-1.5 py-0.5 text-[7px] font-semibold ${f.color}`}>
              {f.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SlidesIllustration() {
  return (
    <div className="mt-4 flex w-full flex-col items-center gap-2">
      {/* Regular slide 1 - square */}
      <div className="aspect-square w-16 rounded border border-border bg-muted" />
      {/* Yellow title slide - square with text */}
      <div className="flex aspect-square w-16 items-center justify-center rounded bg-amber-400">
        <span className="text-[8px] font-bold text-amber-900">שם היחידה</span>
      </div>
      {/* Regular slide 3 - square */}
      <div className="aspect-square w-16 rounded border border-border bg-muted" />
      {/* Question slide - square with text above */}
      <div className="flex flex-col items-center gap-1">
        <span className="text-[8px] text-primary/70">שאלה לפי תבנית</span>
        <div className="flex aspect-square w-16 items-center justify-center rounded border border-dashed border-primary/40 bg-primary/10">
          <span className="text-lg text-primary">{'?'}</span>
        </div>
      </div>
    </div>
  )
}

function NavTabsIllustration() {
  return (
    <div className="mt-4 w-full overflow-hidden rounded-lg border border-border bg-muted/60">
      <div className="flex h-32">
        {/* Sidebar nav */}
        <div className="flex w-16 flex-shrink-0 flex-col gap-1 border-l border-border bg-card p-1.5">
          {["מבוא", "פרק 1", "פרק 2", "סיכום"].map((tab, i) => (
            <div
              key={tab}
              className={`rounded-md px-1 py-1.5 text-center text-[9px] font-medium leading-none ${
                i === 1
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>
        {/* Scrollable content area */}
        <div className="flex flex-1 flex-col gap-1.5 p-2">
          <div className="h-3 w-3/4 rounded bg-border/80" />
          <div className="h-2 w-full rounded bg-border/50" />
          <div className="h-2 w-5/6 rounded bg-border/50" />
          <div className="h-2 w-full rounded bg-border/50" />
          <div className="h-2 w-2/3 rounded bg-border/50" />
          <div className="mt-auto flex items-center gap-1 text-[8px] text-muted-foreground/60">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="animate-bounce">
              <path d="M4 1v6M1 5l3 3 3-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            גלילה
          </div>
        </div>
      </div>
    </div>
  )
}

function CourseScrollIllustration() {
  return (
    <div className="mt-4 w-full overflow-hidden rounded-lg border border-border bg-card">
      {/* Mini scrollable course preview */}
      <div className="flex h-40 flex-col gap-2 overflow-hidden p-2">
        {/* Video player */}
        <div className="flex h-14 flex-shrink-0 items-center justify-center rounded-md bg-foreground/5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-primary">
              <path d="M3 2v6l5-3z" fill="currentColor" />
            </svg>
          </div>
        </div>
        {/* Question */}
        <div className="flex-shrink-0 rounded-md border border-dashed border-primary/30 bg-primary/5 p-1.5">
          <div className="mb-1 text-[8px] font-semibold text-foreground">שאלה</div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <div className="h-2.5 w-2.5 rounded-full border border-primary/40" />
              <div className="h-1.5 w-14 rounded bg-border/80" />
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2.5 w-2.5 rounded-full border border-primary/40 bg-primary/30" />
              <div className="h-1.5 w-10 rounded bg-border/80" />
            </div>
          </div>
        </div>
        {/* Image */}
        <div className="flex h-10 flex-shrink-0 items-center justify-center rounded-md bg-foreground/5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground/50">
            <rect x="1" y="2" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1" />
            <circle cx="5" cy="6" r="1.5" fill="currentColor" opacity="0.3" />
            <path d="M1 11l4-3 3 3 3-5 4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      {/* Scroll indicator */}
      <div className="flex items-center justify-center gap-1 border-t border-border bg-muted/40 py-1 text-[8px] text-muted-foreground/60">
        <svg width="8" height="8" viewBox="0 0 8 8" fill="none" className="animate-bounce">
          <path d="M4 1v6M1 5l3 3 3-3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        גלילה
      </div>
    </div>
  )
}

function ShareIllustration() {
  return (
    <div className="mt-4 w-full rounded-lg border border-border bg-card p-2.5">
      {/* Link bar */}
      <div className="mb-2 flex items-center gap-1.5 rounded-md bg-muted px-2 py-1.5">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="flex-shrink-0 text-primary">
          <path d="M4.5 5.5a2 2 0 002.83 0l1-1a2 2 0 00-2.83-2.83l-.5.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
          <path d="M5.5 4.5a2 2 0 00-2.83 0l-1 1a2 2 0 002.83 2.83l.5-.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        </svg>
        <span className="truncate text-[7px] text-muted-foreground" dir="ltr">slidesup.io/course/abc</span>
      </div>
      {/* Students */}
      <div className="flex items-center gap-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[7px] font-bold text-primary">
            {String.fromCharCode(1488 + i)}
          </div>
        ))}
        <span className="text-[7px] text-muted-foreground">+12 תלמידים</span>
      </div>
    </div>
  )
}

const steps = [
  {
    icon: Upload,
    number: "01",
    title: "העלו מצגת",
    description:
      "העלו קובץ PowerPoint, הדביקו קישור מ-OneDrive או מ-Canva. המערכת מזהה את המבנה אוטומטית.",
    color: "bg-[hsl(340,65%,60%)]",
  },
  {
    icon: PenLine,
    number: "02",
    title: "סמנו כותרות ושאלות",
    description:
      "רשמו בין השקופיות את הכותרת של היחידה וצבעו את הרקע שלה בצהוב. הכניסו בין השקופיות שאלות סטטיות לפי התבניות שבאתר.",
    color: "bg-[hsl(38,80%,55%)]",
  },
  {
    icon: Wand2,
    number: "03",
    title: "המרה חכמה לקורס וובי",
    description:
      "כל מספר שקופיות יאוגדו לעמוד אחד עם גלילה, ושקופית השער הצהובה תהפוך לכותרת בלשונית הניווט.\nגם הכותרות שבמצגת יהפכו אוטומטית לפרקי משנה.",
    color: "bg-[hsl(262,55%,58%)]",
  },
  {
    icon: Images,
    number: "04",
    title: "המרה של תמונות, סרטונים ושאלות",
    description:
      "המערכת תמיר גם תמונות, סרטונים ושאלות סטטיות שיהפכו לאינטראקטיביות.",
    color: "bg-[hsl(15,75%,58%)]",
  },
  {
    icon: Share2,
    number: "05",
    title: "שתפו והתחילו ללמד",
    description:
      "קבלו קישור ייחודי לקורס, שתפו עם התלמידים ועקבו אחרי ההתקדמות בזמן אמת.",
    color: "bg-[hsl(170,55%,45%)]",
  },
]

export function HowItWorks() {
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            איך זה עובד?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            חמישה צעדים פשוטים מהמצגת לקורס אינטראקטיבי
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative flex flex-col items-center rounded-2xl border border-border bg-card p-8 text-center transition-all hover:border-primary/20 hover:shadow-md"
            >
              {/* Step Number */}
              <div className="mb-4 text-sm font-bold text-muted-foreground/40">
                {step.number}
              </div>

              {/* Icon */}
              <div
                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} transition-transform group-hover:scale-110`}
              >
                <step.icon className="h-8 w-8 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="whitespace-pre-line leading-relaxed text-muted-foreground">
                {step.description}
              </p>

              {step.number === "01" && <UploadIllustration />}
              {step.number === "02" && <SlidesIllustration />}
              {step.number === "03" && <NavTabsIllustration />}
              {step.number === "04" && <CourseScrollIllustration />}
              {step.number === "05" && <ShareIllustration />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
