"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { plantillas, suscripciones, tiers } from "@kosmos/mock-data"
import { Button, Stepper, OptionCard } from "@kosmos/ui"
import {
  BarChart3,
  Lightbulb,
  Users,
  Target,
  Globe,
  TrendingUp,
  X,
} from "lucide-react"

const pasos = [
  { label: "Plantilla" },
  { label: "Segmento" },
  { label: "Volumen" },
]

const plantillasPublicadas = plantillas.filter((p) => p.estado === "publicada")

const iconosPorPlantilla: Record<string, React.ReactNode> = {
  "plt-001": <BarChart3 className="h-5 w-5" />,
  "plt-002": <Lightbulb className="h-5 w-5" />,
  "plt-003": <TrendingUp className="h-5 w-5" />,
}

const segmentos = [
  {
    id: "seg-adultos",
    nombre: "Adultos general",
    descripcion:
      "Adultos 18-55 años, todos los niveles socioeconomicos. Ideal para estudios de amplio alcance.",
    icono: <Users className="h-5 w-5" />,
  },
  {
    id: "seg-jovenes",
    nombre: "Jovenes 18-30",
    descripcion:
      "Segmento joven 18-30 años, NSE medio-alto. Perfil digital, consumo rapido.",
    icono: <Target className="h-5 w-5" />,
  },
  {
    id: "seg-premium",
    nombre: "NSE Alto",
    descripcion:
      "Adultos 25-55 años, NSE alto. Poder adquisitivo elevado, decision de compra.",
    icono: <TrendingUp className="h-5 w-5" />,
  },
  {
    id: "seg-regional",
    nombre: "Centroamerica completa",
    descripcion:
      "Todos los paises de la plataforma: Costa Rica, Panama y Guatemala. Representatividad regional.",
    icono: <Globe className="h-5 w-5" />,
  },
]

const volumenes = [
  {
    id: "vol-500",
    cantidad: 500,
    nombre: "500 respuestas",
    descripcion:
      "Ideal para estudios exploratorios y validacion inicial de hipotesis.",
  },
  {
    id: "vol-1500",
    cantidad: 1500,
    nombre: "1,500 respuestas",
    descripcion:
      "Optimo para estudios con analisis por segmentos y mayor representatividad.",
  },
  {
    id: "vol-3000",
    cantidad: 3000,
    nombre: "3,000 respuestas",
    descripcion:
      "Estudios robustos con alta confianza estadistica y multiples cortes.",
  },
  {
    id: "vol-5000",
    cantidad: 5000,
    nombre: "5,000 respuestas",
    descripcion:
      "Maxima representatividad. Para proyectos estrategicos con multiples paises.",
  },
]

const suscripcionActual = suscripciones.find(
  (s) => s.empresaId === "emp-001" && s.estado === "activa"
)
const tierActual = tiers.find((t) => t.nombre === suscripcionActual?.tier)
const saldoDisponible = suscripcionActual
  ? suscripcionActual.respuestasLimite - suscripcionActual.respuestasUsadas
  : 0

