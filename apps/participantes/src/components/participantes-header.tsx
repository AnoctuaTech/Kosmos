"use client"

import Link from "next/link"
import { Star } from "lucide-react"

interface ParticipantesHeaderProps {
  puntos?: number
}

export function ParticipantesHeader({ puntos = 1200 }: ParticipantesHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border/60 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 px-4 md:px-6">
      <Link
        href="/inicio"
        className="text-lg font-bold text-foreground md:hidden"
      >
        kosmos<span className="text-primary">.</span>
      </Link>

      <div className="hidden md:block" />

      <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/[0.08] to-primary/[0.04] px-3.5 py-1.5 ring-1 ring-primary/[0.08]">
        <Star className="h-4 w-4 text-primary fill-primary" />
        <span className="text-sm font-semibold text-primary">
          {puntos.toLocaleString()} pts
        </span>
      </div>
    </header>
  )
}
