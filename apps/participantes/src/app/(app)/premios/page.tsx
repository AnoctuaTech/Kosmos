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
    <div className="px-4 py-6 md:px-8 animate-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-foreground">Premios</h1>
        <select
          value={filtroPais}
          onChange={(e) => setFiltroPais(e.target.value)}
          className="rounded-xl border border-border/60 bg-white px-3.5 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/[0.08] transition-all duration-200"
        >
          {paises.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>
      </div>

      {premiosFiltrados.length === 0 ? (
        <div className="py-16 text-center animate-in">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-background-gray">
            <Gift className="h-7 w-7 text-foreground-muted" />
          </div>
          <p className="text-sm font-medium text-foreground-secondary">
            No hay premios disponibles para {paisMap[filtroPais]}
          </p>
          <p className="text-xs text-foreground-muted mt-1">
            Probá seleccionar otro país
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {premiosFiltrados.map((premio) => (
            <Card key={premio.id} className="border-border/50 shadow-sm hover:shadow-md transition-all duration-200 group">
              <CardContent className="p-4">
                <div className="flex h-28 items-center justify-center rounded-xl bg-gradient-to-br from-primary/[0.08] to-primary/[0.03] mb-3 transition-all duration-200 group-hover:from-primary/[0.12] group-hover:to-primary/[0.05]">
                  <Gift className="h-10 w-10 text-primary/60 transition-transform duration-200 group-hover:scale-110" />
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
