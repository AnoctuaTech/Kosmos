import Link from "next/link"
import { ClientesHeader } from "../components/clientes-header"
import { HeroSlider } from "../components/hero-slider"
import {
  Button,
  Card,
  CardContent,
} from "@kosmos/ui"
import {
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
    titulo: "Estudios Ágiles",
    descripcion:
      "Usa plantillas preconfiguradas por expertos en investigación. Valida conceptos, mide satisfacción y obtené insights en minutos, no semanas.",
  },
  {
    icon: Target,
    titulo: "Segmentación Precisa",
    descripcion:
      "Filtra por país, nivel socioeconómico, edad, género y más. Accede a panelistas reales verificados en toda Centroamérica.",
  },
  {
    icon: BarChart3,
    titulo: "Resultados en Tiempo Real",
    descripcion:
      "Visualiza datos y exporta desde el 50% de completitud. Gráficos interactivos, KPIs automáticos y descarga en Excel.",
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
      "Validación por email",
      "Plantillas básicas",
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
      "Catálogo completo de plantillas",
      "Respuestas ilimitadas",
      "Usuarios ilimitados",
      "Exportación Excel avanzada",
      "Integración API",
      "Soporte prioritario",
    ],
  },
  {
    nombre: "Empresarial",
    precio: "Personalizado",
    periodo: "",
    descripcion: "Soluciones a la medida de tu organización",
    destacado: false,
    cta: "Habla con un experto",
    items: [
      "Account manager dedicado",
      "Personalización de plataforma",
      "Integraciones custom",
      "SLA garantizado",
      "Capacitación presencial",
      "Facturación local",
    ],
  },
]

const seguridad = [
  {
    icon: KeyRound,
    titulo: "Autenticación 2FA",
    descripcion: "Doble factor de verificación vía OTP por email",
  },
  {
    icon: Lock,
    titulo: "Cifrado de datos",
    descripcion: "Encriptación en tránsito y en reposo",
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

      <HeroSlider />

      <section className="bg-background-gray py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">
              Todo lo que necesitas para investigar
            </h2>
            <p className="mt-3 text-foreground-secondary max-w-2xl mx-auto">
              Desde la configuración del estudio hasta el análisis de
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
              Comenzá gratis y escalá cuando lo necesites. Sin compromisos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {planes.map((plan) => (
              <Card
                key={plan.nombre}
                className={`relative transition-all duration-200 hover:shadow-lg ${
                  plan.destacado
                    ? "border-2 border-primary shadow-xl shadow-primary/10"
                    : "border-border hover:border-border-dark"
                }`}
              >
                {plan.destacado && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-block rounded-full bg-primary px-4 py-1 text-xs font-semibold text-white">
                      Más popular
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
              Tus datos y los de tus panelistas están protegidos con los más
              altos estándares
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {seguridad.map((s) => (
              <div
                key={s.titulo}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-border shadow-sm mb-5">
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
              <span className="hover:text-foreground transition-colors duration-200 cursor-default">
                Privacidad
              </span>
              <span className="hover:text-foreground transition-colors duration-200 cursor-default">
                Términos
              </span>
              <span className="hover:text-foreground transition-colors duration-200 cursor-default">
                Contacto
              </span>
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
