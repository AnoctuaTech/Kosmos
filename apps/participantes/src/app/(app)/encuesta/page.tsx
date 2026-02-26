"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Card, CardContent } from "@kosmos/ui"
import { Star, CheckCircle2, PartyPopper } from "lucide-react"

interface Pregunta {
  id: string
  tipo: "seleccion_unica" | "seleccion_multiple" | "escala" | "ranking" | "texto_abierto"
  texto: string
  opciones?: string[]
  escalaMin?: number
  escalaMax?: number
}

const preguntasMock: Pregunta[] = [
  {
    id: "p1",
    tipo: "seleccion_unica",
    texto: "Cuando piensa en esta categoría de producto, ¿cuál es la primera marca que le viene a la mente?",
    opciones: ["Marca A", "Marca B", "Marca C", "Otra", "Ninguna"],
  },
  {
    id: "p2",
    tipo: "seleccion_multiple",
    texto: "¿Cuáles de las siguientes marcas ha utilizado en los últimos 3 meses?",
    opciones: ["Marca A", "Marca B", "Marca C", "Marca D", "Ninguna de las anteriores"],
  },
  {
    id: "p3",
    tipo: "escala",
    texto: "Del 1 al 10, ¿qué tan probable es que recomiende esta marca a un amigo o colega?",
    escalaMin: 1,
    escalaMax: 10,
  },
  {
    id: "p4",
    tipo: "seleccion_unica",
    texto: "¿Con qué frecuencia compra productos de esta categoría?",
    opciones: ["Diariamente", "Semanalmente", "Quincenalmente", "Mensualmente", "Casi nunca"],
  },
  {
    id: "p5",
    tipo: "texto_abierto",
    texto: "¿Qué es lo que más valora de su marca preferida en esta categoría?",
  },
]

const PUNTOS_OTORGADOS = 500

