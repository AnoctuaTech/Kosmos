"use client"

import { Card, CardContent } from "@kosmos/ui"
import { Star, ArrowUpRight, ArrowDownRight } from "lucide-react"

const saldo = 1700

const historial = [
  { id: 1, tipo: "ingreso", descripcion: "Estudio: Evaluacion de producto", puntos: 500, fecha: "18 feb 2026" },
  { id: 2, tipo: "ingreso", descripcion: "Estudio: Habitos de consumo", puntos: 750, fecha: "15 feb 2026" },
  { id: 3, tipo: "egreso", descripcion: "Canje: Tarjeta Amazon $10", puntos: -1000, fecha: "10 feb 2026" },
  { id: 4, tipo: "ingreso", descripcion: "Estudio: Tendencias alimentarias", puntos: 400, fecha: "05 feb 2026" },
  { id: 5, tipo: "ingreso", descripcion: "Bono: Perfil NSE completado", puntos: 100, fecha: "01 feb 2026" },
  { id: 6, tipo: "egreso", descripcion: "Canje: Recarga telefonica", puntos: -500, fecha: "25 ene 2026" },
  { id: 7, tipo: "ingreso", descripcion: "Estudio: Percepcion de banca", puntos: 600, fecha: "20 ene 2026" },
  { id: 8, tipo: "ingreso", descripcion: "Referido: Sofia Pineda", puntos: 200, fecha: "15 ene 2026" },
]

export default function BilleteraPage() {
  return (
    <div className="px-4 py-6 md:px-8">
      <h1 className="text-xl font-semibold text-foreground mb-6">Billetera</h1>

      <Card className="border-border mb-6">
        <CardContent className="p-5 text-center">
          <p className="text-sm text-foreground-secondary mb-1">Saldo disponible</p>
          <div className="flex items-center justify-center gap-2">
            <Star className="h-6 w-6 text-primary fill-primary" />
            <span className="text-4xl font-bold text-foreground">
              {saldo.toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-foreground-muted mt-1">puntos</p>
        </CardContent>
      </Card>

      <h2 className="text-base font-semibold text-foreground mb-3">
        Historial de transacciones
      </h2>

      <div className="space-y-2">
        {historial.map((tx) => (
          <Card key={tx.id} className="border-border">
            <CardContent className="p-3 flex items-center gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
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
