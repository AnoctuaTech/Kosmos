"use client"

import { useParams } from "next/navigation"
import { plantillas } from "@kosmos/mock-data"
import { Badge } from "@kosmos/ui"
import { GitBranch } from "lucide-react"

const accionLabels: Record<string, string> = {
  saltar_a: "Saltar a pregunta",
  terminar_encuesta: "Terminar encuesta",
  ocultar_pregunta: "Ocultar pregunta",
}

export default function ReglasPage() {
  const params = useParams()
  const plantilla = plantillas.find((p) => p.id === params.id)

  if (!plantilla) return null

  const reglas = plantilla.reglas

  return (
    <div className="p-6">
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Reglas de Lógica
            </h2>
            <p className="text-sm text-foreground-secondary mt-1">
              Configurá condiciones para controlar el flujo de la encuesta
            </p>
          </div>
        </div>

        {reglas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background-gray mb-4">
              <GitBranch className="h-6 w-6 text-foreground-muted" />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-1">
              Sin reglas configuradas
            </h3>
            <p className="text-sm text-foreground-muted max-w-sm">
              Esta plantilla no tiene reglas de lógica. Las reglas permiten
              saltar preguntas o terminar la encuesta según las respuestas.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {reglas.map((regla) => {
              const preguntaOrigen = plantilla.preguntas.find(
                (p) => p.id === regla.preguntaOrigenId
              )
              const preguntaDestino = regla.preguntaDestinoId
                ? plantilla.preguntas.find(
                    (p) => p.id === regla.preguntaDestinoId
                  )
                : null

              return (
                <div
                  key={regla.id}
                  className="rounded border border-border p-4 bg-white"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary/5">
                      <GitBranch className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Si</span>{" "}
                        <span className="text-primary">
                          P{preguntaOrigen?.orden}
                        </span>{" "}
                        {regla.condicion}{" "}
                        <span className="font-medium">
                          &quot;{regla.valorCondicion}&quot;
                        </span>
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="primary">
                          {accionLabels[regla.accion] || regla.accion}
                        </Badge>
                        {preguntaDestino && (
                          <span className="text-xs text-foreground-muted">
                            → P{preguntaDestino.orden}:{" "}
                            {preguntaDestino.texto.slice(0, 50)}...
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
