"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Card, CardContent } from "@kosmos/ui"
import { CheckCircle2, Star, ClipboardList } from "lucide-react"

const preguntas = [
  {
    id: 1,
    texto: "¿Cuál es tu nivel de educación más alto completado?",
    opciones: [
      { label: "Primaria o menos", valor: 1 },
      { label: "Secundaria incompleta", valor: 2 },
      { label: "Secundaria completa", valor: 3 },
      { label: "Universidad incompleta", valor: 4 },
      { label: "Universidad completa o más", valor: 5 },
    ],
  },
  {
    id: 2,
    texto: "¿Tu vivienda actual es?",
    opciones: [
      { label: "Prestada o cedida", valor: 1 },
      { label: "Alquilada compartida", valor: 2 },
      { label: "Alquilada individual", valor: 3 },
      { label: "Propia con hipoteca", valor: 4 },
      { label: "Propia totalmente pagada", valor: 5 },
    ],
  },
  {
    id: 3,
    texto: "¿Tu hogar cuenta con conexión a internet?",
    opciones: [
      { label: "No tengo internet", valor: 1 },
      { label: "Solo datos móviles", valor: 2 },
      { label: "Internet fijo básico", valor: 3 },
      { label: "Internet fijo de alta velocidad", valor: 4 },
      { label: "Fibra óptica", valor: 5 },
    ],
  },
  {
    id: 4,
    texto: "¿Cuántos vehículos tiene tu hogar?",
    opciones: [
      { label: "Ninguno", valor: 1 },
      { label: "1 vehículo", valor: 3 },
      { label: "2 o más vehículos", valor: 5 },
    ],
  },
  {
    id: 5,
    texto: "¿Cuál es el rango aproximado de ingreso mensual de tu hogar?",
    opciones: [
      { label: "Menos de $500", valor: 1 },
      { label: "$500 - $1,000", valor: 2 },
      { label: "$1,000 - $2,000", valor: 3 },
      { label: "$2,000 - $4,000", valor: 4 },
      { label: "Más de $4,000", valor: 5 },
    ],
  },
]

function calcularNivel(score: number): { nivel: string; color: string; bgColor: string } {
  if (score >= 19) return { nivel: "Alto", color: "text-success", bgColor: "bg-success/10" }
  if (score >= 12) return { nivel: "Medio", color: "text-warning", bgColor: "bg-warning/10" }
  return { nivel: "Bajo", color: "text-primary", bgColor: "bg-primary/10" }
}

export default function CuestionarioNSEPage() {
  const router = useRouter()
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuestas, setRespuestas] = useState<Record<number, number>>({})
  const [finalizado, setFinalizado] = useState(false)

  const pregunta = preguntas[preguntaActual]
  const progreso = ((preguntaActual + (finalizado ? 1 : 0)) / preguntas.length) * 100
  const seleccion = respuestas[pregunta?.id]

  function handleSeleccionar(valor: number) {
    setRespuestas((prev) => ({ ...prev, [pregunta.id]: valor }))
  }

  function handleSiguiente() {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual(preguntaActual + 1)
    } else {
      setFinalizado(true)
    }
  }

  function handleAnterior() {
    if (preguntaActual > 0) setPreguntaActual(preguntaActual - 1)
  }

  if (finalizado) {
    const score = Object.values(respuestas).reduce((a, b) => a + b, 0)
    const { nivel, color, bgColor } = calcularNivel(score)

    return (
      <div className="text-center animate-in">
        <div className="mb-5 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 ring-4 ring-success/5">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          ¡Perfil completado!
        </h2>
        <p className="text-sm text-foreground-secondary mb-2">
          Tu clasificación socioeconómica es
        </p>
        <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full ${bgColor} mb-6`}>
          <span className={`text-lg font-bold ${color}`}>NSE {nivel}</span>
        </div>

        <Card className="border-border/50 mb-6 shadow-sm">
          <CardContent className="p-4 flex items-center justify-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/[0.08]">
              <Star className="h-4 w-4 text-primary fill-primary" />
            </div>
            <span className="text-lg font-bold text-foreground">+100 puntos</span>
            <span className="text-sm text-foreground-secondary">
              por completar tu perfil
            </span>
          </CardContent>
        </Card>

        <Button
          className="w-full"
          size="lg"
          onClick={() => router.push("/inicio")}
        >
          Ir al inicio
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="text-center mb-5">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/[0.12] to-primary/[0.04] ring-1 ring-primary/[0.08]">
          <ClipboardList className="h-4.5 w-4.5 text-primary" />
        </div>
        <h2 className="text-lg font-semibold text-foreground tracking-tight">
          Cuestionario socioeconómico
        </h2>
        <p className="text-[13px] text-foreground-secondary mt-1">
          Necesitamos conocer tu perfil para asignarte estudios
        </p>
      </div>

      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-medium text-foreground-muted uppercase tracking-wider">
            Pregunta {preguntaActual + 1} de {preguntas.length}
          </span>
          <span className="text-[11px] font-medium text-primary">
            {Math.round(progreso)}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-500 ease-out"
            style={{ width: `${progreso}%` }}
          />
        </div>
      </div>

      <div className="animate-in" key={preguntaActual}>
        <h3 className="text-[15px] font-medium text-foreground mb-4 leading-snug">
          {pregunta.texto}
        </h3>

        <div className="space-y-2 mb-6">
          {pregunta.opciones.map((opcion) => (
            <button
              key={opcion.valor}
              type="button"
              onClick={() => handleSeleccionar(opcion.valor)}
              className={`w-full rounded-xl border-2 px-4 py-3 text-left text-sm transition-all duration-200 ${
                seleccion === opcion.valor
                  ? "border-primary bg-primary/5 text-foreground font-medium shadow-sm shadow-primary/5"
                  : "border-border/60 bg-white text-foreground-secondary hover:border-border hover:bg-background-gray/30"
              }`}
            >
              {opcion.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        {preguntaActual > 0 ? (
          <button
            onClick={handleAnterior}
            className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors duration-200"
          >
            Anterior
          </button>
        ) : (
          <div />
        )}
        <Button onClick={handleSiguiente} disabled={seleccion === undefined}>
          {preguntaActual === preguntas.length - 1 ? "Finalizar" : "Siguiente"}
        </Button>
      </div>
    </div>
  )
}
