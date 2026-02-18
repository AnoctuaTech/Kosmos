"use client"

import { useState } from "react"
import {
  participantes,
  paises,
} from "@kosmos/mock-data"
import type { Participante } from "@kosmos/types"
import {
  Input,
  Button,
  Card,
  CardContent,
  Badge,
  Avatar,
  AvatarFallback,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Separator,
} from "@kosmos/ui"
import {
  Search,
  AlertTriangle,
  User,
  Mail,
  CreditCard,
  MapPin,
  Calendar,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  ClipboardList,
  Gift,
  UserPlus,
} from "lucide-react"

const actividadMock = [
  {
    tipo: "encuesta",
    descripcion: "Completó encuesta \"Salud de Marca\"",
    fecha: "16 Feb 2026, 10:30",
    puntos: 150,
  },
  {
    tipo: "canje",
    descripcion: "Canje: Tarjeta Amazon $10",
    fecha: "03 Feb 2026",
    puntos: -1000,
  },
  {
    tipo: "encuesta",
    descripcion: "Completó encuesta \"Evaluación Producto\"",
    fecha: "01 Feb 2026",
    puntos: 200,
  },
  {
    tipo: "referido",
    descripcion: "Referido registrado: Juan P.",
    fecha: "28 Ene 2026",
    puntos: 100,
  },
  {
    tipo: "encuesta",
    descripcion: "Completó encuesta \"Hábitos de Consumo\"",
    fecha: "20 Ene 2026",
    puntos: 175,
  },
]

function getInitials(nombre: string, apellidos: string) {
  return `${nombre.charAt(0)}${apellidos.charAt(0)}`.toUpperCase()
}

function getNSEColor(nivel: string) {
  switch (nivel) {
    case "alto":
      return "bg-success/10 text-success"
    case "medio":
      return "bg-warning/10 text-warning"
    case "bajo":
      return "bg-error/10 text-error"
    default:
      return "bg-background-gray text-foreground-secondary"
  }
}

function getEstadoNSEColor(estado: string) {
  switch (estado) {
    case "vigente":
      return "bg-success/10 text-success"
    case "vencido":
      return "bg-error/10 text-error"
    case "pendiente":
      return "bg-warning/10 text-warning"
    default:
      return "bg-background-gray text-foreground-secondary"
  }
}

function getActividadIcon(tipo: string) {
  switch (tipo) {
    case "encuesta":
      return <ClipboardList className="h-4 w-4 text-primary" />
    case "canje":
      return <Gift className="h-4 w-4 text-error" />
    case "referido":
      return <UserPlus className="h-4 w-4 text-success" />
    default:
      return <Award className="h-4 w-4 text-foreground-muted" />
  }
}

