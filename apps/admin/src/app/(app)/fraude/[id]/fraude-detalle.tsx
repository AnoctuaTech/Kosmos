"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import {
  alertasFraude,
  participantes,
  paises,
} from "@kosmos/mock-data"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
  Separator,
} from "@kosmos/ui"
import {
  ArrowLeft,
  ShieldAlert,
  User,
  Mail,
  CreditCard,
  MapPin,
  Clock,
  Wifi,
  Users,
  ShieldCheck,
  ShieldX,
  Flag,
} from "lucide-react"

const actividadSospechosa = [
  {
    fecha: "18 Feb 2026, 14:22",
    descripcion: "Inicio de sesión desde IP 192.168.1.45 (Costa Rica)",
    tipo: "login",
  },
  {
    fecha: "18 Feb 2026, 14:25",
    descripcion: "Completó evaluación en 45 segundos (promedio: 8 min)",
    tipo: "anomalía",
  },
  {
    fecha: "17 Feb 2026, 09:10",
    descripcion: "Inicio de sesión desde IP 10.0.0.12 (Panamá)",
    tipo: "login",
  },
  {
    fecha: "16 Feb 2026, 20:33",
    descripcion: "Intento de canje por 5,000 puntos rechazado por saldo insuficiente",
    tipo: "canje",
  },
]

export default function FraudeDetallePage() {
  const params = useParams()
  const alerta = alertasFraude.find((a) => a.id === params.id)

  if (!alerta) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <ShieldAlert className="h-12 w-12 text-foreground-muted mb-4" />
        <h2 className="text-lg font-medium text-foreground mb-1">
          Alerta no encontrada
        </h2>
        <p className="text-sm text-foreground-muted mb-4">
          La alerta solicitada no existe o fue eliminada.
        </p>
        <Link href="/fraude">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver a Alertas
          </Button>
        </Link>
      </div>
    )
  }

  const participante = participantes.find((p) => p.id === alerta.participanteId)
  const pais = participante
    ? paises.find((p) => p.id === participante.paisId)
    : null

  const riesgoConfig: Record<string, { label: string; variant: "error" | "warning" | "success" }> = {
    alto: { label: "ALTO RIESGO", variant: "error" },
    medio: { label: "RIESGO MEDIO", variant: "warning" },
    bajo: { label: "RIESGO BAJO", variant: "success" },
  }

  const tipoLabels: Record<string, string> = {
    ip_duplicada: "IP Duplicada",
    tiempo_respuesta: "Tiempo de Respuesta Anómalo",
    limite_referidos: "Límite de Referidos Excedido",
  }

  const riesgo = riesgoConfig[alerta.nivelRiesgo]

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/fraude">
          <Button variant="outline" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">
              Investigación de Alerta
            </h1>
            <Badge variant={riesgo.variant}>{riesgo.label}</Badge>
          </div>
          <p className="mt-1 text-sm text-foreground-secondary">
            {alerta.id} · Detectada el{" "}
            {new Date(alerta.creadoEn).toLocaleDateString("es-CR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_320px] gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Detalles de la Alerta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-foreground-muted mb-1">Tipo</p>
                  <p className="text-sm font-medium">
                    {tipoLabels[alerta.tipo] || alerta.tipo}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-foreground-muted mb-1">Nivel de Riesgo</p>
                  <Badge variant={riesgo.variant}>{riesgo.label}</Badge>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-foreground-muted mb-1">Descripción</p>
                  <p className="text-sm">{alerta.descripcion}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground-muted mb-1">Fecha de Detección</p>
                  <p className="text-sm">
                    {new Date(alerta.creadoEn).toLocaleDateString("es-CR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-foreground-muted mb-1">Estado</p>
                  {alerta.resuelta ? (
                    <Badge variant="outline">Resuelta</Badge>
                  ) : (
                    <Badge variant="error">Pendiente</Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Historial de Actividad Sospechosa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-0 divide-y divide-border">
                {actividadSospechosa.map((act, i) => (
                  <div key={i} className="flex items-start gap-3 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background-gray mt-0.5">
                      {act.tipo === "login" && <Wifi className="h-4 w-4 text-foreground-muted" />}
                      {act.tipo === "anomalía" && <Clock className="h-4 w-4 text-warning" />}
                      {act.tipo === "canje" && <ShieldAlert className="h-4 w-4 text-error" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        {act.descripcion}
                      </p>
                      <p className="text-xs text-foreground-muted mt-0.5">
                        {act.fecha}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-3">
            <Button className="bg-success hover:bg-success/90 text-white">
              <ShieldCheck className="h-4 w-4 mr-2" />
              Limpiar Alerta
            </Button>
            <Button variant="outline" className="text-error border-error/30 hover:bg-error/5">
              <ShieldX className="h-4 w-4 mr-2" />
              Suspender Usuario
            </Button>
            <Button variant="outline">
              <Flag className="h-4 w-4 mr-2" />
              Falso Positivo
            </Button>
          </div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Perfil del Participante</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {participante ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                      {participante.nombre.charAt(0)}{participante.apellidos.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {participante.nombre} {participante.apellidos}
                      </p>
                      <Badge
                        variant={
                          participante.estado === "activo" ? "success" : "error"
                        }
                      >
                        {participante.estado === "activo"
                          ? "Activo"
                          : participante.estado === "bloqueado"
                            ? "Bloqueado"
                            : "Inactivo"}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CreditCard className="h-4 w-4 text-foreground-muted mt-0.5" />
                      <div>
                        <p className="text-xs text-foreground-muted">Cédula</p>
                        <p className="text-sm font-medium">{participante.cedula}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-4 w-4 text-foreground-muted mt-0.5" />
                      <div>
                        <p className="text-xs text-foreground-muted">Email</p>
                        <p className="text-sm font-medium">{participante.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-foreground-muted mt-0.5" />
                      <div>
                        <p className="text-xs text-foreground-muted">País</p>
                        <p className="text-sm font-medium">{pais?.nombre ?? "—"}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="h-4 w-4 text-foreground-muted mt-0.5" />
                      <div>
                        <p className="text-xs text-foreground-muted">NSE</p>
                        <p className="text-sm font-medium">
                          {participante.nseNivel.toUpperCase()} ({participante.nseScore} pts)
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-foreground-muted">
                  Participante no encontrado
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
