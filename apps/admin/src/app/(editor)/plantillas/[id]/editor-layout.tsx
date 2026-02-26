"use client"

import { useParams, usePathname } from "next/navigation"
import Link from "next/link"
import { plantillas } from "@kosmos/mock-data"
import { Button, StatusBadge } from "@kosmos/ui"
import { ArrowLeft, Save, Eye } from "lucide-react"

const tabs = [
  { label: "Preguntas", segment: "preguntas" },
  { label: "Reglas de Lógica", segment: "reglas" },
  { label: "Configuración", segment: "configuracion" },
]

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const pathname = usePathname()

  const plantilla = params.id === "nueva"
    ? {
        id: "nueva",
        nombre: "Nueva Plantilla",
        estado: "borrador" as const,
        descripcion: "",
        categoriaId: "",
        preguntas: [],
        reglas: [],
        creadoEn: new Date().toISOString(),
        ultimaEdicion: new Date().toISOString(),
      }
    : plantillas.find((p) => p.id === params.id)

  if (!plantilla) {
    return (
      <div className="flex h-screen items-center justify-center text-foreground-muted">
        Plantilla no encontrada
      </div>
    )
  }

  const activeSegment = pathname.split("/").pop()

  return (
    <div className="flex h-screen flex-col bg-white">
      <div className="flex items-center justify-between border-b border-border px-5 h-14 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/plantillas"
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-foreground-secondary hover:text-foreground hover:bg-background-gray transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Plantillas
          </Link>
          <div className="h-5 w-px bg-border" />
          <h1 className="text-sm font-semibold text-foreground">
            {plantilla.nombre}
          </h1>
          <StatusBadge status={plantilla.estado} />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="mr-1.5 h-3.5 w-3.5" />
            Vista previa
          </Button>
          <Button size="sm">
            <Save className="mr-1.5 h-3.5 w-3.5" />
            Guardar
          </Button>
        </div>
      </div>

      <div className="flex border-b border-border px-5 shrink-0">
        {tabs.map((tab) => (
          <Link
            key={tab.segment}
            href={`/plantillas/${params.id}/${tab.segment}`}
            className={`relative px-4 py-2.5 text-sm font-medium transition-all duration-200 -mb-px ${
              activeSegment === tab.segment
                ? "text-primary"
                : "text-foreground-secondary hover:text-foreground"
            }`}
          >
            {tab.label}
            {activeSegment === tab.segment && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
            )}
          </Link>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