export default function EncuestaPage() {
  const router = useRouter()
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuestas, setRespuestas] = useState<Record<string, string | string[] | number>>({})
  const [finalizada, setFinalizada] = useState(false)

  const pregunta = preguntasMock[preguntaActual]
  const progreso = ((preguntaActual + (finalizada ? 1 : 0)) / preguntasMock.length) * 100
  const respuestaActual = respuestas[pregunta?.id]

  function tieneRespuesta(): boolean {
    if (!respuestaActual) return false
    if (Array.isArray(respuestaActual)) return respuestaActual.length > 0
    if (typeof respuestaActual === "string") return respuestaActual.trim().length > 0
    return true
  }

  function handleSiguiente() {
    if (preguntaActual < preguntasMock.length - 1) {
      setPreguntaActual(preguntaActual + 1)
    } else {
      setFinalizada(true)
    }
  }

  function handleAnterior() {
    if (preguntaActual > 0) setPreguntaActual(preguntaActual - 1)
  }

  if (finalizada) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-12 animate-in">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-success/10 ring-4 ring-success/5">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </div>
        <div className="flex items-center gap-1.5 mb-2">
          <PartyPopper className="h-5 w-5 text-warning" />
          <h2 className="text-xl font-semibold text-foreground">
            ¡Encuesta completada!
          </h2>
        </div>
        <p className="text-sm text-foreground-secondary mb-6 text-center">
          Gracias por participar. Tus respuestas han sido registradas.
        </p>

        <Card className="border-border/50 mb-6 w-full max-w-xs shadow-sm">
          <CardContent className="p-5 flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary/[0.06] to-primary/[0.02]">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/[0.1]">
              <Star className="h-4 w-4 text-primary fill-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">
              +{PUNTOS_OTORGADOS} puntos
            </span>
          </CardContent>
        </Card>

        <Button className="w-full max-w-xs" size="lg" onClick={() => router.push("/inicio")}>
          Volver al inicio
        </Button>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 md:px-8 max-w-lg mx-auto animate-in">
      <div className="mb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-medium text-foreground-muted uppercase tracking-wider">
            Pregunta {preguntaActual + 1} de {preguntasMock.length}
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
        <h2 className="text-[15px] font-medium text-foreground mb-5 mt-6 leading-snug">
          {pregunta.texto}
        </h2>

        {pregunta.tipo === "seleccion_unica" && (
          <div className="space-y-2 mb-6">
            {pregunta.opciones?.map((opcion) => (
              <button
                key={opcion}
                type="button"
                onClick={() =>
                  setRespuestas((prev) => ({ ...prev, [pregunta.id]: opcion }))
                }
                className={`w-full rounded-xl border-2 px-4 py-3.5 text-left text-sm transition-all duration-200 ${
                  respuestaActual === opcion
                    ? "border-primary bg-primary/5 font-medium text-foreground shadow-sm shadow-primary/5"
                    : "border-border/60 bg-white text-foreground-secondary hover:border-border hover:bg-background-gray/30"
                }`}
              >
                {opcion}
              </button>
            ))}
          </div>
        )}

        {pregunta.tipo === "seleccion_multiple" && (
          <div className="space-y-2 mb-6">
            {pregunta.opciones?.map((opcion) => {
              const seleccionadas = (respuestaActual as string[] | undefined) || []
              const activa = seleccionadas.includes(opcion)
              return (
                <button
                  key={opcion}
                  type="button"
                  onClick={() => {
                    const nuevas = activa
                      ? seleccionadas.filter((s) => s !== opcion)
                      : [...seleccionadas, opcion]
                    setRespuestas((prev) => ({ ...prev, [pregunta.id]: nuevas }))
                  }}
                  className={`w-full rounded-xl border-2 px-4 py-3.5 text-left text-sm transition-all duration-200 ${
                    activa
                      ? "border-primary bg-primary/5 font-medium text-foreground shadow-sm shadow-primary/5"
                      : "border-border/60 bg-white text-foreground-secondary hover:border-border hover:bg-background-gray/30"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={`flex h-4.5 w-4.5 items-center justify-center rounded border-2 transition-all duration-200 ${
                        activa ? "border-primary bg-primary" : "border-border"
                      }`}
                    >
                      {activa && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    {opcion}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {pregunta.tipo === "escala" && (
          <div className="mb-6">
            <div className="flex justify-between mb-2.5 text-xs text-foreground-muted">
              <span>Nada probable</span>
              <span>Muy probable</span>
            </div>
            <div className="flex gap-1.5">
              {Array.from(
                { length: (pregunta.escalaMax || 10) - (pregunta.escalaMin || 1) + 1 },
                (_, i) => (pregunta.escalaMin || 1) + i
              ).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() =>
                    setRespuestas((prev) => ({ ...prev, [pregunta.id]: n }))
                  }
                  className={`flex-1 rounded-xl border-2 py-3.5 text-center text-sm font-medium transition-all duration-200 ${
                    respuestaActual === n
                      ? "border-primary bg-primary text-white shadow-sm shadow-primary/20"
                      : "border-border/60 bg-white text-foreground-secondary hover:border-border hover:bg-background-gray/30"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}

        {pregunta.tipo === "texto_abierto" && (
          <div className="mb-6">
            <textarea
              value={(respuestaActual as string) || ""}
              onChange={(e) =>
                setRespuestas((prev) => ({
                  ...prev,
                  [pregunta.id]: e.target.value,
                }))
              }
              placeholder="Escribe tu respuesta..."
              className="w-full rounded-xl border-2 border-border/60 bg-white px-4 py-3.5 text-sm text-foreground placeholder:text-foreground-muted/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/[0.08] resize-none h-28 transition-all duration-200"
            />
          </div>
        )}
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
        <Button onClick={handleSiguiente} disabled={!tieneRespuesta()}>
          {preguntaActual === preguntasMock.length - 1 ? "Enviar" : "Siguiente"}
        </Button>
      </div>
    </div>
  )
}
