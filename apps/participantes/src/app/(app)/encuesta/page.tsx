"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button, Card, CardContent } from "@kosmos/ui"
import { Star, CheckCircle2 } from "lucide-react"

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
    texto: "Cuando piensa en esta categoria de producto, cual es la primera marca que le viene a la mente?",
    opciones: ["Marca A", "Marca B", "Marca C", "Otra", "Ninguna"],
  },
  {
    id: "p2",
    tipo: "seleccion_multiple",
    texto: "Cuales de las siguientes marcas ha utilizado en los ultimos 3 meses?",
    opciones: ["Marca A", "Marca B", "Marca C", "Marca D", "Ninguna de las anteriores"],
  },
  {
    id: "p3",
    tipo: "escala",
    texto: "Del 1 al 10, que tan probable es que recomiende esta marca a un amigo o colega?",
    escalaMin: 1,
    escalaMax: 10,
  },
  {
    id: "p4",
    tipo: "seleccion_unica",
    texto: "Con que frecuencia compra productos de esta categoria?",
    opciones: ["Diariamente", "Semanalmente", "Quincenalmente", "Mensualmente", "Casi nunca"],
  },
  {
    id: "p5",
    tipo: "texto_abierto",
    texto: "Que es lo que mas valora de su marca preferida en esta categoria?",
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
      <div className="flex flex-col items-center justify-center px-4 py-12">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">
          Encuesta completada
        </h2>
        <p className="text-sm text-foreground-secondary mb-6 text-center">
          Gracias por participar. Tus respuestas han sido registradas.
        </p>

        <Card className="border-border mb-6 w-full max-w-xs">
          <CardContent className="p-4 flex items-center justify-center gap-2">
            <Star className="h-5 w-5 text-primary fill-primary" />
            <span className="text-lg font-bold text-foreground">
              +{PUNTOS_OTORGADOS} puntos
            </span>
          </CardContent>
        </Card>

        <Button className="w-full max-w-xs" onClick={() => router.push("/inicio")}>
          Volver al inicio
        </Button>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 md:px-8 max-w-lg mx-auto">
      <div className="mb-4 h-1.5 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${progreso}%` }}
        />
      </div>

      <p className="text-xs text-foreground-muted mb-6">
        Pregunta {preguntaActual + 1} de {preguntasMock.length}
      </p>

      <h2 className="text-base font-medium text-foreground mb-5">
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
              className={`w-full rounded-lg border-2 px-4 py-3 text-left text-sm transition-all ${
                respuestaActual === opcion
                  ? "border-primary bg-primary/5 font-medium text-foreground"
                  : "border-border bg-white text-foreground-secondary hover:border-gray-300"
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
                className={`w-full rounded-lg border-2 px-4 py-3 text-left text-sm transition-all ${
                  activa
                    ? "border-primary bg-primary/5 font-medium text-foreground"
                    : "border-border bg-white text-foreground-secondary hover:border-gray-300"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded border ${
                      activa ? "border-primary bg-primary" : "border-gray-300"
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
          <div className="flex justify-between mb-2 text-xs text-foreground-muted">
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
                className={`flex-1 rounded-lg border-2 py-3 text-center text-sm font-medium transition-all ${
                  respuestaActual === n
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-white text-foreground-secondary hover:border-gray-300"
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
            className="w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-foreground placeholder:text-foreground-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 resize-none h-28"
          />
        </div>
      )}

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
        <Button onClick={handleSiguiente} disabled={!tieneRespuesta()}>
          {preguntaActual === preguntasMock.length - 1 ? "Enviar" : "Siguiente"}
        </Button>
      </div>
    </div>
  )
}