export default function NuevoEstudioPage() {
  const router = useRouter()
  const [paso, setPaso] = useState(0)
  const [plantillaId, setPlantillaId] = useState<string | null>(null)
  const [segmentoId, setSegmentoId] = useState<string | null>(null)
  const [volumenId, setVolumenId] = useState<string | null>(null)
  const [mostrarUpgrade, setMostrarUpgrade] = useState(false)

  function handleSiguiente() {
    if (paso < 2) {
      setPaso(paso + 1)
    } else {
      const volumen = volumenes.find((v) => v.id === volumenId)
      if (volumen && volumen.cantidad > saldoDisponible) {
        setMostrarUpgrade(true)
      } else {
        router.push("/estudios")
      }
    }
  }

  function handleAnterior() {
    if (paso > 0) setPaso(paso - 1)
  }

  const puedeAvanzar =
    (paso === 0 && plantillaId) ||
    (paso === 1 && segmentoId) ||
    (paso === 2 && volumenId)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-white/70 backdrop-blur-sm"
        onClick={() => router.push("/estudios")}
      />

      <div className="relative z-10 w-full max-w-[680px] rounded-2xl border border-border bg-white px-12 py-10 shadow-[0_8px_40px_rgba(0,0,0,0.12),0_2px_12px_rgba(0,0,0,0.06)]">
        <button
          onClick={() => router.push("/estudios")}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-foreground-muted hover:bg-gray-100 hover:text-foreground transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <Stepper steps={pasos} currentStep={paso} className="mb-8" />

        {paso === 0 && (
          <PasoPlantilla
            seleccionada={plantillaId}
            onSeleccionar={setPlantillaId}
          />
        )}

        {paso === 1 && (
          <PasoSegmento
            seleccionado={segmentoId}
            onSeleccionar={setSegmentoId}
          />
        )}

        {paso === 2 && (
          <PasoVolumen
            seleccionado={volumenId}
            onSeleccionar={setVolumenId}
            saldo={saldoDisponible}
          />
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          {paso > 0 ? (
            <button
              onClick={handleAnterior}
              className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors"
            >
              Anterior
            </button>
          ) : (
            <div />
          )}
          <Button
            onClick={handleSiguiente}
            disabled={!puedeAvanzar}
          >
            {paso === 2 ? "Crear estudio" : "Siguiente"}
          </Button>
        </div>
      </div>

      {mostrarUpgrade && (
        <ModalUpgrade
          saldo={saldoDisponible}
          tierNombre={tierActual?.nombre || "pro"}
          onCerrar={() => setMostrarUpgrade(false)}
          onUpgrade={() => router.push("/cuenta")}
        />
      )}
    </div>
  )
}

function PasoPlantilla({
  seleccionada,
  onSeleccionar,
}: {
  seleccionada: string | null
  onSeleccionar: (id: string | null) => void
}) {
  return (
    <div>
      <h1 className="text-[22px] font-bold text-foreground mb-1">
        Selecciona una plantilla
      </h1>
      <p className="text-sm text-foreground-secondary mb-7">
        Elige la plantilla base para tu estudio
      </p>

      <div className="grid grid-cols-2 gap-4">
        {plantillasPublicadas.map((plt) => (
          <OptionCard
            key={plt.id}
            selected={seleccionada === plt.id}
            onSelect={() => onSeleccionar(plt.id)}
            icon={iconosPorPlantilla[plt.id] || <BarChart3 className="h-5 w-5" />}
            title={plt.nombre}
            description={plt.descripcion}
          />
        ))}
      </div>
    </div>
  )
}

function PasoSegmento({
  seleccionado,
  onSeleccionar,
}: {
  seleccionado: string | null
  onSeleccionar: (id: string | null) => void
}) {
  return (
    <div>
      <h1 className="text-[22px] font-bold text-foreground mb-1">
        Define el segmento
      </h1>
      <p className="text-sm text-foreground-secondary mb-7">
        Selecciona el segmento objetivo del estudio
      </p>

      <div className="grid grid-cols-2 gap-4">
        {segmentos.map((seg) => (
          <OptionCard
            key={seg.id}
            selected={seleccionado === seg.id}
            onSelect={() => onSeleccionar(seg.id)}
            onDeselect={() => onSeleccionar(null)}
            icon={seg.icono}
            title={seg.nombre}
            description={seg.descripcion}
          />
        ))}
      </div>
    </div>
  )
}

function PasoVolumen({
  seleccionado,
  onSeleccionar,
  saldo,
}: {
  seleccionado: string | null
  onSeleccionar: (id: string | null) => void
  saldo: number
}) {
  return (
    <div>
      <h1 className="text-[22px] font-bold text-foreground mb-1">
        Selecciona el volumen
      </h1>
      <p className="text-sm text-foreground-secondary mb-7">
        Respuestas disponibles:{" "}
        <span className="font-semibold text-foreground">
          {saldo.toLocaleString()}
        </span>
      </p>

      <div className="grid grid-cols-2 gap-4">
        {volumenes.map((vol) => (
          <OptionCard
            key={vol.id}
            selected={seleccionado === vol.id}
            onSelect={() => onSeleccionar(vol.id)}
            onDeselect={() => onSeleccionar(null)}
            icon={
              <span className="text-xs font-bold">
                {vol.cantidad >= 1000
                  ? `${(vol.cantidad / 1000).toFixed(vol.cantidad % 1000 === 0 ? 0 : 1)}k`
                  : vol.cantidad}
              </span>
            }
            title={vol.nombre}
            description={vol.descripcion}
          />
        ))}
      </div>
    </div>
  )
}

function ModalUpgrade({
  saldo,
  tierNombre,
  onCerrar,
  onUpgrade,
}: {
  saldo: number
  tierNombre: string
  onCerrar: () => void
  onUpgrade: () => void
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCerrar} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-lg font-semibold text-foreground mb-2">
          Saldo insuficiente
        </h2>
        <p className="text-sm text-foreground-secondary mb-1">
          Tu plan <span className="font-medium capitalize">{tierNombre}</span>{" "}
          tiene{" "}
          <span className="font-semibold text-foreground">
            {saldo.toLocaleString()}
          </span>{" "}
          respuestas disponibles.
        </p>
        <p className="text-sm text-foreground-secondary mb-6">
          El volumen seleccionado requiere mas respuestas de las que tienes
          disponibles. Actualiza tu plan para continuar.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCerrar}
            className="text-sm font-medium text-foreground-secondary hover:text-foreground transition-colors"
          >
            Cancelar
          </button>
          <Button onClick={onUpgrade}>Actualizar plan</Button>
        </div>
      </div>
    </div>
  )
}
