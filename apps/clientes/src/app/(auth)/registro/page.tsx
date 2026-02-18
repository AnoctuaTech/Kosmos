"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@kosmos/ui"
import { paises } from "@kosmos/mock-data"

const industrias = [
  "Consumo masivo",
  "Comercio minorista",
  "Alimentos y bebidas",
  "Servicios financieros",
  "Tecnologia",
  "Salud y farmaceutica",
  "Educacion",
  "Automotriz",
  "Telecomunicaciones",
  "Otro",
]

const inputClasses =
  "w-full border-0 border-b border-border bg-transparent px-0 py-2.5 text-[15px] text-foreground placeholder:text-foreground-muted focus:border-b-primary focus:outline-none focus:ring-0 transition-colors"

const selectClasses =
  "w-full border-0 border-b border-border bg-transparent px-0 py-2.5 text-[15px] text-foreground focus:border-b-primary focus:outline-none focus:ring-0 transition-colors appearance-none cursor-pointer"

const labelClasses = "block text-[13px] font-medium text-foreground-secondary"

export default function RegistroPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    contrasena: "",
    confirmar: "",
    empresa: "",
    industria: "",
    pais: "",
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
      <h1 className="text-2xl font-semibold text-foreground mb-10">
        Crear cuenta
      </h1>

      <form onSubmit={handleSubmit} className="space-y-7">
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

        <div>
          <label htmlFor="contrasena" className={labelClasses}>
            Contrasena
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
            Repetir contrasena
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

        <div className="pt-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-5">
            Datos de la empresa
          </p>

          <div className="space-y-7">
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
                  Seleccionar industria
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
                Pais
              </label>
              <select
                id="pais"
                name="pais"
                value={form.pais}
                onChange={handleChange}
                className={selectClasses}
                required
              >
                <option value="" disabled>
                  Seleccionar pais
                </option>
                {paises.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full mt-4" size="lg">
          Crear cuenta
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground-secondary">
        Ya tienes cuenta?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:text-primary-dark"
        >
          Inicia sesion
        </Link>
      </p>
    </div>
  )
}
