"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Wallet,
  Gift,
  ShieldAlert,
  SlidersHorizontal,
  ClipboardList,
  FolderOpen,
} from "lucide-react"
import { cn } from "@kosmos/ui"
import { redenciones, alertasFraude } from "@kosmos/mock-data"

const redencionesPendientes = redenciones.filter(
  (r) => r.estado === "pendiente" || r.estado === "procesando"
).length

const alertasAltoRiesgo = alertasFraude.filter(
  (a) => a.nivelRiesgo === "alto" && !a.resuelta
).length

const navigation = [
  {
    section: "Principal",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    section: "Fábrica",
    items: [
      { label: "Plantillas", href: "/plantillas", icon: FileText },
      { label: "Categorías", href: "/categorias", icon: FolderOpen },
    ],
  },
  {
    section: "Gestión",
    items: [
      { label: "Participantes", href: "/participantes", icon: Users },
      { label: "Clientes / Empresas", href: "/clientes", icon: Building2 },
    ],
  },
  {
    section: "Tesorería",
    items: [
      { label: "Cola de Redenciones", href: "/redenciones", icon: Wallet, badge: redencionesPendientes },
      { label: "Catálogo de Premios", href: "/premios", icon: Gift },
    ],
  },
  {
    section: "Control",
    items: [
      { label: "Alertas de Fraude", href: "/fraude", icon: ShieldAlert, badge: alertasAltoRiesgo },
      { label: "Calibración NSE", href: "/nse", icon: SlidersHorizontal },
      { label: "Excepciones", href: "/excepciones", icon: ClipboardList },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-screen w-[260px] shrink-0 flex-col border-r border-border bg-white">
      <div className="flex h-16 items-center px-6 border-b border-border">
        <Link href="/dashboard" className="text-xl font-bold text-foreground">
          kosmos<span className="text-primary">.</span>
        </Link>
        <span className="ml-2 text-xs font-medium text-foreground-muted uppercase tracking-wider">
          Admin
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {navigation.map((group) => (
          <div key={group.section} className="mb-2">
            <div className="px-6 py-2 text-[11px] font-semibold uppercase tracking-wider text-foreground-muted">
              {group.section}
            </div>
            {group.items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href))

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-6 py-2.5 text-sm transition-colors border-l-[3px] border-transparent",
                    isActive
                      ? "bg-primary/5 border-l-primary text-primary font-medium"
                      : "text-foreground-secondary hover:bg-background-gray hover:text-foreground"
                  )}
                >
                  <item.icon className="h-[18px] w-[18px] shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {"badge" in item && item.badge && item.badge > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-error px-1.5 text-[11px] font-semibold text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
            SA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Super Admin</p>
            <p className="text-xs text-foreground-muted truncate">admin@kosmos.com</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
