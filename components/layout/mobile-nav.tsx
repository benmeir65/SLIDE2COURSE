"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { navLinks } from "@/lib/mock-data"
import { LogIn } from "lucide-react"

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  if (!open) return null

  return (
    <div className="border-t border-border/50 bg-card lg:hidden">
      <div className="flex flex-col gap-1 px-4 py-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
        <div className="my-2 border-t border-border" />
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <LogIn className="ml-2 h-4 w-4" />
            התחברות
          </Button>
          <Button size="sm" className="flex-1">
            הרשמה
          </Button>
        </div>
      </div>
    </div>
  )
}
