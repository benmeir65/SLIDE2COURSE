import {
  Brain,
  RefreshCw,
  MessageSquare,
  Shield,
  Layers,
  Smartphone,
  Globe,
  PanelTop,
  ScrollText,
  BookmarkCheck,
} from "lucide-react"

const features = [
  {
    icon: PanelTop,
    title: "סרגל ניווט",
    description:
      "נבנה אוטומטית מכותרות שקופיות השער הצהובות, מאפשר ניווט מהיר בין יחידות הקורס.",
    color: "text-[hsl(195,90%,55%)] bg-[hsl(195,80%,94%)]",
  },
  {
    icon: ScrollText,
    title: "גלילה וובית",
    description:
      "כל השקופיות תחת שקופית הכותרת הצהובה הופכות לעמוד אחד שהתלמיד גולל בו בצורה טבעית.",
    color: "text-[hsl(195,90%,55%)] bg-[hsl(195,80%,94%)]",
  },
  {
    icon: RefreshCw,
    title: "סנכרון חי של שינויים",
    description:
      "עדכנו את המצגת המקורית והשינויים יתעדכנו אוטומטית בקורס - בלי צורך ליצור מחדש.",
    color: "text-[hsl(195,90%,55%)] bg-[hsl(195,80%,94%)]",
  },
  {
    icon: Layers,
    title: "המרה של 6 סוגי שאלות לפי תבניות",
    description:
      "בחירה יחידה, בחירה מרובה, גרור ושחרר, מיון, שאלה פתוחה ועוד - הכל לפי תבניות פשוטות במצגת.",
    color: "text-[hsl(195,90%,55%)] bg-[hsl(195,80%,94%)]",
  },
  {
    icon: MessageSquare,
    title: "משוב מידי לתלמיד",
    description:
      "כל תלמיד מקבל משוב מפורט על כל שאלה מיד אחרי הגשה, כולל הסברים ותיקונים.",
    color: "text-[hsl(195,90%,55%)] bg-[hsl(195,80%,94%)]",
  },
  {
    icon: Brain,
    title: "בדיקת AI אוטומטית",
    description:
      "שאלות פתוחות נבדקות אוטומטית על ידי בינה מלאכותית, עם אפשרות למורה לאשר או לשנות ציון.",
    color: "text-[hsl(195,90%,55%)] bg-[hsl(195,80%,94%)]",
  },
  {
    icon: Shield,
    title: "ניקוד אוטומטי",
    description:
      "כל השאלות מקבלות ציון אוטומטי בלי שתצטרכו להגדיר דבר - המערכת מזהה את התשובות הנכונות מהתבנית.",
    color: "text-[hsl(195,90%,55%)] bg-[hsl(195,80%,94%)]",
  },
  {
    icon: BookmarkCheck,
    title: "שמירת התקדמות",
    description:
      "התקדמות התלמיד נשמרת אוטומטית גם אם לא סיים את הקורס, וניתן להמשיך מאותה נקודה.",
    color: "text-[hsl(195,90%,55%)] bg-[hsl(195,80%,94%)]",
  },
  {
    icon: Smartphone,
    title: "התאמה לנייד",
    description:
      "הקורסים מותאמים לכל מכשיר - מחשב, טאבלט ונייד עם עיצוב רספונסיבי מלא.",
    color: "text-[hsl(195,90%,55%)] bg-[hsl(195,80%,94%)]",
  },
  {
    icon: Globe,
    title: "תמיכה מלאה בעברית",
    description:
      "הממשק, הקורסים והשאלות תומכים בעברית מלאה כולל כיוון טקסט RTL אוטומטי.",
    color: "text-[hsl(195,90%,55%)] bg-[hsl(195,80%,94%)]",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl">
            יכולות הפלטפורמה
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            כל מה שצריך לניהול למידה דיגיטלית אפקטיבית
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-md"
            >
              <div
                className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color} transition-transform group-hover:scale-110`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-base font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
