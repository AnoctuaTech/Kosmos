"use client"

import {
  empresas,
  suscripciones,
  estudios,
  paises,
} from "@kosmos/mock-data"
import {
  KPICard,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
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
  { mes: "Sep", encuestas: 120, respuestas: 890 },
  { mes: "Oct", encuestas: 145, respuestas: 1240 },
  { mes: "Nov", encuestas: 190, respuestas: 1580 },
  { mes: "Dic", encuestas: 210, respuestas: 1720 },
  { mes: "Ene", encuestas: 280, respuestas: 2100 },
  { mes: "Feb", encuestas: 310, respuestas: 2450 },
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

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Dashboard de Monitoreo
        </h1>
        <p className="mt-1 text-sm text-foreground-secondary">
          Supervisión de planes SaaS, métricas y suscripciones
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
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
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">MRR Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mrrData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="mes"
                    tick={{ fontSize: 12, fill: "#6c757d" }}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#6c757d" }}
                    axisLine={{ stroke: "#e5e7eb" }}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `$${value.toLocaleString()}`,
                      "MRR",
                    ]}
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                      fontSize: 13,
                    }}
                  />
                  <Bar
                    dataKey="mrr"
                    fill="#FF4136"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Actividad del Panel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={actividadData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="mes"
                    tick={{ fontSize: 12, fill: "#6c757d" }}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#6c757d" }}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 8,
                      border: "1px solid #e5e7eb",
                      fontSize: 13,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="respuestas"
                    stroke="#FF4136"
                    strokeWidth={2}
                    dot={{ fill: "#FF4136", r: 4 }}
                    name="Respuestas"
                  />
                  <Line
                    type="monotone"
                    dataKey="encuestas"
                    stroke="#6c757d"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: "#6c757d", r: 3 }}
                    name="Encuestas"
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
                {paisStats.map((p) => (
                  <TableRow key={p.codigo}>
                    <TableCell className="font-medium">
                      {p.pais}
                    </TableCell>
                    <TableCell className="text-right">{p.empresas}</TableCell>
                    <TableCell className="text-right">
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
                <RefreshCw className="h-8 w-8 text-foreground-muted mb-2" />
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
                              ? "text-error font-medium"
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
