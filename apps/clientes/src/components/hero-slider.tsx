"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  Button,
  Card,
  CardContent,
} from "@kosmos/ui"
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Target,
  Filter,
  TrendingUp,
  Globe,
  PieChart,
} from "lucide-react"

const slides = [
  {
    id: 0,
    titulo: (
      <>
        Decisiones inteligentes basadas en{" "}
        <span className="text-primary">datos reales</span>, no en suposiciones
      </>
    ),
    descripcion:
      "Accede al panel de consumidores más grande de Centroamérica. Configura tu estudio en minutos y obtené resultados en tiempo real.",
    visual: "estudio",
  },
  {
    id: 1,
    titulo: (
      <>
        <span className="text-primary">Segmentación precisa</span> para llegar
        al público correcto
      </>
    ),
    descripcion:
      "Filtra por país, nivel socioeconómico, edad, género y más. Accede a panelistas reales verificados en toda Centroamérica.",
    visual: "segmentacion",
  },
  {
    id: 2,
    titulo: (
      <>
        Resultados{" "}
        <span className="text-primary">en tiempo real</span> desde el primer
        día
      </>
    ),
    descripcion:
      "Visualiza datos y exporta desde el 50% de completitud. Gráficos interactivos, KPIs automáticos y descarga en Excel.",
    visual: "resultados",
  },
]

function VisualEstudio() {
  return (
    <Card className="shadow-lg border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-foreground">
            Estudio de Satisfacción
          </h3>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
            En vivo
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="rounded-lg bg-background-gray p-3 text-center">
            <p className="text-2xl font-bold text-foreground">1,480</p>
            <p className="text-xs text-foreground-muted mt-1">Respuestas</p>
          </div>
          <div className="rounded-lg bg-background-gray p-3 text-center">
            <p className="text-2xl font-bold text-foreground">94%</p>
            <p className="text-xs text-foreground-muted mt-1">Incidencia</p>
          </div>
          <div className="rounded-lg bg-background-gray p-3 text-center">
            <p className="text-2xl font-bold text-foreground">2.4m</p>
            <p className="text-xs text-foreground-muted mt-1">Panelistas</p>
          </div>
        </div>

        <div className="rounded-lg bg-background-gray p-4">
          <p className="text-xs font-medium text-foreground-secondary mb-3">
            Distribución por edad
          </p>
          <div className="flex items-end gap-2 h-24">
            {[35, 55, 80, 95, 70, 45, 25].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-gradient-to-t from-primary to-primary-light transition-all hover:opacity-80"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {["18-24", "25-34", "35-44", "45-54", "55-64", "65+", "75+"].map(
              (label) => (
                <span key={label} className="text-[10px] text-foreground-muted">
                  {label}
                </span>
              )
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function VisualSegmentacion() {
  const filtros = [
    { icono: Globe, label: "Costa Rica", activo: true },
    { icono: Target, label: "NSE Alto", activo: true },
    { icono: Filter, label: "25-45 años", activo: false },
  ]

  const segmentos = [
    { nombre: "Adultos general", porcentaje: 62, color: "bg-primary" },
    { nombre: "Jóvenes 18-30", porcentaje: 24, color: "bg-primary-light" },
    { nombre: "NSE Alto", porcentaje: 14, color: "bg-primary/40" },
  ]

  return (
    <Card className="shadow-lg border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-foreground">Segmentación</h3>
          <span className="text-xs text-foreground-muted">3 filtros activos</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {filtros.map((f) => (
            <span
              key={f.label}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                f.activo
                  ? "bg-primary/10 text-primary"
                  : "bg-gray-100 text-foreground-secondary"
              }`}
            >
              <f.icono className="h-3 w-3" />
              {f.label}
            </span>
          ))}
        </div>

        <div className="space-y-4">
          {segmentos.map((seg) => (
            <div key={seg.nombre}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-foreground">{seg.nombre}</span>
                <span className="text-sm font-semibold text-foreground">
                  {seg.porcentaje}%
                </span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${seg.color}`}
                  style={{ width: `${seg.porcentaje}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-lg bg-background-gray p-3 text-center">
          <p className="text-2xl font-bold text-foreground">148,320</p>
          <p className="text-xs text-foreground-muted mt-0.5">
            Panelistas disponibles
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function VisualResultados() {
  const kpis = [
    { label: "Respuestas", valor: "3,240", cambio: "+12%" },
    { label: "Tasa completitud", valor: "87%", cambio: "+3%" },
  ]

  const barras = [
    { label: "Lun", valor: 65 },
    { label: "Mar", valor: 82 },
    { label: "Mié", valor: 45 },
    { label: "Jue", valor: 93 },
    { label: "Vie", valor: 78 },
  ]
  const maxVal = Math.max(...barras.map((b) => b.valor))

  return (
    <Card className="shadow-lg border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-foreground">Dashboard</h3>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
            Tiempo real
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="rounded-lg bg-background-gray p-3">
              <p className="text-xs text-foreground-muted">{kpi.label}</p>
              <div className="flex items-baseline gap-1.5 mt-1">
                <p className="text-xl font-bold text-foreground">{kpi.valor}</p>
                <span className="text-xs font-medium text-success">
                  {kpi.cambio}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-lg bg-background-gray p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-medium text-foreground-secondary">
              Recolección semanal
            </p>
            <div className="flex items-center gap-1">
              <PieChart className="h-3 w-3 text-foreground-muted" />
              <TrendingUp className="h-3 w-3 text-success" />
            </div>
          </div>
          <div className="flex items-end gap-2 h-20">
            {barras.map((b) => (
              <div key={b.label} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t transition-all ${
                    b.valor === maxVal
                      ? "bg-primary"
                      : "bg-primary/30"
                  }`}
                  style={{ height: `${(b.valor / maxVal) * 100}%` }}
                />
                <span className="text-[10px] text-foreground-muted">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === current) return
      setIsTransitioning(true)
      setCurrent(index)
      setTimeout(() => setIsTransitioning(false), 500)
    },
    [current, isTransitioning]
  )

  const next = useCallback(() => {
    goTo((current + 1) % slides.length)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length)
  }, [current, goTo])

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next])

  const slide = slides[current]

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[420px]">
        <div
          key={slide.id}
          className="animate-fade-in"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {slide.titulo}
          </h1>
          <p className="mt-6 text-lg text-foreground-secondary leading-relaxed">
            {slide.descripcion}
          </p>
          <div className="mt-8 flex items-center gap-4">
            <Link href="/registro">
              <Button size="lg">
                Prueba gratuita
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <span className="text-sm text-foreground-muted">
              5 respuestas gratis incluidas
            </span>
          </div>
        </div>

        <div
          key={`visual-${slide.id}`}
          className="relative animate-fade-in"
        >
          {slide.visual === "estudio" && <VisualEstudio />}
          {slide.visual === "segmentacion" && <VisualSegmentacion />}
          {slide.visual === "resultados" && <VisualResultados />}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-10">
        <button
          onClick={prev}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground-muted hover:bg-gray-50 hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-primary"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground-muted hover:bg-gray-50 hover:text-foreground transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  )
}
