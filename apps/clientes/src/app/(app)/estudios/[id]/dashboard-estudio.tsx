"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { estudios, plantillas } from "@kosmos/mock-data"
import { Button, Card, CardContent, KPICard } from "@kosmos/ui"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts"
import {
  ChevronRight,
  Download,
  BarChart3,
  CheckCircle2,
  Clock,
  LogOut,
} from "lucide-react"

const plantillaMap = Object.fromEntries(
  plantillas.map((p) => [p.id, p.nombre])
)

const distribucionSexo = [
  { nombre: "Masculino", porcentaje: 52, color: "#FF4136" },
  { nombre: "Femenino", porcentaje: 45, color: "#FF6B61" },
  { nombre: "Otro / No responde", porcentaje: 3, color: "#fecdd3" },
]

const ritmoSemanal = [
  { dia: "Lun", respuestas: 110 },
  { dia: "Mar", respuestas: 180 },
  { dia: "Mié", respuestas: 90 },
  { dia: "Jue", respuestas: 45 },
  { dia: "Vie", respuestas: 100 },
  { dia: "Sáb", respuestas: 85 },
  { dia: "Dom", respuestas: 96 },
]

const maxRitmo = Math.max(...ritmoSemanal.map((d) => d.respuestas))

export default function DashboardEstudioPage() {
  const params = useParams()
  const estudioId = params.id as string

  const estudio = useMemo(
    () => estudios.find((e) => e.id === estudioId),
    [estudioId]
  )

  if (!estudio) {
    return (
      <div className="px-8 py-8 lg:px-12">
        <p className="text-foreground-secondary">Estudio no encontrado</p>
      </div>
    )
  }

  const tipo = plantillaMap[estudio.configuracion.plantillaId] || "Estudio"
  const meta = estudio.configuracion.volumenObjetivo
  const progreso = meta > 0 ? Math.round((estudio.respuestasRecibidas / meta) * 100) : 0
  const fechaInicio = estudio.lanzadoEn
    ? new Date(estudio.lanzadoEn).toLocaleDateString("es-CR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "Sin lanzar"

  return (
    <div className="px-8 py-6 lg:px-12">
      <nav className="flex items-center gap-1 text-sm mb-6">
        <Link
          href="/estudios"
          className="text-foreground-secondary hover:text-primary transition-colors"
        >
          Estudios
        </Link>
        <ChevronRight className="h-4 w-4 text-foreground-muted" />
        <span className="text-foreground font-medium">{tipo}</span>
      </nav>

      <Card className="border-border">
        <CardContent className="p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                {estudio.nombre}
              </h1>
              <p className="text-sm text-foreground-muted mt-1">
                Inicio {fechaInicio}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground-muted mb-1">
                  Filtrar por país
                </label>
                <select className="rounded border border-border bg-white px-3 py-1.5 text-sm text-foreground focus:border-primary focus:outline-none">
                  <option>Todos</option>
                  <option>Costa Rica</option>
                  <option>Panamá</option>
                  <option>Guatemala</option>
                </select>
              </div>
              <Button size="sm" className="self-end">
                <Download className="mr-1.5 h-4 w-4" />
                Descargar Excel
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <KPICard
              title="Total Respuestas"
              value={estudio.respuestasRecibidas.toLocaleString()}
              subtitle={`Meta: ${meta.toLocaleString()} casos`}
              icon={<BarChart3 className="h-5 w-5 text-primary" />}
            />
            <KPICard
              title="Incidencia (LOI)"
              value="82%"
              subtitle="Usuarios que califican"
              icon={<CheckCircle2 className="h-5 w-5 text-primary" />}
            />
            <KPICard
              title="Tiempo Promedio"
              value="08:45 min"
              subtitle="Duración de entrevista"
              icon={<Clock className="h-5 w-5 text-primary" />}
            />
            <KPICard
              title="Tasa de Abandono"
              value="4%"
              subtitle="Desertores del estudio"
              icon={<LogOut className="h-5 w-5 text-primary" />}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-foreground-muted mb-6">
                  Distribución por Sexo
                </h3>
                <div className="flex justify-center mb-6">
                  <SexoDonutChart data={distribucionSexo} />
                </div>
                <div className="space-y-3">
                  {distribucionSexo.map((item) => (
                    <div key={item.nombre} className="flex items-center gap-3">
                      <span
                        className="h-3 w-3 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="flex-1 text-sm text-foreground-secondary">
                        {item.nombre}
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {item.porcentaje}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-foreground-muted mb-1">
                  Ritmo de Recolección Diaria
                </h3>
                <p className="text-xs text-foreground-muted mb-4">Semana</p>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ritmoSemanal} barSize={32}>
                      <XAxis
                        dataKey="dia"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#9ca3af" }}
                      />
                      <YAxis hide />
                      <Tooltip
                        formatter={(value: number) => [
                          `${value} respuestas`,
                          "Respuestas",
                        ]}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                          fontSize: "13px",
                        }}
                      />
                      <Bar
                        dataKey="respuestas"
                        radius={[4, 4, 0, 0]}
                        label={{
                          position: "top",
                          fontSize: 11,
                          fontWeight: 600,
                          fill: "#374151",
                        }}
                      >
                        {ritmoSemanal.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              entry.respuestas === maxRitmo
                                ? "#FF4136"
                                : "#fecdd3"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="text-sm font-medium text-foreground-muted mb-4">
                  Meta de Muestreo
                </h3>
                <div className="flex flex-col items-center justify-center py-4">
                  <GaugeChart porcentaje={progreso} />
                  <p className="text-xs text-foreground-muted mt-2">Progreso</p>
                  <p className="text-sm text-foreground-muted mt-1">
                    {estudio.respuestasRecibidas.toLocaleString()} respuestas
                    totales
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function GaugeChart({ porcentaje }: { porcentaje: number }) {
  const totalTicks = 30
  const filledTicks = Math.round((porcentaje / 100) * totalTicks)
  const radius = 70
  const startAngle = -210
  const endAngle = 30
  const angleRange = endAngle - startAngle

  return (
    <div className="relative">
      <svg width="180" height="110" viewBox="0 0 180 110">
        {Array.from({ length: totalTicks }, (_, i) => {
          const angle =
            startAngle + (i / (totalTicks - 1)) * angleRange
          const rad = (angle * Math.PI) / 180
          const x1 = 90 + (radius - 8) * Math.cos(rad)
          const y1 = 95 + (radius - 8) * Math.sin(rad)
          const x2 = 90 + radius * Math.cos(rad)
          const y2 = 95 + radius * Math.sin(rad)
          const isFilled = i < filledTicks

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isFilled ? "#1f2937" : "#e5e7eb"}
              strokeWidth={3}
              strokeLinecap="round"
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 flex items-end justify-center pb-1">
        <span className="text-3xl font-bold text-primary">{porcentaje}%</span>
      </div>
    </div>
  )
}

function SexoDonutChart({
  data,
}: {
  data: { nombre: string; porcentaje: number; color: string }[]
}) {
  const size = 140
  const strokeWidth = 20
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((item) => {
        const dashLength = (item.porcentaje / 100) * circumference
        const dashGap = circumference - dashLength
        const currentOffset = offset
        offset += dashLength

        return (
          <circle
            key={item.nombre}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={item.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashLength} ${dashGap}`}
            strokeDashoffset={-currentOffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        )
      })}
    </svg>
  )
}
