"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { navLinks } from "@/lib/mock-data"
import { Menu, X, LogIn } from "lucide-react"
import { MobileNav } from "./mobile-nav"
import { Logo } from "./logo"

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Desktop Actions - Left side */}
        <div className="hidden items-center gap-2 lg:flex">
          <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">הרשמה</Button>
          <Button variant="outline" size="sm">
            <LogIn className="ml-2 h-4 w-4" />
            התחברות
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            EN / HE
          </Button>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Logo - Right side */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">
            SLIDE2COURSE
          </span>
          <Logo size={36} />
        </Link>

        {/* Mobile Menu Toggle - Left side on mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="order-first lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="תפריט ניווט"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
