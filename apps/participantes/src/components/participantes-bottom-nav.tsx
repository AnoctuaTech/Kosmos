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
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white md:hidden">
      <div className="flex h-16 items-center justify-around px-2">
        {items.map((item) => {
          const activo = pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 transition-colors",
                activo
                  ? "text-primary"
                  : "text-foreground-muted hover:text-foreground-secondary"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[11px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
