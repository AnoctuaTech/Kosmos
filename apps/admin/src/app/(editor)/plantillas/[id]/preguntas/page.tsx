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
  Badge,
  Separator,
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
  Type,
  Image,
  Camera,
  LayoutGrid,
  Grid3x3,
  CalendarDays,
  Hash,
  ChevronDown,
  Info,
  ToggleLeft,
  Globe,
  ChevronLeft,
  ChevronRight,
  Link2,
  GitBranch,
} from "lucide-react"

const tipoIcons: Record<TipoPregunta, React.ComponentType<{ className?: string }>> = {
  texto_corto: Type,
  texto_largo: AlignLeft,
  imagen_video: Image,
  foto: Camera,
  seleccion_imagen: LayoutGrid,
  ranking: ListOrdered,
  escala: Gauge,
  matriz: Grid3x3,
  fecha: CalendarDays,
  numero: Hash,
  dropdown: ChevronDown,
  texto_informativo: Info,
  si_no: ToggleLeft,
  seleccion_unica: CircleDot,
  seleccion_multiple: CheckSquare,
  pagina_web: Globe,
}

const tipoLabels: Record<TipoPregunta, string> = {
  texto_corto: "Texto corto",
  texto_largo: "Texto largo",
  imagen_video: "Imagen / Video",
  foto: "Captura de foto",
  seleccion_imagen: "Selección de imagen",
  ranking: "Ranking",
  escala: "Escala",
  matriz: "Matriz",
  fecha: "Fecha",
  numero: "Número",
  dropdown: "Dropdown",
  texto_informativo: "Texto informativo",
  si_no: "Sí / No",
  seleccion_unica: "Selección única",
  seleccion_multiple: "Selección múltiple",
  pagina_web: "Página web",
}

const categoriasTipo = [
  {
    label: "Texto",
    tipos: ["texto_corto", "texto_largo", "texto_informativo"] as TipoPregunta[],
  },
  {
    label: "Selección",
    tipos: ["seleccion_unica", "seleccion_multiple", "dropdown", "si_no", "ranking"] as TipoPregunta[],
  },
  {
    label: "Avanzado",
    tipos: ["escala", "matriz", "fecha", "numero"] as TipoPregunta[],
  },
  {
    label: "Multimedia",
    tipos: ["imagen_video", "foto", "seleccion_imagen", "pagina_web"] as TipoPregunta[],
  },
]

const tiposConOpciones: TipoPregunta[] = [
  "seleccion_unica",
  "seleccion_multiple",
  "ranking",
  "dropdown",
]

function resolveTextoPiping(texto: string, allPreguntas: Pregunta[]) {
  return texto.replace(/\{P(\d+)\}/g, (match, num) => {
    const orden = parseInt(num)
    const pregRef = allPreguntas.find((p) => p.orden === orden)
    if (!pregRef) return match
    if (pregRef.tipo === "seleccion_unica" && pregRef.opciones?.[0]) return pregRef.opciones[0]
    if (pregRef.tipo === "texto_corto") return "[respuesta de P" + orden + "]"
    if (pregRef.tipo === "numero") return "42"
    if (pregRef.tipo === "si_no") return "Sí"
    return "[respuesta de P" + orden + "]"
  })
}

