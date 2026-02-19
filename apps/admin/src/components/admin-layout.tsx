"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { AdminSidebar } from "./admin-sidebar"
import { ChevronRight } from "lucide-react"

const breadcrumbMap: Record<string, string> = {
  dashboard: "Dashboard",
  plantillas: "Plantillas",
  preguntas: "Preguntas",
  reglas: "Reglas",
  configuracion: "Configuración",
  participantes: "Participantes",
  clientes: "Clientes / Empresas",
  redenciones: "Cola de Redenciones",
  premios: "Catálogo de Premios",
  fraude: "Alertas de Fraude",
  nse: "Calibración NSE",
  excepciones: "Excepciones",
  categorias: "Categorías",
}

function Breadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length <= 1) return null

  return (
    <nav className="flex items-center gap-1 text-sm text-foreground-muted mb-6">
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/")
        const label = breadcrumbMap[segment] || segment
        const isLast = index === segments.length - 1

        return (
          <span key={href} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5" />}
            {isLast ? (
              <span className="text-foreground font-medium">{label}</span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background-gray">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <Breadcrumb />
          {children}
        </div>
      </main>
    </div>
  )
}
