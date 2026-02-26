"use client"

import { useState } from "react"
import {
  participantes,
  paises,
  auditParticipantes,
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
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Textarea,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Label,
} from "@kosmos/ui"
import { toast } from "sonner"
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
  Lock,
  History,
  X,
  CheckCircle2,
  Ban,
  Send,
} from "lucide-react"

const actividadMock = [
  {
    tipo: "estudio",
    descripcion: "Completó evaluación \"Salud de Marca\"",
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
    tipo: "estudio",
    descripcion: "Completó evaluación \"Evaluación Producto\"",
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
    tipo: "estudio",
    descripcion: "Completó evaluación \"Hábitos de Consumo\"",
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
    case "estudio":
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
  const [showModalContrasena, setShowModalContrasena] = useState(false)
  const [bannerContrasena, setBannerContrasena] = useState(false)
  const [showModalHistorial, setShowModalHistorial] = useState(false)
  const [showModalNotificacion, setShowModalNotificacion] = useState(false)
  const [showModalSuspension, setShowModalSuspension] = useState(false)
  const [estadoParticipante, setEstadoParticipante] = useState<string | null>(null)

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

  function handleForzarContrasena() {
    setShowModalContrasena(false)
    setBannerContrasena(true)
    setTimeout(() => setBannerContrasena(false), 5000)
  }

  const pais = seleccionado
    ? paises.find((p) => p.id === seleccionado.paisId)
    : null
  const saldoDisponible = seleccionado
    ? seleccionado.puntosAcumulados - seleccionado.puntosCanjeados
    : 0

  const auditEntries = seleccionado
    ? auditParticipantes.filter((a) => a.participanteId === seleccionado.id)
    : []

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">
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

      {bannerContrasena && seleccionado && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-success/30 bg-success/5 px-4 py-3 animate-slide-in-up">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <span className="text-sm font-medium text-foreground">
              Contraseña temporal generada y enviada a {seleccionado.email}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setBannerContrasena(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {showModalContrasena && seleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl shadow-black/10 animate-scale-in">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Forzar Cambio de Contraseña
            </h3>
            <p className="text-sm text-foreground-secondary mb-6">
              Se generará una contraseña temporal y se enviará a{" "}
              <span className="font-medium">{seleccionado.email}</span>. El
              usuario deberá cambiarla en su próximo inicio de sesión.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setShowModalContrasena(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleForzarContrasena}>
                Confirmar y Enviar
              </Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showModalHistorial} onOpenChange={setShowModalHistorial}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Historial Completo</DialogTitle>
            <DialogDescription>
              {seleccionado
                ? `Actividad y auditoría de ${seleccionado.nombre} ${seleccionado.apellidos}`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Fecha</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Puntos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actividadMock.map((act, i) => (
                <TableRow key={`act-${i}`}>
                  <TableCell className="text-sm whitespace-nowrap">{act.fecha}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">{act.tipo}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{act.descripcion}</TableCell>
                  <TableCell className={`text-sm text-right font-semibold ${act.puntos > 0 ? "text-success" : "text-error"}`}>
                    {act.puntos > 0 ? "+" : ""}{act.puntos}
                  </TableCell>
                </TableRow>
              ))}
              {auditEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="text-sm whitespace-nowrap">
                    {new Date(entry.fecha).toLocaleDateString("es-CR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Auditoría</Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {entry.campo}: {entry.valorAnterior} → {entry.valorNuevo} (por {entry.adminNombre})
                  </TableCell>
                  <TableCell className="text-right text-sm text-foreground-muted">—</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

      <Dialog open={showModalNotificacion} onOpenChange={setShowModalNotificacion}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enviar Notificación</DialogTitle>
            <DialogDescription>
              {seleccionado
                ? `Enviar notificación a ${seleccionado.nombre} ${seleccionado.apellidos}`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setShowModalNotificacion(false)
              toast.success("Notificación enviada exitosamente")
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select defaultValue="email">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="push">Push</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Asunto</Label>
              <Input placeholder="Asunto de la notificación" required />
            </div>
            <div className="space-y-2">
              <Label>Mensaje</Label>
              <Textarea placeholder="Escriba el contenido del mensaje..." rows={4} required />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowModalNotificacion(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                <Send className="h-4 w-4 mr-2" />
                Enviar
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={showModalSuspension} onOpenChange={setShowModalSuspension}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspender Cuenta</DialogTitle>
            <DialogDescription>
              {seleccionado
                ? `¿Está seguro que desea suspender la cuenta de ${seleccionado.nombre} ${seleccionado.apellidos}?`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setEstadoParticipante("suspendido")
              setShowModalSuspension(false)
              toast.success("Cuenta suspendida")
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label>Motivo</Label>
              <Select defaultValue="fraude">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fraude">Fraude</SelectItem>
                  <SelectItem value="inactividad">Inactividad</SelectItem>
                  <SelectItem value="solicitud">Solicitud del usuario</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowModalSuspension(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-error hover:bg-error/90 text-white">
                Confirmar Suspensión
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
                        (estadoParticipante ?? seleccionado.estado) === "activo" ? "success" : "error"
                      }
                    >
                      {(estadoParticipante ?? seleccionado.estado) === "activo"
                        ? "Activo"
                        : (estadoParticipante ?? seleccionado.estado) === "suspendido"
                          ? "Suspendido"
                          : (estadoParticipante ?? seleccionado.estado) === "bloqueado"
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
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                    onClick={() => setShowModalContrasena(true)}
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Forzar Cambio de Contraseña
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                    onClick={() => setShowModalHistorial(true)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Ver historial completo
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                    onClick={() => setShowModalNotificacion(true)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar notificación
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-error border-error/30 hover:bg-error/5"
                    size="sm"
                    onClick={() => setShowModalSuspension(true)}
                  >
                    <Ban className="h-4 w-4 mr-2" />
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

                {auditEntries.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <History className="h-4 w-4 text-foreground-muted" />
                        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
                          Historial de Cambios
                        </h3>
                      </div>
                      <div className="rounded-lg border border-border overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="hover:bg-transparent">
                              <TableHead>Fecha</TableHead>
                              <TableHead>Admin</TableHead>
                              <TableHead>Campo</TableHead>
                              <TableHead>Anterior → Nuevo</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {auditEntries.map((entry) => (
                              <TableRow key={entry.id}>
                                <TableCell className="text-sm">
                                  {new Date(entry.fecha).toLocaleDateString("es-CR", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </TableCell>
                                <TableCell className="text-sm font-medium">
                                  {entry.adminNombre}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">{entry.campo}</Badge>
                                </TableCell>
                                <TableCell className="text-sm">
                                  <span className="text-foreground-muted">{entry.valorAnterior}</span>
                                  <span className="mx-2 text-foreground-muted">→</span>
                                  <span className="font-medium text-foreground">{entry.valorNuevo}</span>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background-gray mb-4">
              <Search className="h-7 w-7 text-foreground-muted" />
            </div>
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
