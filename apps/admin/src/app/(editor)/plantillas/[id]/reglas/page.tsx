"use client"

import { useState, useMemo } from "react"
import { useParams } from "next/navigation"
import { plantillas } from "@kosmos/mock-data"
import type { ReglaLogica, AccionRegla } from "@kosmos/types"
import {
  Button,
  Badge,
  Label,
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@kosmos/ui"
import {
  Plus,
  Trash2,
  GitBranch,
  Pencil,
  Filter,
  ShieldX,
  ArrowRight,
} from "lucide-react"

type TipoRegla = "salto" | "filtro" | "rechazo"

const condiciones = [
  { value: "igual", label: "Es igual a" },
  { value: "incluye", label: "Incluye" },
  { value: "menor_que", label: "Es menor que" },
  { value: "mayor_que", label: "Es mayor que" },
  { value: "no_igual", label: "No es igual a" },
]

const accionesPorTipo: Record<TipoRegla, { value: AccionRegla; label: string }[]> = {
  salto: [
    { value: "saltar_a", label: "Saltar a pregunta" },
    { value: "terminar_encuesta", label: "Terminar evaluación" },
  ],
  filtro: [
    { value: "ocultar_pregunta", label: "Ocultar pregunta" },
  ],
  rechazo: [
    { value: "rechazar", label: "Rechazar participante" },
  ],
}

const tipoReglaConfig: Record<TipoRegla, { label: string; description: string; icon: typeof GitBranch; color: string; badgeVariant: "primary" | "warning" | "error" }> = {
  salto: {
    label: "Reglas de Salto",
    description: "Controlan el flujo de navegación entre preguntas según respuestas del participante",
    icon: ArrowRight,
    color: "text-primary",
    badgeVariant: "primary",
  },
  filtro: {
    label: "Reglas de Filtro",
    description: "Ocultan preguntas que no aplican según el perfil o respuestas anteriores",
    icon: Filter,
    color: "text-warning",
    badgeVariant: "warning",
  },
  rechazo: {
    label: "Reglas de Rechazo (Screener)",
    description: "Terminan la evaluación si el participante no cumple con el perfil objetivo",
    icon: ShieldX,
    color: "text-error",
    badgeVariant: "error",
  },
}

export default function ReglasPage() {
  const params = useParams()
  const plantilla = plantillas.find((p) => p.id === params.id)

  const [reglas, setReglas] = useState<ReglaLogica[]>(
    plantilla?.reglas || []
  )
  const [editingId, setEditingId] = useState<string | null>(null)
  const [addingTipo, setAddingTipo] = useState<TipoRegla | null>(null)

  const [formOrigen, setFormOrigen] = useState("")
  const [formCondicion, setFormCondicion] = useState("igual")
  const [formValor, setFormValor] = useState("")
  const [formAccion, setFormAccion] = useState<AccionRegla>("saltar_a")
  const [formDestino, setFormDestino] = useState("")
  const [formMensajeRechazo, setFormMensajeRechazo] = useState("")
  const [formPuntosConsuelo, setFormPuntosConsuelo] = useState("")

  if (!plantilla) return null

  const preguntas = plantilla.preguntas

  const reglasPorTipo = useMemo(() => ({
    salto: reglas.filter((r) => r.tipoRegla === "salto"),
    filtro: reglas.filter((r) => r.tipoRegla === "filtro"),
    rechazo: reglas.filter((r) => r.tipoRegla === "rechazo"),
  }), [reglas])

  function startAdd(tipo: TipoRegla) {
    setAddingTipo(tipo)
    setEditingId(null)
    setFormOrigen(preguntas[0]?.id || "")
    setFormCondicion("igual")
    setFormValor("")
    setFormAccion(accionesPorTipo[tipo][0].value)
    setFormDestino(preguntas[1]?.id || "")
    setFormMensajeRechazo(
      tipo === "rechazo"
        ? "Lo sentimos, no cumplís con el perfil requerido para esta evaluación."
        : ""
    )
    setFormPuntosConsuelo(tipo === "rechazo" ? "10" : "")
  }

  function startEdit(regla: ReglaLogica) {
    setEditingId(regla.id)
    setAddingTipo(null)
    setFormOrigen(regla.preguntaOrigenId)
    setFormCondicion(regla.condicion)
    setFormValor(regla.valorCondicion)
    setFormAccion(regla.accion)
    setFormDestino(regla.preguntaDestinoId || "")
    setFormMensajeRechazo(regla.mensajeRechazo || "")
    setFormPuntosConsuelo(regla.puntosConsuelo?.toString() || "")
  }

  function cancelEdit() {
    setEditingId(null)
    setAddingTipo(null)
  }

  function saveRule() {
    const tipoRegla: TipoRegla = addingTipo || reglas.find((r) => r.id === editingId)?.tipoRegla || "salto"

    if (addingTipo) {
      const newRegla: ReglaLogica = {
        id: `reg-new-${Date.now()}`,
        preguntaOrigenId: formOrigen,
        condicion: formCondicion,
        valorCondicion: formValor,
        accion: formAccion,
        preguntaDestinoId:
          formAccion === "terminar_encuesta" || formAccion === "rechazar"
            ? undefined
            : formDestino,
        tipoRegla,
        mensajeRechazo: tipoRegla === "rechazo" ? formMensajeRechazo : undefined,
        puntosConsuelo: tipoRegla === "rechazo" && formPuntosConsuelo
          ? parseInt(formPuntosConsuelo)
          : undefined,
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
                  formAccion === "terminar_encuesta" || formAccion === "rechazar"
                    ? undefined
                    : formDestino,
                mensajeRechazo: r.tipoRegla === "rechazo" ? formMensajeRechazo : undefined,
                puntosConsuelo: r.tipoRegla === "rechazo" && formPuntosConsuelo
                  ? parseInt(formPuntosConsuelo)
                  : undefined,
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

  function renderRuleForm(tipoRegla: TipoRegla) {
    const acciones = accionesPorTipo[tipoRegla]

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

          {formAccion === "saltar_a" && (
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

          {formAccion === "ocultar_pregunta" && (
            <div className="flex flex-col gap-2 col-span-2">
              <Label>Pregunta a ocultar</Label>
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

          {tipoRegla === "rechazo" && (
            <>
              <div className="flex flex-col gap-2 col-span-2">
                <Label>Mensaje de rechazo</Label>
                <Textarea
                  value={formMensajeRechazo}
                  onChange={(e) => setFormMensajeRechazo(e.target.value)}
                  placeholder="Mensaje que verá el participante al ser rechazado"
                  rows={3}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Puntos de consuelo</Label>
                <Input
                  type="number"
                  value={formPuntosConsuelo}
                  onChange={(e) => setFormPuntosConsuelo(e.target.value)}
                  placeholder="0"
                  className="w-[120px]"
                />
                <p className="text-xs text-foreground-muted">
                  Puntos otorgados al participante rechazado como compensación
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Button size="sm" onClick={saveRule}>
            {addingTipo ? "Agregar regla" : "Guardar cambios"}
          </Button>
          <Button variant="ghost" size="sm" onClick={cancelEdit}>
            Cancelar
          </Button>
        </div>
      </div>
    )
  }

  function renderReglaCard(regla: ReglaLogica) {
    const config = tipoReglaConfig[regla.tipoRegla]
    const preguntaOrigen = preguntas.find(
      (p) => p.id === regla.preguntaOrigenId
    )
    const preguntaDestino = regla.preguntaDestinoId
      ? preguntas.find((p) => p.id === regla.preguntaDestinoId)
      : null

    const condLabel =
      condiciones.find((c) => c.value === regla.condicion)?.label ||
      regla.condicion

    const accionLabel = Object.values(accionesPorTipo)
      .flat()
      .find((a) => a.value === regla.accion)?.label || regla.accion

    return (
      <div
        key={regla.id}
        className="rounded border border-border p-4 bg-white group"
      >
        <div className="flex items-start gap-3">
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded ${
            regla.tipoRegla === "rechazo" ? "bg-error/5" :
            regla.tipoRegla === "filtro" ? "bg-warning/5" : "bg-primary/5"
          }`}>
            <config.icon className={`h-4 w-4 ${config.color}`} />
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
              <Badge variant={config.badgeVariant}>
                {accionLabel}
              </Badge>
              {preguntaDestino && (
                <span className="text-xs text-foreground-muted">
                  → P{preguntaDestino.orden}:{" "}
                  {preguntaDestino.texto.slice(0, 50)}...
                </span>
              )}
            </div>
            {regla.tipoRegla === "rechazo" && (
              <div className="mt-2 rounded bg-error/5 p-2 text-xs">
                {regla.mensajeRechazo && (
                  <p className="text-foreground-secondary">{regla.mensajeRechazo}</p>
                )}
                {regla.puntosConsuelo !== undefined && regla.puntosConsuelo > 0 && (
                  <p className="text-foreground-muted mt-1">
                    Puntos de consuelo: {regla.puntosConsuelo}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
  }

  function renderSection(tipo: TipoRegla) {
    const config = tipoReglaConfig[tipo]
    const Icon = config.icon
    const reglasDelTipo = reglasPorTipo[tipo]
    const isAddingThisType = addingTipo === tipo

    return (
      <div key={tipo} className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon className={`h-5 w-5 ${config.color}`} />
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {config.label}
                {reglasDelTipo.length > 0 && (
                  <span className="ml-2 text-xs font-normal text-foreground-muted">
                    ({reglasDelTipo.length})
                  </span>
                )}
              </h3>
              <p className="text-xs text-foreground-muted">{config.description}</p>
            </div>
          </div>
          {!isAddingThisType && !editingId && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => startAdd(tipo)}
            >
              <Plus className="mr-1 h-3.5 w-3.5" />
              Agregar
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-2 ml-7">
          {isAddingThisType && renderRuleForm(tipo)}

          {reglasDelTipo.length === 0 && !isAddingThisType && (
            <div className="rounded border border-dashed border-border p-6 text-center">
              <p className="text-sm text-foreground-muted">
                Sin reglas de {tipo} configuradas
              </p>
            </div>
          )}

          {reglasDelTipo.map((regla) =>
            editingId === regla.id ? (
              <div key={regla.id}>{renderRuleForm(regla.tipoRegla)}</div>
            ) : (
              renderReglaCard(regla)
            )
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Reglas de Lógica
          </h2>
          <p className="text-sm text-foreground-secondary mt-1">
            Configurá condiciones para controlar el flujo de la evaluación
          </p>
        </div>

        {reglas.length === 0 && !addingTipo ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-background-gray mb-4">
              <GitBranch className="h-6 w-6 text-foreground-muted" />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-1">
              Sin reglas configuradas
            </h3>
            <p className="text-sm text-foreground-muted max-w-sm mb-6">
              Las reglas permiten saltar preguntas, filtrar secciones o
              rechazar participantes según sus respuestas.
            </p>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => startAdd("salto")}
              >
                <ArrowRight className="mr-1 h-3.5 w-3.5" />
                Regla de salto
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => startAdd("filtro")}
              >
                <Filter className="mr-1 h-3.5 w-3.5" />
                Regla de filtro
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => startAdd("rechazo")}
              >
                <ShieldX className="mr-1 h-3.5 w-3.5" />
                Regla de rechazo
              </Button>
            </div>
          </div>
        ) : (
          <>
            {renderSection("salto")}
            {renderSection("filtro")}
            {renderSection("rechazo")}
          </>
        )}
      </div>
    </div>
  )
}
