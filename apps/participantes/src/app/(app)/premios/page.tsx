"use client"

import { useState } from "react"
import Link from "next/link"
import { premios, paises } from "@kosmos/mock-data"
import { Card, CardContent, Button } from "@kosmos/ui"
import { Gift, Star } from "lucide-react"

const paisUsuario = "pais-cr"

const paisMap = Object.fromEntries(paises.map((p) => [p.id, p.nombre]))

export default function PremiosPage() {
  const [filtroPais, setFiltroPais] = useState(paisUsuario)

  const premiosFiltrados = premios.filter(
    (p) => p.activo && p.paisesDisponibles.includes(filtroPais)
  )

  return (
    <div className="px-4 py-6 md:px-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-foreground">Premios</h1>
        <select
          value={filtroPais}
          onChange={(e) => setFiltroPais(e.target.value)}
          className="rounded-lg border border-border bg-white px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none"
        >
          {paises.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>

      {premiosFiltrados.length === 0 ? (
        <div className="py-12 text-center">
          <Gift className="mx-auto h-10 w-10 text-foreground-muted mb-3" />
          <p className="text-sm text-foreground-secondary">
            No hay premios disponibles para {paisMap[filtroPais]}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {premiosFiltrados.map((premio) => (
            <Card key={premio.id} className="border-border">
              <CardContent className="p-4">
                <div className="flex h-24 items-center justify-center rounded-lg bg-gradient-to-br from-primary/5 to-primary/10 mb-3">
                  <Gift className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {premio.titulo}
                </h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-foreground-secondary">
                    {premio.moneda} {premio.valorMonetario.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                    <Star className="h-3 w-3 fill-primary" />
                    {premio.costoEnPuntos.toLocaleString()} pts
                  </span>
                </div>
                <Link href={`/canje?premioId=${premio.id}`}>
                  <Button size="sm" className="w-full">
                    Canjear
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
