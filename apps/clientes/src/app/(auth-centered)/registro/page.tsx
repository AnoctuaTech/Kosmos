"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@kosmos/ui"
import { paises } from "@kosmos/mock-data"
import { Building2, User } from "lucide-react"

const industrias = [
  "Consumo masivo",
  "Comercio minorista",
  "Alimentos y bebidas",
  "Servicios financieros",
  "Tecnología",
  "Salud y farmacéutica",
  "Educación",
  "Automotriz",
  "Telecomunicaciones",
  "Otro",
]

const inputClasses =
  "w-full rounded-lg border border-border/60 bg-white px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-foreground-muted/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/[0.08] transition-all duration-200"

const selectClasses =
  "w-full rounded-lg border border-border/60 bg-white px-3.5 py-2.5 text-[15px] text-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/[0.08] transition-all duration-200 appearance-none cursor-pointer"

const labelClasses = "block text-[13px] font-medium text-foreground-secondary mb-1.5"

export default function RegistroPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    contrasena: "",
    confirmar: "",
    empresa: "",
    industria: "",
    pais: "pais-cr",
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push("/verificacion")
  }

  return (
    <div>
      <div className="text-center mb-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/[0.12] to-primary/[0.04] ring-1 ring-primary/[0.08]">
          <User className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-xl font-semibold text-foreground tracking-tight">
          Crear cuenta
        </h1>
        <p className="text-sm text-foreground-secondary mt-1.5">
          Registrá tu empresa para comenzar a investigar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="nombre" className={labelClasses}>
            Nombre completo
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Juan Pérez"
            value={form.nombre}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email corporativo
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="m@ejemplo.com"
            value={form.email}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="contrasena" className={labelClasses}>
              Contraseña
            </label>
            <input
              id="contrasena"
              name="contrasena"
              type="password"
              placeholder="••••••••"
              value={form.contrasena}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmar" className={labelClasses}>
              Repetir contraseña
            </label>
            <input
              id="confirmar"
              name="confirmar"
              type="password"
              placeholder="••••••••"
              value={form.confirmar}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
        </div>

        <div className="relative pt-4">
          <div className="absolute inset-x-0 top-0 flex items-center gap-2 px-1">
            <div className="h-px flex-1 bg-border/60" />
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground-muted">
              <Building2 className="h-3 w-3" />
              Empresa
            </div>
            <div className="h-px flex-1 bg-border/60" />
          </div>

          <div className="space-y-5 pt-4">
            <div>
              <label htmlFor="empresa" className={labelClasses}>
                Nombre de la empresa
              </label>
              <input
                id="empresa"
                name="empresa"
                type="text"
                placeholder="Acme Corp"
                value={form.empresa}
                onChange={handleChange}
                className={inputClasses}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="industria" className={labelClasses}>
                  Industria
                </label>
                <select
                  id="industria"
                  name="industria"
                  value={form.industria}
                  onChange={handleChange}
                  className={selectClasses}
                  required
                >
                  <option value="" disabled>
                    Seleccionar
                  </option>
                  {industrias.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="pais" className={labelClasses}>
                  País
                </label>
                <select
                  id="pais"
                  name="pais"
                  value={form.pais}
                  onChange={handleChange}
                  className={selectClasses}
                  required
                >
                  {paises.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full mt-2" size="lg">
          Crear cuenta
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground-secondary">
        ¿Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:text-primary-dark transition-colors duration-200"
        >
          Iniciar sesión
        </Link>
      </p>
    </div>
  )
}
