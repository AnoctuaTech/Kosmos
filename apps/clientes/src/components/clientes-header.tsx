"use client"

import Link from "next/link"
import { Button } from "@kosmos/ui"
import { ArrowRight } from "lucide-react"

export function ClientesHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold text-foreground">
          kosmos<span className="text-primary">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="#planes"
            className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors"
          >
            Planes
          </Link>
          <Link
            href="/login"
            className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors"
          >
            Ingresar
          </Link>
        </nav>

        <Link href="/registro">
          <Button size="sm">
            Prueba gratuita
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </header>
  )
}
