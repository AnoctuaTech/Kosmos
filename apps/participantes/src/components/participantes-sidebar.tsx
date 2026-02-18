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

export function ParticipantesSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:w-56 md:flex-col md:border-r md:border-border md:bg-white">
      <div className="p-6">
        <Link href="/inicio" className="text-xl font-bold text-foreground">
          kosmos<span className="text-primary">.</span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-2">
        {items.map((item) => {
          const activo = pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors mb-0.5",
                activo
                  ? "bg-primary/5 text-primary"
                  : "text-foreground-secondary hover:bg-gray-50 hover:text-foreground"
              )}
            >
              <Icon className="h-[18px] w-[18px]" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
