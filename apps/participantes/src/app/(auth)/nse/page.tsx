"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Card, CardContent } from "@kosmos/ui"
import { CheckCircle2, Star } from "lucide-react"

const preguntas = [
  {
    id: 1,
    texto: "Cual es tu nivel de educacion mas alto completado?",
    opciones: [
      { label: "Primaria o menos", valor: 1 },
      { label: "Secundaria incompleta", valor: 2 },
      { label: "Secundaria completa", valor: 3 },
      { label: "Universidad incompleta", valor: 4 },
      { label: "Universidad completa o mas", valor: 5 },
    ],
  },
  {
    id: 2,
    texto: "Tu vivienda actual es:",
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
    texto: "Tu hogar cuenta con conexion a internet?",
    opciones: [
      { label: "No tengo internet", valor: 1 },
      { label: "Solo datos moviles", valor: 2 },
      { label: "Internet fijo basico", valor: 3 },
      { label: "Internet fijo de alta velocidad", valor: 4 },
      { label: "Fibra optica", valor: 5 },
    ],
  },
  {
    id: 4,
    texto: "Cuantos vehiculos tiene tu hogar?",
    opciones: [
      { label: "Ninguno", valor: 1 },
      { label: "1 vehiculo", valor: 3 },
      { label: "2 o mas vehiculos", valor: 5 },
    ],
  },
  {
    id: 5,
    texto: "Cual es el rango aproximado de ingreso mensual de tu hogar?",
    opciones: [
      { label: "Menos de $500", valor: 1 },
      { label: "$500 - $1,000", valor: 2 },
      { label: "$1,000 - $2,000", valor: 3 },
      { label: "$2,000 - $4,000", valor: 4 },
      { label: "Mas de $4,000", valor: 5 },
    ],
  },
]

function calcularNivel(score: number): { nivel: string; color: string } {
  if (score >= 19) return { nivel: "Alto", color: "text-success" }
  if (score >= 12) return { nivel: "Medio", color: "text-warning" }
  return { nivel: "Bajo", color: "text-primary" }
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
    const { nivel, color } = calcularNivel(score)

    return (
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Perfil completado
        </h2>
        <p className="text-sm text-foreground-secondary mb-6">
          Tu clasificacion socioeconomica es{" "}
          <span className={`font-semibold ${color}`}>NSE {nivel}</span>
        </p>

        <Card className="border-border mb-6">
          <CardContent className="p-4 flex items-center justify-center gap-2">
            <Star className="h-5 w-5 text-primary fill-primary" />
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
      <h2 className="text-xl font-semibold text-foreground mb-1 text-center">
        Cuestionario socioeconomico
      </h2>
      <p className="text-sm text-foreground-secondary mb-4 text-center">
        Necesitamos conocer tu perfil para asignarte estudios
      </p>

      <div className="mb-6 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progreso}%` }}
        />
      </div>

      <p className="text-xs text-foreground-muted mb-3">
        Pregunta {preguntaActual + 1} de {preguntas.length}
      </p>

      <h3 className="text-base font-medium text-foreground mb-4">
        {pregunta.texto}
      </h3>

      <div className="space-y-2 mb-6">
        {pregunta.opciones.map((opcion) => (
          <button
            key={opcion.valor}
            type="button"
            onClick={() => handleSeleccionar(opcion.valor)}
            className={`w-full rounded-lg border-2 px-4 py-3 text-left text-sm transition-all ${
              seleccion === opcion.valor
                ? "border-primary bg-primary/5 text-foreground font-medium"
                : "border-border bg-white text-foreground-secondary hover:border-gray-300"
            }`}
          >
            {opcion.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        {preguntaActual > 0 ? (
          <button
            onClick={handleAnterior}
            className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors"
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
