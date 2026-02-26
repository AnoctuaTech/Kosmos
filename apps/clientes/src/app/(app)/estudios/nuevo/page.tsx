"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  plantillas,
  categorias,
  categoriaCuestionarios,
  muestraRecomendada,
  creditosEstimados,
  suscripciones,
  tiers,
} from "@kosmos/mock-data"
import { Button, Stepper, OptionCard } from "@kosmos/ui"
import {
  BarChart3,
  Lightbulb,
  Users,
  Target,
  Globe,
  TrendingUp,
  X,
  FileText,
  DollarSign,
} from "lucide-react"

const pasos = [
  { label: "Categoría" },
  { label: "Cuestionario" },
  { label: "Segmento" },
  { label: "Costos" },
]

const categoriasWizard = [
  {
    id: "cat-001",
    nombre: "Salud de Marca",
    descripcion: "Medir reconocimiento, lealtad y percepción de marca",
    icono: <BarChart3 className="h-5 w-5" />,
  },
  {
    id: "cat-002",
    nombre: "Prueba de Concepto",
    descripcion: "Evaluar aceptación de nuevos productos o ideas",
    icono: <Lightbulb className="h-5 w-5" />,
  },
  {
    id: "cat-003",
    nombre: "Satisfacción del Cliente",
    descripcion: "Medir niveles de satisfacción y experiencia",
    icono: <Users className="h-5 w-5" />,
  },
  {
    id: "cat-004",
    nombre: "Hábitos de Consumo",
    descripcion: "Entender patrones de compra y consumo",
    icono: <TrendingUp className="h-5 w-5" />,
  },
]

const segmentos = [
  {
    id: "seg-adultos",
    nombre: "Adultos general",
    descripcion:
      "Adultos 18-55 años, todos los niveles socioeconómicos. Ideal para estudios de amplio alcance.",
    icono: <Users className="h-5 w-5" />,
    maxRespuestas: 12500,
  },
  {
    id: "seg-jovenes",
    nombre: "Jóvenes 18-30",
    descripcion:
      "Segmento joven 18-30 años, NSE medio-alto. Perfil digital, consumo rápido.",
    icono: <Target className="h-5 w-5" />,
    maxRespuestas: 4800,
  },
  {
    id: "seg-premium",
    nombre: "NSE Alto",
    descripcion:
      "Adultos 25-55 años, NSE alto. Poder adquisitivo elevado, decisión de compra.",
    icono: <TrendingUp className="h-5 w-5" />,
    maxRespuestas: 2100,
  },
  {
    id: "seg-regional",
    nombre: "Centroamérica completa",
    descripcion:
      "Todos los países de la plataforma: Costa Rica, Panamá y Guatemala. Representatividad regional.",
    icono: <Globe className="h-5 w-5" />,
    maxRespuestas: 18000,
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
  const [categoriaId, setCategoriaId] = useState<string | null>(null)
  const [plantillaId, setPlantillaId] = useState<string | null>(null)
  const [segmentoId, setSegmentoId] = useState<string | null>(null)
  const [mostrarUpgrade, setMostrarUpgrade] = useState(false)

  function handleSiguiente() {
    if (paso < 3) {
      setPaso(paso + 1)
    } else {
      const costos = plantillaId ? creditosEstimados[plantillaId] : null
      if (costos && costos.max > saldoDisponible) {
        setMostrarUpgrade(true)
      } else {
        router.push("/estudios")
      }
    }
  }

  function handleAnterior() {
    if (paso > 0) {
      if (paso === 1) {
        setPlantillaId(null)
      }
      setPaso(paso - 1)
    }
  }

  const puedeAvanzar =
    (paso === 0 && categoriaId) ||
    (paso === 1 && plantillaId) ||
    (paso === 2 && segmentoId) ||
    paso === 3

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
          <div className="animate-in" key="paso-0"><PasoCategoria
            seleccionada={categoriaId}
            onSeleccionar={(id) => {
              setCategoriaId(id)
              if (id !== categoriaId) setPlantillaId(null)
            }}
          /></div>
        )}

        {paso === 1 && (
          <div className="animate-in" key="paso-1"><PasoCuestionario
            categoriaId={categoriaId!}
            seleccionado={plantillaId}
            onSeleccionar={setPlantillaId}
          /></div>
        )}

        {paso === 2 && (
          <div className="animate-in" key="paso-2"><PasoSegmento
            seleccionado={segmentoId}
            onSeleccionar={setSegmentoId}
          /></div>
        )}

        {paso === 3 && (
          <div className="animate-in" key="paso-3"><PasoCostos
            categoriaId={categoriaId!}
            plantillaId={plantillaId!}
            segmentoId={segmentoId!}
            saldo={saldoDisponible}
          /></div>
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
            {paso === 3 ? "Crear estudio" : "Siguiente"}
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

function PasoCategoria({
  seleccionada,
  onSeleccionar,
}: {
  seleccionada: string | null
  onSeleccionar: (id: string | null) => void
}) {
  return (
    <div>
      <h1 className="text-[22px] font-bold text-foreground mb-1">
        Selecciona el tipo de estudio
      </h1>
      <p className="text-sm text-foreground-secondary mb-7">
        Elige la categoría de investigación
      </p>

      <div className="grid grid-cols-2 gap-4">
        {categoriasWizard.map((cat) => (
          <OptionCard
            key={cat.id}
            selected={seleccionada === cat.id}
            onSelect={() => onSeleccionar(cat.id)}
            icon={cat.icono}
            title={cat.nombre}
            description={cat.descripcion}
          />
        ))}
      </div>
    </div>
  )
}

function PasoCuestionario({
  categoriaId,
  seleccionado,
  onSeleccionar,
}: {
  categoriaId: string
  seleccionado: string | null
  onSeleccionar: (id: string | null) => void
}) {
  const categoriaNombre =
    categorias.find((c) => c.id === categoriaId)?.nombre || ""

  const cuestionariosDisponibles = useMemo(() => {
    const ids = categoriaCuestionarios[categoriaId] || []
    return plantillas.filter((p) => ids.includes(p.id))
  }, [categoriaId])

  const iconosPorPlantilla: Record<string, React.ReactNode> = {
    "plt-001": <BarChart3 className="h-5 w-5" />,
    "plt-002": <Lightbulb className="h-5 w-5" />,
    "plt-003": <Users className="h-5 w-5" />,
    "plt-004": <TrendingUp className="h-5 w-5" />,
    "plt-005": <FileText className="h-5 w-5" />,
    "plt-006": <DollarSign className="h-5 w-5" />,
  }

  return (
    <div>
      <h1 className="text-[22px] font-bold text-foreground mb-1">
        Selecciona el cuestionario
      </h1>
      <p className="text-sm text-foreground-secondary mb-7">
        Cuestionarios disponibles en {categoriaNombre}
      </p>

      <div className="grid grid-cols-1 gap-4">
        {cuestionariosDisponibles.map((plt) => {
          const muestra = muestraRecomendada[plt.id] || 500
          const creditos = creditosEstimados[plt.id] || { min: 300, max: 600 }
          return (
            <OptionCard
              key={plt.id}
              selected={seleccionado === plt.id}
              onSelect={() => onSeleccionar(plt.id)}
              icon={iconosPorPlantilla[plt.id] || <FileText className="h-5 w-5" />}
              title={plt.nombre}
              description={
                <>
                  {plt.descripcion}
                  <span className="block mt-1.5 text-xs text-foreground-muted">
                    Muestra recomendada: {muestra.toLocaleString()} respuestas
                    &nbsp;·&nbsp; {creditos.min.toLocaleString()}-
                    {creditos.max.toLocaleString()} créditos estimados
                  </span>
                </>
              }
            />
          )
        })}
        {cuestionariosDisponibles.length === 0 && (
          <p className="text-sm text-foreground-muted text-center py-8">
            No hay cuestionarios disponibles para esta categoría.
          </p>
        )}
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
        Grupos recomendados por UNIMER para este estudio
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
            description={
              <>
                {seg.descripcion}
                <span className="block mt-1.5 text-xs text-foreground-muted">
                  Max. respuestas posibles: {seg.maxRespuestas.toLocaleString()}
                </span>
              </>
            }
          />
        ))}
      </div>
    </div>
  )
}

