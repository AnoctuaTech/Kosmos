import Link from "next/link"
import { ClientesHeader } from "../components/clientes-header"
import {
  Button,
  Card,
  CardContent,
} from "@kosmos/ui"
import {
  ArrowRight,
  BarChart3,
  Target,
  Zap,
  Check,
  Shield,
  Lock,
  KeyRound,
} from "lucide-react"

const features = [
  {
    icon: Zap,
    titulo: "Estudios Agiles",
    descripcion:
      "Usa plantillas preconfiguradas por expertos en investigacion. Valida conceptos, mide satisfaccion y obtene insights en minutos, no semanas.",
  },
  {
    icon: Target,
    titulo: "Segmentacion Precisa",
    descripcion:
      "Filtra por pais, nivel socioeconomico, edad, genero y mas. Accede a panelistas reales verificados en toda Centroamerica.",
  },
  {
    icon: BarChart3,
    titulo: "Resultados en Tiempo Real",
    descripcion:
      "Visualiza datos y exporta desde el 50% de completitud. Graficos interactivos, KPIs automaticos y descarga en Excel.",
  },
]

const planes = [
  {
    nombre: "Freemium",
    precio: "$0",
    periodo: "/mes",
    descripcion: "Perfecto para explorar la plataforma",
    destacado: false,
    cta: "Comenzar gratis",
    items: [
      "Hasta 5 respuestas de prueba",
      "1 usuario colaborador",
      "Validacion por email",
      "Plantillas basicas",
      "Soporte por email",
    ],
  },
  {
    nombre: "Profesional",
    precio: "$2,000",
    periodo: "USD /mes",
    descripcion: "Para equipos que necesitan datos continuos",
    destacado: true,
    cta: "Contratar plan",
    items: [
      "Catalogo completo de plantillas",
      "Respuestas ilimitadas",
      "Usuarios ilimitados",
      "Exportacion Excel avanzada",
      "Integracion API",
      "Soporte prioritario",
    ],
  },
  {
    nombre: "Empresarial",
    precio: "Personalizado",
    periodo: "",
    descripcion: "Soluciones a la medida de tu organizacion",
    destacado: false,
    cta: "Habla con un experto",
    items: [
      "Account manager dedicado",
      "Personalizacion de plataforma",
      "Integraciones custom",
      "SLA garantizado",
      "Capacitacion presencial",
      "Facturacion local",
    ],
  },
]

const seguridad = [
  {
    icon: KeyRound,
    titulo: "Autenticacion 2FA",
    descripcion: "Doble factor de verificacion via OTP por email",
  },
  {
    icon: Lock,
    titulo: "Cifrado de datos",
    descripcion: "Encriptacion en transito y en reposo",
  },
  {
    icon: Shield,
    titulo: "Acceso restringido",
    descripcion: "Control de acceso por cuentas corporativas",
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <ClientesHeader />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Decisiones inteligentes basadas en{" "}
              <span className="text-primary">datos reales</span>, no en
              suposiciones
            </h1>
            <p className="mt-6 text-lg text-foreground-secondary leading-relaxed">
              Accede al panel de consumidores mas grande de Centroamerica.
              Configura tu estudio en minutos y obtene resultados en tiempo
              real.
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

          <div className="relative">
            <Card className="shadow-lg border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground">
                    Estudio de Satisfaccion
                  </h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    En vivo
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="rounded-lg bg-background-gray p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">1,480</p>
                    <p className="text-xs text-foreground-muted mt-1">
                      Respuestas
                    </p>
                  </div>
                  <div className="rounded-lg bg-background-gray p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">94%</p>
                    <p className="text-xs text-foreground-muted mt-1">
                      Incidencia
                    </p>
                  </div>
                  <div className="rounded-lg bg-background-gray p-3 text-center">
                    <p className="text-2xl font-bold text-foreground">2.4m</p>
                    <p className="text-xs text-foreground-muted mt-1">
                      Panelistas
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-background-gray p-4">
                  <p className="text-xs font-medium text-foreground-secondary mb-3">
                    Distribucion por edad
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
                    <span className="text-[10px] text-foreground-muted">
                      18-24
                    </span>
                    <span className="text-[10px] text-foreground-muted">
                      25-34
                    </span>
                    <span className="text-[10px] text-foreground-muted">
                      35-44
                    </span>
                    <span className="text-[10px] text-foreground-muted">
                      45-54
                    </span>
                    <span className="text-[10px] text-foreground-muted">
                      55-64
                    </span>
                    <span className="text-[10px] text-foreground-muted">
                      65+
                    </span>
                    <span className="text-[10px] text-foreground-muted">
                      75+
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-background-gray py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">
              Todo lo que necesitas para investigar
            </h2>
            <p className="mt-3 text-foreground-secondary max-w-2xl mx-auto">
              Desde la configuracion del estudio hasta el analisis de
              resultados, en una sola plataforma
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <Card key={f.titulo} className="bg-white">
                <CardContent className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 mb-5">
                    <f.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {f.titulo}
                  </h3>
                  <p className="text-sm text-foreground-secondary leading-relaxed">
                    {f.descripcion}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="planes" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">
              Planes que se adaptan a tu negocio
            </h2>
            <p className="mt-3 text-foreground-secondary max-w-2xl mx-auto">
              Comenza gratis y escala cuando lo necesites. Sin compromisos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {planes.map((plan) => (
              <Card
                key={plan.nombre}
                className={`relative ${
                  plan.destacado
                    ? "border-2 border-primary shadow-lg"
                    : "border-border"
                }`}
              >
                {plan.destacado && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white">
                      Mas popular
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold text-foreground">
                    {plan.nombre}
                  </h3>
                  <p className="text-sm text-foreground-secondary mt-1">
                    {plan.descripcion}
                  </p>

                  <div className="mt-6 mb-6">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.precio}
                    </span>
                    {plan.periodo && (
                      <span className="text-foreground-muted ml-1">
                        {plan.periodo}
                      </span>
                    )}
                  </div>

                  <Link href="/registro">
                    <Button
                      className="w-full"
                      variant={plan.destacado ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>

                  <ul className="mt-8 space-y-3">
                    {plan.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-foreground-secondary"
                      >
                        <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-gray py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">
              Seguridad de grado empresarial
            </h2>
            <p className="mt-3 text-foreground-secondary max-w-2xl mx-auto">
              Tus datos y los de tus panelistas estan protegidos con los mas
              altos estandares
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {seguridad.map((s) => (
              <div
                key={s.titulo}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-border shadow-sm mb-4">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{s.titulo}</h3>
                <p className="mt-2 text-sm text-foreground-secondary">
                  {s.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-lg font-bold text-foreground">
              kosmos<span className="text-primary">.</span>
            </span>
            <div className="flex items-center gap-6 text-sm text-foreground-secondary">
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Terminos
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Contacto
              </Link>
            </div>
            <p className="text-sm text-foreground-muted">
              &copy; 2026 Kosmos. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
