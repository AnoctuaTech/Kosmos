"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@kosmos/ui"
import { LogIn } from "lucide-react"

const inputClasses =
  "w-full rounded-lg border border-border/60 bg-white px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-foreground-muted/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/[0.08] transition-all duration-200"

const labelClasses = "block text-[13px] font-medium text-foreground-secondary mb-1.5"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [contrasena, setContrasena] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push("/inicio")
  }

  return (
    <div>
      <div className="text-center mb-6">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/[0.12] to-primary/[0.04] ring-1 ring-primary/[0.08]">
          <LogIn className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground tracking-tight">
          Iniciar sesión
        </h2>
        <p className="text-sm text-foreground-secondary mt-1">
          Ingresá tus credenciales para continuar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="carlos@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="contrasena" className={labelClasses}>
            Contraseña
          </label>
          <input
            id="contrasena"
            type="password"
            placeholder="••••••••"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className={inputClasses}
            required
          />
        </div>

        <Button type="submit" className="w-full" size="lg">
          Iniciar sesión
        </Button>
      </form>

      <p className="mt-5 text-center text-sm text-foreground-secondary">
        ¿No tienes cuenta?{" "}
        <Link
          href="/registro"
          className="font-medium text-primary hover:text-primary-dark transition-colors duration-200"
        >
          Crear cuenta
        </Link>
      </p>
    </div>
  )
}
