"use client"

import Link from "next/link"
import { Button } from "@kosmos/ui"
import { ArrowRight } from "lucide-react"

export function ClientesHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/80 transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold text-foreground tracking-tight">
          kosmos<span className="text-primary">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors duration-200"
          >
            Inicio
          </Link>
          <Link
            href="#planes"
            className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors duration-200"
          >
            Planes
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground-secondary hover:text-foreground hover:border-foreground-secondary hover:bg-background-gray transition-all duration-200"
          >
            Ingresar
          </Link>
        </nav>

        <Link href="/registro">
          <Button size="sm" className="group">
            Prueba gratuita
            <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </div>
    </header>
  )
}
