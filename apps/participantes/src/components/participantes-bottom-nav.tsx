"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Gift, HelpCircle } from "lucide-react"
import { cn } from "@kosmos/ui"

const items = [
  { href: "/inicio", label: "Inicio", icon: Home },
  { href: "/perfil", label: "Perfil", icon: User },
  { href: "/premios", label: "Premios", icon: Gift },
  { href: "/soporte", label: "Soporte", icon: HelpCircle },
]

export function ParticipantesBottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border/60 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {items.map((item) => {
          const activo = pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 transition-all duration-200 relative",
                activo
                  ? "text-primary"
                  : "text-foreground-muted hover:text-foreground-secondary"
              )}
            >
              {activo && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-primary" />
              )}
              <Icon className="h-5 w-5" />
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
