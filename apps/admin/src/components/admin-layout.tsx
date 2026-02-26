"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { AdminSidebar } from "./admin-sidebar"
import { ChevronRight, Home } from "lucide-react"

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
    <nav className="flex items-center gap-1.5 text-sm mb-6">
      <Link
        href="/dashboard"
        className="flex items-center justify-center h-6 w-6 rounded text-foreground-muted hover:text-foreground hover:bg-background-gray transition-all duration-150"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/")
        const label = breadcrumbMap[segment] || segment
        const isLast = index === segments.length - 1

        return (
          <span key={href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 text-foreground-muted/60" />
            {isLast ? (
              <span className="text-foreground font-medium">{label}</span>
            ) : (
              <Link href={href} className="text-foreground-muted hover:text-foreground transition-colors duration-150">
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
        <div className="p-8 animate-in">
          <Breadcrumb />
          {children}
        </div>
      </main>
    </div>
  )
}
