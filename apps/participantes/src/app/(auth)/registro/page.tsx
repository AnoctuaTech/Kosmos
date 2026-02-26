"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@kosmos/ui"
import { paises } from "@kosmos/mock-data"
import { UserPlus } from "lucide-react"

const inputClasses =
  "w-full rounded-lg border border-border/60 bg-white px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-foreground-muted/50 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/[0.08] transition-all duration-200"

const labelClasses = "block text-[13px] font-medium text-foreground-secondary mb-1.5"

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
      <div className="text-center mb-6">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/[0.12] to-primary/[0.04] ring-1 ring-primary/[0.08]">
          <UserPlus className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold text-foreground tracking-tight">
          Crear cuenta
        </h2>
        <p className="text-sm text-foreground-secondary mt-1">
          Participá en estudios y ganá recompensas
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="pais" className={labelClasses}>
            País
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
              Seleccionar país
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
              placeholder="Ramírez Solís"
              value={form.apellidos}
              onChange={handleChange}
              className={inputClasses}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="cedula" className={labelClasses}>
            Cédula / ID nacional
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
          <label htmlFor="codigoReferido" className={labelClasses}>
            Código de referido{" "}
            <span className="text-foreground-muted/70 font-normal">(opcional)</span>
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

      <p className="mt-5 text-center text-sm text-foreground-secondary">
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
