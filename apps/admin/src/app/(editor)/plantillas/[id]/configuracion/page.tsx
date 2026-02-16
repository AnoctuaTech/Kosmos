"use client"

import { useParams } from "next/navigation"
import { plantillas } from "@kosmos/mock-data"
import { Input, Label, Textarea, Badge } from "@kosmos/ui"
import { Settings, Image, Calendar, MessageSquare } from "lucide-react"

const secciones = [
  { id: "general", label: "General", icon: Settings },
  { id: "imagen", label: "Imagen", icon: Image },
  { id: "programar", label: "Programación", icon: Calendar },
  { id: "confirmacion", label: "Mensaje de Confirmación", icon: MessageSquare },
]

export default function ConfiguracionPage() {
  const params = useParams()
  const plantilla = plantillas.find((p) => p.id === params.id)

  if (!plantilla) return null

  return (
    <div className="flex h-full">
      <div className="w-[200px] shrink-0 border-r border-border bg-background-gray/50 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-3">
          Secciones
        </h3>
        <div className="flex flex-col gap-1">
          {secciones.map((seccion, i) => (
            <button
              key={seccion.id}
              className={`flex items-center gap-2 rounded px-3 py-2 text-sm transition-colors text-left ${
                i === 0
                  ? "bg-white border border-border text-foreground font-medium shadow-sm"
                  : "text-foreground-secondary hover:bg-white"
              }`}
            >
              <seccion.icon className="h-4 w-4 shrink-0" />
              {seccion.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-xl">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Configuración General
          </h2>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label>Nombre de la plantilla</Label>
              <Input defaultValue={plantilla.nombre} />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Descripción</Label>
              <Textarea defaultValue={plantilla.descripcion} rows={3} />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Estado</Label>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    plantilla.estado === "publicada" ? "success" : "warning"
                  }
                >
                  {plantilla.estado.charAt(0).toUpperCase() +
                    plantilla.estado.slice(1)}
                </Badge>
                <span className="text-xs text-foreground-muted">
                  Creada el{" "}
                  {new Date(plantilla.creadoEn).toLocaleDateString("es-CR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Preguntas</Label>
              <p className="text-sm text-foreground-secondary">
                {plantilla.preguntas.length} preguntas configuradas
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Reglas de lógica</Label>
              <p className="text-sm text-foreground-secondary">
                {plantilla.reglas.length} reglas configuradas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
