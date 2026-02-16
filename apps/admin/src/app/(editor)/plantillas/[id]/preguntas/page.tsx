"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { plantillas } from "@kosmos/mock-data"
import type { Pregunta, TipoPregunta } from "@kosmos/types"
import {
  Button,
  Input,
  Label,
  Textarea,
  Switch,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@kosmos/ui"
import {
  Plus,
  Trash2,
  GripVertical,
  CircleDot,
  CheckSquare,
  Gauge,
  ListOrdered,
  AlignLeft,
} from "lucide-react"

const tipoIcons: Record<TipoPregunta, React.ComponentType<{ className?: string }>> = {
  seleccion_unica: CircleDot,
  seleccion_multiple: CheckSquare,
  escala: Gauge,
  ranking: ListOrdered,
  texto_abierto: AlignLeft,
}

const tipoLabels: Record<TipoPregunta, string> = {
  seleccion_unica: "Selección única",
  seleccion_multiple: "Selección múltiple",
  escala: "Escala",
  ranking: "Ranking",
  texto_abierto: "Texto abierto",
}

export default function PreguntasPage() {
  const params = useParams()
  const plantilla = plantillas.find((p) => p.id === params.id)

  const [preguntas, setPreguntas] = useState<Pregunta[]>(
    plantilla?.preguntas || []
  )
  const [selectedId, setSelectedId] = useState<string | null>(
    preguntas[0]?.id || null
  )

  const selected = preguntas.find((p) => p.id === selectedId)

  function updatePregunta(id: string, updates: Partial<Pregunta>) {
    setPreguntas((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    )
  }

  function addPregunta() {
    const newId = `prg-new-${Date.now()}`
    const nueva: Pregunta = {
      id: newId,
      plantillaId: plantilla?.id || "",
      tipo: "seleccion_unica",
      texto: "Nueva pregunta",
      opciones: ["Opción 1", "Opción 2"],
      requerida: true,
      orden: preguntas.length + 1,
    }
    setPreguntas((prev) => [...prev, nueva])
    setSelectedId(newId)
  }

  function deletePregunta(id: string) {
    setPreguntas((prev) => {
      const filtered = prev.filter((p) => p.id !== id)
      if (selectedId === id) {
        setSelectedId(filtered[0]?.id || null)
      }
      return filtered.map((p, i) => ({ ...p, orden: i + 1 }))
    })
  }

  function addOption(preguntaId: string) {
    const pregunta = preguntas.find((p) => p.id === preguntaId)
    if (!pregunta) return
    updatePregunta(preguntaId, {
      opciones: [
        ...(pregunta.opciones || []),
        `Opción ${(pregunta.opciones?.length || 0) + 1}`,
      ],
    })
  }

  function updateOption(preguntaId: string, index: number, value: string) {
    const pregunta = preguntas.find((p) => p.id === preguntaId)
    if (!pregunta?.opciones) return
    const newOpciones = [...pregunta.opciones]
    newOpciones[index] = value
    updatePregunta(preguntaId, { opciones: newOpciones })
  }

  function removeOption(preguntaId: string, index: number) {
    const pregunta = preguntas.find((p) => p.id === preguntaId)
    if (!pregunta?.opciones) return
    updatePregunta(preguntaId, {
      opciones: pregunta.opciones.filter((_, i) => i !== index),
    })
  }

  if (!plantilla) {
    return (
      <div className="flex h-full items-center justify-center text-foreground-muted">
        Plantilla no encontrada
      </div>
    )
  }

  return (
    <div className="flex h-full">
      <div className="w-[280px] shrink-0 border-r border-border bg-background-gray/30 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-3">
            Preguntas ({preguntas.length})
          </h3>
          <div className="flex flex-col gap-1">
            {preguntas.map((p) => {
              const Icon = tipoIcons[p.tipo]
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`flex items-start gap-2 rounded px-3 py-2.5 text-left transition-colors ${
                    selectedId === p.id
                      ? "bg-white border border-primary/20 shadow-sm"
                      : "hover:bg-white border border-transparent"
                  }`}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-background-gray text-[10px] font-semibold text-foreground-muted mt-0.5">
                    {p.orden}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <Icon className="h-3 w-3 text-foreground-muted shrink-0" />
                      <span className="text-[10px] text-foreground-muted">
                        {tipoLabels[p.tipo]}
                      </span>
                    </div>
                    <p className="text-xs text-foreground line-clamp-2">
                      {p.texto}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3"
            onClick={addPregunta}
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Agregar pregunta
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {selected ? (
          <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                Pregunta {selected.orden}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-error hover:text-error hover:bg-error/5"
                onClick={() => deletePregunta(selected.id)}
              >
                <Trash2 className="mr-1 h-3.5 w-3.5" />
                Eliminar
              </Button>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label>Tipo de pregunta</Label>
                <Select
                  value={selected.tipo}
                  onValueChange={(v: string) =>
                    updatePregunta(selected.id, {
                      tipo: v as TipoPregunta,
                      opciones:
                        v === "texto_abierto" || v === "escala"
                          ? undefined
                          : selected.opciones || ["Opción 1", "Opción 2"],
                      escalaMin:
                        v === "escala"
                          ? selected.escalaMin || 1
                          : undefined,
                      escalaMax:
                        v === "escala"
                          ? selected.escalaMax || 10
                          : undefined,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(Object.entries(tipoLabels) as [TipoPregunta, string][]).map(
                      ([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Texto de la pregunta</Label>
                <Textarea
                  value={selected.texto}
                  onChange={(e) =>
                    updatePregunta(selected.id, { texto: e.target.value })
                  }
                  rows={3}
                />
              </div>

              {(selected.tipo === "seleccion_unica" ||
                selected.tipo === "seleccion_multiple" ||
                selected.tipo === "ranking") && (
                <div className="flex flex-col gap-2">
                  <Label>
                    {selected.tipo === "ranking"
                      ? "Elementos a ordenar"
                      : "Opciones"}
                  </Label>
                  <div className="flex flex-col gap-2">
                    {(selected.opciones || []).map((opcion, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-foreground-muted/50 shrink-0 cursor-grab" />
                        <Input
                          value={opcion}
                          onChange={(e) =>
                            updateOption(selected.id, i, e.target.value)
                          }
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0 text-foreground-muted hover:text-error"
                          onClick={() => removeOption(selected.id, i)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="self-start"
                      onClick={() => addOption(selected.id)}
                    >
                      <Plus className="mr-1 h-3.5 w-3.5" />
                      Agregar opción
                    </Button>
                  </div>
                </div>
              )}

              {selected.tipo === "escala" && (
                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 flex-1">
                    <Label>Valor mínimo</Label>
                    <Input
                      type="number"
                      value={selected.escalaMin || 1}
                      onChange={(e) =>
                        updatePregunta(selected.id, {
                          escalaMin: parseInt(e.target.value) || 1,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <Label>Valor máximo</Label>
                    <Input
                      type="number"
                      value={selected.escalaMax || 10}
                      onChange={(e) =>
                        updatePregunta(selected.id, {
                          escalaMax: parseInt(e.target.value) || 10,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between rounded border border-border p-4">
                <div>
                  <Label>Respuesta requerida</Label>
                  <p className="text-xs text-foreground-muted mt-0.5">
                    El participante debe responder para continuar
                  </p>
                </div>
                <Switch
                  checked={selected.requerida}
                  onCheckedChange={(checked: boolean) =>
                    updatePregunta(selected.id, { requerida: checked })
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-foreground-muted">
            Seleccioná una pregunta para editar o creá una nueva
          </div>
        )}
      </div>
    </div>
  )
}
