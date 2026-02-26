"use client"

import { useMemo } from "react"
import {
  clientes,
  suscripciones,
  tiers,
  transacciones,
} from "@kosmos/mock-data"
import {
  Card,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@kosmos/ui"
import { User, DollarSign, Sparkles, FileText, Check } from "lucide-react"

const cliente = clientes.find((c) => c.empresaId === "emp-001" && c.rol === "propietario")!
const suscripcion = suscripciones.find(
  (s) => s.empresaId === "emp-001" && s.estado === "activa"
)!
const tier = tiers.find((t) => t.nombre === suscripcion.tier)!

const nombreTier: Record<string, string> = {
  trial: "Plan Freemium",
  basico: "Plan Básico",
  pro: "Plan Profesional",
  enterprise: "Plan Enterprise",
}

function formatFecha(fecha: string) {
  return new Date(fecha).toLocaleDateString("es-CR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function formatFechaCorta(fecha: string) {
  return new Date(fecha).toLocaleDateString("es-CR", {
    day: "2-digit",
    month: "short",
  })
}

export default function CuentaPage() {
  const historial = useMemo(() => {
    return transacciones
      .filter((t) => t.empresaId === "emp-001")
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
  }, [])

  const historialConSaldo = useMemo(() => {
    let acumulado = 0
    const ordenadoAsc = [...historial].reverse()
    const conSaldo = ordenadoAsc.map((t) => {
      acumulado += t.monto
      return { ...t, saldoAcumulado: acumulado }
    })
    return conSaldo.reverse()
  }, [historial])

  return (
    <div className="px-8 py-8 lg:px-12">
      <h1 className="text-2xl font-semibold text-foreground mb-8">
        Configuración de la cuenta
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/[0.08] to-primary/[0.04]">
                <User className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-base font-semibold text-foreground">
                Perfil
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Usuario</p>
                  <p className="text-[13px] text-foreground-secondary">
                    {cliente.nombre} {cliente.apellidos}
                  </p>
                </div>
                <button className="text-sm font-medium text-primary underline hover:text-primary-dark transition-colors">
                  Editar
                </button>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="text-[13px] text-foreground-secondary inline-flex items-center gap-1.5">
                  {cliente.email}
                  {cliente.emailVerificado && (
                    <Check className="h-3.5 w-3.5 text-success" />
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/[0.08] to-primary/[0.04]">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-base font-semibold text-foreground">
                Información de pago
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Próximo pago
                  </p>
                  <p className="text-[13px] text-foreground-secondary">
                    {formatFecha(suscripcion.fechaRenovacion)}
                  </p>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  USD ${tier.precioMensual.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Método de pago
                  </p>
                  <p className="text-[13px] text-foreground-secondary">
                    Enlace que termina en 1234
                  </p>
                </div>
                <button className="text-sm font-medium text-primary underline hover:text-primary-dark transition-colors">
                  Actualizar
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/[0.08] to-primary/[0.04]">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-base font-semibold text-foreground">
                Suscripción
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Detalle del plan
                  </p>
                  <p className="text-[13px] text-foreground-secondary">
                    {nombreTier[suscripcion.tier]}
                  </p>
                </div>
                <button className="text-sm font-medium text-primary underline hover:text-primary-dark transition-colors">
                  Administrar suscripción
                </button>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Renovación
                </p>
                <p className="text-[13px] text-foreground-secondary">
                  Automática
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardContent className="p-0">
          <div className="flex items-center gap-3 p-6 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/[0.08] to-primary/[0.04]">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-base font-semibold text-foreground">
              Historial de crédito
            </h2>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[80px] pl-6">Fecha</TableHead>
                <TableHead>Detalle</TableHead>
                <TableHead className="w-[120px] text-right pr-6">
                  Saldo
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historialConSaldo.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="pl-6 text-sm text-foreground-secondary">
                    {formatFechaCorta(tx.fecha)}
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-semibold text-foreground">
                      {tx.tipo === "suscripcion"
                        ? `Suscripción ${nombreTier[suscripcion.tier]} Mensual`
                        : tx.tipo === "pack_extra"
                          ? "Pack de respuestas adicionales"
                          : "Reembolso"}
                    </p>
                    <p className="text-[13px] text-foreground-secondary">
                      {tx.tipo === "suscripcion"
                        ? `Válida: ${formatFechaCorta(tx.fecha)} - ${formatFechaCorta(
                            new Date(
                              new Date(tx.fecha).getTime() + 30 * 24 * 60 * 60 * 1000
                            ).toISOString()
                          )}`
                        : `Procesado el ${formatFecha(tx.fecha)}`}
                    </p>
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    <p className="text-sm font-semibold text-foreground">
                      +${tx.monto.toLocaleString()}
                    </p>
                    <p className="text-[13px] text-foreground-secondary">
                      ${tx.saldoAcumulado.toLocaleString()}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
