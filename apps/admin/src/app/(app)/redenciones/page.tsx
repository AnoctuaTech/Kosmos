"use client"

import { useState, useMemo } from "react"
import {
  redenciones,
  participantes,
  premios,
  paises,
} from "@kosmos/mock-data"
import type { Redencion } from "@kosmos/types"
import {
  KPICard,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
  Input,
  Textarea,
  Tabs,
  TabsList,
  TabsTrigger,
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
  Clock,
  Loader2,
  CheckCircle2,
  DollarSign,
  Download,
  Search,
  Check,
  Eye,
  X,
  Paperclip,
  FileText,
} from "lucide-react"

type TabKey = "pendientes" | "en_proceso" | "historial"

const estadosPendientes: Redencion["estado"][] = ["pendiente", "en_revision"]
const estadosEnProceso: Redencion["estado"][] = ["aprobada", "procesando"]
const estadosHistorial: Redencion["estado"][] = ["pagada", "rechazada"]

function getRedencionesEnriquecidas() {
  return redenciones.map((r) => {
    const participante = participantes.find((p) => p.id === r.participanteId)
    const premio = premios.find((p) => p.id === r.premioId)
    const pais = participante
      ? paises.find((p) => p.id === participante.paisId)
      : null
    return { ...r, participante, premio, pais }
  })
}

function getPrioridad(redencion: Redencion) {
  const diasPendiente = Math.floor(
    (Date.now() - new Date(redencion.solicitadoEn).getTime()) /
      (1000 * 60 * 60 * 24)
  )
  if (diasPendiente > 7) return "alta"
  if (diasPendiente > 3) return "media"
  return "baja"
}

type RedencionEnriquecida = ReturnType<typeof getRedencionesEnriquecidas>[number]

