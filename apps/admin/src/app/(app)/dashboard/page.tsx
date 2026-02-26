"use client"

import { useState, useMemo } from "react"
import {
  empresas,
  suscripciones,
  estudios,
  paises,
  clientes,
  redenciones,
  alertasFraude,
} from "@kosmos/mock-data"
import {
  KPICard,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@kosmos/ui"
import {
  DollarSign,
  Building2,
  BarChart3,
  RefreshCw,
  UserPlus,
  X,
  AlertTriangle,
  Clock,
} from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"

const mrrData = [
  { mes: "Sep", mrr: 2800 },
  { mes: "Oct", mrr: 3600 },
  { mes: "Nov", mrr: 4800 },
  { mes: "Dic", mrr: 5200 },
  { mes: "Ene", mrr: 7800 },
  { mes: "Feb", mrr: 7800 },
]

const actividadData = [
  { mes: "Sep", estudios: 120, respuestas: 890 },
  { mes: "Oct", estudios: 145, respuestas: 1240 },
  { mes: "Nov", estudios: 190, respuestas: 1580 },
  { mes: "Dic", estudios: 210, respuestas: 1720 },
  { mes: "Ene", estudios: 280, respuestas: 2100 },
  { mes: "Feb", estudios: 310, respuestas: 2450 },
]

const activasCount = suscripciones.filter((s) => s.estado === "activa").length
const mrr = suscripciones
  .filter((s) => s.estado === "activa")
  .reduce((sum, s) => {
    const precios: Record<string, number> = {
      trial: 0,
      basico: 800,
      pro: 2000,
      enterprise: 5000,
    }
    return sum + (precios[s.tier] || 0)
  }, 0)

const estudiosCompletos = estudios.filter(
  (e) => e.estado === "finalizado"
).length

const clientesNuevos = clientes.filter((c) => {
  const creado = new Date(c.creadoEn)
  const hace30Dias = new Date()
  hace30Dias.setDate(hace30Dias.getDate() - 30)
  return creado >= hace30Dias
}).length

const redencionesPendientes = redenciones.filter(
  (r) => r.estado === "pendiente" || r.estado === "procesando"
).length

const alertasAltoRiesgo = alertasFraude.filter(
  (a) => a.nivelRiesgo === "alto" && !a.resuelta
).length

const renovacionesProximas = suscripciones
  .filter((s) => {
    const renovacion = new Date(s.fechaRenovacion)
    const hoy = new Date()
    const en90Dias = new Date(hoy.getTime() + 90 * 24 * 60 * 60 * 1000)
    return s.estado === "activa" && renovacion <= en90Dias
  })
  .map((s) => {
    const empresa = empresas.find((e) => e.id === s.empresaId)
    return { ...s, empresaNombre: empresa?.nombre || "—" }
  })
  .sort(
    (a, b) =>
      new Date(a.fechaRenovacion).getTime() -
      new Date(b.fechaRenovacion).getTime()
  )

const paisStats = paises.map((p) => {
  const empresasPais = empresas.filter((e) => e.paisId === p.id)
  const suscripcionesPais = suscripciones.filter((s) =>
    empresasPais.some((e) => e.id === s.empresaId)
  )
  const mrrPais = suscripcionesPais
    .filter((s) => s.estado === "activa")
    .reduce((sum, s) => {
      const precios: Record<string, number> = {
        trial: 0,
        basico: 800,
        pro: 2000,
        enterprise: 5000,
      }
      return sum + (precios[s.tier] || 0)
    }, 0)
  const estudioPais = estudios.filter((e) =>
    e.configuracion.paisesObjetivo.some(
      (pid) => pid === p.id
    )
  )
  return {
    pais: p.nombre,
    codigo: p.codigo,
    empresas: empresasPais.length,
    mrr: mrrPais,
    estudios: estudioPais.length,
    participantes: Math.floor(Math.random() * 500 + 100),
  }
})

function CustomTooltip({ active, payload, label, formatter }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string; formatter?: (value: number) => [string, string] }) {
  if (!active || !payload) return null
  return (
    <div className="rounded-lg border border-border/60 bg-white px-3 py-2.5 shadow-lg shadow-black/[0.06]">
      <p className="text-xs font-medium text-foreground-muted mb-1.5">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-foreground-secondary">{entry.name}:</span>
          <span className="font-semibold text-foreground">
            {formatter ? formatter(entry.value)[0] : entry.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function DashboardPage() {
  const [filtroPais, setFiltroPais] = useState("todos")
  const [fechaDesde, setFechaDesde] = useState("")
  const [fechaHasta, setFechaHasta] = useState("")
  const [showBannerFraude, setShowBannerFraude] = useState(true)
  const [showBannerRedenciones, setShowBannerRedenciones] = useState(true)

  const paisStatsFiltrados = useMemo(() => {
    if (filtroPais === "todos") return paisStats
    return paisStats.filter((p) => p.codigo.toLowerCase() === filtroPais)
  }, [filtroPais])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">
          Dashboard de Monitoreo
        </h1>
        <p className="mt-1 text-sm text-foreground-secondary">
          Supervisión de planes SaaS, métricas y suscripciones
        </p>
      </div>

      {showBannerFraude && alertasAltoRiesgo > 0 && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-warning/30 bg-warning/5 px-4 py-3 animate-slide-in-up">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning/10">
              <AlertTriangle className="h-4 w-4 text-warning" />
            </div>
            <span className="text-sm font-medium text-foreground">
              {alertasAltoRiesgo} alerta{alertasAltoRiesgo > 1 ? "s" : ""} de fraude de alto riesgo pendiente{alertasAltoRiesgo > 1 ? "s" : ""}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-warning/10"
            onClick={() => setShowBannerFraude(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {showBannerRedenciones && redencionesPendientes > 0 && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 animate-slide-in-up">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">
              {redencionesPendientes} redenci{redencionesPendientes > 1 ? "ones" : "ón"} pendiente{redencionesPendientes > 1 ? "s" : ""} de revisión
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 hover:bg-primary/10"
            onClick={() => setShowBannerRedenciones(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex items-center gap-3 mb-6">
        <Select value={filtroPais} onValueChange={setFiltroPais}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="País" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los países</SelectItem>
            {paises.map((p) => (
              <SelectItem key={p.id} value={p.codigo.toLowerCase()}>
                {p.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={fechaDesde}
          onChange={(e) => setFechaDesde(e.target.value)}
          className="w-[160px]"
          placeholder="Desde"
        />
        <Input
          type="date"
          value={fechaHasta}
          onChange={(e) => setFechaHasta(e.target.value)}
          className="w-[160px]"
          placeholder="Hasta"
        />
      </div>

      <div className="grid grid-cols-5 gap-4 mb-6">
        <KPICard
          title="MRR"
          value={`$${mrr.toLocaleString()}`}
          subtitle="Monthly Recurring Revenue"
          icon={<DollarSign className="h-5 w-5 text-primary" />}
          trend={{ value: "+12.5% vs mes anterior", positive: true }}
        />
        <KPICard
          title="Clientes Activos"
          value={activasCount}
          subtitle={`${empresas.length} empresas registradas`}
          icon={<Building2 className="h-5 w-5 text-primary" />}
          trend={{ value: "+1 este mes", positive: true }}
        />
        <KPICard
          title="Estudios Completados"
          value={estudiosCompletos}
          subtitle={`${estudios.filter((e) => e.estado === "activo").length} activos`}
          icon={<BarChart3 className="h-5 w-5 text-primary" />}
        />
        <KPICard
          title="Renovaciones Pendientes"
          value={renovacionesProximas.length}
          subtitle="Próximos 90 días"
          icon={<RefreshCw className="h-5 w-5 text-primary" />}
          trend={
            renovacionesProximas.length > 0
              ? {
                  value: `Próxima: ${new Date(renovacionesProximas[0]?.fechaRenovacion).toLocaleDateString("es-CR", { day: "2-digit", month: "short" })}`,
                  positive: false,
                }
              : undefined
          }
        />
        <KPICard
          title="Clientes Nuevos"
          value={clientesNuevos}
          subtitle="Últimos 30 días"
          icon={<UserPlus className="h-5 w-5 text-primary" />}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">MRR Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mrrData} barCategoryGap="20%">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis
                    dataKey="mes"
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    content={<CustomTooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "MRR"]} />}
                    cursor={{ fill: "rgba(255, 65, 54, 0.04)", radius: 4 }}
                  />
                  <Bar
                    dataKey="mrr"
                    fill="#FF4136"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={36}
                    name="MRR"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Actividad del Panel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={actividadData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                  <XAxis
                    dataKey="mes"
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="respuestas"
                    stroke="#FF4136"
                    strokeWidth={2.5}
                    dot={{ fill: "#FF4136", r: 4, strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 6, stroke: "#FF4136", strokeWidth: 2, fill: "#fff" }}
                    name="Respuestas"
                  />
                  <Line
                    type="monotone"
                    dataKey="estudios"
                    stroke="#9ca3af"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "#9ca3af", r: 3, strokeWidth: 2, stroke: "#fff" }}
                    name="Estudios"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                Desempeño por País
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>País</TableHead>
                  <TableHead className="text-right">Empresas</TableHead>
                  <TableHead className="text-right">MRR</TableHead>
                  <TableHead className="text-right">Estudios</TableHead>
                  <TableHead className="text-right">Panelistas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paisStatsFiltrados.map((p) => (
                  <TableRow key={p.codigo}>
                    <TableCell className="font-medium">
                      {p.pais}
                    </TableCell>
                    <TableCell className="text-right">{p.empresas}</TableCell>
                    <TableCell className="text-right font-medium">
                      ${p.mrr.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">{p.estudios}</TableCell>
                    <TableCell className="text-right">
                      {p.participantes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Próximas Renovaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {renovacionesProximas.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background-gray mb-3">
                  <RefreshCw className="h-5 w-5 text-foreground-muted" />
                </div>
                <p className="text-sm text-foreground-muted">
                  No hay renovaciones pendientes en los próximos 90 días
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Empresa</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Renovación</TableHead>
                    <TableHead className="text-right">Uso</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {renovacionesProximas.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">
                        {s.empresaNombre}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {s.tier.charAt(0).toUpperCase() + s.tier.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(s.fechaRenovacion).toLocaleDateString(
                          "es-CR",
                          { day: "2-digit", month: "short", year: "numeric" }
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={
                            s.respuestasUsadas / s.respuestasLimite > 0.8
                              ? "text-error font-semibold"
                              : "text-foreground-secondary"
                          }
                        >
                          {Math.round(
                            (s.respuestasUsadas / s.respuestasLimite) * 100
                          )}
                          %
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