function PreviewPregunta({ pregunta, allPreguntas }: { pregunta: Pregunta; allPreguntas: Pregunta[] }) {
  const Icon = tipoIcons[pregunta.tipo]
  const textoResuelto = resolveTextoPiping(pregunta.texto, allPreguntas)
  const hasPiping = /\{P\d+\}/.test(pregunta.texto)

  return (
    <div className="rounded-lg border border-border p-6 bg-white">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-xs text-foreground-muted">{tipoLabels[pregunta.tipo]}</span>
        {pregunta.requerida && (
          <Badge variant="error" className="text-[10px] px-1.5 py-0">Requerida</Badge>
        )}
        {hasPiping && (
          <Badge variant="primary" className="text-[10px] px-1.5 py-0">Piping</Badge>
        )}
      </div>
      <p className="text-base font-medium text-foreground mb-4">{textoResuelto}</p>

      {pregunta.opcionesCondicionalPreguntaId && (
        <div className="flex items-center gap-2 mb-3 rounded bg-warning/5 px-3 py-2">
          <GitBranch className="h-3.5 w-3.5 text-warning shrink-0" />
          <span className="text-xs text-warning">
            Opciones filtradas según respuesta de P{allPreguntas.find((p) => p.id === pregunta.opcionesCondicionalPreguntaId)?.orden}
          </span>
        </div>
      )}

      {tiposConOpciones.includes(pregunta.tipo) && pregunta.opciones && (
        <div className="space-y-2">
          {pregunta.opciones.map((op, i) => (
            <div key={i} className="flex items-center gap-3">
              {pregunta.tipo === "seleccion_unica" && (
                <div className="h-4 w-4 rounded-full border-2 border-border" />
              )}
              {pregunta.tipo === "seleccion_multiple" && (
                <div className="h-4 w-4 rounded border-2 border-border" />
              )}
              {pregunta.tipo === "dropdown" && (
                <span className="text-xs text-foreground-muted w-4">{i + 1}.</span>
              )}
              {pregunta.tipo === "ranking" && (
                <span className="flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-[10px] font-bold text-primary">{i + 1}</span>
              )}
              <span className="text-sm text-foreground">{op}</span>
            </div>
          ))}
          {pregunta.incluyeOtro && (
            <div className="flex items-center gap-3">
              {pregunta.tipo === "seleccion_unica" && (
                <div className="h-4 w-4 rounded-full border-2 border-border" />
              )}
              {pregunta.tipo === "seleccion_multiple" && (
                <div className="h-4 w-4 rounded border-2 border-border" />
              )}
              <span className="text-sm text-foreground-muted italic">Otro (especificar)</span>
            </div>
          )}
        </div>
      )}

      {pregunta.tipo === "escala" && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground-muted">{pregunta.escalaEtiquetaMin || pregunta.escalaMin || 1}</span>
            <span className="text-xs text-foreground-muted">{pregunta.escalaEtiquetaCentro}</span>
            <span className="text-xs text-foreground-muted">{pregunta.escalaEtiquetaMax || pregunta.escalaMax || 10}</span>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: (pregunta.escalaMax || 10) - (pregunta.escalaMin || 1) + 1 }, (_, i) => (
              <div
                key={i}
                className="flex-1 h-8 rounded border border-border flex items-center justify-center text-xs text-foreground-muted hover:bg-primary/5 hover:border-primary/30 cursor-pointer transition-colors duration-200"
              >
                {(pregunta.escalaMin || 1) + i}
              </div>
            ))}
          </div>
        </div>
      )}

      {pregunta.tipo === "si_no" && (
        <div className="flex gap-3">
          <div className="flex-1 rounded border border-border p-3 text-center text-sm font-medium text-foreground hover:bg-success/5 hover:border-success/30 cursor-pointer transition-colors duration-200">
            Sí
          </div>
          <div className="flex-1 rounded border border-border p-3 text-center text-sm font-medium text-foreground hover:bg-error/5 hover:border-error/30 cursor-pointer transition-colors duration-200">
            No
          </div>
        </div>
      )}

      {(pregunta.tipo === "texto_corto") && (
        <div className="rounded border border-border p-3 bg-background-gray/30">
          <span className="text-sm text-foreground-muted">Respuesta corta...</span>
        </div>
      )}

      {(pregunta.tipo === "texto_largo") && (
        <div className="rounded border border-border p-3 bg-background-gray/30 min-h-[80px]">
          <span className="text-sm text-foreground-muted">Respuesta larga...</span>
        </div>
      )}

      {pregunta.tipo === "texto_informativo" && (
        <div className="rounded border border-primary/20 bg-primary/5 p-4">
          <Info className="h-5 w-5 text-primary mb-2" />
          <p className="text-sm text-foreground-secondary">Este es un bloque informativo para el participante.</p>
          {pregunta.textoBoton && (
            <Button size="sm" className="mt-3">{pregunta.textoBoton}</Button>
          )}
        </div>
      )}

      {pregunta.tipo === "matriz" && pregunta.matrizFilas && pregunta.matrizColumnas && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left p-2 text-foreground-muted font-normal"></th>
                {pregunta.matrizColumnas.map((col, i) => (
                  <th key={i} className="p-2 text-center text-foreground-muted font-medium text-xs">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pregunta.matrizFilas.map((fila, i) => (
                <tr key={i} className="border-t border-border">
                  <td className="p-2 text-foreground font-medium text-xs">{fila}</td>
                  {pregunta.matrizColumnas!.map((_, j) => (
                    <td key={j} className="p-2 text-center">
                      <div className="h-4 w-4 rounded-full border-2 border-border mx-auto" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pregunta.tipo === "fecha" && (
        <div className="rounded border border-border p-3 bg-background-gray/30 flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-foreground-muted" />
          <span className="text-sm text-foreground-muted">dd/mm/aaaa</span>
        </div>
      )}

      {pregunta.tipo === "numero" && (
        <div className="rounded border border-border p-3 bg-background-gray/30 flex items-center gap-2">
          <Hash className="h-4 w-4 text-foreground-muted" />
          <span className="text-sm text-foreground-muted">
            {pregunta.numeroMinimo !== undefined ? `Min: ${pregunta.numeroMinimo}` : ""} {pregunta.numeroMaximo !== undefined ? `Max: ${pregunta.numeroMaximo}` : ""}
          </span>
        </div>
      )}

      {pregunta.tipo === "imagen_video" && (
        <div className="rounded-lg border-2 border-dashed border-border p-8 text-center bg-background-gray/30">
          <Image className="h-8 w-8 text-foreground-muted mx-auto mb-2" />
          <p className="text-sm text-foreground-muted">Arrastrá una imagen o video aquí</p>
        </div>
      )}

      {pregunta.tipo === "foto" && (
        <div className="rounded-lg border-2 border-dashed border-border p-8 text-center bg-background-gray/30">
          <Camera className="h-8 w-8 text-foreground-muted mx-auto mb-2" />
          <p className="text-sm text-foreground-muted">Capturar foto con cámara</p>
        </div>
      )}

      {pregunta.tipo === "seleccion_imagen" && (
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border-2 border-border p-4 text-center bg-background-gray/30 hover:border-primary/30 cursor-pointer transition-colors duration-200">
              <LayoutGrid className="h-6 w-6 text-foreground-muted mx-auto mb-1" />
              <span className="text-xs text-foreground-muted">Imagen {i}</span>
            </div>
          ))}
        </div>
      )}

      {pregunta.tipo === "pagina_web" && (
        <div className="rounded border border-border p-3 bg-background-gray/30 flex items-center gap-2">
          <Globe className="h-4 w-4 text-foreground-muted" />
          <span className="text-sm text-foreground-muted">https://ejemplo.com</span>
        </div>
      )}
    </div>
  )
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
  const [showTipoSelector, setShowTipoSelector] = useState(false)

  const selected = preguntas.find((p) => p.id === selectedId)
  const selectedIndex = preguntas.findIndex((p) => p.id === selectedId)

  function updatePregunta(id: string, updates: Partial<Pregunta>) {
    setPreguntas((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    )
  }

  function addPregunta(tipo: TipoPregunta = "seleccion_unica") {
    const newId = `prg-new-${Date.now()}`
    const defaults: Partial<Pregunta> = {}

    if (tiposConOpciones.includes(tipo)) {
      defaults.opciones = ["Opción 1", "Opción 2"]
    }
    if (tipo === "escala") {
      defaults.escalaMin = 1
      defaults.escalaMax = 10
    }
    if (tipo === "si_no") {
      defaults.opciones = undefined
    }
    if (tipo === "matriz") {
      defaults.matrizFilas = ["Fila 1", "Fila 2"]
      defaults.matrizColumnas = ["Col 1", "Col 2", "Col 3"]
      defaults.matrizTipo = "seleccion_unica"
    }
    if (tipo === "fecha") {
      defaults.fechaMinima = ""
      defaults.fechaMaxima = ""
    }
    if (tipo === "numero") {
      defaults.numeroMinimo = 0
      defaults.numeroMaximo = 100
    }

    const nueva: Pregunta = {
      id: newId,
      plantillaId: plantilla?.id || "",
      tipo,
      texto: "Nueva pregunta",
      requerida: true,
      orden: preguntas.length + 1,
      ...defaults,
    }
    setPreguntas((prev) => [...prev, nueva])
    setSelectedId(newId)
    setShowTipoSelector(false)
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

  function navigatePregunta(direction: -1 | 1) {
    const newIndex = selectedIndex + direction
    if (newIndex >= 0 && newIndex < preguntas.length) {
      setSelectedId(preguntas[newIndex].id)
    }
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
                  className={`flex items-start gap-2 rounded px-3 py-2.5 text-left transition-all duration-200 ${
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

          {showTipoSelector ? (
            <div className="mt-3 rounded border border-border bg-white p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-foreground">Tipo de pregunta</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => setShowTipoSelector(false)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              {categoriasTipo.map((cat) => (
                <div key={cat.label} className="mb-2">
                  <span className="text-[10px] font-medium text-foreground-muted uppercase tracking-wider">
                    {cat.label}
                  </span>
                  <div className="grid grid-cols-2 gap-1 mt-1">
                    {cat.tipos.map((tipo) => {
                      const Icon = tipoIcons[tipo]
                      return (
                        <button
                          key={tipo}
                          onClick={() => addPregunta(tipo)}
                          className="flex items-center gap-1.5 rounded px-2 py-1.5 text-left hover:bg-primary/5 transition-colors duration-200"
                        >
                          <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span className="text-[11px] text-foreground">{tipoLabels[tipo]}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3"
              onClick={() => setShowTipoSelector(true)}
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              Agregar pregunta
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {selected ? (
          <div className="grid grid-cols-2 h-full divide-x divide-border">
            <div className="overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={selectedIndex === 0}
                    onClick={() => navigatePregunta(-1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm font-medium text-foreground-secondary">
                    {selectedIndex + 1} / {preguntas.length}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={selectedIndex === preguntas.length - 1}
                    onClick={() => navigatePregunta(1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
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
                  <div className="grid grid-cols-4 gap-1 p-1 rounded border border-border bg-background-gray/30">
                    {categoriasTipo.map((cat) => (
                      <div key={cat.label}>
                        <span className="text-[9px] font-medium text-foreground-muted uppercase tracking-wider block px-1 mb-0.5">{cat.label}</span>
                        {cat.tipos.map((tipo) => {
                          const Icon = tipoIcons[tipo]
                          const isActive = selected.tipo === tipo
                          return (
                            <button
                              key={tipo}
                              onClick={() =>
                                updatePregunta(selected.id, {
                                  tipo,
                                  opciones: tiposConOpciones.includes(tipo)
                                    ? selected.opciones || ["Opción 1", "Opción 2"]
                                    : tipo === "si_no"
                                      ? undefined
                                      : selected.opciones,
                                  escalaMin: tipo === "escala" ? selected.escalaMin || 1 : undefined,
                                  escalaMax: tipo === "escala" ? selected.escalaMax || 10 : undefined,
                                })
                              }
                              className={`flex items-center gap-1 w-full rounded px-1.5 py-1 text-left transition-all duration-200 ${
                                isActive
                                  ? "bg-primary/10 text-primary"
                                  : "text-foreground-secondary hover:bg-white"
                              }`}
                            >
                              <Icon className="h-3 w-3 shrink-0" />
                              <span className="text-[10px] truncate">{tipoLabels[tipo]}</span>
                            </button>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Texto de la pregunta</Label>
                  <Textarea
                    id="pregunta-texto"
                    value={selected.texto}
                    onChange={(e) =>
                      updatePregunta(selected.id, { texto: e.target.value })
                    }
                    rows={3}
                  />
                  {selectedIndex > 0 && (
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Link2 className="h-3.5 w-3.5 text-foreground-muted" />
                        <span className="text-xs text-foreground-muted">Insertar respuesta de:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {preguntas.filter((p) => p.orden < selected.orden).map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              const textarea = document.getElementById("pregunta-texto") as HTMLTextAreaElement
                              if (textarea) {
                                const start = textarea.selectionStart
                                const end = textarea.selectionEnd
                                const text = selected.texto
                                const newText = text.slice(0, start) + `{P${p.orden}}` + text.slice(end)
                                updatePregunta(selected.id, { texto: newText, pipingPreguntaId: p.id })
                              } else {
                                updatePregunta(selected.id, {
                                  texto: selected.texto + ` {P${p.orden}}`,
                                  pipingPreguntaId: p.id,
                                })
                              }
                            }}
                            className="rounded bg-primary/5 px-2 py-1 text-[11px] text-primary hover:bg-primary/10 transition-colors duration-200"
                          >
                            P{p.orden}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {tiposConOpciones.includes(selected.tipo) && (
                  <div className="flex flex-col gap-2">
                    <Label>
                      {selected.tipo === "ranking" ? "Elementos a ordenar" : "Opciones"}
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
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="self-start"
                          onClick={() => addOption(selected.id)}
                        >
                          <Plus className="mr-1 h-3.5 w-3.5" />
                          Agregar opción
                        </Button>
                        {(selected.tipo === "seleccion_unica" || selected.tipo === "seleccion_multiple") && (
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={selected.incluyeOtro || false}
                              onCheckedChange={(checked: boolean) =>
                                updatePregunta(selected.id, { incluyeOtro: checked })
                              }
                            />
                            <span className="text-xs text-foreground-secondary">Incluir &quot;Otro&quot;</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {selected.tipo === "seleccion_multiple" && (
                      <div className="flex items-center gap-3 mt-1">
                        <Label className="text-xs">Mínimo de selecciones:</Label>
                        <Input
                          type="number"
                          value={selected.minimoSeleccion || ""}
                          onChange={(e) =>
                            updatePregunta(selected.id, {
                              minimoSeleccion: parseInt(e.target.value) || undefined,
                            })
                          }
                          className="w-20"
                          placeholder="—"
                        />
                      </div>
                    )}

                    {selectedIndex > 0 && (
                      <div className="rounded border border-border p-3 mt-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <GitBranch className="h-3.5 w-3.5 text-foreground-muted" />
                            <Label className="text-xs">Opciones condicionales</Label>
                          </div>
                          <Switch
                            checked={!!selected.opcionesCondicionalPreguntaId}
                            onCheckedChange={(checked: boolean) =>
                              updatePregunta(selected.id, {
                                opcionesCondicionalPreguntaId: checked
                                  ? preguntas.find((p) => p.orden < selected.orden && p.opciones?.length)?.id || ""
                                  : undefined,
                              })
                            }
                          />
                        </div>
                        {selected.opcionesCondicionalPreguntaId && (
                          <div className="mt-2">
                            <p className="text-[11px] text-foreground-muted mb-1.5">
                              Las opciones visibles dependerán de la respuesta a:
                            </p>
                            <Select
                              value={selected.opcionesCondicionalPreguntaId}
                              onValueChange={(v) =>
                                updatePregunta(selected.id, { opcionesCondicionalPreguntaId: v })
                              }
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {preguntas
                                  .filter((p) => p.orden < selected.orden && p.opciones?.length)
                                  .map((p) => (
                                    <SelectItem key={p.id} value={p.id}>
                                      P{p.orden}: {p.texto.slice(0, 30)}...
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <div className="mt-2 rounded bg-warning/5 p-2">
                              <p className="text-[11px] text-warning">
                                Las opciones se filtrarán según la respuesta del participante
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {selected.tipo === "escala" && (
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-2 flex-1">
                        <Label>Mínimo</Label>
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
                        <Label>Máximo</Label>
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
                    <div className="flex gap-4">
                      <div className="flex flex-col gap-2 flex-1">
                        <Label className="text-xs">Etiqueta mínimo</Label>
                        <Input
                          value={selected.escalaEtiquetaMin || ""}
                          onChange={(e) =>
                            updatePregunta(selected.id, { escalaEtiquetaMin: e.target.value })
                          }
                          placeholder="Ej: Nada probable"
                        />
                      </div>
                      <div className="flex flex-col gap-2 flex-1">
                        <Label className="text-xs">Etiqueta máximo</Label>
                        <Input
                          value={selected.escalaEtiquetaMax || ""}
                          onChange={(e) =>
                            updatePregunta(selected.id, { escalaEtiquetaMax: e.target.value })
                          }
                          placeholder="Ej: Muy probable"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selected.tipo === "matriz" && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <Label>Filas</Label>
                      {(selected.matrizFilas || []).map((fila, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Input
                            value={fila}
                            onChange={(e) => {
                              const nuevas = [...(selected.matrizFilas || [])]
                              nuevas[i] = e.target.value
                              updatePregunta(selected.id, { matrizFilas: nuevas })
                            }}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-foreground-muted hover:text-error"
                            onClick={() => {
                              updatePregunta(selected.id, {
                                matrizFilas: (selected.matrizFilas || []).filter((_, j) => j !== i),
                              })
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="self-start"
                        onClick={() =>
                          updatePregunta(selected.id, {
                            matrizFilas: [...(selected.matrizFilas || []), `Fila ${(selected.matrizFilas?.length || 0) + 1}`],
                          })
                        }
                      >
                        <Plus className="mr-1 h-3.5 w-3.5" />
                        Agregar fila
                      </Button>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Columnas</Label>
                      {(selected.matrizColumnas || []).map((col, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Input
                            value={col}
                            onChange={(e) => {
                              const nuevas = [...(selected.matrizColumnas || [])]
                              nuevas[i] = e.target.value
                              updatePregunta(selected.id, { matrizColumnas: nuevas })
                            }}
                            className="flex-1"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-foreground-muted hover:text-error"
                            onClick={() => {
                              updatePregunta(selected.id, {
                                matrizColumnas: (selected.matrizColumnas || []).filter((_, j) => j !== i),
                              })
                            }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        size="sm"
                        className="self-start"
                        onClick={() =>
                          updatePregunta(selected.id, {
                            matrizColumnas: [...(selected.matrizColumnas || []), `Col ${(selected.matrizColumnas?.length || 0) + 1}`],
                          })
                        }
                      >
                        <Plus className="mr-1 h-3.5 w-3.5" />
                        Agregar columna
                      </Button>
                    </div>
                  </div>
                )}

                {selected.tipo === "fecha" && (
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                      <Label>Fecha mínima</Label>
                      <Input
                        type="date"
                        value={selected.fechaMinima || ""}
                        onChange={(e) =>
                          updatePregunta(selected.id, { fechaMinima: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <Label>Fecha máxima</Label>
                      <Input
                        type="date"
                        value={selected.fechaMaxima || ""}
                        onChange={(e) =>
                          updatePregunta(selected.id, { fechaMaxima: e.target.value })
                        }
                      />
                    </div>
                  </div>
                )}

                {selected.tipo === "numero" && (
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                      <Label>Valor mínimo</Label>
                      <Input
                        type="number"
                        value={selected.numeroMinimo ?? ""}
                        onChange={(e) =>
                          updatePregunta(selected.id, {
                            numeroMinimo: parseInt(e.target.value) || 0,
                          })
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <Label>Valor máximo</Label>
                      <Input
                        type="number"
                        value={selected.numeroMaximo ?? ""}
                        onChange={(e) =>
                          updatePregunta(selected.id, {
                            numeroMaximo: parseInt(e.target.value) || 100,
                          })
                        }
                      />
                    </div>
                  </div>
                )}

                {selected.tipo === "texto_informativo" && (
                  <div className="flex flex-col gap-2">
                    <Label>Texto del botón (opcional)</Label>
                    <Input
                      value={selected.textoBoton || ""}
                      onChange={(e) =>
                        updatePregunta(selected.id, { textoBoton: e.target.value })
                      }
                      placeholder="Ej: Continuar"
                    />
                  </div>
                )}

                <Separator />

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

            <div className="overflow-y-auto p-6 bg-background-gray/30">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-4">
                Vista previa
              </h3>
              <PreviewPregunta pregunta={selected} allPreguntas={preguntas} />
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
