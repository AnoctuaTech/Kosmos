"use client"

import { Card, CardContent, Button } from "@kosmos/ui"
import { Star, ArrowRight, ClipboardList } from "lucide-react"

const puntosActuales = 1200
const puntosCanje = 2000

const estudiosDisponibles = [
  {
    id: "est-001",
    titulo: "Evaluacion de producto",
    tipo: "Salud de Marca",
    duracion: "8 min",
    puntos: 500,
  },
  {
    id: "est-002",
    titulo: "Habitos de consumo digital",
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
  const progreso = Math.round((puntosActuales / puntosCanje) * 100)
  const faltantes = puntosCanje - puntosActuales

  return (
    <div className="px-4 py-6 md:px-8">
      <h1 className="text-xl font-semibold text-foreground mb-1">
        Hola, Maria
      </h1>
      <p className="text-sm text-foreground-secondary mb-6">
        Tienes estudios disponibles
      </p>

      <Card className="border-border mb-6">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary fill-primary" />
              <span className="text-2xl font-bold text-foreground">
                {puntosActuales.toLocaleString()}
              </span>
              <span className="text-sm text-foreground-secondary">puntos</span>
            </div>
          </div>

          <div className="mb-2 h-2 rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${Math.min(progreso, 100)}%` }}
            />
          </div>
          <p className="text-xs text-foreground-muted">
            Faltan {faltantes.toLocaleString()} pts para tu proximo canje
          </p>
        </CardContent>
      </Card>

      <h2 className="text-base font-semibold text-foreground mb-3">
        Estudios disponibles
      </h2>

      <div className="space-y-3">
        {estudiosDisponibles.map((estudio) => (
          <Card key={estudio.id} className="border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/5">
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
                  <Button size="sm">
                    Iniciar
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
