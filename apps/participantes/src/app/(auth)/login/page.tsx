"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@kosmos/ui"

const inputClasses =
  "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-[15px] text-foreground placeholder:text-foreground-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-colors"

const labelClasses = "block text-[13px] font-medium text-foreground-secondary mb-1"

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
      <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
        Iniciar sesion
      </h2>

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
            Contrasena
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
          Iniciar sesion
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-foreground-secondary">
        No tienes cuenta?{" "}
        <Link
          href="/registro"
          className="font-medium text-primary hover:text-primary-dark"
        >
          Crear cuenta
        </Link>
      </p>
    </div>
  )
}
