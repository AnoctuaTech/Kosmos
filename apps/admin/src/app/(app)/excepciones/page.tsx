"use client"

import { useMemo } from "react"
import { excepciones, empresas } from "@kosmos/mock-data"
import type { EstadoExcepcion, TipoExcepcion } from "@kosmos/types"
import {
  Card,
  CardContent,
  Badge,
  Button,
} from "@kosmos/ui"
import {
  Eye,
  Brain,
  Smile,
  Activity,
  UsersRound,
  ArrowRight,
  Calendar,
  DollarSign,
  Users,
  Building2,
  FileText,
} from "lucide-react"

interface ColumnaKanban {
  estado: EstadoExcepcion
  titulo: string
  color: string
  borderColor: string
  bgColor: string
}

const columnas: ColumnaKanban[] = [
  {
    estado: "recibido",
    titulo: "Recibido",
    color: "text-warning",
    borderColor: "border-t-warning",
    bgColor: "bg-warning/5",
  },
  {
    estado: "en_analisis",
    titulo: "En Analisis Externo",
    color: "text-primary",
    borderColor: "border-t-primary",
    bgColor: "bg-primary/5",
  },
  {
    estado: "resultados_entregados",
    titulo: "Resultados Entregados",
    color: "text-success",
    borderColor: "border-t-success",
    bgColor: "bg-success/5",
  },
]

function getTipoConfig(tipo: TipoExcepcion) {
  const configs: Record<TipoExcepcion, { label: string; icon: typeof Eye }> = {
    eye_tracking: { label: "Eye Tracking", icon: Eye },
    neuromarketing: { label: "Neuromarketing", icon: Brain },
    facial_coding: { label: "Facial Coding", icon: Smile },
    biometria: { label: "Biometria", icon: Activity },
    focus_group_virtual: { label: "Focus Group Virtual", icon: UsersRound },
  }
  return configs[tipo]
}

function getEstadoBadge(estado: EstadoExcepcion) {
  const configs: Record<EstadoExcepcion, { label: string; variant: "warning" | "primary" | "success" }> = {
    recibido: { label: "Recibido", variant: "warning" },
    en_analisis: { label: "En Analisis", variant: "primary" },
    resultados_entregados: { label: "Entregado", variant: "success" },
  }
  return configs[estado]
}

export default function ExcepcionesPage() {
  const data = useMemo(() => {
    return excepciones.map((e) => ({
      ...e,
      empresa: empresas.find((emp) => emp.id === e.empresaId),
    }))
  }, [])

  const porColumna = useMemo(() => {
    const mapa: Record<EstadoExcepcion, typeof data> = {
      recibido: [],
      en_analisis: [],
      resultados_entregados: [],
    }
    data.forEach((e) => {
      mapa[e.estado].push(e)
    })
    return mapa
  }, [data])

  const totalPresupuesto = data.reduce((sum, e) => sum + e.presupuesto, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Excepciones Neuro/VAS
          </h1>
          <p className="mt-1 text-sm text-foreground-secondary">
            Gestion de estudios especializados con proveedores externos
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm text-foreground-secondary">
          <span>{data.length} solicitudes</span>
          <span className="text-foreground-muted">·</span>
          <span>${totalPresupuesto.toLocaleString()} USD total</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {columnas.map((col) => {
          const items = porColumna[col.estado]
          return (
            <div key={col.estado}>
              <div
                className={`rounded-lg border-t-4 ${col.borderColor} bg-white border border-border`}
              >
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-2">
                    <h2 className={`font-semibold text-sm ${col.color}`}>
                      {col.titulo}
                    </h2>
                    <span className="flex items-center justify-center h-5 min-w-[20px] rounded-full bg-foreground-muted/10 text-xs font-medium text-foreground-secondary px-1.5">
                      {items.length}
                    </span>
                  </div>
                </div>

                <div className="p-3 space-y-3 min-h-[200px]">
                  {items.length === 0 ? (
                    <div className="flex items-center justify-center h-[180px] text-sm text-foreground-muted">
                      Sin solicitudes
                    </div>
                  ) : (
                    items.map((exc) => {
                      const tipoConfig = getTipoConfig(exc.tipo)
                      const TipoIcon = tipoConfig.icon
                      const estadoBadge = getEstadoBadge(exc.estado)
                      return (
                        <Card
                          key={exc.id}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <TipoIcon className="h-4 w-4 text-foreground-muted flex-shrink-0" />
                                <Badge variant="outline" className="text-xs">
                                  {tipoConfig.label}
                                </Badge>
                              </div>
                              <Badge variant={estadoBadge.variant} className="text-xs">
                                {estadoBadge.label}
                              </Badge>
                            </div>

                            <h3 className="font-medium text-sm text-foreground mb-2 line-clamp-2">
                              {exc.titulo}
                            </h3>

                            <p className="text-xs text-foreground-muted mb-3 line-clamp-2">
                              {exc.descripcion}
                            </p>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-xs text-foreground-secondary">
                                <Building2 className="h-3 w-3 flex-shrink-0" />
                                <span className="truncate">
                                  {exc.empresa?.nombre ?? "—"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-foreground-secondary">
                                <FileText className="h-3 w-3 flex-shrink-0" />
                                <span className="truncate">{exc.proveedor}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-foreground-secondary">
                                <Users className="h-3 w-3 flex-shrink-0" />
                                <span>{exc.participantesRequeridos} participantes</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                              <div className="flex items-center gap-1 text-xs text-foreground-muted">
                                <Calendar className="h-3 w-3" />
                                <span>
                                  {new Date(exc.solicitadoEn).toLocaleDateString("es-CR", {
                                    day: "2-digit",
                                    month: "short",
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-xs font-medium text-foreground-secondary">
                                <DollarSign className="h-3 w-3" />
                                <span>${exc.presupuesto.toLocaleString()}</span>
                              </div>
                            </div>

                            {exc.estado !== "resultados_entregados" && (
                              <div className="mt-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full h-8 text-xs"
                                >
                                  {exc.estado === "recibido" ? (
                                    <>
                                      Iniciar Analisis
                                      <ArrowRight className="h-3 w-3 ml-1" />
                                    </>
                                  ) : (
                                    <>
                                      Marcar Entregado
                                      <ArrowRight className="h-3 w-3 ml-1" />
                                    </>
                                  )}
                                </Button>
                              </div>
                            )}

                            {exc.notas && (
                              <div className="mt-2 p-2 rounded bg-background-gray text-xs text-foreground-muted">
                                {exc.notas}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )
                    })
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