export default function RedencionesPage() {
  const [tab, setTab] = useState<TabKey>("pendientes")
  const [busqueda, setBusqueda] = useState("")
  const [modalRedencion, setModalRedencion] = useState<RedencionEnriquecida | null>(null)
  const [observaciones, setObservaciones] = useState("")
  const [archivoAdjunto, setArchivoAdjunto] = useState(false)
  const [bannerExito, setBannerExito] = useState(false)

  const data = useMemo(() => getRedencionesEnriquecidas(), [])

  const pendientes = data
    .filter((r) => estadosPendientes.includes(r.estado))
    .sort((a, b) => new Date(a.solicitadoEn).getTime() - new Date(b.solicitadoEn).getTime())
  const enProceso = data.filter((r) => estadosEnProceso.includes(r.estado))
  const historial = data.filter((r) => estadosHistorial.includes(r.estado))

  const montoPendiente = [...pendientes, ...enProceso].reduce((sum, r) => {
    const premio = r.premio
    return sum + (premio?.valorMonetario ?? 0)
  }, 0)

  const filtradas = useMemo(() => {
    let lista: typeof data = []
    if (tab === "pendientes") lista = pendientes
    else if (tab === "en_proceso") lista = enProceso
    else lista = historial

    if (!busqueda) return lista
    const q = busqueda.toLowerCase()
    return lista.filter(
      (r) =>
        r.participante?.nombre.toLowerCase().includes(q) ||
        r.participante?.apellidos.toLowerCase().includes(q) ||
        r.participante?.cedula.toLowerCase().includes(q) ||
        r.participante?.email.toLowerCase().includes(q)
    )
  }, [tab, busqueda, data])

  function handleAprobar() {
    setModalRedencion(null)
    setObservaciones("")
    setArchivoAdjunto(false)
    setBannerExito(true)
    setTimeout(() => setBannerExito(false), 5000)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Cola de Redenciones
          </h1>
          <p className="mt-1 text-sm text-foreground-secondary">
            Aprobación manual de pagos y gestión de canjes
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exportar a Excel
        </Button>
      </div>

      {bannerExito && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-success/30 bg-success/5 px-4 py-3">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <span className="text-sm font-medium text-foreground">
              Redención aprobada. Puntos deducidos. Notificación enviada.
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setBannerExito(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Pendientes de Revisión"
          value={pendientes.length}
          subtitle="Solicitudes sin revisar"
          icon={<Clock className="h-5 w-5 text-warning" />}
          className="border-l-4 border-l-warning"
        />
        <KPICard
          title="En Proceso"
          value={enProceso.length}
          subtitle="Aprobadas, pendiente de pago"
          icon={<Loader2 className="h-5 w-5 text-primary" />}
          className="border-l-4 border-l-primary"
        />
        <KPICard
          title="Completadas (Mes)"
          value={historial.filter((r) => r.estado === "pagada").length}
          subtitle="Pagos realizados"
          icon={<CheckCircle2 className="h-5 w-5 text-success" />}
          className="border-l-4 border-l-success"
        />
        <KPICard
          title="Monto Pendiente"
          value={`$${montoPendiente.toLocaleString()}`}
          subtitle="Total por dispersar"
          icon={<DollarSign className="h-5 w-5 text-error" />}
          className="border-l-4 border-l-error"
        />
      </div>

      {modalRedencion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Revisión de Redención
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setModalRedencion(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="rounded-lg border border-border p-4 bg-background-gray/50">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-foreground-muted">Participante</p>
                    <p className="font-medium">
                      {modalRedencion.participante
                        ? `${modalRedencion.participante.nombre} ${modalRedencion.participante.apellidos}`
                        : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-foreground-muted">Cédula</p>
                    <p className="font-medium">
                      {modalRedencion.participante?.cedula ?? "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-foreground-muted">Premio</p>
                    <p className="font-medium">
                      {modalRedencion.premio?.titulo ?? "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-foreground-muted">Monto</p>
                    <p className="font-semibold">
                      {modalRedencion.premio
                        ? `${modalRedencion.premio.moneda === "CRC" ? "₡" : "$"}${modalRedencion.premio.valorMonetario.toLocaleString()}`
                        : "—"}
                      <span className="font-normal text-foreground-muted ml-1">
                        ({modalRedencion.puntosCosto.toLocaleString()} pts)
                      </span>
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-foreground-muted">Datos Bancarios</p>
                    <p className="font-medium">
                      {modalRedencion.datosBancarios.tipo === "sinpe"
                        ? `SINPE: ${modalRedencion.datosBancarios.cuenta}`
                        : `${modalRedencion.datosBancarios.banco} — ${modalRedencion.datosBancarios.cuenta}`}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Observaciones al usuario
                </label>
                <Textarea
                  placeholder="Notas internas o mensaje para el participante..."
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  rows={3}
                />
              </div>

              <div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setArchivoAdjunto(!archivoAdjunto)}
                >
                  <Paperclip className="h-3.5 w-3.5 mr-1.5" />
                  Adjuntar comprobante
                </Button>
                {archivoAdjunto && (
                  <div className="mt-2 flex items-center gap-2 rounded border border-border px-3 py-2 bg-background-gray/50">
                    <FileText className="h-4 w-4 text-foreground-muted" />
                    <span className="text-sm text-foreground">comprobante_pago.pdf</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-auto"
                      onClick={() => setArchivoAdjunto(false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                className="text-error border-error/30 hover:bg-error/5"
                onClick={() => setModalRedencion(null)}
              >
                Rechazar
              </Button>
              <Button
                className="bg-success hover:bg-success/90 text-white"
                onClick={handleAprobar}
              >
                <Check className="h-4 w-4 mr-1.5" />
                Aprobar
              </Button>
            </div>
          </div>
        </div>
      )}

      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between w-full">
            <CardTitle className="text-base">Solicitudes de Canje</CardTitle>
            <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
              <TabsList>
                <TabsTrigger value="pendientes">
                  Pendientes ({pendientes.length})
                </TabsTrigger>
                <TabsTrigger value="en_proceso">
                  En Proceso ({enProceso.length})
                </TabsTrigger>
                <TabsTrigger value="historial">Historial</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0 mt-4">
          <div className="flex items-center gap-3 px-6 pb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
              <Input
                placeholder="Buscar por cédula o email..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Usuario</TableHead>
                <TableHead>Premio</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead>Datos Bancarios</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtradas.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-24 text-center text-foreground-muted"
                  >
                    No hay solicitudes en esta categoría
                  </TableCell>
                </TableRow>
              ) : (
                filtradas.map((r) => {
                  const prioridad = getPrioridad(r)
                  const iniciales = r.participante
                    ? `${r.participante.nombre.charAt(0)}${r.participante.apellidos.charAt(0)}`
                    : "??"
                  return (
                    <TableRow key={r.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {iniciales}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">
                              {r.participante
                                ? `${r.participante.nombre} ${r.participante.apellidos}`
                                : "—"}
                            </p>
                            <p className="text-xs text-foreground-muted">
                              {r.participante?.cedula ?? "—"}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">
                          {r.premio?.titulo ?? "—"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="font-semibold text-foreground">
                          {r.premio
                            ? `${r.premio.moneda === "CRC" ? "₡" : "$"}${r.premio.valorMonetario.toLocaleString()}`
                            : "—"}
                        </span>
                        <p className="text-xs text-foreground-muted">
                          {r.puntosCosto.toLocaleString()} pts
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-medium">
                          {r.datosBancarios.tipo === "sinpe"
                            ? `SINPE: ${r.datosBancarios.cuenta}`
                            : `Cta: ${r.datosBancarios.cuenta.slice(0, 12)}...`}
                        </p>
                        {r.datosBancarios.banco && (
                          <p className="text-xs text-foreground-muted">
                            {r.datosBancarios.banco}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">
                          {new Date(r.solicitadoEn).toLocaleDateString("es-CR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-xs text-foreground-muted">
                          {new Date(r.solicitadoEn).toLocaleTimeString("es-CR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            prioridad === "alta"
                              ? "error"
                              : prioridad === "media"
                                ? "warning"
                                : "default"
                          }
                        >
                          {prioridad.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={r.estado === "en_revision" ? "en_proceso" : r.estado} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {(r.estado === "pendiente" ||
                            r.estado === "en_revision") && (
                            <Button
                              size="sm"
                              className="h-8"
                              onClick={() => setModalRedencion(r)}
                            >
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              Revisar
                            </Button>
                          )}
                          {(r.estado === "aprobada" ||
                            r.estado === "procesando") && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 text-success border-success/30 hover:bg-success/5"
                            >
                              <Check className="h-3.5 w-3.5 mr-1" />
                              Confirmar Pago
                            </Button>
                          )}
                          {r.estado === "pagada" && (
                            <Button variant="outline" size="sm" className="h-8">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              Ver Detalle
                            </Button>
                          )}
                          {r.estado === "rechazada" && (
                            <Badge variant="error">Rechazada</Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between px-6 py-4 border-t border-border text-sm text-foreground-muted">
            <span>
              Mostrando {filtradas.length} solicitudes
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
