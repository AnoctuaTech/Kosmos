"use client"

import { Card, CardContent } from "@kosmos/ui"
import { Star, ArrowUpRight, ArrowDownRight } from "lucide-react"

const saldo = 1700

const historial = [
  { id: 1, tipo: "ingreso", descripcion: "Estudio: Evaluación de producto", puntos: 500, fecha: "18 feb 2026" },
  { id: 2, tipo: "ingreso", descripcion: "Estudio: Hábitos de consumo", puntos: 750, fecha: "15 feb 2026" },
  { id: 3, tipo: "egreso", descripcion: "Canje: Tarjeta Amazon $10", puntos: -1000, fecha: "10 feb 2026" },
  { id: 4, tipo: "ingreso", descripcion: "Estudio: Tendencias alimentarias", puntos: 400, fecha: "05 feb 2026" },
  { id: 5, tipo: "ingreso", descripcion: "Bono: Perfil NSE completado", puntos: 100, fecha: "01 feb 2026" },
  { id: 6, tipo: "egreso", descripcion: "Canje: Recarga telefónica", puntos: -500, fecha: "25 ene 2026" },
  { id: 7, tipo: "ingreso", descripcion: "Estudio: Percepción de banca", puntos: 600, fecha: "20 ene 2026" },
  { id: 8, tipo: "ingreso", descripcion: "Referido: Sofía Pineda", puntos: 200, fecha: "15 ene 2026" },
]

export default function BilleteraPage() {
  return (
    <div className="px-4 py-6 md:px-8 animate-in">
      <h1 className="text-xl font-semibold text-foreground mb-6">Billetera</h1>

      <Card className="border-border/50 mb-6 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-br from-primary/[0.08] via-primary/[0.04] to-transparent p-6 text-center">
            <p className="text-sm text-foreground-secondary mb-2">Saldo disponible</p>
            <div className="flex items-center justify-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/[0.1]">
                <Star className="h-5 w-5 text-primary fill-primary" />
              </div>
              <span className="text-4xl font-bold text-foreground">
                {saldo.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-foreground-muted mt-1">puntos</p>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-base font-semibold text-foreground mb-3">
        Historial de transacciones
      </h2>

      <div className="space-y-2">
        {historial.map((tx) => (
          <Card key={tx.id} className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-3.5 flex items-center gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                  tx.tipo === "ingreso" ? "bg-success/10" : "bg-error/10"
                }`}
              >
                {tx.tipo === "ingreso" ? (
                  <ArrowDownRight className="h-4 w-4 text-success" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-error" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {tx.descripcion}
                </p>
                <p className="text-xs text-foreground-muted">{tx.fecha}</p>
              </div>
              <span
                className={`text-sm font-semibold shrink-0 ${
                  tx.puntos > 0 ? "text-success" : "text-error"
                }`}
              >
                {tx.puntos > 0 ? "+" : ""}{tx.puntos.toLocaleString()}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
