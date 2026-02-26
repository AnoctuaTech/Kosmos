"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Gift, HelpCircle, Wallet, Users } from "lucide-react"
import { cn } from "@kosmos/ui"

const items = [
  { href: "/inicio", label: "Inicio", icon: Home },
  { href: "/billetera", label: "Billetera", icon: Wallet },
  { href: "/premios", label: "Premios", icon: Gift },
  { href: "/referidos", label: "Referidos", icon: Users },
  { href: "/perfil", label: "Perfil", icon: User },
  { href: "/soporte", label: "Soporte", icon: HelpCircle },
]

export function ParticipantesSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex md:w-56 md:flex-col md:border-r md:border-border/60 md:bg-white">
      <div className="p-6">
        <Link href="/inicio" className="text-xl font-bold text-foreground tracking-tight">
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
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 mb-0.5",
                activo
                  ? "bg-primary/[0.07] text-primary shadow-sm shadow-primary/5"
                  : "text-foreground-secondary hover:bg-background-gray hover:text-foreground"
              )}
            >
              <Icon className={cn(
                "h-[18px] w-[18px] transition-transform duration-200",
                !activo && "group-hover:scale-105"
              )} />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
