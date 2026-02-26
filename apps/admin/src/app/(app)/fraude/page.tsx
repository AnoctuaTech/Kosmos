"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  alertasFraude,
  participantes,
  paises,
} from "@kosmos/mock-data"
import type { AlertaFraude, NivelRiesgo } from "@kosmos/types"
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
} from "@kosmos/ui"
import {
  ShieldAlert,
  AlertTriangle,
  ShieldCheck,
  Ban,
  Search,
  Shield,
  Wifi,
  Clock,
  Users,
  Eye,
  ShieldX,
  Settings,
  Save,
} from "lucide-react"

type FiltroNivel = "todos" | NivelRiesgo
type FiltroTipo = "todos" | AlertaFraude["tipo"]
type FiltroEstado = "pendientes" | "resueltas" | "todas"

function getAlertasEnriquecidas() {
  return alertasFraude.map((a) => {
    const participante = participantes.find((p) => p.id === a.participanteId)
    const pais = participante
      ? paises.find((p) => p.id === participante.paisId)
      : null
    return { ...a, participante, pais }
  })
}

function getRiesgoConfig(nivel: NivelRiesgo) {
  const configs: Record<NivelRiesgo, { label: string; variant: "error" | "warning" | "success"; bg: string }> = {
    alto: { label: "ALTO", variant: "error", bg: "bg-error/5" },
    medio: { label: "MEDIO", variant: "warning", bg: "" },
    bajo: { label: "BAJO", variant: "success", bg: "" },
  }
  return configs[nivel]
}

function getTipoConfig(tipo: AlertaFraude["tipo"]) {
  const configs: Record<AlertaFraude["tipo"], { label: string; icon: typeof Wifi }> = {
    ip_duplicada: { label: "IP Duplicada", icon: Wifi },
    tiempo_respuesta: { label: "Tiempo Sospechoso", icon: Clock },
    limite_referidos: { label: "Límite Referidos", icon: Users },
  }
  return configs[tipo]
}

