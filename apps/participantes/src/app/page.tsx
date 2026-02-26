"use client"

import Link from "next/link"
import { Button } from "@kosmos/ui"
import { Smartphone, ArrowRight, Shield, Star, BarChart3 } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background-gray overflow-hidden px-6 py-12 text-center">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,65,54,0.07)_0%,_transparent_60%)]" />

      <div className="relative animate-in">
        <h1 className="text-3xl font-bold text-foreground mb-1">
          kosmos<span className="text-primary">.</span>
        </h1>
        <p className="text-sm text-foreground-secondary mb-8">
          Panel de Participantes
        </p>

        <div className="mx-auto w-full max-w-sm">
          <div className="rounded-2xl border border-border/50 bg-white shadow-xl shadow-black/[0.06] p-8">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/[0.12] to-primary/[0.04] ring-1 ring-primary/[0.08]">
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Mejor en tu celular
            </h2>
            <p className="text-sm text-foreground-secondary leading-relaxed mb-8">
              Kosmos está optimizado para dispositivos móviles. Participá en
              estudios y ganá recompensas desde tu teléfono.
            </p>

            <div className="flex items-center justify-center gap-6 mb-8 py-4 border-y border-border/40">
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/[0.06]">
                  <Star className="h-4 w-4 text-primary" />
                </div>
                <span className="text-[11px] text-foreground-muted">Puntos</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/[0.06]">
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                <span className="text-[11px] text-foreground-muted">Estudios</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/[0.06]">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <span className="text-[11px] text-foreground-muted">Seguro</span>
              </div>
            </div>

            <Link href="/registro" className="block">
              <Button className="w-full group" size="lg">
                Crear cuenta
                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </Link>

            <Link
              href="/login"
              className="mt-4 block text-sm font-medium text-foreground-secondary hover:text-primary transition-colors duration-200"
            >
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
