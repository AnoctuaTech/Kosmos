"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Avatar, AvatarFallback } from "@kosmos/ui"
import { ChevronDown, User, LogOut } from "lucide-react"

export function ClientesAppHeader() {
  const router = useRouter()
  const [menuAbierto, setMenuAbierto] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white">
      <div className="mx-auto flex h-16 items-center justify-between px-8">
        <Link href="/estudios" className="text-xl font-bold text-foreground">
          kosmos<span className="text-primary">.</span>
        </Link>

        <div className="relative">
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-50 transition-colors"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                CK
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="h-4 w-4 text-foreground-muted" />
          </button>

          {menuAbierto && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setMenuAbierto(false)}
              />
              <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-border bg-white py-1 shadow-lg">
                <button
                  onClick={() => {
                    setMenuAbierto(false)
                    router.push("/cuenta")
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-gray-50 transition-colors"
                >
                  <User className="h-4 w-4" />
                  Tu cuenta
                </button>
                <div className="my-1 border-t border-border" />
                <button
                  onClick={() => {
                    setMenuAbierto(false)
                    router.push("/login")
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground-secondary hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesion
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