export default function FraudePage() {
  const [filtroNivel, setFiltroNivel] = useState<FiltroNivel>("todos")
  const [filtroTipo, setFiltroTipo] = useState<FiltroTipo>("todos")
  const [filtroEstado, setFiltroEstado] = useState<FiltroEstado>("pendientes")
  const [busqueda, setBusqueda] = useState("")
  const [limiteReferidos, setLimiteReferidos] = useState(50)
  const [limiteGuardado, setLimiteGuardado] = useState(true)

  const data = useMemo(() => getAlertasEnriquecidas(), [])

  const pendientes = data.filter((a) => !a.resuelta)
  const resueltas = data.filter((a) => a.resuelta)

  const altoRiesgo = pendientes.filter((a) => a.nivelRiesgo === "alto")
  const medioRiesgo = pendientes.filter((a) => a.nivelRiesgo === "medio")
  const bajoRiesgo = pendientes.filter((a) => a.nivelRiesgo === "bajo")
  const bloqueados = participantes.filter((p) => p.estado === "bloqueado")

  const filtradas = useMemo(() => {
    let lista = filtroEstado === "pendientes"
      ? pendientes
      : filtroEstado === "resueltas"
        ? resueltas
        : data

    if (filtroNivel !== "todos") {
      lista = lista.filter((a) => a.nivelRiesgo === filtroNivel)
    }
    if (filtroTipo !== "todos") {
      lista = lista.filter((a) => a.tipo === filtroTipo)
    }
    if (busqueda) {
      const q = busqueda.toLowerCase()
      lista = lista.filter(
        (a) =>
          a.participante?.nombre.toLowerCase().includes(q) ||
          a.participante?.apellidos.toLowerCase().includes(q) ||
          a.participante?.cedula.toLowerCase().includes(q) ||
          a.descripcion.toLowerCase().includes(q)
      )
    }
    return lista.sort(
      (a, b) => new Date(b.creadoEn).getTime() - new Date(a.creadoEn).getTime()
    )
  }, [filtroNivel, filtroTipo, filtroEstado, busqueda, data])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Control de Fraude
          </h1>
          <p className="mt-1 text-sm text-foreground-secondary">
            Detección de IP duplicada, tiempos anómalos y límite de referidos
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Configuración Avanzada
        </Button>
      </div>

      {altoRiesgo.length > 0 && (
        <div className="flex items-center gap-4 p-4 mb-6 rounded-lg border border-warning/40 bg-warning/5 animate-slide-in-up">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10 flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-warning" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground">
              {altoRiesgo.length} alerta{altoRiesgo.length > 1 ? "s" : ""} de alto riesgo
            </p>
            <p className="text-sm text-foreground-secondary">
              Requieren atención inmediata. Se detectaron patrones sospechosos.
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="border-warning/40 text-warning hover:bg-warning/10"
            onClick={() => {
              setFiltroNivel("alto")
              setFiltroEstado("pendientes")
            }}
          >
            Ver Alertas Críticas
          </Button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Alto Riesgo"
          value={altoRiesgo.length}
          subtitle="Requieren acción inmediata"
          icon={<ShieldAlert className="h-5 w-5 text-error" />}
          className="border-t-4 border-t-error"
        />
        <KPICard
          title="Riesgo Medio"
          value={medioRiesgo.length}
          subtitle="En observación"
          icon={<AlertTriangle className="h-5 w-5 text-warning" />}
          className="border-t-4 border-t-warning"
        />
        <KPICard
          title="Riesgo Bajo"
          value={bajoRiesgo.length}
          subtitle="Monitoreo preventivo"
          icon={<ShieldCheck className="h-5 w-5 text-success" />}
          className="border-t-4 border-t-success"
        />
        <KPICard
          title="Bloqueados (Total)"
          value={bloqueados.length}
          subtitle="Participantes bloqueados"
          icon={<Ban className="h-5 w-5 text-foreground-muted" />}
          className="border-t-4 border-t-foreground-muted"
        />
      </div>

      <Card className="mb-6">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-1">
            <Settings className="h-4 w-4 text-foreground-muted" />
            <h3 className="font-semibold text-foreground">
              Configuración Global de Referidos
            </h3>
          </div>
          <p className="text-sm text-foreground-secondary mb-4 ml-7">
            Al alcanzar este límite, el usuario recibe bloqueo automático para nuevos referidos
          </p>
          <div className="flex items-center gap-4 ml-7">
            <label className="text-sm text-foreground-secondary whitespace-nowrap">
              Límite máximo de referidos por usuario:
            </label>
            <Input
              type="number"
              value={limiteReferidos}
              onChange={(e) => {
                setLimiteReferidos(Number(e.target.value))
                setLimiteGuardado(false)
              }}
              className="w-24 text-center"
            />
            <Button
              size="sm"
              variant={limiteGuardado ? "outline" : "default"}
              disabled={limiteGuardado}
              onClick={() => setLimiteGuardado(true)}
            >
              <Save className="h-3.5 w-3.5 mr-1" />
              {limiteGuardado ? "Guardado" : "Guardar"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-0">
          <CardTitle className="text-base">Cola de Alertas de Fraude</CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-4">
          <div className="flex items-center gap-3 px-6 pb-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
              <Input
                placeholder="Buscar por nombre, cédula o descripción..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select
              value={filtroEstado}
              onValueChange={(v) => setFiltroEstado(v as FiltroEstado)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendientes">Pendientes</SelectItem>
                <SelectItem value="resueltas">Resueltas</SelectItem>
                <SelectItem value="todas">Todas</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filtroNivel}
              onValueChange={(v) => setFiltroNivel(v as FiltroNivel)}
            >
              <SelectTrigger className="w-[170px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los niveles</SelectItem>
                <SelectItem value="alto">Alto Riesgo</SelectItem>
                <SelectItem value="medio">Riesgo Medio</SelectItem>
                <SelectItem value="bajo">Riesgo Bajo</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filtroTipo}
              onValueChange={(v) => setFiltroTipo(v as FiltroTipo)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                <SelectItem value="ip_duplicada">IP Duplicada</SelectItem>
                <SelectItem value="tiempo_respuesta">Tiempo Sospechoso</SelectItem>
                <SelectItem value="limite_referidos">Límite Referidos</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Usuario</TableHead>
                <TableHead>Tipo de Alerta</TableHead>
                <TableHead>Nivel Riesgo</TableHead>
                <TableHead>Detectado</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtradas.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-foreground-muted"
                  >
                    No hay alertas que coincidan con los filtros
                  </TableCell>
                </TableRow>
              ) : (
                filtradas.map((a) => {
                  const riesgo = getRiesgoConfig(a.nivelRiesgo)
                  const tipo = getTipoConfig(a.tipo)
                  const TipoIcon = tipo.icon
                  const iniciales = a.participante
                    ? `${a.participante.nombre.charAt(0)}${a.participante.apellidos.charAt(0)}`
                    : "??"
                  const avatarColor =
                    a.nivelRiesgo === "alto"
                      ? "bg-error/10 text-error"
                      : a.nivelRiesgo === "medio"
                        ? "bg-warning/10 text-warning"
                        : "bg-success/10 text-success"

                  return (
                    <TableRow
                      key={a.id}
                      className={a.nivelRiesgo === "alto" && !a.resuelta ? riesgo.bg : ""}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className={`text-xs ${avatarColor}`}>
                              {iniciales}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">
                              {a.participante
                                ? `${a.participante.nombre} ${a.participante.apellidos}`
                                : "—"}
                            </p>
                            <p className="text-xs text-foreground-muted">
                              {a.participante?.cedula ?? "—"}
                              {a.pais ? ` · ${a.pais.nombre}` : ""}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <TipoIcon className="h-4 w-4 text-foreground-muted flex-shrink-0" />
                          <div>
                            <p className="font-medium text-sm text-foreground">
                              {tipo.label}
                            </p>
                            <p className="text-xs text-foreground-muted max-w-[280px] truncate">
                              {a.descripcion}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={riesgo.variant}>
                          {riesgo.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">
                          {new Date(a.creadoEn).toLocaleDateString("es-CR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-xs text-foreground-muted">
                          {new Date(a.creadoEn).toLocaleTimeString("es-CR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </TableCell>
                      <TableCell>
                        {a.resuelta ? (
                          <Badge variant="outline">Resuelta</Badge>
                        ) : (
                          <Badge variant="error">Pendiente</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {!a.resuelta ? (
                          <div className="flex items-center justify-end gap-2">
                            {a.nivelRiesgo === "alto" && (
                              <Button
                                size="sm"
                                variant="default"
                                className="h-8 bg-error hover:bg-error/90"
                              >
                                <ShieldX className="h-3.5 w-3.5 mr-1" />
                                Bloquear
                              </Button>
                            )}
                            {a.nivelRiesgo === "medio" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 border-warning/40 text-warning hover:bg-warning/5"
                              >
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                Revisar
                              </Button>
                            )}
                            {a.nivelRiesgo === "bajo" && a.tipo === "limite_referidos" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 border-success/40 text-success hover:bg-success/5"
                              >
                                <Users className="h-3.5 w-3.5 mr-1" />
                                Aumentar Límite
                              </Button>
                            )}
                            <Link href={`/fraude/${a.id}`}>
                              <Button variant="outline" size="sm" className="h-8">
                                <Shield className="h-3.5 w-3.5 mr-1" />
                                Investigar
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          <span className="text-sm text-foreground-muted">
                            Sin acciones
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between px-6 py-4 border-t border-border text-sm text-foreground-muted">
            <span>
              Mostrando {filtradas.length} de {data.length} alertas
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