export default function ParticipantesPage() {
  const [criterio, setCriterio] = useState("cedula")
  const [busqueda, setBusqueda] = useState("")
  const [seleccionado, setSeleccionado] = useState<Participante | null>(
    participantes[0]
  )
  const [forzandoNSE, setForzandoNSE] = useState(false)

  function buscar() {
    const q = busqueda.toLowerCase().trim()
    if (!q) return
    const encontrado = participantes.find((p) => {
      switch (criterio) {
        case "cedula":
          return p.cedula.toLowerCase().includes(q)
        case "email":
          return p.email.toLowerCase().includes(q)
        default:
          return (
            p.cedula.toLowerCase().includes(q) ||
            p.email.toLowerCase().includes(q) ||
            p.nombre.toLowerCase().includes(q) ||
            p.apellidos.toLowerCase().includes(q)
          )
      }
    })
    setSeleccionado(encontrado ?? null)
  }

  function handleForzarNSE() {
    setForzandoNSE(true)
    setTimeout(() => setForzandoNSE(false), 1500)
  }

  const pais = seleccionado
    ? paises.find((p) => p.id === seleccionado.paisId)
    : null
  const saldoDisponible = seleccionado
    ? seleccionado.puntosAcumulados - seleccionado.puntosCanjeados
    : 0

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">
          Gestión de Participantes
        </h1>
        <p className="mt-1 text-sm text-foreground-secondary">
          Búsqueda, perfil y administración de panelistas
        </p>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <Select value={criterio} onValueChange={setCriterio}>
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cedula">Cédula</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="todos">Todos los campos</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative flex-1 max-w-lg">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
          <Input
            placeholder="Ingrese cédula, email o nombre del participante..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && buscar()}
            className="pl-9"
          />
        </div>
        <Button onClick={buscar}>Buscar</Button>
      </div>

      {seleccionado ? (
        <Card>
          <CardContent className="p-0">
            <div className="grid grid-cols-[280px_1fr]">
              <div className="border-r border-border p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {getInitials(seleccionado.nombre, seleccionado.apellidos)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-lg font-semibold text-foreground text-center">
                    {seleccionado.nombre} {seleccionado.apellidos}
                  </h2>
                  <p className="text-sm text-foreground-secondary mt-1">
                    {seleccionado.cedula}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Badge
                      variant={
                        seleccionado.estado === "activo" ? "success" : "error"
                      }
                    >
                      {seleccionado.estado === "activo"
                        ? "Activo"
                        : seleccionado.estado === "bloqueado"
                          ? "Bloqueado"
                          : "Inactivo"}
                    </Badge>
                    {seleccionado.emailVerificado && (
                      <Badge variant="success">Verificado</Badge>
                    )}
                  </div>
                </div>

                <Separator className="my-5" />

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Ver historial completo
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar notificación
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-error border-error/30 hover:bg-error/5"
                    size="sm"
                  >
                    Suspender cuenta
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                    Información Personal
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <User className="h-4 w-4 text-foreground-muted mt-0.5" />
                      <div>
                        <p className="text-xs text-foreground-muted">Nombre completo</p>
                        <p className="text-sm font-medium">
                          {seleccionado.nombre} {seleccionado.apellidos}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-4 w-4 text-foreground-muted mt-0.5" />
                      <div>
                        <p className="text-xs text-foreground-muted">Email</p>
                        <p className="text-sm font-medium">{seleccionado.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CreditCard className="h-4 w-4 text-foreground-muted mt-0.5" />
                      <div>
                        <p className="text-xs text-foreground-muted">Cédula</p>
                        <p className="text-sm font-medium">{seleccionado.cedula}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-foreground-muted mt-0.5" />
                      <div>
                        <p className="text-xs text-foreground-muted">País</p>
                        <p className="text-sm font-medium">
                          {pais?.nombre ?? "—"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="h-4 w-4 text-foreground-muted mt-0.5" />
                      <div>
                        <p className="text-xs text-foreground-muted">Fecha de registro</p>
                        <p className="text-sm font-medium">
                          {new Date(seleccionado.creadoEn).toLocaleDateString(
                            "es-CR",
                            { day: "2-digit", month: "long", year: "numeric" }
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="h-4 w-4 text-foreground-muted mt-0.5" />
                      <div>
                        <p className="text-xs text-foreground-muted">Código referido</p>
                        <p className="text-sm font-medium font-mono">
                          {seleccionado.codigoReferido}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                    Indicadores NSE
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg border border-border p-4 text-center">
                      <p className="text-3xl font-bold text-foreground">
                        {seleccionado.nseScore}
                      </p>
                      <p className="text-xs text-foreground-muted mt-1">
                        NSE Score
                      </p>
                    </div>
                    <div className="rounded-lg border border-border p-4 text-center">
                      <p className={`text-lg font-bold uppercase ${getNSEColor(seleccionado.nseNivel)}`}>
                        <span className="inline-flex items-center justify-center rounded-full px-3 py-1">
                          {seleccionado.nseNivel}
                        </span>
                      </p>
                      <p className="text-xs text-foreground-muted mt-1">
                        Nivel NSE
                      </p>
                    </div>
                    <div className="rounded-lg border border-border p-4 text-center">
                      <p className={`text-lg font-bold ${getEstadoNSEColor(seleccionado.nseEstado)}`}>
                        <span className="inline-flex items-center justify-center rounded-full px-3 py-1">
                          {seleccionado.nseEstado === "vigente"
                            ? "Vigente"
                            : seleccionado.nseEstado === "vencido"
                              ? "Vencido"
                              : "Pendiente"}
                        </span>
                      </p>
                      <p className="text-xs text-foreground-muted mt-1">
                        Estado NSE
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <Button
                      variant="outline"
                      className="text-error border-error/30 hover:bg-error/5"
                      onClick={handleForzarNSE}
                      disabled={forzandoNSE}
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      {forzandoNSE
                        ? "Forzando actualización..."
                        : "Forzar Actualización NSE"}
                    </Button>
                    <p className="text-xs text-foreground-muted">
                      Obliga al usuario a actualizar su perfil NSE en el próximo
                      login
                    </p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                    Balance de Puntos
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-lg bg-background-gray p-4">
                      <p className="text-xs text-foreground-muted">
                        Acumulados
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {seleccionado.puntosAcumulados.toLocaleString()}
                        <span className="text-sm font-normal text-foreground-muted ml-1">
                          pts
                        </span>
                      </p>
                    </div>
                    <div className="rounded-lg bg-background-gray p-4">
                      <p className="text-xs text-foreground-muted">
                        Canjeados
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {seleccionado.puntosCanjeados.toLocaleString()}
                        <span className="text-sm font-normal text-foreground-muted ml-1">
                          pts
                        </span>
                      </p>
                    </div>
                    <div className="rounded-lg bg-primary/5 p-4">
                      <p className="text-xs text-primary">Disponible</p>
                      <p className="text-2xl font-bold text-primary">
                        {saldoDisponible.toLocaleString()}
                        <span className="text-sm font-normal ml-1">pts</span>
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                    Actividad Reciente
                  </h3>
                  <div className="rounded-lg border border-border divide-y divide-border">
                    {actividadMock.map((act, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between px-4 py-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background-gray">
                            {getActividadIcon(act.tipo)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {act.descripcion}
                            </p>
                            <p className="text-xs text-foreground-muted">
                              {act.fecha}
                            </p>
                          </div>
                        </div>
                        <div
                          className={`flex items-center gap-1 text-sm font-semibold ${
                            act.puntos > 0 ? "text-success" : "text-error"
                          }`}
                        >
                          {act.puntos > 0 ? (
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowDownRight className="h-3.5 w-3.5" />
                          )}
                          {act.puntos > 0 ? "+" : ""}
                          {act.puntos.toLocaleString()} pts
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Search className="h-12 w-12 text-foreground-muted mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-1">
              No se encontró el participante
            </h3>
            <p className="text-sm text-foreground-muted text-center max-w-md">
              Ingrese una cédula, email o nombre en la barra de búsqueda para
              localizar un panelista en el sistema.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
