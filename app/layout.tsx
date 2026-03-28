import type { Metadata, Viewport } from "next"
import { Heebo } from "next/font/google"

import "./globals.css"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  variable: "--font-heebo",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SlidesUp Learning - המרת מצגות לקורסים אינטראקטיביים",
  description:
    "פלטפורמה חינוכית להמרת מצגות לקורסים ווביים אינטראקטיביים עם מערכת ניהול למידה, בדיקות AI ועוד",
  icons: {
    icon: "/icon.jpg",
  },
}

export const viewport: Viewport = {
  themeColor: "#2A9D8F",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
