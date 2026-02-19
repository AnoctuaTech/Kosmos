"use client"

import { useState, useMemo } from "react"
import {
  empresas,
  suscripciones,
  estudios,
  paises,
  clientes,
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
  Avatar,
  AvatarFallback,
  StatusBadge,
} from "@kosmos/ui"
import {
  Building2,
  FlaskConical,
  AlertCircle,
  DollarSign,
  Search,
  LogIn,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const tierPrecios: Record<string, number> = {
  trial: 0,
  basico: 800,
  pro: 2000,
  enterprise: 5000,
}

const tierLabels: Record<string, string> = {
  trial: "Trial",
  basico: "Básico",
  pro: "Profesional",
  enterprise: "Enterprise",
}

const tierVariants: Record<string, "default" | "primary" | "success" | "warning" | "error" | "outline"> = {
  trial: "default",
  basico: "outline",
  pro: "primary",
  enterprise: "success",
}

function getEmpresaData() {
  return empresas.map((emp) => {
    const suscripcion = suscripciones.find((s) => s.empresaId === emp.id)
    const pais = paises.find((p) => p.id === emp.paisId)
    const estudiosActivos = estudios.filter(
      (e) => e.empresaId === emp.id && e.estado === "activo"
    ).length
    const contacto = clientes.find((c) => c.empresaId === emp.id)
    const mrr = suscripcion ? tierPrecios[suscripcion.tier] || 0 : 0

    return {
      ...emp,
      suscripcion,
      pais,
      estudiosActivos,
      contacto,
      mrr,
      iniciales: emp.nombre
        .split(" ")
        .map((w) => w.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase(),
    }
  })
}

export default function ClientesPage() {
  const [filtroPais, setFiltroPais] = useState("todos")
  const [filtroPlan, setFiltroPlan] = useState("todos")
  const [filtroEstado, setFiltroEstado] = useState("todos")
  const [busqueda, setBusqueda] = useState("")
  const [pageSize, setPageSize] = useState(10)
  const [page, setPage] = useState(0)

  const empresasData = useMemo(() => getEmpresaData(), [])

  const filtradas = useMemo(() => {
    return empresasData.filter((emp) => {
      if (filtroPais !== "todos" && emp.paisId !== filtroPais) return false
      if (filtroPlan !== "todos" && emp.suscripcion?.tier !== filtroPlan)
        return false
      if (filtroEstado !== "todos" && emp.estado !== filtroEstado) return false
      if (busqueda) {
        const q = busqueda.toLowerCase()
        return (
          emp.nombre.toLowerCase().includes(q) ||
          emp.industria.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [empresasData, filtroPais, filtroPlan, filtroEstado, busqueda])

  const totalPages = Math.ceil(filtradas.length / pageSize)
  const paginadas = filtradas.slice(page * pageSize, (page + 1) * pageSize)

  const activosCount = empresas.filter((e) => e.estado === "activo").length
  const trialCount = suscripciones.filter((s) => s.tier === "trial").length
  const moraCount = empresas.filter((e) => e.estado === "mora").length
  const mrrTotal = suscripciones
    .filter((s) => s.estado === "activa")
    .reduce((sum, s) => sum + (tierPrecios[s.tier] || 0), 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Clientes / Empresas
          </h1>
          <p className="mt-1 text-sm text-foreground-secondary">
            Gestión de empresas, suscripciones e impersonación
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exportar a Excel
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Clientes Activos"
          value={activosCount}
          subtitle={`${empresas.length} empresas registradas`}
          icon={<Building2 className="h-5 w-5 text-primary" />}
        />
        <KPICard
          title="En Trial"
          value={trialCount}
          subtitle="Periodo de prueba gratuito"
          icon={<FlaskConical className="h-5 w-5 text-primary" />}
        />
        <KPICard
          title="En Mora"
          value={moraCount}
          subtitle="Pago pendiente"
          icon={<AlertCircle className="h-5 w-5 text-error" />}
          className={moraCount > 0 ? "border-error/30" : ""}
        />
        <KPICard
          title="MRR Total"
          value={`$${mrrTotal.toLocaleString()}`}
          subtitle="Monthly Recurring Revenue"
          icon={<DollarSign className="h-5 w-5 text-success" />}
        />
      </div>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Listado de Empresas</CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-4">
          <div className="flex items-center gap-3 px-6 pb-4">
            <Select value={filtroPais} onValueChange={(v) => { setFiltroPais(v); setPage(0) }}>
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="País" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los países</SelectItem>
                {paises.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.nombre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filtroPlan} onValueChange={(v) => { setFiltroPlan(v); setPage(0) }}>
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los planes</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="basico">Básico</SelectItem>
                <SelectItem value="pro">Profesional</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filtroEstado} onValueChange={(v) => { setFiltroEstado(v); setPage(0) }}>
              <SelectTrigger className="w-[170px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="mora">En Mora</SelectItem>
                <SelectItem value="suspendido">Suspendido</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
              <Input
                placeholder="Buscar empresa..."
                value={busqueda}
                onChange={(e) => { setBusqueda(e.target.value); setPage(0) }}
                className="pl-9"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Empresa</TableHead>
                <TableHead>País</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">MRR</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Estudios</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginadas.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center text-foreground-muted"
                  >
                    No se encontraron empresas con los filtros seleccionados
                  </TableCell>
                </TableRow>
              ) : (
                paginadas.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="text-xs bg-background-gray text-foreground-secondary">
                            {emp.iniciales}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-foreground">
                            {emp.nombre}
                          </p>
                          <p className="text-xs text-foreground-muted">
                            {emp.industria}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{emp.pais?.nombre ?? "—"}</span>
                    </TableCell>
                    <TableCell>
                      {emp.suscripcion ? (
                        <Badge variant={tierVariants[emp.suscripcion.tier]}>
                          {tierLabels[emp.suscripcion.tier]}
                        </Badge>
                      ) : (
                        <span className="text-foreground-muted text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`font-medium ${emp.mrr > 0 ? "text-success" : "text-foreground-muted"}`}
                      >
                        ${emp.mrr.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={emp.estado} />
                    </TableCell>
                    <TableCell className="text-right">
                      {emp.estudiosActivos}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3.5 w-3.5 mr-1.5" />
                          Detalle
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-violet-600 border-violet-200 hover:bg-violet-50"
                        >
                          <LogIn className="h-3.5 w-3.5 mr-1.5" />
                          Impersonar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between px-6 py-4 border-t border-border text-sm text-foreground-muted">
            <div className="flex items-center gap-4">
              <span>
                Mostrando {filtradas.length > 0 ? page * pageSize + 1 : 0}-{Math.min((page + 1) * pageSize, filtradas.length)} de {filtradas.length} empresas
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs">Mostrar:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value))
                    setPage(0)
                  }}
                  className="h-8 rounded border border-border bg-white px-2 text-xs text-foreground"
                >
                  {[5, 10, 20, 30].map((size) => (
                    <option key={size} value={size}>
                      {size} por página
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => (
                  <Button
                    key={i}
                    variant={page === i ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setPage(i)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  disabled={page === totalPages - 1}
                  onClick={() => setPage(page + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
