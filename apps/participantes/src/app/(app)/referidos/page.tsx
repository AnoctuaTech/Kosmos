"use client"

import { useState } from "react"
import { Card, CardContent, Badge } from "@kosmos/ui"
import { Copy, Check, Users, Star, Lock } from "lucide-react"

const codigoPersonal = "CARLOS-K7X"
const capMaximo = 10

const referidos = [
  { id: 1, nombre: "Sofia Pineda", estado: "liberado" as const, puntos: 200, fecha: "15 ene 2026" },
  { id: 2, nombre: "Diego Urena", estado: "liberado" as const, puntos: 200, fecha: "20 ene 2026" },
  { id: 3, nombre: "Ana Martinez", estado: "bloqueado" as const, puntos: 200, fecha: "10 feb 2026" },
  { id: 4, nombre: "Pedro Lopez", estado: "bloqueado" as const, puntos: 200, fecha: "14 feb 2026" },
]

const puntosLiberados = referidos.filter((r) => r.estado === "liberado").reduce((s, r) => s + r.puntos, 0)
const puntosBloqueados = referidos.filter((r) => r.estado === "bloqueado").reduce((s, r) => s + r.puntos, 0)

export default function ReferidosPage() {
  const [copiado, setCopiado] = useState(false)

  function handleCopiar() {
    navigator.clipboard.writeText(codigoPersonal)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <div className="px-4 py-6 md:px-8">
      <h1 className="text-xl font-semibold text-foreground mb-6">Referidos</h1>

      <Card className="border-border mb-4">
        <CardContent className="p-5 text-center">
          <p className="text-sm text-foreground-secondary mb-2">Tu codigo de referido</p>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-2xl font-bold tracking-wider text-foreground">
              {codigoPersonal}
            </span>
            <button
              onClick={handleCopiar}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {copiado ? (
                <Check className="h-4 w-4 text-success" />
              ) : (
                <Copy className="h-4 w-4 text-foreground-secondary" />
              )}
            </button>
          </div>
          <p className="text-xs text-foreground-muted">
            Comparte este codigo. Ganas puntos cuando tu referido complete su primer estudio.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="h-4 w-4 text-success fill-success" />
              <span className="text-lg font-bold text-foreground">
                {puntosLiberados}
              </span>
            </div>
            <p className="text-xs text-foreground-secondary">Puntos liberados</p>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Lock className="h-4 w-4 text-warning" />
              <span className="text-lg font-bold text-foreground">
                {puntosBloqueados}
              </span>
            </div>
            <p className="text-xs text-foreground-secondary">Puntos bloqueados</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-foreground">
          Tus referidos
        </h2>
        <span className="text-xs text-foreground-muted">
          {referidos.length}/{capMaximo} maximo
        </span>
      </div>

      <div className="space-y-2">
        {referidos.map((ref) => (
          <Card key={ref.id} className="border-border">
            <CardContent className="p-3 flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{ref.nombre}</p>
                <p className="text-xs text-foreground-muted">{ref.fecha}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm font-semibold text-foreground">
                  +{ref.puntos}
                </span>
                <Badge
                  variant={ref.estado === "liberado" ? "success" : "warning"}
                >
                  {ref.estado === "liberado" ? "Liberado" : "Bloqueado"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
