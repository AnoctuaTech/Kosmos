"use client"

import Link from "next/link"
import { Star } from "lucide-react"

interface ParticipantesHeaderProps {
  puntos?: number
}

export function ParticipantesHeader({ puntos = 1200 }: ParticipantesHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-white px-4 md:px-6">
      <Link
        href="/inicio"
        className="text-lg font-bold text-foreground md:hidden"
      >
        kosmos<span className="text-primary">.</span>
      </Link>

      <div className="hidden md:block" />

      <div className="flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1.5">
        <Star className="h-4 w-4 text-primary fill-primary" />
        <span className="text-sm font-semibold text-primary">
          {puntos.toLocaleString()} pts
        </span>
      </div>
    </header>
  )
}
