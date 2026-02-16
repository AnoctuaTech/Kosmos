"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { plantillas } from "@kosmos/mock-data"
import {
  Input,
  Label,
  Textarea,
  Badge,
  Switch,
  ChipSelector,
} from "@kosmos/ui"
import {
  Settings,
  ImageIcon,
  Gift,
  Calendar,
  MessageSquare,
  Target,
  Upload,
} from "lucide-react"

const secciones = [
  { id: "general", label: "General", icon: Settings },
  { id: "imagen", label: "Imagen", icon: ImageIcon },
  { id: "incentivo", label: "Incentivo", icon: Gift },
  { id: "programar", label: "Programación", icon: Calendar },
  { id: "confirmacion", label: "Confirmación", icon: MessageSquare },
  { id: "segmento", label: "Segmento", icon: Target },
]

export default function ConfiguracionPage() {
  const params = useParams()
  const plantilla = plantillas.find((p) => p.id === params.id)
  const [activeSection, setActiveSection] = useState("general")

  const [selectedNSE, setSelectedNSE] = useState<string[]>(["Medio"])
  const [selectedEdades, setSelectedEdades] = useState<string[]>([
    "25-34",
    "35-44",
  ])
  const [selectedGenero, setSelectedGenero] = useState<string[]>(["Todos"])
  const [puntosIncentivo, setPuntosIncentivo] = useState("50")
  const [tiempoEstimado, setTiempoEstimado] = useState("8")
  const [fechaLanzamiento, setFechaLanzamiento] = useState("2026-03-01")
  const [fechaCierre, setFechaCierre] = useState("2026-04-01")
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState(
    "¡Gracias por completar la encuesta! Tus respuestas han sido registradas exitosamente. Los puntos se acreditarán a tu billetera en los próximos minutos."
  )
  const [autoClose, setAutoClose] = useState(true)

  if (!plantilla) return null

  return (
    <div className="flex h-full">
      <div className="w-[200px] shrink-0 border-r border-border bg-background-gray/50 p-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-3">
          Secciones
        </h3>
        <div className="flex flex-col gap-1">
          {secciones.map((seccion) => (
            <button
              key={seccion.id}
              onClick={() => setActiveSection(seccion.id)}
              className={`flex items-center gap-2 rounded px-3 py-2 text-sm transition-colors text-left ${
                activeSection === seccion.id
                  ? "bg-white border border-border text-foreground font-medium shadow-sm"
                  : "text-foreground-secondary hover:bg-white border border-transparent"
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
          {activeSection === "general" && (
            <div>
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
                      {new Date(plantilla.creadoEn).toLocaleDateString(
                        "es-CR",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Resumen</Label>
                  <div className="rounded border border-border p-4 bg-background-gray/50 text-sm text-foreground-secondary">
                    <p>
                      {plantilla.preguntas.length} preguntas configuradas
                    </p>
                    <p className="mt-1">
                      {plantilla.reglas.length} reglas de lógica
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "imagen" && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Imagen de Portada
              </h2>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label>Imagen principal</Label>
                  <p className="text-xs text-foreground-muted">
                    Se mostrará en el catálogo de estudios disponibles para los
                    participantes
                  </p>
                  <div className="mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-12 bg-background-gray/30 hover:border-foreground-muted transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-foreground-muted mb-3" />
                    <p className="text-sm font-medium text-foreground">
                      Arrastrá o hacé clic para subir
                    </p>
                    <p className="text-xs text-foreground-muted mt-1">
                      PNG, JPG hasta 2MB. Recomendado: 800x400px
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "incentivo" && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Incentivo para Participantes
              </h2>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label>Puntos por completar</Label>
                  <p className="text-xs text-foreground-muted">
                    Puntos que recibe el participante al finalizar la encuesta
                  </p>
                  <Input
                    type="number"
                    value={puntosIncentivo}
                    onChange={(e) => setPuntosIncentivo(e.target.value)}
                    className="w-[200px]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Tiempo estimado (minutos)</Label>
                  <p className="text-xs text-foreground-muted">
                    Tiempo aproximado para completar la encuesta
                  </p>
                  <Input
                    type="number"
                    value={tiempoEstimado}
                    onChange={(e) => setTiempoEstimado(e.target.value)}
                    className="w-[200px]"
                  />
                </div>
                <div className="rounded border border-border p-4 bg-background-gray/50">
                  <p className="text-sm text-foreground-secondary">
                    Relación puntos/minuto:{" "}
                    <span className="font-medium text-foreground">
                      {(
                        parseInt(puntosIncentivo) / parseInt(tiempoEstimado) ||
                        0
                      ).toFixed(1)}{" "}
                      pts/min
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "programar" && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Programación
              </h2>
              <div className="flex flex-col gap-5">
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 flex-1">
                    <Label>Fecha de lanzamiento</Label>
                    <Input
                      type="date"
                      value={fechaLanzamiento}
                      onChange={(e) => setFechaLanzamiento(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <Label>Fecha de cierre</Label>
                    <Input
                      type="date"
                      value={fechaCierre}
                      onChange={(e) => setFechaCierre(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between rounded border border-border p-4">
                  <div>
                    <Label>Cierre automático</Label>
                    <p className="text-xs text-foreground-muted mt-0.5">
                      Cerrar automáticamente al alcanzar el volumen objetivo
                    </p>
                  </div>
                  <Switch
                    checked={autoClose}
                    onCheckedChange={setAutoClose}
                  />
                </div>
                <div className="rounded border border-border p-4 bg-background-gray/50">
                  <p className="text-sm text-foreground-secondary">
                    Duración estimada:{" "}
                    <span className="font-medium text-foreground">
                      {Math.ceil(
                        (new Date(fechaCierre).getTime() -
                          new Date(fechaLanzamiento).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      días
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "confirmacion" && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Mensaje de Confirmación
              </h2>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <Label>Mensaje al finalizar</Label>
                  <p className="text-xs text-foreground-muted">
                    Se muestra al participante cuando completa la encuesta
                    exitosamente
                  </p>
                  <Textarea
                    value={mensajeConfirmacion}
                    onChange={(e) => setMensajeConfirmacion(e.target.value)}
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Vista previa</Label>
                  <div className="mt-2 rounded-lg border border-border p-6 bg-white text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                      <span className="text-2xl">✓</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      ¡Encuesta completada!
                    </h3>
                    <p className="text-sm text-foreground-secondary mt-2 max-w-sm mx-auto">
                      {mensajeConfirmacion}
                    </p>
                    <p className="text-sm font-medium text-primary mt-3">
                      +{puntosIncentivo} puntos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "segmento" && (
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Segmento Objetivo
              </h2>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Nivel Socioeconómico</Label>
                  <p className="text-xs text-foreground-muted">
                    Seleccioná los niveles NSE para esta plantilla
                  </p>
                  <ChipSelector
                    options={["Alto", "Medio", "Bajo"]}
                    selected={selectedNSE}
                    onChange={setSelectedNSE}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Rango de Edad</Label>
                  <p className="text-xs text-foreground-muted">
                    Seleccioná los rangos etarios objetivo
                  </p>
                  <ChipSelector
                    options={[
                      "18-24",
                      "25-34",
                      "35-44",
                      "45-54",
                      "55-64",
                      "65+",
                    ]}
                    selected={selectedEdades}
                    onChange={setSelectedEdades}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Género</Label>
                  <ChipSelector
                    options={["Todos", "Masculino", "Femenino"]}
                    selected={selectedGenero}
                    onChange={setSelectedGenero}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>País</Label>
                  <ChipSelector
                    options={["Costa Rica", "Panamá", "Guatemala"]}
                    selected={["Costa Rica"]}
                    onChange={() => {}}
                  />
                </div>

                <div className="rounded border border-border p-4 bg-background-gray/50">
                  <p className="text-sm font-medium text-foreground mb-1">
                    Resumen del segmento
                  </p>
                  <p className="text-sm text-foreground-secondary">
                    NSE: {selectedNSE.join(", ") || "Sin seleccionar"} ·
                    Edades: {selectedEdades.join(", ") || "Sin seleccionar"} ·
                    Género: {selectedGenero.join(", ") || "Sin seleccionar"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
