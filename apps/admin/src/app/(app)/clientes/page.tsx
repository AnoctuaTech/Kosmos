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
            <Select value={filtroPais} onValueChange={setFiltroPais}>
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

            <Select value={filtroPlan} onValueChange={setFiltroPlan}>
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

            <Select value={filtroEstado} onValueChange={setFiltroEstado}>
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
                onChange={(e) => setBusqueda(e.target.value)}
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
              {filtradas.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center text-foreground-muted"
                  >
                    No se encontraron empresas con los filtros seleccionados
                  </TableCell>
                </TableRow>
              ) : (
                filtradas.map((emp) => (
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
            <span>
              Mostrando {filtradas.length} de {empresas.length} empresas
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
