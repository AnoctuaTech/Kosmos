"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, Button } from "@kosmos/ui"
import { Star, ArrowRight, ClipboardList, ShieldAlert, X } from "lucide-react"

const puntosActuales = 1200
const puntosCanje = 2000

const estudiosDisponibles = [
  {
    id: "est-001",
    titulo: "Evaluación de producto",
    tipo: "Salud de Marca",
    duracion: "8 min",
    puntos: 500,
  },
  {
    id: "est-002",
    titulo: "Hábitos de consumo digital",
    tipo: "Prueba de Concepto",
    duracion: "12 min",
    puntos: 750,
  },
  {
    id: "est-003",
    titulo: "Tendencias alimentarias",
    tipo: "Salud de Marca",
    duracion: "6 min",
    puntos: 400,
  },
]

export default function InicioPage() {
  const [avisoVisible, setAvisoVisible] = useState(true)
  const progreso = Math.round((puntosActuales / puntosCanje) * 100)
  const faltantes = puntosCanje - puntosActuales

  return (
    <div className="px-4 py-6 md:px-8 animate-in">
      <h1 className="text-xl font-semibold text-foreground mb-1">
        Hola, Carlos
      </h1>
      <p className="text-sm text-foreground-secondary mb-6">
        Tienes estudios disponibles
      </p>

      {avisoVisible && (
        <div className="mb-4 flex items-start gap-3 rounded-xl border border-warning/30 bg-warning/5 p-3.5 animate-in">
          <ShieldAlert className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              Aviso legal antifraude
            </p>
            <p className="text-xs text-foreground-secondary mt-0.5 leading-relaxed">
              Kosmos monitorea tiempos de respuesta y direcciones IP. Respuestas
              fraudulentas o inconsistentes resultarán en la suspensión de tu
              cuenta y la pérdida de puntos acumulados.
            </p>
          </div>
          <button
            onClick={() => setAvisoVisible(false)}
            className="shrink-0 text-foreground-muted hover:text-foreground transition-colors duration-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <Card className="border-border/50 mb-6 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-primary/[0.06] to-primary/[0.02] p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/[0.1]">
                  <Star className="h-4 w-4 text-primary fill-primary" />
                </div>
                <span className="text-2xl font-bold text-foreground">
                  {puntosActuales.toLocaleString()}
                </span>
                <span className="text-sm text-foreground-secondary">puntos</span>
              </div>
              <Link
                href="/billetera"
                className="text-xs font-medium text-primary hover:text-primary-dark transition-colors duration-200"
              >
                Ver billetera
              </Link>
            </div>
            <div className="mb-2 h-2.5 rounded-full bg-white/80 overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-500"
                style={{ width: `${Math.min(progreso, 100)}%` }}
              />
            </div>
            <p className="text-xs text-foreground-muted">
              Faltan <span className="font-medium text-foreground-secondary">{faltantes.toLocaleString()} pts</span> para tu próximo canje
            </p>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-base font-semibold text-foreground mb-3">
        Estudios disponibles
      </h2>

      <div className="space-y-3">
        {estudiosDisponibles.map((estudio) => (
          <Card key={estudio.id} className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/[0.08] to-primary/[0.04]">
                    <ClipboardList className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {estudio.titulo}
                    </h3>
                    <p className="text-xs text-foreground-secondary mt-0.5">
                      {estudio.tipo} · {estudio.duracion}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                    <Star className="h-3 w-3 fill-primary" />
                    +{estudio.puntos}
                  </span>
                  <Link href={`/encuesta?id=${estudio.id}`}>
                    <Button size="sm" className="group">
                      Iniciar
                      <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
