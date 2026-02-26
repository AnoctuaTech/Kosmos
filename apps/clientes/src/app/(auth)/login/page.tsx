"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@kosmos/ui"
import { ArrowRight, Mail, RotateCw } from "lucide-react"

const inputClasses =
  "w-full border-0 border-b-2 border-border/50 bg-transparent px-0 py-3 text-[15px] text-foreground placeholder:text-foreground-muted/50 focus:border-b-primary focus:outline-none focus:ring-0 transition-colors duration-300"

const labelClasses = "block text-[13px] font-medium text-foreground-secondary mb-1"

export default function LoginPage() {
  const router = useRouter()
  const [paso, setPaso] = useState<"credenciales" | "otp">("credenciales")
  const [email, setEmail] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [codigo, setCodigo] = useState(["", "", "", ""])
  const [reenviado, setReenviado] = useState(false)
  const [recordar, setRecordar] = useState(false)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setPaso("otp")
  }

  function handleOTPChange(index: number, value: string) {
    if (value.length > 1) return
    const nuevo = [...codigo]
    nuevo[index] = value
    setCodigo(nuevo)
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !codigo[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault()
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4)
    if (!text) return
    const nuevo = [...codigo]
    for (let i = 0; i < text.length; i++) {
      nuevo[i] = text[i]
    }
    setCodigo(nuevo)
    const focusIndex = Math.min(text.length, 3)
    inputsRef.current[focusIndex]?.focus()
  }

  function handleVerificar(e: React.FormEvent) {
    e.preventDefault()
    router.push("/estudios")
  }

  function handleReenviar() {
    setReenviado(true)
    setTimeout(() => setReenviado(false), 3000)
  }

  if (paso === "otp") {
    return (
      <div className="animate-in">
        <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/[0.08] mb-6">
          <Mail className="w-5 h-5 text-primary" />
        </div>
        <h1 className="text-[22px] font-semibold text-foreground mb-2 tracking-tight">
          Verificación de acceso
        </h1>
        <p className="text-sm text-foreground-secondary leading-relaxed mb-10">
          Enviamos un código de verificación a{" "}
          <span className="text-foreground font-medium">
            {email || "m@ejemplo.com"}
          </span>
        </p>

        <form onSubmit={handleVerificar}>
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label className="text-[13px] font-medium text-foreground-secondary">
                Código OTP
              </label>
              <button
                type="button"
                onClick={handleReenviar}
                className="flex items-center gap-1.5 text-[13px] text-foreground-muted hover:text-primary transition-colors duration-200"
              >
                <RotateCw className="h-3 w-3" />
                {reenviado ? "Código reenviado" : "Reenviar código"}
              </button>
            </div>

            <div className="flex gap-3" onPaste={handlePaste}>
              {codigo.map((digito, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputsRef.current[i] = el
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digito}
                  onChange={(e) => handleOTPChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="h-14 w-14 rounded-lg border-2 border-border/50 bg-background-gray/30 text-center text-xl font-semibold text-foreground focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/[0.08] transition-all duration-200"
                />
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2.5 mb-8 cursor-pointer group">
            <input
              type="checkbox"
              checked={recordar}
              onChange={(e) => setRecordar(e.target.checked)}
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20 transition-colors"
            />
            <span className="text-sm text-foreground-secondary group-hover:text-foreground transition-colors duration-200">
              Recordar en este equipo
            </span>
          </label>

          <Button type="submit" className="w-full" size="lg">
            Iniciar sesión
          </Button>

          <button
            type="button"
            onClick={() => {
              setPaso("credenciales")
              setCodigo(["", "", "", ""])
            }}
            className="mt-5 w-full text-center text-sm text-foreground-muted hover:text-foreground transition-colors duration-200"
          >
            Volver al login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-[26px] font-semibold text-foreground tracking-tight mb-2">
        Bienvenido de vuelta
      </h1>
      <p className="text-[15px] text-foreground-secondary mb-10">
        Ingresá tus credenciales para continuar
      </p>

      <form onSubmit={handleLogin} className="space-y-7">
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email corporativo
          </label>
          <input
            id="email"
            type="email"
            placeholder="m@ejemplo.com"
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

        <Button type="submit" className="w-full mt-2 group" size="lg">
          Continuar
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-foreground-secondary">
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
