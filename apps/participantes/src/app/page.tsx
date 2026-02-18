"use client"

import Link from "next/link"
import { Button } from "@kosmos/ui"
import { Smartphone, ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12 text-center">
      <h1 className="text-3xl font-bold text-foreground mb-2">
        kosmos<span className="text-primary">.</span>
      </h1>
      <p className="text-sm text-foreground-secondary mb-10">
        Panel de Participantes
      </p>

      <div className="mx-auto w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center rounded-2xl border border-border bg-background-gray p-6">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Smartphone className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-lg font-semibold text-foreground mb-1">
            Mejor en tu celular
          </h2>
          <p className="text-sm text-foreground-secondary leading-relaxed mb-6">
            Kosmos esta optimizado para dispositivos moviles. Participa en
            estudios y gana recompensas desde tu telefono.
          </p>

          <Link href="/registro" className="w-full">
            <Button className="w-full" size="lg">
              Crear cuenta
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>

          <Link
            href="/login"
            className="mt-3 text-sm font-medium text-foreground-secondary hover:text-primary transition-colors"
          >
            Ya tengo cuenta
          </Link>
        </div>
      </div>
    </main>
  )
}
