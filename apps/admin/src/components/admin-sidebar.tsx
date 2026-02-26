"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"
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
  LogOut,
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
  const router = useRouter()

  return (
    <aside className="flex h-screen w-[260px] shrink-0 flex-col bg-white shadow-[1px_0_0_0_#e5e7eb,4px_0_12px_-4px_rgba(0,0,0,0.05)]">
      <div className="flex h-16 items-center gap-2 px-6">
        <Link href="/dashboard" className="text-xl font-bold text-foreground tracking-tight transition-opacity hover:opacity-80">
          kosmos<span className="text-primary">.</span>
        </Link>
        <span className="rounded-md bg-background-gray px-2 py-0.5 text-[10px] font-semibold text-foreground-muted uppercase tracking-wider">
          Admin
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-2">
        {navigation.map((group, groupIdx) => (
          <div key={group.section} className={cn(groupIdx > 0 && "mt-3 pt-3 border-t border-border/30")}>
            <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-foreground-muted/70">
              {group.section}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                      isActive
                        ? "bg-primary/[0.07] text-primary font-medium shadow-sm shadow-primary/5"
                        : "text-foreground-secondary hover:bg-background-gray hover:text-foreground"
                    )}
                  >
                    <item.icon className={cn(
                      "h-[18px] w-[18px] shrink-0 transition-transform duration-200",
                      !isActive && "group-hover:scale-105"
                    )} />
                    <span className="flex-1 truncate">{item.label}</span>
                    {"badge" in item && item.badge && item.badge > 0 && (
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-error px-1.5 text-[11px] font-semibold text-white shadow-sm shadow-error/20">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-border/60 p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-background-gray">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 text-xs font-semibold text-primary ring-2 ring-primary/10">
            SA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Super Admin</p>
            <p className="text-xs text-foreground-muted truncate">admin@kosmos.com</p>
          </div>
          <button
            onClick={() => router.push("/login")}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground-muted hover:text-error hover:bg-error/5 transition-all duration-150"
            title="Cerrar sesión"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
