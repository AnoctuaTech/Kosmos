"use client"

import { useState, useMemo } from "react"
import { participantes, paises } from "@kosmos/mock-data"
import type { NivelNSE } from "@kosmos/types"
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
  Save,
  AlertTriangle,
  BarChart3,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  GripVertical,
  ShieldAlert,
} from "lucide-react"

interface VariableNSE {
  id: string
  nombre: string
  descripcion: string
  peso: number
  opciones: number
  activa: boolean
}

interface NivelConfig {
  nivel: NivelNSE
  label: string
  min: number
  max: number
  color: string
  badgeVariant: "success" | "warning" | "error"
}

const variablesIniciales: VariableNSE[] = [
  { id: "var-01", nombre: "Nivel educativo del jefe de hogar", descripcion: "Primaria, secundaria, técnica, universitaria, posgrado", peso: 20, opciones: 5, activa: true },
  { id: "var-02", nombre: "Tipo de vivienda", descripcion: "Propia, alquilada, prestada, en precario", peso: 15, opciones: 4, activa: true },
  { id: "var-03", nombre: "Material predominante de la vivienda", descripcion: "Block, madera, mixto, lámina, otro", peso: 10, opciones: 5, activa: true },
  { id: "var-04", nombre: "Número de habitaciones", descripcion: "1-2, 3-4, 5+", peso: 8, opciones: 3, activa: true },
  { id: "var-05", nombre: "Acceso a internet", descripcion: "Sin acceso, datos móviles, fibra óptica", peso: 12, opciones: 3, activa: true },
  { id: "var-06", nombre: "Vehículo en el hogar", descripcion: "Ninguno, moto, auto <5 años, auto >5 años, 2+ autos", peso: 15, opciones: 5, activa: true },
  { id: "var-07", nombre: "Ingreso mensual del hogar", descripcion: "Rangos en moneda local según país", peso: 20, opciones: 6, activa: true },
]

const nivelesIniciales: NivelConfig[] = [
  { nivel: "alto", label: "Alto", min: 70, max: 100, color: "text-success", badgeVariant: "success" },
  { nivel: "medio", label: "Medio", min: 40, max: 69, color: "text-warning", badgeVariant: "warning" },
  { nivel: "bajo", label: "Bajo", min: 0, max: 39, color: "text-error", badgeVariant: "error" },
]