function PasoCostos({
  categoriaId,
  plantillaId,
  segmentoId,
  saldo,
}: {
  categoriaId: string
  plantillaId: string
  segmentoId: string
  saldo: number
}) {
  const categoria = categoriasWizard.find((c) => c.id === categoriaId)
  const plantilla = plantillas.find((p) => p.id === plantillaId)
  const segmento = segmentos.find((s) => s.id === segmentoId)
  const creditos = creditosEstimados[plantillaId] || { min: 300, max: 600 }
  const promedio = Math.round((creditos.min + creditos.max) / 2)

  return (
    <div>
      <h1 className="text-[22px] font-bold text-foreground mb-1">
        Costos estimados
      </h1>
      <p className="text-sm text-foreground-secondary mb-7">
        Estimación de créditos para este estudio
      </p>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 rounded-lg bg-background-gray px-4 py-3">
          <span className="text-xs font-medium text-foreground-muted w-24 shrink-0">
            Categoría
          </span>
          <span className="text-sm font-medium text-foreground">
            {categoria?.nombre}
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-background-gray px-4 py-3">
          <span className="text-xs font-medium text-foreground-muted w-24 shrink-0">
            Cuestionario
          </span>
          <span className="text-sm font-medium text-foreground">
            {plantilla?.nombre}
          </span>
        </div>
        <div className="flex items-center gap-3 rounded-lg bg-background-gray px-4 py-3">
          <span className="text-xs font-medium text-foreground-muted w-24 shrink-0">
            Segmento
          </span>
          <span className="text-sm font-medium text-foreground">
            {segmento?.nombre}
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-border p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground-secondary">
              Costo estimado
            </span>
            <span className="text-sm font-semibold text-foreground">
              {creditos.min.toLocaleString()} - {creditos.max.toLocaleString()}{" "}
              créditos
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground-secondary">
              Promedio esperado
            </span>
            <span className="text-sm font-semibold text-foreground">
              ~{promedio.toLocaleString()} créditos
            </span>
          </div>
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground-secondary">
                Créditos disponibles
              </span>
              <span
                className={`text-sm font-semibold ${
                  saldo >= creditos.max
                    ? "text-success"
                    : saldo >= creditos.min
                      ? "text-warning"
                      : "text-error"
                }`}
              >
                {saldo.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
        <p className="mt-4 text-xs text-foreground-muted">
          El costo final depende de la tasa de respuesta del estudio.
        </p>
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
          El volumen seleccionado requiere más respuestas de las que tienes
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
