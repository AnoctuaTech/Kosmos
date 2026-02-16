"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { plantillas } from "@kosmos/mock-data"
import type { ReglaLogica, AccionRegla } from "@kosmos/types"
import {
  Button,
  Badge,
  Label,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@kosmos/ui"
import { Plus, Trash2, GitBranch, Pencil } from "lucide-react"

const condiciones = [
  { value: "igual", label: "Es igual a" },
  { value: "incluye", label: "Incluye" },
  { value: "menor_que", label: "Es menor que" },
  { value: "mayor_que", label: "Es mayor que" },
  { value: "no_igual", label: "No es igual a" },
]

const acciones: { value: AccionRegla; label: string }[] = [
  { value: "saltar_a", label: "Saltar a pregunta" },
  { value: "terminar_encuesta", label: "Terminar encuesta" },
  { value: "ocultar_pregunta", label: "Ocultar pregunta" },
]

export default function ReglasPage() {
  const params = useParams()
  const plantilla = plantillas.find((p) => p.id === params.id)

  const [reglas, setReglas] = useState<ReglaLogica[]>(
    plantilla?.reglas || []
  )
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  const [formOrigen, setFormOrigen] = useState("")
  const [formCondicion, setFormCondicion] = useState("igual")
  const [formValor, setFormValor] = useState("")
  const [formAccion, setFormAccion] = useState<AccionRegla>("saltar_a")
  const [formDestino, setFormDestino] = useState("")

  if (!plantilla) return null

  const preguntas = plantilla.preguntas

  function startAdd() {
    setIsAdding(true)
    setEditingId(null)
    setFormOrigen(preguntas[0]?.id || "")
    setFormCondicion("igual")
    setFormValor("")
    setFormAccion("saltar_a")
    setFormDestino(preguntas[1]?.id || "")
  }

  function startEdit(regla: ReglaLogica) {
    setEditingId(regla.id)
    setIsAdding(false)
    setFormOrigen(regla.preguntaOrigenId)
    setFormCondicion(regla.condicion)
    setFormValor(regla.valorCondicion)
    setFormAccion(regla.accion)
    setFormDestino(regla.preguntaDestinoId || "")
  }

  function cancelEdit() {
    setEditingId(null)
    setIsAdding(false)
  }

  function saveRule() {
    if (isAdding) {
      const newRegla: ReglaLogica = {
        id: `reg-new-${Date.now()}`,
        preguntaOrigenId: formOrigen,
        condicion: formCondicion,
        valorCondicion: formValor,
        accion: formAccion,
        preguntaDestinoId:
          formAccion === "terminar_encuesta" ? undefined : formDestino,
      }
      setReglas((prev) => [...prev, newRegla])
    } else if (editingId) {
      setReglas((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? {
                ...r,
                preguntaOrigenId: formOrigen,
                condicion: formCondicion,
                valorCondicion: formValor,
                accion: formAccion,
                preguntaDestinoId:
                  formAccion === "terminar_encuesta"
                    ? undefined
                    : formDestino,
              }
            : r
        )
      )
    }
    cancelEdit()
  }

  function deleteRule(id: string) {
    setReglas((prev) => prev.filter((r) => r.id !== id))
  }

  function renderRuleForm() {
    return (
      <div className="rounded border border-primary/20 bg-primary/[0.02] p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label>Pregunta origen</Label>
            <Select value={formOrigen} onValueChange={setFormOrigen}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {preguntas.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    P{p.orden}: {p.texto.slice(0, 35)}...
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Condición</Label>
            <Select value={formCondicion} onValueChange={setFormCondicion}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {condiciones.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Valor</Label>
            <Input
              value={formValor}
              onChange={(e) => setFormValor(e.target.value)}
              placeholder="Valor de la condición"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Acción</Label>
            <Select
              value={formAccion}
              onValueChange={(v: string) => setFormAccion(v as AccionRegla)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {acciones.map((a) => (
                  <SelectItem key={a.value} value={a.value}>
                    {a.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formAccion !== "terminar_encuesta" && (
            <div className="flex flex-col gap-2 col-span-2">
              <Label>Pregunta destino</Label>
              <Select value={formDestino} onValueChange={setFormDestino}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {preguntas
                    .filter((p) => p.id !== formOrigen)
                    .map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        P{p.orden}: {p.texto.slice(0, 35)}...
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Button size="sm" onClick={saveRule}>
            {isAdding ? "Agregar regla" : "Guardar cambios"}
          </Button>
          <Button variant="ghost" size="sm" onClick={cancelEdit}>
            Cancelar
          </Button>
        </div>
      </div>
    )
  }

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
          {!isAdding && !editingId && (
            <Button size="sm" onClick={startAdd}>
              <Plus className="mr-1 h-3.5 w-3.5" />
              Agregar regla
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {isAdding && renderRuleForm()}

          {reglas.length === 0 && !isAdding ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background-gray mb-4">
                <GitBranch className="h-6 w-6 text-foreground-muted" />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-1">
                Sin reglas configuradas
              </h3>
              <p className="text-sm text-foreground-muted max-w-sm">
                Las reglas permiten saltar preguntas, ocultar secciones o
                terminar la encuesta según las respuestas del participante.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={startAdd}
              >
                <Plus className="mr-1 h-3.5 w-3.5" />
                Crear primera regla
              </Button>
            </div>
          ) : (
            reglas.map((regla) => {
              if (editingId === regla.id)
                return <div key={regla.id}>{renderRuleForm()}</div>

              const preguntaOrigen = preguntas.find(
                (p) => p.id === regla.preguntaOrigenId
              )
              const preguntaDestino = regla.preguntaDestinoId
                ? preguntas.find((p) => p.id === regla.preguntaDestinoId)
                : null

              const condLabel =
                condiciones.find((c) => c.value === regla.condicion)?.label ||
                regla.condicion

              return (
                <div
                  key={regla.id}
                  className="rounded border border-border p-4 bg-white group"
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
                        {condLabel.toLowerCase()}{" "}
                        <span className="font-medium">
                          &quot;{regla.valorCondicion}&quot;
                        </span>
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="primary">
                          {acciones.find((a) => a.value === regla.accion)
                            ?.label || regla.accion}
                        </Badge>
                        {preguntaDestino && (
                          <span className="text-xs text-foreground-muted">
                            → P{preguntaDestino.orden}:{" "}
                            {preguntaDestino.texto.slice(0, 50)}...
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => startEdit(regla)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-error hover:text-error"
                        onClick={() => deleteRule(regla.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