export default function NsePage() {
  const [variables, setVariables] = useState<VariableNSE[]>(variablesIniciales)
  const [niveles, setNiveles] = useState<NivelConfig[]>(nivelesIniciales)
  const [paisFiltro, setPaisFiltro] = useState("todos")
  const [guardado, setGuardado] = useState(true)
  const [confirmDanger, setConfirmDanger] = useState(false)

  const pesoTotal = variables.filter((v) => v.activa).reduce((sum, v) => sum + v.peso, 0)

  const distribucion = useMemo(() => {
    const filtrados = paisFiltro === "todos"
      ? participantes
      : participantes.filter((p) => p.paisId === paisFiltro)
    const total = filtrados.length
    const alto = filtrados.filter((p) => p.nseNivel === "alto").length
    const medio = filtrados.filter((p) => p.nseNivel === "medio").length
    const bajo = filtrados.filter((p) => p.nseNivel === "bajo").length
    const vigentes = filtrados.filter((p) => p.nseEstado === "vigente").length
    const vencidos = filtrados.filter((p) => p.nseEstado === "vencido").length
    const pendientesNSE = filtrados.filter((p) => p.nseEstado === "pendiente").length
    const scorePromedio = total > 0
      ? Math.round(filtrados.reduce((sum, p) => sum + p.nseScore, 0) / total)
      : 0
    return { total, alto, medio, bajo, vigentes, vencidos, pendientesNSE, scorePromedio }
  }, [paisFiltro])

  function handlePesoChange(id: string, nuevoPeso: number) {
    setVariables((prev) =>
      prev.map((v) => (v.id === id ? { ...v, peso: nuevoPeso } : v))
    )
    setGuardado(false)
  }

  function handleActivaToggle(id: string) {
    setVariables((prev) =>
      prev.map((v) => (v.id === id ? { ...v, activa: !v.activa } : v))
    )
    setGuardado(false)
  }

  function handleNivelChange(nivel: NivelNSE, campo: "min" | "max", valor: number) {
    setNiveles((prev) =>
      prev.map((n) => (n.nivel === nivel ? { ...n, [campo]: valor } : n))
    )
    setGuardado(false)
  }

  function handleMover(id: string, direccion: "arriba" | "abajo") {
    setVariables((prev) => {
      const idx = prev.findIndex((v) => v.id === id)
      if (direccion === "arriba" && idx > 0) {
        const nueva = [...prev]
        ;[nueva[idx - 1], nueva[idx]] = [nueva[idx], nueva[idx - 1]]
        return nueva
      }
      if (direccion === "abajo" && idx < prev.length - 1) {
        const nueva = [...prev]
        ;[nueva[idx + 1], nueva[idx]] = [nueva[idx], nueva[idx + 1]]
        return nueva
      }
      return prev
    })
    setGuardado(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Calibración NSE
          </h1>
          <p className="mt-1 text-sm text-foreground-secondary">
            Variables de encuesta con pesos configurables y definición de niveles
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={paisFiltro} onValueChange={setPaisFiltro}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por país" />
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
          <Button
            size="sm"
            variant={guardado ? "outline" : "default"}
            disabled={guardado}
            onClick={() => setGuardado(true)}
          >
            <Save className="h-4 w-4 mr-2" />
            {guardado ? "Sin cambios" : "Guardar Configuración"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Score Promedio"
          value={distribucion.scorePromedio}
          subtitle={`De ${distribucion.total} participantes`}
          icon={<BarChart3 className="h-5 w-5 text-primary" />}
        />
        <KPICard
          title="NSE Alto"
          value={distribucion.alto}
          subtitle={`${distribucion.total > 0 ? Math.round((distribucion.alto / distribucion.total) * 100) : 0}% del panel`}
          icon={<div className="h-3 w-3 rounded-full bg-success" />}
        />
        <KPICard
          title="NSE Medio"
          value={distribucion.medio}
          subtitle={`${distribucion.total > 0 ? Math.round((distribucion.medio / distribucion.total) * 100) : 0}% del panel`}
          icon={<div className="h-3 w-3 rounded-full bg-warning" />}
        />
        <KPICard
          title="NSE Bajo"
          value={distribucion.bajo}
          subtitle={`${distribucion.total > 0 ? Math.round((distribucion.bajo / distribucion.total) * 100) : 0}% del panel`}
          icon={<div className="h-3 w-3 rounded-full bg-error" />}
        />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-secondary">Vigentes</p>
              <p className="text-2xl font-semibold text-foreground tracking-tight">{distribucion.vigentes}</p>
            </div>
            <Badge variant="success">Activos</Badge>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-secondary">Vencidos</p>
              <p className="text-2xl font-semibold text-foreground tracking-tight">{distribucion.vencidos}</p>
            </div>
            <Badge variant="warning">Requieren actualización</Badge>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-secondary">Pendientes</p>
              <p className="text-2xl font-semibold text-foreground tracking-tight">{distribucion.pendientesNSE}</p>
            </div>
            <Badge variant="error">Sin completar</Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Variables del Cuestionario NSE</CardTitle>
              <p className="text-sm text-foreground-secondary mt-1">
                Cada variable contribuye al score final según su peso asignado
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-foreground-secondary">Peso total:</span>
              <Badge variant={pesoTotal === 100 ? "success" : "error"}>
                {pesoTotal}%
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {pesoTotal !== 100 && (
            <div className="mx-6 mb-4 flex items-center gap-2 p-3 rounded-lg border border-warning/40 bg-warning/5">
              <AlertTriangle className="h-4 w-4 text-warning flex-shrink-0" />
              <p className="text-sm text-foreground-secondary">
                La suma de pesos debe ser exactamente 100%. Actualmente: {pesoTotal}%
              </p>
            </div>
          )}
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-10"></TableHead>
                <TableHead>Variable</TableHead>
                <TableHead>Opciones</TableHead>
                <TableHead className="w-[120px] text-center">Peso (%)</TableHead>
                <TableHead className="w-[100px] text-center">Estado</TableHead>
                <TableHead className="w-[100px] text-right">Orden</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variables.map((v, idx) => (
                <TableRow key={v.id} className={!v.activa ? "opacity-50" : ""}>
                  <TableCell>
                    <GripVertical className="h-4 w-4 text-foreground-muted" />
                  </TableCell>
                  <TableCell>
                    <p className="font-medium text-foreground">{v.nombre}</p>
                    <p className="text-xs text-foreground-muted">{v.descripcion}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{v.opciones} opciones</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={v.peso}
                      onChange={(e) => handlePesoChange(v.id, Number(e.target.value))}
                      className="w-20 text-center mx-auto"
                      disabled={!v.activa}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`h-7 text-xs ${v.activa ? "text-success border-success/30" : "text-foreground-muted"}`}
                      onClick={() => handleActivaToggle(v.id)}
                    >
                      {v.activa ? "Activa" : "Inactiva"}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        disabled={idx === 0}
                        onClick={() => handleMover(v.id, "arriba")}
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        disabled={idx === variables.length - 1}
                        onClick={() => handleMover(v.id, "abajo")}
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Definición de Niveles</CardTitle>
          <p className="text-sm text-foreground-secondary mt-1">
            Rangos de score para clasificar participantes en cada nivel socioeconómico
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            {niveles.map((n) => (
              <div key={n.nivel} className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-3 w-3 rounded-full ${
                        n.nivel === "alto"
                          ? "bg-success"
                          : n.nivel === "medio"
                            ? "bg-warning"
                            : "bg-error"
                      }`}
                    />
                    <span className="font-semibold text-foreground">
                      Nivel {n.label}
                    </span>
                  </div>
                  <Badge variant={n.badgeVariant}>
                    {participantes.filter((p) => p.nseNivel === n.nivel).length} participantes
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-foreground-muted block mb-1">
                      Score mínimo
                    </label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={n.min}
                      onChange={(e) =>
                        handleNivelChange(n.nivel, "min", Number(e.target.value))
                      }
                      className="text-center"
                    />
                  </div>
                  <span className="text-foreground-muted mt-5">—</span>
                  <div className="flex-1">
                    <label className="text-xs text-foreground-muted block mb-1">
                      Score máximo
                    </label>
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={n.max}
                      onChange={(e) =>
                        handleNivelChange(n.nivel, "max", Number(e.target.value))
                      }
                      className="text-center"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-error/30">
        <CardHeader>
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-5 w-5 text-error" />
            <div>
              <CardTitle className="text-base text-error">Zona de Peligro</CardTitle>
              <p className="text-sm text-foreground-secondary mt-1">
                Acciones que afectan a todos los participantes del panel
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg border border-error/20 bg-error/5">
            <div>
              <p className="font-medium text-foreground">
                Forzar Actualización Masiva NSE
              </p>
              <p className="text-sm text-foreground-secondary mt-1">
                Recalcula el score NSE de todos los participantes usando los pesos actuales.
                Esto invalidará todos los niveles existentes y puede cambiar el acceso a estudios.
              </p>
              <p className="text-xs text-foreground-muted mt-2">
                Participantes afectados: {distribucion.total} · Última actualización: Nunca
              </p>
            </div>
            <div className="flex-shrink-0 ml-6">
              {!confirmDanger ? (
                <Button
                  variant="outline"
                  className="border-error/40 text-error hover:bg-error/10"
                  onClick={() => setConfirmDanger(true)}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Recalcular Todo
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setConfirmDanger(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="bg-error hover:bg-error/90"
                    size="sm"
                    onClick={() => {
                      setConfirmDanger(false)
                    }}
                  >
                    Confirmar Recálculo
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
