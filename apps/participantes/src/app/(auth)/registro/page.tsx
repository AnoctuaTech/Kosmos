"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@kosmos/ui"
import { paises } from "@kosmos/mock-data"

const inputClasses =
  "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-[15px] text-foreground placeholder:text-foreground-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-colors"

const labelClasses = "block text-[13px] font-medium text-foreground-secondary mb-1"

export default function RegistroPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    pais: "",
    nombre: "",
    apellidos: "",
    cedula: "",
    email: "",
    contrasena: "",
    codigoReferido: "",
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
      <h2 className="text-xl font-semibold text-foreground mb-1 text-center">
        Crear cuenta
      </h2>
      <p className="text-sm text-foreground-secondary mb-6 text-center">
        Participa en estudios y gana recompensas
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="pais" className={labelClasses}>
            Pais
          </label>
          <select
            id="pais"
            name="pais"
            value={form.pais}
            onChange={handleChange}
            className={inputClasses}
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

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="nombre" className={labelClasses}>
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Carlos"
              value={form.nombre}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
          <div>
            <label htmlFor="apellidos" className={labelClasses}>
              Apellidos
            </label>
            <input
              id="apellidos"
              name="apellidos"
              type="text"
              placeholder="Ramirez Solis"
              value={form.apellidos}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="cedula" className={labelClasses}>
            Cedula / ID nacional
          </label>
          <input
            id="cedula"
            name="cedula"
            type="text"
            placeholder="1-0123-0456"
            value={form.cedula}
            onChange={handleChange}
            className={inputClasses}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="carlos@ejemplo.com"
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
          <label htmlFor="codigoReferido" className={labelClasses}>
            Codigo de referido{" "}
            <span className="text-foreground-muted font-normal">(opcional)</span>
          </label>
          <input
            id="codigoReferido"
            name="codigoReferido"
            type="text"
            placeholder="ABC123"
            value={form.codigoReferido}
            onChange={handleChange}
            className={inputClasses}
          />
        </div>

        <Button type="submit" className="w-full" size="lg">
          Crear cuenta
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-foreground-secondary">
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
