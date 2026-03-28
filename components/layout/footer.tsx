import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Logo size={32} />
              <span className="text-base font-bold text-foreground">
                SLIDE2COURSE
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              הפלטפורמה המתקדמת להמרת מצגות לקורסים אינטראקטיביים עם מערכת ניהול למידה מלאה.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              קישורים מהירים
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/converter"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  יצירת קורס
                </Link>
              </li>
              <li>
                <Link
                  href="/classroom"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  כיתה וציונים
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  מדריך תבניות
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  צור קשר
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              למשתמשים
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/teacher-register"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  רישום מורה
                </Link>
              </li>
              <li>
                <Link
                  href="/student-register"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  רישום תלמיד
                </Link>
              </li>
              <li>
                <Link
                  href="/student"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  אזור תלמיד
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">
              צור קשר
            </h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@slidesup.learn</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span dir="ltr">+972-3-1234567</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            {'2026 SLIDE2COURSE. כל הזכויות שמורות.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
