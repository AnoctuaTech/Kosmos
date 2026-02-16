import { Badge } from "./badge"
import type { BadgeProps } from "./badge"

const statusConfig: Record<string, { label: string; variant: NonNullable<BadgeProps["variant"]> }> = {
  publicada: { label: "Publicada", variant: "success" },
  borrador: { label: "Borrador", variant: "warning" },
  archivada: { label: "Archivada", variant: "default" },
  activo: { label: "Activo", variant: "success" },
  pausado: { label: "Pausado", variant: "warning" },
  finalizado: { label: "Finalizado", variant: "primary" },
  programado: { label: "Programado", variant: "primary" },
  pendiente: { label: "Pendiente", variant: "warning" },
  aprobada: { label: "Aprobada", variant: "success" },
  rechazada: { label: "Rechazada", variant: "error" },
  en_proceso: { label: "En Proceso", variant: "primary" },
  completada: { label: "Completada", variant: "success" },
}

export function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || { label: status, variant: "default" as const }
  return <Badge variant={config.variant}>{config.label}</Badge>
}
